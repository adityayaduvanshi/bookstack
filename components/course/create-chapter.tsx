'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Course } from '@/types/data';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LoaderIcon, Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  title: z.string().min(2).max(50),
});
interface CreateNewChapterProps {
  data: Course;
}

const CreateNewChapter = ({ data }: CreateNewChapterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  const handleOpenChange = () => {
    setIsOpen(false);
  };
  const isSubmitting = form.formState.isSubmitting;
  const onSubmit = async () => {
    try {
      setIsloading(true);
      const response: any = await axios.post(
        `/api/course/${data.id}/chapters/create`,
        { insertPosition: data.chapters.length + 1 }
      );
      console.log(response);
      handleOpenChange();
      form.reset();
      router.push(`/course/${data.id}/chapters/${response.data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
      router.refresh();
    }
  };
  return (
    <div className="">
      <Button
        size="icon"
        type="button"
        disabled={isLoading}
        className="text-xs  w-8 h-8"
        variant="secondary"
        onClick={onSubmit}
      >
        {isLoading ? (
          <LoaderIcon className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new chapter for {data.title}</DialogTitle>
          </DialogHeader>
          {/* <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewChapter;
