'use client';
import EditorJS from '@editorjs/editorjs';
import axios from 'axios';
import Embed from './wsiwg-editor/embed';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Chapter, Course } from '@prisma/client';
import { Button } from './ui/button';
import { Redo, UndoIcon } from 'lucide-react';
import EditorJSParser from 'editorjs-parser';
import { customParsers } from '@/lib/editorjs-to-html';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { chapterFormSchema } from '@/schemas';
import TestEmail from '@/app/(main)/(editor)/course/[courseId]/_components/test-email';
interface EditorProps {
  courseId: string;
  chapterId: string;
  data: (Chapter & { course: Course }) | null;
}

const parser = new EditorJSParser(undefined, customParsers);
const Editor = ({ chapterId, courseId, data }: EditorProps) => {
  const [title, setTitle] = useState<string>(data?.title ?? '');
  const [preview, setPreview] = useState<string>(data?.previewText ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<EditorJS>();
  const undoInstance = useRef<any>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const changeCounter = useRef<number>(0);

  const handleDialogOpen = () => {
    setIsOpen(!isOpen);
  };

  const save = async () => {
    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        const htmlContent = parser.parse(outputData);
        const response2 = await axios.put(
          `/api/course/${courseId}/chapters/${chapterId}`,
          {
            htmlContent: `<h1>Hello</h1>`,
            jsonContent: outputData,
            title: title,
            preview: preview,
          }
        );
      } catch (error) {
        console.log('Saving failed: ', error);
      }
    }
  };
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;

    const Header = (await import('@editorjs/header')).default;
    const Paragraph = (await import('@editorjs/paragraph')).default;
    const List = (await import('@editorjs/list')).default;
    // const Embed = (await import('@editorjs/embed')).default;
    const Code = (await import('@editorjs/code')).default;
    const Quote = (await import('@editorjs/quote')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const HyperLink = (await import('editorjs-hyperlink')).default;
    const UnderLine = (await import('@editorjs/underline')).default;
    const DragDrop = (await import('editorjs-drag-drop')).default;
    const AnyButton = (await import('editorjs-button')).default;
    const Title = (await import('title-editorjs')).default;
    const Style = (await import('editorjs-style')).default;
    const Undo = (await import('editorjs-undo')).default;
    const ImageTool = (await import('@editorjs/image')).default;
    const AIText = require('@alkhipce/editorjs-aitext');

    // const styleData = {
    //   blocks: [
    //     {
    //       type: 'paragraph',
    //       data: {
    //         text: "Press '/' for commands ",
    //       },
    //     },
    //   ],
    // };

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        onReady() {
          ref.current = editor;
          undoInstance.current = new Undo({ editor });
          try {
            new DragDrop(editor);
          } catch (error) {
            console.error('Error initializing DragDrop:', error);
          }
        },
        onChange: (e) => {
          console.log(e.events, 'ssss');

          changeCounter.current += 1;
          if (changeCounter.current >= 5) {
            save();
            changeCounter.current = 0;
          }
        },
        placeholder: "Press '/' for commands ",
        inlineToolbar: true,
        autofocus: true,
        data: {
          blocks: (data?.jsonContent as any)?.blocks || [],
        },

        tools: {
          header: {
            class: Header as any,
            config: {
              placeholder: 'Enter a Heading',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          title: {
            class: Title,
          },
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
          embed: {
            inlineToolbar: true,
            class: Embed,
          },

          aiText: {
            class: AIText,
            config: {
              //
              openaiKey: 'random',
              callback: async (prompt: string) => {
                console.log('AI prompt:', prompt);
                try {
                  // Here you would typically make a call to your backend API
                  // which in turn would call the OpenAI API
                  const response = await fetch('/api/openAi', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt }),
                  });

                  if (!response.ok) {
                    throw new Error('AI text generation failed');
                  }

                  const data = await response.json();
                  console.log('AI generated text:', data.text);
                  return data.text;
                } catch (error) {
                  console.error('Error generating AI text:', error);
                  throw error; // Rethrow the error to be handled by the plugin
                }
              },
            },
          },

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);
  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        save();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isMounted) {
    return null;
  }

  const handleUndo = () => {
    undoInstance.current?.undo();
  };

  const handleRedo = () => {
    undoInstance.current?.redo();
  };

  const onCheck = async () => {
    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        const htmlContent = parser.parse(outputData);

        const response = await axios.post('/api/test-email', {
          content: htmlContent,
          chapterId: chapterId,
        });
        console.log(htmlContent, outputData);
      } catch (error) {
        console.log('Saving failed: ', error);
      }
    }
  };
  return (
    <div className=" w-full  h-full  pb-10 ">
      <div className="w-full flex py-4 px-4 justify-end gap-2">
        <Button size="sm" type="button" onClick={save}>
          Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={handleDialogOpen}
        >
          Test Email
        </Button>
      </div>
      <div className="w-full h-full flex flex-col justify-center p-4  rounded-lg ">
        <div className="prose prose-stone dark:prose-invert">
          <div className="w-full flex flex-col items-center  gap-2 ">
            {/* <Input
            
              className="w-[50%]  border-none border-b-2 focus:outline-none    focus:ring-0"
            /> */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[50%] h-10 flex items-center px-3 py-2 text-sm outline-none border-b-2"
            />
            <input
              value={preview}
              placeholder="Subtitle (Preview Text)"
              onChange={(e) => setPreview(e.target.value)}
              className="w-[50%] h-10 flex items-center px-3 py-2 text-sm outline-none border-b-2"
            />
            {/* <Input
              value={preview}
              placeholder="Subtitle (Preview Text)"
              onChange={(e) => setPreview(e.target.value)}
              className="w-[50%]   border-b-2 focus:outline-none    focus:ring-0"
            /> */}
          </div>
          <div id="editorjs" className="min-h-[510px] mt-4" />
        </div>
      </div>
      <div className=" px-4 -pb-20">
        <Button variant="ghost" size="icon" onClick={handleUndo}>
          <UndoIcon className="h-5 w-5  text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRedo}>
          <Redo className="h-5 w-5  text-gray-600" />
        </Button>
      </div>

      <TestEmail
        onCheck={onCheck}
        isOpen={isOpen}
        handleDialogOpen={handleDialogOpen}
      />
    </div>
  );
};

export default Editor;
