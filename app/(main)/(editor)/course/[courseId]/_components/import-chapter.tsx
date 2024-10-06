'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Import } from 'lucide-react';
import DragNdropImage from './drag-drop';
import { useRouter } from 'next/navigation';

interface ImportChapterProps {
  courseId: string;
}

const ImportChapter: React.FC<ImportChapterProps> = ({ courseId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleImport = async () => {
    if (files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    formData.append('courseId', courseId);

    try {
      const response = await axios.post(
        `/api/course/${courseId}/import`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setFiles([]);
      router.refresh();
      window.location.reload();
      // console.log(response.data.message);
    } catch (error) {
      console.error('Error importing file:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsButtonLoading(true);
  }, []);

  if (!isButtonLoading) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="sm">
          <Import className="h-4 w-4 mr-2" />
          <p className="text-sm">Import</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>
            You can import HTML, markdown, and eml files. Each file will be
            added as a new item in the course outline.
          </DialogDescription>
        </DialogHeader>
        <DragNdropImage
          onFilesSelected={handleFilesSelected}
          width="100%"
          height="250px"
        />
        <div className="flex justify-end mt-4">
          <Button
            className="px-9"
            size="sm"
            onClick={handleImport}
            disabled={files.length === 0 || loading}
          >
            {loading ? 'Importing...' : 'Import'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportChapter;
