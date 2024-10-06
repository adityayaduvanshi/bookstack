"use client"
import { Input } from "@/components/ui/input";
import React from "react";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import axios from "axios";

const domainSchema = z.object({
  creatorName: z.string()
    .refine(value => !value.includes(' '), {
      message: "Creator name cannot contain spaces"
    })
    .refine(value => value === value.toLowerCase(), {
      message: "Creator name must be in lowercase"
    }),
  senderEmail: z.string().email("Invalid email address"),
  senderName: z.string(),
  replyTo: z.string().email("Invalid email address"),
});

type domainSchema = z.infer<typeof domainSchema>;

interface SettingProps {
  data: User | any;
}

const DomainSettings = ({ data }: SettingProps) => {
  const form = useForm<domainSchema>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      creatorName: data.creatorName ,
      senderEmail: data.senderEmail,
      senderName: data.senderName,
      replyTo: data.replyTo,
    },
  });

  const router = useRouter();

  const onSubmit = async (values: domainSchema) => {
    try {
      await axios.put(`/api/settings`, values);
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <div className="flex gap-16 p-4 rounded-md">
            <div>
              <h2 className="text-md font-semibold mt-3">
                Creator webpage URL
              </h2>
              <p className="text-sm w-52">
                Set the creator name part of the link. It will be common across
                all your courses.
              </p>
            </div>
            <div className="flex gap-1 items-center font-semibold text-sm">
              <div className="grid">
                <div className="flex items-center relative ">
                  <div className="flex items-center gap-3  text-sm border bg-zinc-400 border-slate-800 pl-3 rounded-md">
                    <span>Rainbox.app/</span>
                    <FormField
                      control={form.control}
                      name="creatorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="px-3 w-64 h-9 border border-slate-800 rounded-md focus:ring-2 focus:ring-blue-500"
                              placeholder="creator name"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.replace(/\s/g, "").toLowerCase()
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end ">
                  <p className="text-xs font-normal mt-2">
                    Custom domains (Coming soon)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-16 p-4 rounded-md">
            <div>
              <h2 className="text-md font-semibold mt-3">
                Sender email address
              </h2>
              <p className="text-sm w-52">
                Set the email address from which the email will be sent
              </p>
            </div>
            <div className="flex gap-1 items-center font-semibold text-sm">
              <div className="grid">
                <div className="flex items-center relative ">
                  <div className="flex items-center gap-3  text-sm border bg-zinc-400 border-slate-800 pr-1 rounded-md">
                    <FormField
                      control={form.control}
                      name="senderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="creator name"
                              className="px-3  w-80 h-9 border border-slate-800  rounded-md focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="px-4">@rainbox.app</span>
                  </div>
                </div>
                <div className="flex gap-16 ">
                  <p className="text-xs font-normal mt-2">
                    Email username fetched from URL
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
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          className=" px-3 w-[460px]   border border-slate-800  rounded-md focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-xs font-normal mt-2"></p>
              </div>
            </div>
          </div>

          <div className="flex gap-16 p-4 rounded-md">
            <div className="w-52">
              <h2 className="text-md font-semibold mt-3 ">Reply to email</h2>
              <p className="text-sm w-52">
                Set the email address to which the replies will be sent to
              </p>
            </div>
            <div className="flex gap-1 items-center font-semibold text-sm">
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="replyTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="youremail@gmail.com"
                          className=" px-3 w-[460px] border border-slate-800    rounded-md focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-xs font-normal mt-2"></p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mr-28 mb-8">
            <Button className="px-7 text-md bg-blue-600 text-white ">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DomainSettings;
