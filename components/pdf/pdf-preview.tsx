'use client';
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
      <div className="w-full max-w-3xl border rounded-lg overflow-hidden">
        {pdfUrl ? (
          <iframe src={pdfUrl} className="w-full h-[800px]" />
        ) : (
          <div className="p-4">Generating PDF preview...</div>
        )}
      </div>
      <div
        ref={componentRef}
        className=" p-4 mt-4 w-full max-w-3xl"
        style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white' }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose max-w-none"
        />
      </div>
    </div>
  );
};

export default PdfPreview;
