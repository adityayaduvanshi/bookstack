'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { EmailEditorProps, EditorRef } from '@/types/editor';

const DynamicEmailEditor = dynamic(() => import('react-email-editor'), {
  ssr: false,
});

// eslint-disable-next-line react/display-name
const ForwardedEmailEditor = React.forwardRef<EditorRef, EmailEditorProps>(
  (props, ref) => {
    return <DynamicEmailEditor ref={ref} {...props} />;
  }
);

export default ForwardedEmailEditor;
