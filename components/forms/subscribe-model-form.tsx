'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Chapter, Course } from '@prisma/client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import moment from 'moment-timezone';
import { buyCourseByCourseId } from '@/actions/subscribe';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  time: z.string(),
  timezone: z.string(),
});

const generateTimes = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    times.push(`${hour}:00`);
  }
  return times;
};
const time = generateTimes();
const defaultTime = '12:00';
interface SubscribeModelFormProps {
  course: (Course & { chapter: Chapter[] | any }) | any;
}
const SubscribeModelFrom = ({ course }: SubscribeModelFormProps) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [timezones, setTimezones] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    setTimezones(moment.tz.names());
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      time: '',
      timezone: '',
    },
  });
  // function onSubmit() {
  //   values.time = selectedTime;
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.time = selectedTime;
    try {
      const response = await buyCourseByCourseId(values, course.id);
      if (response.success) {
        router.refresh();
        form.reset();
      }
      if (response.error) {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex min-h-[calc(100vh-56px)] w-full items-center justify-center md:flex -mt-6">
        <Card className="max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[380px] sm:max-w-[768px]">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">User Form</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="max-sm:w-full max-sm:max-w-[350px] max-sm:px-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-1.5">
                          {time.map((t, idx) => (
                            <span
                              onClick={() => setSelectedTime(t)}
                              className={`px-1 py-0.5 mt-3 cursor-pointer rounded-md ${
                                selectedTime === t
                                  ? 'bg-black text-white'
                                  : 'bg-[#BBF7D0]'
                              }`}
                              key={idx}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          {timezones.map((tz, idx) => (
                            <option key={idx} value={tz}>
                              {tz}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscribeModelFrom;
