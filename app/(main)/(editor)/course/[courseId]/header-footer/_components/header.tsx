'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Course } from '@prisma/client';
import Editor from './editor';
import HeaderImage from './header-image';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface HeaderProps {
  courseID: string;
  course: Course | null;
}

const Header = ({ courseID, course }: HeaderProps) => {
  const [headerEditor, setHeaderEditor] = useState<any>(null);
  const [footerEditor, setFooterEditor] = useState<any>(null);
  const router = useRouter();

  const handleSave = useCallback(
    async (headerData?: any, footerData?: any) => {
      try {
        if (!headerData && !footerData) {
          if (!headerEditor || !footerEditor) {
            console.log('Editors are not initialized');
            return;
          }
          headerData = await headerEditor.save();
          footerData = await footerEditor.save();
        }

        const response = await axios.put(
          `/api/course/${courseID}/header-footer`,
          {
            header: headerData,
            footer: footerData,
          }
        );
        router.refresh();
        console.log('Header and Footer saved:', headerData, footerData);
      } catch (error) {
        console.error('Error saving header and footer:', error);
      }
    },
    [headerEditor, footerEditor, courseID, router]
  );

  const handleAutoSave = useCallback(
    (editorType: 'header' | 'footer') => async (data: any) => {
      if (editorType === 'header') {
        await handleSave(data, undefined);
      } else {
        await handleSave(undefined, data);
      }
    },
    [handleSave]
  );

  return (
    <div className="flex flex-col mx-4 items-center ">
      <div className="flex w-full justify-end">
        <Button
          className=" mt-4"
          onClick={() => handleSave()}
          disabled={!headerEditor || !footerEditor}
        >
          Save
        </Button>
      </div>

      <div className="w-full flex flex-col px-60">
        <h2 className="text-2xl font-semibold mb-4">Header</h2>
        <HeaderImage course={course} courseID={courseID} />
        <div className="w-full mt-4">
          <Editor
            courseId={courseID}
            data={course}
            editorRef={setHeaderEditor}
            content={course?.headerJson}
            editorId={`header-editor-${courseID}`}
          />
        </div>
      </div>

      <div className="w-full flex flex-col px-60">
        <h2 className="text-2xl font-semibold mb-4">Footer</h2>
        <div className="w-full mt-4">
          <Editor
            courseId={courseID}
            data={course}
            editorRef={setFooterEditor}
            content={course?.footerJson}
            editorId={`footer-editor-${courseID}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
