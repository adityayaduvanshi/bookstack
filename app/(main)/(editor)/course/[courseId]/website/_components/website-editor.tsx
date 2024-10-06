'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import EmailEditor from 'react-email-editor';
import {
  ArrowUpRight,
  CheckCircle,
  Fullscreen,
  Loader,
  Save,
  SaveAllIcon,
  SaveIcon,
  ViewIcon,
} from 'lucide-react';
import { Course, Website } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import useScreenShareStore from '@/store/useTemplate';
import { useRouter } from 'next/navigation';
// const EmailEditor = dynamic(() => import('react-email-editor'), {
//   ssr: false, // Disable server-side rendering for this component
//   loading: () => (
//     <div className=" w-full h-full flex items-center justify-center">
//       Loading...
//     </div>
//   ), // Optional: Show a loading indicator
// });

const templateTitle = z.object({
  title: z.string().min(2).max(50),
});

interface CustomWebsiteEditorProps {
  data: Course | any;
  courseId: string;
  website: Website | any;
}

interface SubscribeButtonProps {
  url: string;
  text: string;
  backgroundColor: string;
  textColor: string;
}
// const EmailEditor = dynamic(() => import('react-email-editor'), {
//   ssr: false, // Disable server-side rendering for this component
//   loading: () => (
//     <div className="w-full h-full flex items-center justify-center">
//       Loading...
//     </div>
//   ), // Optional: Show a loading indicator
// });
const WebsiteEditor = ({
  data,
  courseId,
  website,
}: CustomWebsiteEditorProps) => {
  const [preview, setPreview] = useState(false);
  const [ischeckIn, setIsCheckIn] = useState(false);
  const websiteEditorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [courseDomain, setCourseDomain] = useState<string>(website?.domain);
  const [isAutosaving, setIsAutosaving] = useState(false);
  const [isAutosaveSuccess, setIsAutosaveSuccess] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const form = useForm<z.infer<typeof templateTitle>>({
    resolver: zodResolver(templateTitle),
    defaultValues: {
      title: '',
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    setIsLoading(true);
  }, []);
  if (!isLoading) {
    return;
  }

  // SAVE TEMPLATE

  const saveTemplate = async () => {
    setIsTemplateOpen(true);
  };

  const onSubmit = async (data: any) => {
    const unlayer = websiteEditorRef.current?.editor;
    unlayer?.exportHtml(async (htmlData: any) => {
      const { html, design } = htmlData;

      try {
        const response = await axios.post('/api/template/create', {
          title: data.title,
          html: html,
          json: design,
        });

        router.refresh();

        toast({ title: 'Template saved successfully' });
        setIsTemplateOpen(false);
        console.log(response.data);
      } catch (error) {
        toast({
          title: 'Something went wrong.',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        console.log(error);
      }
    });
  };

  // const saveTemplate = async () => {
  //   setIsTemplateOpen(true);
  //   const unlayer = websiteEditorRef.current?.editor;
  //   unlayer?.exportHtml(async (data: any) => {
  //     const { html, design } = data;

  //     try {
  //       setIsTemplateOpen(true);
  //       const response = await axios.post("/api/template/create", {
  //         title: templateName,

  //         html: html,
  //         json: design,
  //       });

  //       toast({ title: "Template saved successfully" });
  //       console.log(response.data);
  //     } catch (error) {
  //       toast({
  //         title: "Something went wrong.",
  //         description: "Please try again later.",
  //         variant: "destructive",
  //       });
  //       console.log(error);
  //     }
  //   });
  // };

  const modifyTemplateHref = (template: any, courseId: any) => {
    const newTemplate = { ...template };
    console.log(newTemplate);
    newTemplate.body.rows.forEach((row: any) => {
      row.columns.forEach((column: any) => {
        column.contents.forEach((content: any) => {
          if (
            content.type === 'button' &&
            content.values.text === 'Subscribe'
          ) {
            content.values.href.values.href = `/course/${courseId}/subscribe`; // Change this to the desired route
            console.log('seted');
          }
        });
      });
    });
    return newTemplate;
  };
  const onReady = (unlayer: any) => {
    console.log('Unlayer instance:', unlayer);
    unlayer.registerCallback('previewHtml', function (params: any, done: any) {
      console.log('preview', params, done);
      setPreview(true);
      done({
        html: params.html, // you can pass your custom html here
      });
    });
    unlayer.loadDesign(modifyTemplateHref(website?.jsonContent, courseId));
    console.log(website?.jsonContent);
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
    unlayer.loadDesign(website?.jsonContent);
  };
  // DELAY FOR AUTOSAVE
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  //   STORING DESIGN IN DATABASE
  const saveDesignInStore = async () => {
    setIsAutosaving(true);
    setIsAutosaveSuccess(false);
    console.log('click');
    const unlayer = websiteEditorRef.current?.editor;
    unlayer?.exportHtml(async (data: any) => {
      const { html, design } = data;

      try {
        const response = await axios.post(`/api/course/${courseId}/website`, {
          htmlContent: html,
          jsonContent: design,
        });

        toast({ title: 'Website updated' });
        console.log(response.data);
        setIsAutosaveSuccess(true);
        setTimeout(() => setIsAutosaveSuccess(false), 2000);
      } catch (error) {
        toast({
          title: 'Something went wrong.',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        console.log(error);
      } finally {
        setIsAutosaving(false);
      }
    });
  };
  const showPreview = () => {
    const unlayer = websiteEditorRef.current?.editor;
    unlayer?.exportHtml((data: any) => {
      const { html } = data;

      // Create a complete HTML document with a title
      const completeHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${website.siteTitle} Preview</title>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `;

      const blob = new Blob([completeHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  };

  return (
    <div className="px-4 h-full overflow-y-hidden ">
      <div className="   flex justify-between items-center py-[2px] w-full">
        {/* ADD FORM FOR CHAPTER TITLE CHANGE */}
        <div className=" flex-col mb-2">
          <span className=" text-xs">Course Title</span>
          <div className=" flex gap-2">
            <Input defaultValue={data.title} className=" py-2  max-w-56" />
            <Button variant="secondary" type="button" size="icon">
              <SaveAllIcon className=" h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="  w-full flex gap-2 justify-end">
          {/* <Button onClick={sendDataToAPI}>Send</Button> */}
          {/* <SaveTemplate/> */}
          <Button onClick={saveTemplate}>Save</Button>
          <Button variant="outline" onClick={showPreview} type="button">
            <ArrowUpRight className="h-4 w-4 mr-2" /> Preview
          </Button>

          <Button
            type="button"
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

      <AlertDialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Give Your Template A Name</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Template Name " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit" className="bg-rose-500">
                  Save Template
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      <EmailEditor
        options={{
          displayMode: 'web',
          appearance: {
            theme: 'modern_light',
          },

          features: {
            pageAnchors: true,
            spellChecker: true,
          },
          devices: ['tablet', 'desktop', 'mobile'],
          defaultDevice: 'desktop',
          customJS: [
            'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js',
            'https://examples.unlayer.com/examples/qr-custom-tool/qrTool.js',
          ],
        }}
        onLoad={onLoad}
        minHeight={'82vh'}
        ref={websiteEditorRef}
        onReady={onReady}
      />
      {/* <div className="  absolute bottom-0 right-0 h-14 w-[28rem] bg-white">
       
      </div> */}
    </div>
  );
};

export default WebsiteEditor;
