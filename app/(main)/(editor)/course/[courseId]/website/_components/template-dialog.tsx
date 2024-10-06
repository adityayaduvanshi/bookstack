// _components/TemplateDialog.tsx
'use client';
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useTemplateStore from '@/store/use-template-store';
import { Template } from '@/data/template';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TemplateComponent from './templatecomponent';
import { Button } from '@/components/ui/button';

interface TemplateDialogProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  templateId: string | null;
}

const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onClose,
  courseId,
}) => {
  const selectedTemplate = useTemplateStore((state) => state.selectedTemplate);
  const router = useRouter();
  const handleApplyTemplate = async () => {
    try {
      const response = await axios.post(`/api/course/${courseId}/website`, {
        htmlContent: '<h1>Testing</h1>',
        jsonContent: selectedTemplate?.json,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex justify-between">
          <h2 className="mt-2">{selectedTemplate?.name}</h2>
          <Button onClick={handleApplyTemplate} className="mt-2">
            Use this template
          </Button>
        </div>
        {selectedTemplate && (
          <TemplateComponent templateId={selectedTemplate.id.toString()} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
