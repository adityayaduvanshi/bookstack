'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Chapter } from '@/types/data';
import EmailEditor from 'react-email-editor';
import { Input } from '@/components/ui/input';
import { Delete, Save, SaveAllIcon, SaveIcon, Trash } from 'lucide-react';
// const EmailEditor = dynamic(() => import('react-email-editor'), {
//   ssr: false, // Disable server-side rendering for this component
//   loading: () => <div>Loading...</div>, // Optional: Show a loading indicator
// });

interface CustomEmailEditorProps {
  data: Chapter | any;
  courseId: string;
}

const MasterTemplateEditor = ({ data, courseId }: CustomEmailEditorProps) => {
  const [preview, setPreview] = useState(false);
  const [ischeckIn, setIsCheckIn] = useState(false);
  const emailEditorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);
  if (!isLoading) {
    return;
  }

  const onReady = (unlayer: any) => {
    {
      /*unlayer.registerCallback('image', (file: any, done: any) => {
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
    // if (data && data.content) {
    //   unlayer.loadDesign(data.content);
    //   console.log(data.content);
    // }
  };

*/
    }
    unlayer.registerCallback('block:added', (block: any) => {
      if (block.type === 'heading') {
        unlayer.exportDesign((currentDesign: any) => {
          const headingCount = countBlocksByType(currentDesign, 'heading');

          if (headingCount > 2) {
            alert('You can only add up to two headings.');
            unlayer.removeBlock(block.id);
          }
        });
      }
    });
  };

  const countBlocksByType = (design: any, type: string) => {
    let count = 0;
    design.pages[0].elements.forEach((element: any) => {
      if (element.type === type) {
        count++;
      }
    });
    return count;
  };

  const onDesignLoad = (data: any) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = (unlayer: any) => {
    console.log('onLoad', unlayer);
    unlayer.addEventListener('design:loaded', onDesignLoad);
    unlayer.loadDesign(data.jsonContent);
    console.log(data);

    {
      /*unlayer.loadDesign(data.jsonContent, {
      editor: {
        minRows: 1,
        maxRows: 2
      }
    }); */
    }

    {
      /*unlayer.addEventListener('design:downloaded', (event: any) => {
      const currentDesign = event.detail.value;
      const headingCount = countBlocksByType(currentDesign, 'heading');
  
      if (headingCount > 2) {
        alert('You can only add up to two headings.');
        removeExtraHeadings(unlayer, currentDesign, 2);
      }
    });*/
    }
  };

  {
    /*const countBlocksByType = (design: any, type: string) => {
    let count = 0;
    design.pages[0].elements.forEach((element: any) => {
      if (element.type === type) {
        count++;
      }
    });
    return count;
  };
  
  const removeExtraHeadings = (unlayer: any, currentDesign: any, maxHeadings: number) => {
    const headingsToRemove = currentDesign.pages[0].elements.filter(
      (element: any, index: number) => element.type === 'heading' && index >= maxHeadings
    );
  
    headingsToRemove.forEach((heading: any) => {
      unlayer.removeBlock(heading.id);
    });
  };*/
  }

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

  //   STORING DESIGN IN DATABASE
  const saveDesignInStore = async () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data: any) => {
      const { html, design } = data;
      try {
        const response = await axios.put(`/api/course/${courseId}/chapters`, {
          htmlContent: html,
          jsonContent: design,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const deleteChapter = async () => {
    try {
      const response = await axios.delete(`/api/course/${courseId}/chapters`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4 h-full overflow-y-hidden ">
      <div className="   flex justify-between items-center py-4 w-full">
        <div className="  w-full flex justify-end">
          {/* <Button onClick={sendDataToAPI}>Send</Button> */}
          <div className=" flex gap-4  items-center">
            <Button
              onClick={deleteChapter}
              type="button"
              size="icon"
              variant="destructive"
            >
              <Trash />
            </Button>
            <Button variant="outline" onClick={saveDesignInStore}>
              <SaveIcon className=" w-4 h-4 mr-2" /> Save
            </Button>
          </div>
        </div>
      </div>
      <EmailEditor
        options={{
          editor: {
            maxRows: 1,
          },
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
        minHeight={'82vh'}
        ref={emailEditorRef}
        onReady={onReady}
      />
      {/* <div className="  absolute bottom-0 right-0 h-14 w-[28rem] bg-white">
       
      </div> */}
    </div>
  );
};

export default MasterTemplateEditor;
