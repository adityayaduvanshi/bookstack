import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export interface PaginationOptions {
  pageSize: 'A4' | 'A5' | 'Letter';
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pagination: {
      updatePageSize: (pageSize: 'A4' | 'A5' | 'Letter') => ReturnType;
    };
  }
}

export const Pagination = Extension.create<PaginationOptions>({
  name: 'pagination',

  addOptions() {
    return {
      pageSize: 'A4',
    };
  },

  addCommands() {
    return {
      updatePageSize:
        (pageSize: 'A4' | 'A5' | 'Letter') =>
        ({ editor }) => {
          this.options.pageSize = pageSize;
          editor.view.updateState(editor.view.state);
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const getPageHeight = (pageSize: 'A4' | 'A5' | 'Letter'): number => {
      switch (pageSize) {
        case 'A4':
          return 1123;
        case 'A5':
          return 794;
        case 'Letter':
          return 1056;
        default:
          return 1123;
      }
    };

    return [
      new Plugin({
        key: new PluginKey('pagination'),
        props: {
          decorations: (state) => {
            const { doc } = state;
            const decorations: Decoration[] = [];
            let height = 0;
            let pageNumber = 1;

            const pageHeight = getPageHeight(this.options.pageSize);

            doc.descendants((node, pos) => {
              if (node.isBlock) {
                const domNode = this.editor?.view.nodeDOM(pos) as HTMLElement;
                const nodeHeight = domNode ? domNode.offsetHeight : 20; // Default to 20px if node not found
                if (height + nodeHeight > pageHeight) {
                  decorations.push(
                    Decoration.widget(pos, () => {
                      const pageBreak = document.createElement('div');
                      pageBreak.className = 'page-break';
                      pageBreak.innerHTML = `<div class="page-number">Page ${pageNumber}</div>`;
                      pageNumber++;
                      return pageBreak;
                    })
                  );
                  height = nodeHeight;
                } else {
                  height += nodeHeight;
                }
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
