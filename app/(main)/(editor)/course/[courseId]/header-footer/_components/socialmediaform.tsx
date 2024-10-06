'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';

// Define the validation schema using zod
const socialSchema = z.object({
  twitter: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  discord: z.string().url().optional().or(z.literal('')),
  stack: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  personalWebsite: z.string().url().optional().or(z.literal('')),
  medium: z.string().url().optional().or(z.literal('')),
  pinterest: z.string().url().optional().or(z.literal('')),
});

interface SocialProps {
  isOpen: boolean;
  handleDialogOpen: () => void;
  courseID: string;
  course: Course;
}

// Create a type based on the validation schema
type SocialSchema = z.infer<typeof socialSchema>;

const SocialMediaForm = ({
  isOpen,
  handleDialogOpen,
  courseID,
  course,
}: SocialProps) => {
  // Initialize the form using react-hook-form and zod resolver
  const form = useForm<SocialSchema>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      twitter: course.twitter?.toString(),
      linkedin: course.linkedin?.toString(),
      github: course.github?.toString(),
      discord: course.discord?.toString(),
      stack: '',
      instagram: course.instagram?.toString(),
      facebook: course.facebook?.toString(),
      youtube: course.youtube?.toString(),
      personalWebsite: course.personalWebsite?.toString(),
      medium: '',
      pinterest: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (values: SocialSchema) => {
    try {
      await axios.put(`/api/course/${courseID}/social-media`, values);
      router.refresh();
      handleDialogOpen(); // Close the dialog on success
    } catch (error) {
      console.log(error);
    }
  };

  // Explicitly type socialFields array to ensure correct types for 'name'
  const socialFields: {
    name: keyof SocialSchema;
    placeholder: string;
    label: string;
  }[] = [
    { name: 'twitter', placeholder: 'http://', label: 'X (former Twitter)' },
    { name: 'linkedin', placeholder: 'http://', label: 'LinkedIn' },
    { name: 'github', placeholder: 'http://', label: 'GitHub' },
    { name: 'discord', placeholder: 'http://', label: 'Discord' },
    { name: 'instagram', placeholder: 'http://', label: 'Instagram' },
    { name: 'facebook', placeholder: 'http://', label: 'Facebook' },
    { name: 'youtube', placeholder: 'http://', label: 'YouTube' },
    {
      name: 'personalWebsite',
      placeholder: 'http://',
      label: 'Website',
    },
  ];

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
        <DialogContent className="h-[90vh] overflow-y-auto  ">
          <DialogHeader>
            <DialogTitle>Add your social networks</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {socialFields.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name} // This needs to match the keys in the schema
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">{item.label}</FormLabel>
                      <FormControl>
                        <Input
                          className=""
                          placeholder={item.placeholder}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button className="" type="submit">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialMediaForm;
