import React from 'react';
import { Parser } from '@alkhipce/editorjs-react';
import { Chapter, Course } from '@prisma/client';

const EditorContent = ({ data }: { data: any }) => {
  return <Parser data={data} />;
};

export default EditorContent;
