'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '@/types/data';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';
import { ChaptersList } from './chapters-list';

interface ChaptersFormProps {
  initialData: any;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/course/${courseId}/chapters`, values);
      toast({ title: 'Chapter created' });
      toggleCreating();
      router.refresh();
    } catch {
      toast({
        title: 'Something went wrong!',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };
  const onEdit = (id: string) => {
    router.push(`/course/${courseId}/chapters/${id}`);
  };
  const onReorder = async (updateData: { id: string; order: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/course/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast({ title: 'Chapters reorderd' });
      router.refresh();
    } catch {
      toast({
        title: 'Something went wrong!',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className=" relative overflow-y-auto h-[55vh] mt-2 border bg-slate-100  rounded-md px-2 py-2  ">
        {isUpdating && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
          </div>
        )}

        {!isCreating && (
          <div
            className={cn(
              'text-sm mt-1',
              !initialData.chapters.length && 'text-slate-500 italic'
            )}
          >
            {!initialData.chapters.length && 'No chapters'}
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapters || null}
            />
          </div>
        )}
      </div>
      {/* {!isCreating && (
        <p className=" px-2 pb-2   text-xs text-muted-foreground mt-2">
          Drag and drop to reorder the chapters
        </p>
      )} */}
    </>
  );
};

export default ChaptersForm;
