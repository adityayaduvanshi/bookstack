'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Course, Website } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import axios from 'axios';

interface DomainSettingProps {
  data: Course | any;
  courseId: string;
  website: Website | any;
}

const titleSchema = z.object({
  domain: z
    .string()
    .min(4, 'Domain must be at least 4 characters long')
    .max(50, 'Domain must be at most 50 characters long')
    .regex(/^[a-zA-Z0-9-]+$/, 'Domain must not contain special characters'),
});

const DomainSetting = ({ data, courseId, website }: DomainSettingProps) => {
  const [courseDomain, setCourseDomain] = useState<string>(website?.domain);
  const [domainError, setDomainError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      domain: courseDomain,
    },
  });

  const formIsloading = form.formState.isSubmitting;

  const handleCourseDomain = async (values: z.infer<typeof titleSchema>) => {
    setDomainError(null);
    try {
      const response = await axios.post(`/api/course/${courseId}/config`, {
        domain: values.domain.toLowerCase(),
      });

      if (!response.data.available) {
        setDomainError('Domain is already taken');
        return;
      }

      setCourseDomain(response.data.website.domain);
    } catch (error) {
      console.log(error);
      setDomainError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCourseDomain)}
          className="flex gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-80" />
                </FormControl>

                <FormMessage />
                {domainError && (
                  <p className="text-red-500 text-sm mt-1">{domainError}</p>
                )}
              </FormItem>
            )}
          />
          <Button
            disabled={formIsloading}
            variant="secondary"
            size="icon"
            type="submit"
          >
            <Save className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DomainSetting;
