'use client';

import grapesjs, { Editor } from 'grapesjs';
import GjsEditor, { Canvas } from '@grapesjs/react';
import 'grapesjs/dist/css/grapes.min.css';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  FaDesktop,
  FaExternalLinkAlt,
  FaEye,
  FaMobileAlt,
  FaRedo,
  FaTablet,
  FaTabletAlt,
  FaUndo,
} from 'react-icons/fa';
import { Course, Website } from '@prisma/client';
import axios from 'axios';

interface CustomEditorProps {
  website: Website | any;
  data: Course;
  courseId: string;
}

export default function CustomEditor({
  website,
  data,
  courseId,
}: CustomEditorProps) {
  const editorRef = useRef<Editor | null>(null);
  console.log(data);
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
    editorRef.current = editor;
    const defaultContent =
      website?.draftHtmlContent ||
      `
    <header style="background-color: #1c1e21; color: white; padding: 20px; text-align: center;">
      <h1>${data.title}</h1>
      <p>Instructor Name</p>
    </header>
    <div style="display: flex; margin-top: 20px;">
      <aside style="width: 25%; padding: 20px; background-color: #f5f5f5;">
        <h2>Course Content</h2>
        <ul>
          <li>Introduction</li>
          <li>Lesson 1</li>
          <li>Lesson 2</li>
          <li>Conclusion</li>
        </ul>
        <a href="www.google.com">
        <button style="background-color:#000" data-gjs-type="link" data-gjs-removable="false" data-gjs-editable="true" data-gjs-draggable="false">Buy course</button>
        </a>
      </aside>
      <main style="width: 75%; padding: 20px;">
        <h2>Course Description</h2>
        <img src={data.pinterest}/>
        <p>This is a detailed course description. Here you can add more information about the course.</p>
        <img width="500px" height="200px" src="https://images.unsplash.com/photo-1717715118448-9494035f862e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
       
      </main>

    </div>
    <footer data-gjs-copyable="false" data-gjs-locked="true" data-gjs-removable="false" data-gjs-editable="false" data-gjs-draggable="false" style="background-color: #1c1e21; color: white; padding: 10px; text-align: center; margin-top: 20px;">
      <p>© 2024 Rainbox</p>
    </footer>
   
  `;
    const viewsContainer = editor.Panels.getPanel('views-container');
    if (viewsContainer) {
      viewsContainer.set('visible', true);
    }
    editor.setComponents(defaultContent);
    editor.setStyle(website?.draftCssContent);
    editor.AssetManager.add({
      id: 'asset',
      src: 'https://images.unsplash.com/photo-1717715118448-9494035f862e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });
    editor.AssetManager.add({ id: 'header', src: data.pinterest });
    editor.AssetManager.config;
    editor.on('storage:start', (data) => {
      console.log(data, 'bbbbbbbbbbbbbbbbbbb');
    });
    editor.on('storage:store', async (data) => {
      const htmlContent = data.html;
      const cssContent = data.css;
      try {
        await axios.post('/api/saveWebsiteContent', {
          courseId,
          htmlContent,
          cssContent,
          userId: website?.userId,
        });
        console.log('Content autosaved:', htmlContent, cssContent);
      } catch (error) {
        console.error('Error autosaving content:', error);
      }
    });
    editor.Commands.add('set-device-desktop', {
      run(editor) {
        editor.setDevice('Desktop');
      },
    });

    editor.Commands.add('set-device-tablet', {
      run(editor) {
        editor.setDevice('Tablet');
      },
    });
    editor.Commands.add('set-device-mobile', {
      run(editor) {
        editor.setDevice('Mobile');
      },
    });
    editor.Commands.add('preview', {
      run(editor) {
        editor.stopCommand('sw-visibility');
        editor.getModel().set('Config', { showDevices: 0 });
      },
      stop(editor) {
        editor.runCommand('sw-visibility');
        editor.getModel().set('Config', { showDevices: 1 });
      },
    });

    editor.Commands.add('preview-new-tab', {
      run(editor) {
        const html = editor.getHtml();
        const css = editor.getCss();
        const previewWindow = window.open('', '_blank');
        if (previewWindow) {
          previewWindow.document.write(`
            <html>
              <head>
                <style>${css}</style>
              </head>
              <body>${html}</body>
            </html>
          `);
          previewWindow.document.close();
        }
      },
    });
    const commandsPanel = editor.Panels.getPanel('commands');
    if (commandsPanel) {
      commandsPanel.set('visible', true);
    }
    editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
    });

    editor.Commands.add('link', {
      run(editor, sender) {
        sender && sender.set('active');
        const selectedText = editor.getSelected();
        if (selectedText) {
          const url = prompt('Enter the URL');
          if (url) {
            selectedText.addAttributes({ href: url });
          }
        }
      },
    });

    const rte = editor.RichTextEditor;

    rte.add('link', {
      icon: '<i class="fa fa-link"></i>',
      attributes: { title: 'Link' },
      result: (rte) => {
        const url = prompt('Enter the URL');
        if (url) {
          rte.exec('createLink', url);
        }
      },
    });

    rte.add('fontSize', {
      icon: `<select class="gjs-field">
            <option>1</option>
            <option>4</option>
            <option>7</option>
          </select>`,
      event: 'change',
      result: (rte, action: any) =>
        rte.exec('fontSize', action.btn.firstChild.value),
      update: (rte, action: any) => {
        const value = rte.doc.queryCommandValue(action.name);
        if (value !== 'false') {
          action.btn.firstChild.value = value;
          return 1;
        }
        return 0;
      },
    });
    editor.Commands.add('undo', {
      run(editor) {
        editor.UndoManager.undo();
      },
    });
    editor.Commands.add('redo', {
      run(editor) {
        editor.UndoManager.redo();
      },
    });
    editor.Panels.addPanel({
      id: 'devices',
      el: '.panel__devices',
      buttons: [
        {
          id: 'deviceDesktop',
          command: 'set-device-desktop',
          className: 'fa fa-desktop',
          attributes: { title: 'Desktop' },
        },
        {
          id: 'deviceTablet',
          command: 'set-device-tablet',
          className: 'fa fa-tablet',
          attributes: { title: 'Tablet' },
        },
        {
          id: 'deviceMobile',
          command: 'set-device-mobile',
          className: 'fa fa-mobile',
          attributes: { title: 'Mobile' },
        },
      ],
    });
  };
  const setDevice = (device: string) => {
    if (editorRef.current) {
      editorRef.current.Commands.run(`set-device-${device.toLowerCase()}`);
    }
  };
  useEffect(() => {
    // Add custom CSS for outlines
    const style = document.createElement('style');
    style.innerHTML = `
    
      .gjs-cv-canvas .gjs-selected {
        outline: 2px dashed #ff0000;
      }
      .gjs-cv-canvas .gjs-hovered {
        outline: 2px dashed #00ff00;
      }
    `;
    document.head.appendChild(style);
  }, []);
  const togglePreview = () => {
    if (editorRef.current) {
      const isPreview =
        editorRef.current.getModel().get('Config').showDevices === 0;
      editorRef.current.Commands.run(isPreview ? 'preview-stop' : 'preview');
    }
  };
  const previewInNewTab = () => {
    if (editorRef.current) {
      editorRef.current.Commands.run('preview-new-tab');
    }
  };

  const undo = () => {
    if (editorRef.current) {
      editorRef.current.Commands.run('undo');
    }
  };

  const redo = () => {
    if (editorRef.current) {
      editorRef.current.Commands.run('redo');
    }
  };

  const saveContent = async () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.getHtml();
      const jsonContent = editorRef.current.getComponents();
      const cssContent = editorRef.current.getCss();
      const jsContent = editorRef.current.getJs();
      try {
        const response = await axios.post(`/api/course/${courseId}/web`, {
          htmlContent,
          cssContent,
        });
        // console.log('Content saved:', htmlContent, cssContent, jsContent);
      } catch (error) {
        console.error('Error saving content:', error);
      }
    }
  };

  return (
    <div className="   w-full">
      <div className=" py-1 px-4 w-full flex justify-end  items-center">
        <Button
          onClick={() => setDevice('Desktop')}
          variant="ghost"
          size="icon"
        >
          <FaDesktop className=" h-4 w-4" />
        </Button>
        <Button onClick={() => setDevice('Tablet')} variant="ghost" size="icon">
          <FaTabletAlt className=" h-4 w-4" />
        </Button>
        <Button onClick={() => setDevice('Mobile')} variant="ghost" size="icon">
          <FaMobileAlt className=" h-4 w-4" />
        </Button>

        <Button onClick={previewInNewTab} variant="ghost" size="icon">
          <FaExternalLinkAlt className="h-4 w-4" />
        </Button>
        <Button onClick={saveContent}>Save</Button>
      </div>
      <div>
        <div className="border-2  max-w-7xl w-full">
          <GjsEditor
            grapesjs={grapesjs}
            grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
            onEditor={onEditor}
            options={{
              height: '80vh',
              storageManager: {
                type: 'remote',
                autosave: true,
                stepsBeforeSave: 1,
              },
              assetManager: {
                upload: '/api/website/images',
                autoAdd: true,
                multiUpload: true,

                // uploadName: data.title,
              },
              // panels: { defaults: [] },
              blockManager: { blocks: [] },
              plugins: [],
              showDevices: true,
            }}
          >
            <div>
              {/* // ... use your UI components */}
              <Canvas />
            </div>
          </GjsEditor>
        </div>
        <div>
          <Button onClick={undo} variant="ghost" size="icon">
            <FaUndo className="h-4 w-4 text-gray-700" />
          </Button>
          <Button onClick={redo} variant="ghost" size="icon">
            <FaRedo className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
