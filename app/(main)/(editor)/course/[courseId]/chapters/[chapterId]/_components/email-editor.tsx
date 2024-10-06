'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Chapter } from '@/types/data';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import { Input } from '@/components/ui/input';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import {
  CheckCircle,
  Delete,
  Loader,
  Save,
  SaveAllIcon,
  SaveIcon,
  Trash,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import PreviewText from './preview-text';
//
const titleSchema = z.object({
  title: z.string().min(2).max(50),
});

interface CustomEmailEditorProps {
  data: Chapter | any;
  courseId: string;
  chapterId: string;
}

const CustomEmailEditor = ({
  data,
  chapterId,
  courseId,
}: CustomEmailEditorProps) => {
  const [preview, setPreview] = useState(false);
  const [ischeckIn, setIsCheckIn] = useState(false);
  const emailEditorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isAutosaving, setIsAutosaving] = useState(false);
  const [isAutosaveSuccess, setIsAutosaveSuccess] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  // FORM FOR TITLE UPDATE
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title: data?.title,
    },
  });
  const formIsloading = form.formState.isLoading;
  const updateChapterTitle = async (values: z.infer<typeof titleSchema>) => {
    try {
      const response = await axios.put(
        `/api/course/${courseId}/chapters/${chapterId}/title`,
        { title: values.title }
      );
      console.log(response);
      toast({ title: 'Chapter Title updated.' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong!',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };
  useEffect(() => {
    setIsLoading(true);
  }, []);
  if (!isLoading) {
    return;
  }
  const onReady = (unlayer: any) => {
    unlayer.registerCallback('image', (file: any, done: any) => {
      const formData = new FormData();
      formData.append('file', file.attachments[0]);

      fetch('/api/uploader', {
        // Your upload endpoint
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          done({ progress: 100, url: data.url });
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          done({ progress: 100, url: '' });
        });
    });
    // if (data && data.content) {
    //   unlayer.loadDesign(data.content);
    //   console.log(data.content);
    // }
  };
  const onDesignLoad = (data: any) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = (unlayer: any) => {
    console.log('onLoad', unlayer);
    unlayer.addEventListener('design:loaded', onDesignLoad);
    // unlayer.loadDesign(sample);
    // unlayer.loadDesign(data.content);
    unlayer.addEventListener(
      'design:updated',
      debounce(saveDesignInStore, 1000)
    );

    unlayer.loadDesign(data.jsonContent);
    console.log(data);
  };
  // DELAY FOR AUTOSAVE
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  const sendDataToAPI = async () => {
    console.log('sss');
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data: any) => {
      const { html, design } = data;
      const apiUrl = '/api/email'; // Replace with your API endpoint URL
      console.log(design);
      //   try {
      //     const response = await axios.post(apiUrl, { html });
      //     if (response.status === 200) {
      //       console.log('Email sent successfully');
      //     } else {
      //       console.error('Failed to send email');
      //     }
      //   } catch (error) {
      //     console.error('Error sending email:', error);
      //   }
    });
  };
  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    form.setValue('title', form.getValues('title') + emojiData.emoji);
    setShowEmojiPicker(false);
  };
  //   STORING DESIGN IN DATABASE
  const saveDesignInStore = async () => {
    setIsAutosaving(true);
    setIsAutosaveSuccess(false);
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data: any) => {
      const { html, design } = data;
      try {
        const response = await axios.put(
          `/api/course/${courseId}/chapters/${chapterId}`,
          { htmlContent: html, jsonContent: design }
        );
        console.log(response.data);
        setIsAutosaveSuccess(true);
        setTimeout(() => setIsAutosaveSuccess(false), 2000);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAutosaving(false);
      }
    });
  };
  const deleteChapter = async () => {
    try {
      const response = await axios.delete(
        `/api/course/${courseId}/chapters/${chapterId}`
      );
      router.refresh();
      router.push(`/course/${courseId}`);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 h-full overflow-y-hidden ">
      <div className="   flex justify-between items-center py-4 w-full">
        {/* ADD FORM FOR CHAPTER TITLE CHANGE */}
        <div className="flex relative flex-col justify-center w-full gap-2 ">
          <Label>Subject Line</Label>
          <div className=" flex gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(updateChapterTitle)}
                className="flex gap-2 items-center"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  😀
                </Button>
                <Button
                  disabled={formIsloading}
                  variant="secondary"
                  size="icon"
                  type="submit"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </form>
              <div className=" absolute top-16 right-0">
                {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
              </div>
            </Form>
          </div>
        </div>
        <PreviewText courseId={courseId} chapter={data} chapterId={chapterId} />

        <div className="  w-full flex justify-end">
          {/* <Button onClick={sendDataToAPI}>Send</Button> */}
          <div className=" flex gap-4  items-center">
            <Button
              onClick={deleteChapter}
              type="button"
              size="icon"
              variant="destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={saveDesignInStore}
              disabled={isAutosaving}
            >
              {isAutosaving ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : isAutosaveSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Saved
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <EmailEditor
        options={{
          displayMode: 'email',
          appearance: {
            theme: 'modern_light',
          },
          devices: ['tablet'],
          defaultDevice: 'tablet',
          customJS: [
            'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js',
            'https://examples.unlayer.com/examples/qr-custom-tool/qrTool.js',
          ],
        }}
        onLoad={onLoad}
        minHeight={'79vh'}
        ref={emailEditorRef}
        onReady={onReady}
      />
      {/* <div className="  absolute bottom-0 right-0 h-14 w-[28rem] bg-white">
       
      </div> */}
    </div>
  );
};

export default CustomEmailEditor;
