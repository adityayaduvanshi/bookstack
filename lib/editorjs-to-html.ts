// Heading Align
export function getValidTextAlign(alignText: string): string {
  switch (alignText) {
    case 'Text-Align-Right':
      return 'right';
    case 'Text-Align-Center':
      return 'center';
    case 'Text-Align-Left':
      return 'left';
    default:
      return 'left'; // default to left if no valid alignment is specified
  }
}

// Heading size
export function getValidFontSize(titleType: string): string {
  switch (titleType.toLowerCase()) {
    case 'h1':
      return '5rem'; // Adjust font size for H1
    case 'h2':
      return '4rem'; // Adjust font size for H2
    case 'h3':
      return '3rem'; // Adjust font size for H3
    case 'h4':
      return '2rem'; // Adjust font size for H4
    case 'h5':
      return '1.5rem'; // Adjust font size for H5
    default:
      return 'inherit'; // Default to inherit if titleType is not recognized
  }
}

// CUSTOM PARSER
export const customParsers = {
  paragraph: (data: any, config: any) => {
    return `<p style="font-size:16px">${data.text}</p>`;
  },
  header: (data: any, config: any) => {
    const level = data.level || 2; // default to h2 if level not provided
    return `<h${level}>${data.text}</h${level}>`;
  },
  title: (data: any, config: any) => {
    const titleType = data.titleType.toLowerCase() || 'h1'; // default to H1 if titleType not provided
    const alignText = getValidTextAlign(data.alignText);
    const color = data.color || ''; // color can be used to style the title color
    const fontSize = getValidFontSize(data.titleType);
    return `<${titleType} style="text-align: ${alignText}; color: ${color}; font-size: ${fontSize};">${data.text}</${titleType}>`;
  },
  image: (data: any, config: any) => {
    const imageUrl = data.file.url;
    const caption = data.caption || '';
    const withBorder = data.withBorder || false;
    const stretched = data.stretched || false;
    const withBackground = data.withBackground || false;
    let html = `<figure>`;
    html += `<img src="${imageUrl}" style="width:600px" alt="${caption}"`;
    if (withBorder) {
      html += ` style="border: 1px solid #ccc;  "`;
    }
    if (stretched) {
      html += ` style="width: 600px; height: auto; "`;
    }
    if (withBackground) {
      html += ` style="background-color: #f0f0f0; "`;
    }
    html += `>`;
    if (caption) {
      html += `<figcaption>${caption}</figcaption>`;
    }
    html += `</figure>`;

    return html;
  },
};
