import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

interface PdfPreviewProps {
  content: string;
  pageSize: 'A4' | 'A5' | 'Letter';
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ content, pageSize }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    generatePDF();
  }, [content, pageSize]);

  const handlePrint = useReactToPrint({
    documentTitle: 'Document',
    content: () => componentRef.current,
  });

  const generatePDF = async () => {
    if (componentRef.current) {
      const element = componentRef.current;
      const opt = {
        margin: 10,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true },
        jsPDF: { unit: 'mm', format: pageSize, orientation: 'portrait' },
      };

      try {
        const pdf = await html2pdf()
          .from(element)
          .set(opt)
          .outputPdf('datauristring');
        setPdfUrl(pdf);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  };

  const handleDownloadPDF = () => {
    if (componentRef.current) {
      html2pdf().from(componentRef.current).save();
    }
  };

  const styles = `
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    
    }
    .ProseMirror {
      > * + * {
        margin-top: 0.75em;
      }
    }
    .ProseMirror h1 {
      font-size: 2.25rem !important;
      font-weight: bold;
    }
    .ProseMirror h2 {
      font-size: 1.875rem !important;
      font-weight: bold;
    }
    .ProseMirror h3 {
      font-size: 1.5rem !important;
    }
    .ProseMirror h4 {
      font-size: 1.2rem !important;
    }
    .ProseMirror h5 {
      font-size: 1.1rem !important;
    }
    .ProseMirror h6 {
      font-size: 1rem !important;
    }
    .ProseMirror ul,
    .ProseMirror ol {
      padding-left: 1.5em;
      margin-bottom: 0.75em;
    }
    .ProseMirror li {
      margin-bottom: 0.5em;
    }
    .ProseMirror blockquote {
      border-left: 3px solid #b8c2cc;
      padding-left: 1em;
      margin-left: 0;
      margin-right: 0;
    }
    .ProseMirror pre {
      background-color: #f8f8f8;
      border-radius: 3px;
      padding: 0.75em 1em;
      font-family: 'Courier New', Courier, monospace;
    }
    .ProseMirror code {
      background-color: #f0f0f0;
      border-radius: 3px;
      padding: 0.2em 0.4em;
      font-family: 'Courier New', Courier, monospace;
    }
    .ProseMirror hr {
      border: none;
      border-top: 2px solid #e2e8f0;
      margin: 2em 0;
    }
  `;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <button
          onClick={handlePrint}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Print
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Download PDF
        </button>
      </div>
      <div className="w-full max-w-[210mm] border rounded-lg overflow-hidden">
        {pdfUrl ? (
          <iframe src={pdfUrl} className="w-full h-[800px]" />
        ) : (
          <div className="p-4">Generating PDF preview...</div>
        )}
      </div>
      <div
        ref={componentRef}
        className="p-4 mt-4 w-full max-w-[210mm]"
        style={{
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: 'white',
          padding: '20mm',
        }}
      >
        <style>{styles}</style>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="ProseMirror prose max-w-none"
        />
      </div>
    </div>
  );
};

export default PdfPreview;
