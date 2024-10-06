'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import dataJson from './data.json';

import EmailEditor from 'react-email-editor';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, SaveAllIcon, SaveIcon } from 'lucide-react';
import { Course, Website } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import useScreenShareStore from '@/store/useTemplate';

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
const TemplateEditor = ({
  data,
  courseId,
  website,
}: CustomWebsiteEditorProps) => {
  const [preview, setPreview] = useState(false);
  const [ischeckIn, setIsCheckIn] = useState(false);
  const websiteEditorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [courseDomain, setCourseDomain] = useState<string>(website?.domain);
  const { toast } = useToast();
  useEffect(() => {
    setIsLoading(true);
  }, []);
  if (!isLoading) {
    return null;
  }
  const onReady = (unlayer: any) => {
    console.log('Unlayer instance:', unlayer);
    unlayer.registerCallback('previewHtml', function (params: any, done: any) {
      console.log('preview', params, done);
      setPreview(true);
      done({
        html: params.html, // you can pass your custom html here
      });
    });
    unlayer.registerCallback('image', (file: any, done: any) => {
      const formData = new FormData();
      formData.append('file', file.attachments[0]);

      fetch('http://localhost:3000/upload', {
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

    // unlayer.registerTool({
    //   name: 'subscribe_button',
    //   label: 'Subscribe Button',
    //   icon: 'fas fa-envelope',
    //   supportedDisplayModes: ['email', 'web'],
    //   options: {
    //     default: {
    //       text: 'Subscribe Now',
    //       url: '#',
    //       backgroundColor: '#4CAF50',
    //       textColor: '#FFFFFF',
    //     },
    //   },
    //   renderer: {
    //     Viewer: (props: { data: SubscribeButtonProps }) => `
    //       <a href="${props.data.url}"
    //          style="background-color: ${props.data.backgroundColor};
    //                 color: ${props.data.textColor};
    //                 padding: 10px 20px;
    //                 text-decoration: none;">
    //         ${props.data.text}
    //       </a>`,
    //     exporters: {
    //       web: (props: { data: SubscribeButtonProps }) => `
    //         <a href="${props.data.url}"
    //            style="background-color: ${props.data.backgroundColor};
    //                   color: ${props.data.textColor};
    //                   padding: 10px 20px;
    //                   text-decoration: none;">
    //           ${props.data.text}
    //         </a>`,
    //       email: (props: { data: SubscribeButtonProps }) => `
    //         <a href="${props.data.url}"
    //            style="background-color: ${props.data.backgroundColor};
    //                   color: ${props.data.textColor};
    //                   padding: 10px 20px;
    //                   text-decoration: none;">
    //           ${props.data.text}
    //         </a>`,
    //     },
    //   },
    //   properties: {
    //     text: {
    //       label: 'Button Text',
    //       type: 'text',
    //       value: 'Subscribe Now',
    //     },
    //     url: {
    //       label: 'URL',
    //       type: 'text',
    //       value: '#',
    //     },
    //     backgroundColor: {
    //       label: 'Background Color',
    //       type: 'color',
    //       value: '#4CAF50',
    //     },
    //     textColor: {
    //       label: 'Text Color',
    //       type: 'color',
    //       value: '#000000',
    //     },
    //   },
    // });

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
    unlayer.loadDesign(dataJson);
    console.log(data);
  };

  const sendDataToAPI = async () => {
    console.log('sss');
    const unlayer = websiteEditorRef.current?.editor;
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

  //   STORING DESIGN IN DATABASE
  const saveDesignInStore = async () => {
    console.log('click');
    const unlayer = websiteEditorRef.current?.editor;
    unlayer?.exportHtml(async (data: any) => {
      const { html, design } = data;
      console.log(design);
      try {
        const response = await axios.post(`/api/course/${courseId}/website`, {
          htmlContent: html,
          jsonContent: design,
        });
        toast({ title: 'Website updated' });
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
          <title>Preview</title>
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
  const handleCourseDomain = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/course/${courseId}/config`, {
        domain: courseDomain.toLowerCase(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4 h-full overflow-y-hidden ">
      <div className="   flex justify-between items-center py-4 w-full">
        {/* ADD FORM FOR CHAPTER TITLE CHANGE */}
        <div className=" flex gap-2">
          <Input defaultValue={data.title} className=" py-2  max-w-56" />
          <Button variant="secondary" type="button" size="icon">
            <SaveAllIcon className=" h-4 w-4" />
          </Button>
        </div>
        <Input
          value={courseDomain}
          onChange={(e) => setCourseDomain(e.target.value)}
          className=" py-2  max-w-56"
        />
        <Button
          onClick={handleCourseDomain}
          variant="secondary"
          type="button"
          size="icon"
        >
          <SaveAllIcon className=" h-4 w-4" />
        </Button>
        <span>{`${website?.domain}.localhost:3000`}</span>
        <div className="  w-full flex gap-2 justify-end">
          {/* <Button onClick={sendDataToAPI}>Send</Button> */}

          <Button onClick={showPreview} type="button">
            <ArrowUpRight />
          </Button>

          <Button type="button" onClick={saveDesignInStore}>
            <SaveIcon className=" w-4 h-4 mr-2" /> Use This Template
          </Button>
        </div>
      </div>
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

export default TemplateEditor;
