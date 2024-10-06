'use client';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Course, User, Website } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const domainSettingSchema = z.object({
  courseName: z.string().min(2, 'Domain is required'),
});

type domainSettingSchema = z.infer<typeof domainSettingSchema>;

interface DomainProps {
  data: Website & { course: Course; user: User };
}

const DomainTab = ({ data }: DomainProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<domainSettingSchema>({
    resolver: zodResolver(domainSettingSchema),
    defaultValues: {
      courseName: data.domain,
    },
  });

  const router = useRouter();

  const onSubmit = async (values: domainSettingSchema) => {
    setIsLoading(true);
    try {
      await axios.put(`/api/course/${data.courseId}/domain`, values);
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-16 p-4 rounded-md">
              <div>
                <h2 className="text-md font-semibold mt-3">
                  Course webpage URL
                </h2>
                <p className="text-sm w-52">
                  Set the link for the landing page for your course
                </p>
              </div>
              <div className="flex gap-1 items-center font-semibold text-sm">
                <div className="grid">
                  <div className="flex items-center relative ">
                    <div className="flex items-center gap-3  text-sm border bg-zinc-400 border-slate-800 pl-3 rounded-md">
                      <span>rainbox.app/creator name/</span>

                      <FormField
                        control={form.control}
                        name="courseName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="course name"
                                className="px-3 disabled:bg-white disabled:opacity-100 w-64 h-9 border border-slate-800  rounded-md focus:ring-2 focus:ring-blue-500"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      .replace(/\s/g, '')
                                      .toLowerCase()
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      className="ml-10"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Domain'}
                    </Button>
                  </div>

                  <div className="flex gap-14 ">
                    <p className="text-xs font-normal mt-2">
                      Change creator name in{' '}
                      <Link
                        className=" text-blue-500 underline underline-offset-2"
                        href="/dashboard/settings"
                      >
                        Settings
                      </Link>
                    </p>
                    <p className="text-xs font-normal mt-2">
                      Custom domains (Coming soon)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>

        <div className="flex gap-16 p-4 rounded-md">
          <div>
            <h2 className="text-md font-semibold mt-3">Sender email address</h2>
            <p className="text-sm w-52">
              Set the email address from which the email will be sent
            </p>
          </div>
          <div className="flex gap-1 items-center font-semibold text-sm">
            <div className="grid">
              <div className="flex items-center relative ">
                <div className="flex items-center gap-3  text-sm border bg-zinc-400 border-slate-800 pr-1 rounded-md">
                  <Input
                    disabled
                    type="text"
                    placeholder="Your_name"
                    className="px-3 disabled:bg-white disabled:opacity-100 w-80 h-9 border border-slate-800  rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="px-4">@rainbox.app</span>
                </div>
              </div>
              <div className="flex gap-14 ">
                <p className="text-xs font-normal mt-2">
                  Change creator name in{' '}
                  <Link
                    className=" text-blue-500 underline underline-offset-2"
                    href="/dashboard/settings"
                  >
                    Settings
                  </Link>
                </p>
                <p className="text-xs font-normal mt-2">
                  Custom domains (Coming soon)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-16 p-4 rounded-md">
          <div>
            <h2 className="text-md font-semibold mt-3">Sender Name</h2>
            <p className="text-sm w-52">
              Set the name that will appear on the Form in the email
            </p>
          </div>
          <div className="flex gap-1 items-center font-semibold text-sm">
            <div className="mt-2">
              <Input
                disabled
                type="text"
                placeholder={
                  data.user.senderName
                    ? data.user.senderName
                    : 'Your sender name'
                }
                className=" px-3 w-[460px] disabled:bg-white disabled:opacity-100   border border-slate-800  rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs font-normal mt-2">
                Change sender Name in{' '}
                <Link
                  className=" text-blue-500 underline underline-offset-2"
                  href="/dashboard/settings"
                >
                  Settings
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-16 p-4 rounded-md">
          <div className="w-52">
            <h2 className="text-md font-semibold mt-3 ">Reply to email</h2>
          </div>
          <div className="flex gap-1 items-center font-semibold text-sm">
            <div className="mt-2">
              <Input
                disabled
                type="text"
                placeholder={data.user.replyTo ? data.user.replyTo : ''}
                className=" px-3 w-[460px] border border-slate-800 disabled:bg-white disabled:opacity-100   rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs font-normal mt-2">
                Change reply-to address in{' '}
                <Link
                  className=" text-blue-500 underline underline-offset-2"
                  href="/dashboard/settings"
                >
                  Settings
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DomainTab;
