'use client';
import EditorJS from '@editorjs/editorjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Course } from '@prisma/client';
import EditorJSParser from 'editorjs-parser';
import { customParsers } from '@/lib/editorjs-to-html';

interface EditorProps {
  courseId: string;
  data: Course | null;
  editorRef: (editor: any) => void;
  content?: any;
  editorId: string;
}

const parser = new EditorJSParser(undefined, customParsers);
const Editor = ({
  courseId,
  data,
  editorRef,
  content,
  editorId,
}: EditorProps) => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  console.log(content);
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Paragraph = (await import('@editorjs/paragraph')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const Quote = (await import('@editorjs/quote')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const HyperLink = (await import('editorjs-hyperlink')).default;
    const UnderLine = (await import('@editorjs/underline')).default;
    const DragDrop = (await import('editorjs-drag-drop')).default;
    const AnyButton = (await import('editorjs-button')).default;
    const Title = (await import('title-editorjs')).default;
    const Undo = (await import('editorjs-undo')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorId,
        onReady() {
          ref.current = editor;
          editorRef(editor);
          new Undo({ editor });
          try {
            new DragDrop(editor);
          } catch (error) {
            console.error('Error initializing DragDrop:', error);
          }
        },
        placeholder: 'Type content here',
        inlineToolbar: true,
        autofocus: true,
        data: content && typeof content === 'object' ? content : { blocks: [] },
        tools: {
          header: {
            class: Header as any,
            config: {
              placeholder: 'Enter a Heading',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          title: { class: Title },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          hyperlink: {
            class: HyperLink,
            config: {
              shortcut: 'CMD+SHIFT+L',
              target: '_blank',
              rel: 'nofollow',
              availableTargets: ['_blank', '_self'],
              availableRels: ['author', 'noreferrer'],
              validate: false,
            },
            toolbox: { title: 'Hyperlink' },
            inlineToolbar: true,
          },
          quote: Quote,
          underline: UnderLine,
          list: { class: List, inlineToolbar: true },
          code: Code,
          inlineCode: InlineCode,
          anyButton: AnyButton,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const formData = new FormData();
                  formData.append('file', file);

                  try {
                    const response = await fetch('/api/uploader', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await response.json();
                    return {
                      success: 1,
                      file: {
                        url: data.url,
                      },
                    };
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    return {
                      success: 0,
                      error: 'Failed to upload image',
                    };
                  }
                },
              },
            },
          },
        },
      });
    }
  }, [editorId, content, editorRef]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      if (ref.current) {
        editorRef(ref.current);
      }
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor, editorRef]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-full pb-10 bg-zinc-50">
      <div className="w-full h-full flex flex-col justify-center p-4 rounded-lg">
        <div className="prose prose-stone dark:prose-invert">
          <div id={editorId} className="min-h-[60px]" />
        </div>
      </div>
    </div>
  );
};

export default Editor;
