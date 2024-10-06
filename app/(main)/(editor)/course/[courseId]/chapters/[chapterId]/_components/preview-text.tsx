'use client';
import React, { useRef, useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SaveIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { Chapter } from '@prisma/client';

interface PreviewTextProps {
  courseId: string;
  chapterId: string;
  chapter: Chapter | any;
}

const titleSchema = z.object({
  title: z.string().min(2).max(50),
});

const PreviewText = ({ chapterId, courseId, chapter }: PreviewTextProps) => {
  const { toast } = useToast();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // FORM
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title: chapter.previewText,
    },
  });

  const updateChapterTitle = async (values: z.infer<typeof titleSchema>) => {
    try {
      const response = await axios.put(
        `/api/course/${courseId}/chapters/${chapterId}/preview`,
        { title: values.title }
      );
      console.log(response);
      toast({ title: 'Chapter updated.' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong!',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    form.setValue('title', form.getValues('title') + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex relative flex-col justify-center w-full gap-2 ">
      <Label>Preview Text</Label>
      <div className="flex gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateChapterTitle)}
            className="flex gap-2 items-center relative"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😀
            </Button>
            <Button variant="secondary" size="icon" type="submit">
              <SaveIcon className="h-4 w-4" />
            </Button>
          </form>
          <div ref={emojiPickerRef} className="absolute top-16 right-0">
            {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PreviewText;
