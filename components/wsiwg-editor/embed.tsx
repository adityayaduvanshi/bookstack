// Overwrite Embed Block Tool
import EmbedTool from '@editorjs/embed';

export default class Embed extends EmbedTool {
  static get toolbox() {
    return {
      title: 'YouTube',
      icon: '<i class="fab fa-youtube"></i>',
    };
  }

  /**
   * Render Embed tool content
   *
   * @returns {HTMLElement}
   */
  render(): HTMLElement {
    if (!this.data.service) {
      const container = document.createElement('div');

      this.element = container;
      const input = document.createElement('input');
      input.classList.add('cdx-input');
      input.placeholder = 'https://www.youtube.com/watch?v=w8vsuOXZBXc';
      input.type = 'url';
      input.addEventListener('paste', (event: any) => {
        const url = event.clipboardData.getData('text');
        const service = Object.keys(Embed.services).find((key) =>
          Embed.services[key].regex.test(url)
        );
        if (service) {
          this.onPaste({ detail: { key: service, data: url } });
        }
      });
      container.appendChild(input);

      return container;
    }
    return super.render();
  }

  validate(savedData: any) {
    return savedData.service && savedData.source ? true : false;
  }
}
