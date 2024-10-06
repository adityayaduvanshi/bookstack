'use client';
import { Button } from '@/components/ui/button';
import { Course } from '@prisma/client';
import axios from 'axios';
import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
interface MasterHeaderProps {
  course: Course;
}

const MasterHeader = ({ course }: MasterHeaderProps) => {
  const emailEditorRef = useRef<EditorRef>(null);

  const onReady = (unlayer: any) => {
    unlayer.registerCallback('image', (file: any, done: any) => {
      const formData = new FormData();
      formData.append('file', file.attachments[0]);

      fetch('/api/uploader', {
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
  const onLoad = (unlayer: any) => {
    console.log('onLoad', unlayer);

    unlayer.loadDesign(course.headerJson);
  };

  const saveDesignInStore = async () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data: any) => {
      const { html, design } = data;
      console.log(design.header, design, 'ddddddddddddddd');
      try {
        const response = await axios.put(
          `/api/course/${course.id}/master/header`,
          { headerJsonContent: design, headerHtml: html }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    });
  };

  return (
    <div className="w-full flex justify-between flex-col ">
      <div className=" flex justify-between  mb-2">
        <div className="text-sm ">Set header for all chapters</div>
        <Button onClick={saveDesignInStore}>Save</Button>
      </div>
      <div className="  ">
        <EmailEditor
          options={{
            displayMode: 'email',
            appearance: {
              theme: 'modern_light',
            },
            editor: {
              maxRows: 2,
              minRows: 1,
            },
            devices: ['tablet'],
            defaultDevice: 'tablet',
            customJS: [
              'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js',
              'https://examples.unlayer.com/examples/qr-custom-tool/qrTool.js',
            ],
          }}
          onLoad={onLoad}
          minHeight={'65vh'}
          ref={emailEditorRef}
          onReady={onReady}
        />
      </div>
    </div>
  );
};

export default MasterHeader;
