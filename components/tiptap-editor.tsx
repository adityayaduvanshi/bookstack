'use client';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { useState } from 'react';
import { Chapter, Course } from '@prisma/client';
import { Button } from './ui/button';
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Code,
  Plus,
  X,
} from 'lucide-react';
import { MenuBar } from './tiptap/menubar';
import axios from 'axios';
import Heading from '@tiptap/extension-heading';
import Strike from '@tiptap/extension-strike';
import CodeBlock from '@tiptap/extension-code-block';
import { Blockquote } from '@tiptap/extension-blockquote';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import dynamic from 'next/dynamic';
import BookSettingsDialog from './settings/book-settings';

const PdfPreview = dynamic(() => import('./pdf/pdf-preview'), { ssr: false });

interface EditorProps {
  courseId: string;
  chapterId: string;
  data: (Chapter & { course: Course }) | null;
}

const Editor = ({ chapterId, courseId, data }: EditorProps) => {
  const [title, setTitle] = useState<string>(data?.title ?? '');
  const [preview, setPreview] = useState<string>(data?.previewText ?? '');
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [pdfPageSize, setPdfPageSize] = useState<'A4' | 'A5' | 'Letter'>('A4');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link,
      Image,
      TextStyle,
      Color,
      Heading.configure({
        levels: [1, 2],
      }),
      Strike,
      CodeBlock,
      Blockquote,
      HorizontalRule,
      Placeholder.configure({
        placeholder: 'Start writing your book here...',
      }),
      Typography,
    ],
    content: data?.htmlContent || '<p>Start writing your book here...</p>',
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  const save = async (content: string) => {
    try {
      await axios.put(`/api/course/${courseId}/chapters/${chapterId}`, {
        htmlContent: content,
        title: title,
        preview: preview,
      });
    } catch (error) {
      console.log('Saving failed: ', error);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-center p-2 border-b">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <MenuBar editor={editor} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold border-none focus:outline-none w-full mb-4"
            placeholder="Founder Mode"
          />
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <div className="font-semibold">Aditya Yaduvanshi</div>
              <div className="text-sm text-gray-500">SEPTEMBER 2024</div>
            </div>
          </div>
          {editor && (
            <BubbleMenu
              className="bg-white shadow-lg border rounded-lg overflow-hidden flex"
              tippyOptions={{ duration: 100 }}
              editor={editor}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'is-active' : ''}
              >
                <Code className="h-4 w-4" />
              </Button>
            </BubbleMenu>
          )}
          {editor && (
            <FloatingMenu
              className="bg-white shadow-lg border rounded-lg overflow-hidden"
              tippyOptions={{ duration: 100 }}
              editor={editor}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                H1
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                H2
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Bullet List
              </Button>
            </FloatingMenu>
          )}
          <EditorContent editor={editor} className="prose max-w-none" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between p-2 border-t">
        <div>Page 1/148</div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20V20H4V4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button variant="ghost" size="sm">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H9V9H4V4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 4H20V9H15V4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 15H9V20H4V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 15H20V20H15V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button variant="ghost" size="sm">
            +
          </Button>
          <div>100%</div>
          <Button variant="ghost" size="sm">
            -
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            ?
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPdfPreview(true)}
          >
            Preview PDF
          </Button>
          <select
            value={pdfPageSize}
            onChange={(e) =>
              setPdfPageSize(e.target.value as 'A4' | 'A5' | 'Letter')
            }
            className="border rounded p-1"
          >
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="Letter">Letter</option>
          </select>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-5/6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">PDF Preview</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPdfPreview(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <PdfPreview
                content={editor?.getHTML() || ''}
                pageSize={pdfPageSize}
              />
            </div>
          </div>
        </div>
      )}
      {/* <BookSettingsDialog />// */}
    </div>
  );
};

export default Editor;
