'use client';

import grapesjs, { Editor } from 'grapesjs';
import GjsEditor, { Canvas } from '@grapesjs/react';
const WebEditor2 = () => {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <div className=" mt-20">
      <div className="   max-w-6xl">
        <GjsEditor
          // Pass the core GrapesJS library to the wrapper (required).
          // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
          grapesjs={grapesjs}
          // Load the GrapesJS CSS file asynchronously from URL.
          // This is an optional prop, you can always import the CSS directly in your JS if you wish.
          grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
          // GrapesJS init options
          options={{
            height: '100vh',
            storageManager: false,
            showOffsets: false,
            avoidDefaults: true,
            blockManager: { blocks: [] },
            panels: {},
            richTextEditor: {
              adjustToolbar: true,
            },
          }}
          onEditor={onEditor}
        />
      </div>
    </div>
  );
};

export default WebEditor2;
