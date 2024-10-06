import { NextRequest, NextResponse } from 'next/server';
import { convert } from 'html-to-text';
import showdown from 'showdown';
import { db } from '@/lib/db';
import { JSDOM } from 'jsdom';
import { updateCourse } from '@/actions/update-course';
const generateUniqueTitle = async (courseId: string) => {
  let baseTitle = 'Untitled';
  let title = baseTitle;
  let counter = 1;

  while (true) {
    const existingChapter = await db.chapter.findFirst({
      where: {
        courseId,
        title,
      },
    });

    if (!existingChapter) break;

    title = `${baseTitle}-${counter}`;
    counter++;
  }

  return title;
};
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file || !params.courseId) {
    return NextResponse.json(
      { message: 'Missing file or courseId' },
      { status: 400 }
    );
  }

  try {
    const content = await processFile(file);

    const title = await generateUniqueTitle(params.courseId);
    const maxOrderChapter = await db.chapter.findFirst({
      where: { courseId: params.courseId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const newOrder = (maxOrderChapter?.order ?? 0) + 1;
    const newChapter = await createChapter(
      params.courseId,
      title,
      content,
      newOrder
    );
    await updateCourse(params.courseId);
    return NextResponse.json(
      { message: 'File imported successfully', chapter: newChapter },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { message: 'Error processing file' },
      { status: 500 }
    );
  }
}

async function processFile(file: File): Promise<any> {
  const content = await file.text();
  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  let htmlContent: string;

  switch (fileExtension) {
    case 'html':
      htmlContent = content;
      break;
    case 'md':
      const converter = new showdown.Converter();
      htmlContent = converter.makeHtml(content);
      break;
    case 'eml':
      // For EML files, extract the HTML body
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      htmlContent = bodyMatch ? bodyMatch[1] : convert(content);
      break;
    default:
      throw new Error('Unsupported file type');
  }

  // Convert HTML to EditorJS format
  return htmlToEditorJS(htmlContent);
}

function htmlToEditorJS(html: string): any {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const blocks: any[] = [];

  function processNode(node: Node) {
    if (
      node.nodeType === dom.window.Node.TEXT_NODE &&
      node.textContent?.trim()
    ) {
      blocks.push({
        type: 'paragraph',
        data: { text: node.textContent.trim() },
      });
    } else if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
      const element = node as Element;
      switch (element.tagName.toLowerCase()) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          blocks.push({
            type: 'header',
            data: {
              text: element.textContent?.trim() || '',
              level: parseInt(element.tagName[1]),
            },
          });
          break;
        case 'p':
          blocks.push({
            type: 'paragraph',
            data: { text: element.innerHTML.trim() },
          });
          break;
        case 'ul':
        case 'ol':
          blocks.push({
            type: 'list',
            data: {
              style:
                element.tagName.toLowerCase() === 'ul'
                  ? 'unordered'
                  : 'ordered',
              items: Array.from(element.children).map((li) =>
                li.innerHTML.trim()
              ),
            },
          });
          break;
        case 'img':
          blocks.push({
            type: 'image',
            data: {
              url: element.getAttribute('src') || '',
              caption: element.getAttribute('alt') || '',
            },
          });
          break;
        case 'pre':
          blocks.push({
            type: 'code',
            data: { code: element.textContent?.trim() || '' },
          });
          break;
        default:
          Array.from(element.childNodes).forEach((child) => processNode(child));
      }
    }
  }

  Array.from(document.body.childNodes).forEach((node) => processNode(node));

  return {
    time: Date.now(),
    blocks: blocks,
    version: '2.22.2',
  };
}

async function createChapter(
  courseId: string,
  title: string,
  content: any,
  order: any
) {
  return db.chapter.create({
    data: {
      title,
      order,
      previewText: title,
      content: JSON.stringify(content),
      htmlContent: content.blocks
        .map((block: any) => {
          switch (block.type) {
            case 'header':
              return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
            case 'paragraph':
              return `<p>${block.data.text}</p>`;
            case 'list':
              const listItems = block.data.items
                .map((item: string) => `<li>${item}</li>`)
                .join('');
              return block.data.style === 'unordered'
                ? `<ul>${listItems}</ul>`
                : `<ol>${listItems}</ol>`;
            case 'image':
              return `<img src="${block.data.url}" alt="${block.data.caption}">`;
            case 'code':
              return `<pre><code>${block.data.code}</code></pre>`;
            default:
              return '';
          }
        })
        .join('\n'),
      jsonContent: content,
      courseId,
    },
  });
}
