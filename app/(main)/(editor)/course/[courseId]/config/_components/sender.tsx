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

const formSchema = z.object({
  username: z.string().min(4).max(50),
});

const Sender = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const formIsloading = form.formState.isSubmitting;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-80" />
                </FormControl>

                <FormMessage />
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

export default Sender;
