'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Course, User, Website } from '@prisma/client';

interface PricingProps {
  dataa: Website & { course: Course; user: User };
}

const pricingSchema = z.object({
  pricingPlan: z.enum(['free', 'paid'], {
    required_error: 'You need to select a pricing plan.',
  }),
  productID: z.string().optional(),
  apiKey: z.string().optional(),
});

type PricingFormValues = z.infer<typeof pricingSchema>;

const PricingTab = ({ dataa }: PricingProps) => {
  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      pricingPlan: 'paid',
      productID: dataa.course.productID ?? undefined,
      apiKey: dataa.user.lemonApiKey ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<PricingFormValues> = async (data) => {
    try {
      const response = await fetch(`/api/course/${dataa.courseId}/pricing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCourseFree: data.pricingPlan === 'free',
          productId: data.productID,
          lemonApiKey: data.apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update pricing');
      }

      toast({
        title: 'Pricing Updated',
        description: 'Your course pricing has been successfully updated.',
      });
    } catch (error) {
      console.error('Error updating pricing:', error);
      toast({
        title: 'Error',
        description: 'Failed to update pricing. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="flex gap-16 p-4 rounded-md">
            <div>
              <h2 className="text-md font-semibold mt-3 w-44">Pricing Plan</h2>
              <p className="text-sm w-40">
                Choose a pricing plan for your course.
              </p>
            </div>
            <div className="flex items-center ">
              <FormField
                control={form.control}
                name="pricingPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing Plan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="gap-y-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free">Free course</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paid" id="paid" />
                          <Label htmlFor="paid">Paid Course</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {form.watch('pricingPlan') === 'paid' && (
            <>
              <div className="flex gap-16 p-2 px-4 rounded-md">
                <div>
                  <h2 className="text-md font-semibold mt-3 w-44">
                    Payment Gateway
                  </h2>
                  <p className="text-sm w-44">
                    Choose the payment gateway to use and follow the
                    instructions to set it up.
                  </p>
                  <p className="text-sm w-44">(Takes 10 minutes to set up)</p>
                </div>
                <div className="flex items-center ">
                  <RadioGroup defaultValue="option-one" className="flex gap-11">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="lemon Squeezy"
                        id="lemon Squeezy"
                      />
                      <Label htmlFor="lemon Squeezy">Lemon Squeezy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem disabled value="payPal" id="payPal" />
                      <Label htmlFor="payPal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem disabled value="stripe" id="stripe" />
                      <Label htmlFor="stripe">Stripe</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex gap-2 ml-60">
                <p className="text-md font-semibold">Status:</p>
                <p className="text-md">Set up pending</p>
                <Info className="w-6 h-6 text-red-700" />
              </div>

              <div className="flex gap-3 ml-60 py-4">
                <FaYoutube className="w-7 h-7" />
                <Link
                  href=""
                  className="flex items-center text-md font-semibold"
                >
                  Watch the step-by-step instruction video
                </Link>
              </div>

              <div className="ml-60 py-4">
                <FormField
                  control={form.control}
                  name="productID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product ID</FormLabel>
                      <FormDescription>
                        Paste your Lemon Squeezy product ID
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Eg:293666"
                          className="mt-2 w-96 bg-zinc-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="ml-60 py-2">
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormDescription>
                        Paste your Lemon Squeezy API Key
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Eg:293666"
                          className="mt-2 w-96 bg-zinc-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <div className="ml-60 py-2">
            <Button
              type="submit"
              className="px-7 text-md bg-blue-600 text-white"
            >
              Done
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PricingTab;
