"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Course, Website } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import axios from "axios";

interface DomainSettingProps {
  data: Course | null;
  courseId: string;
  website: Website | null;
}

// Use preprocess to convert the input value to a number before validation
const titleSchema = z.object({
  price: z.preprocess((value) => Number(value), z.number().min(0, "Price must be a positive number")),
});

const Price = ({ data, courseId, website }: DomainSettingProps) => {
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      price: data?.price ?? 0,
    },
  });

  console.log("DATAAAA",data)

  const formIsLoading = form.formState.isSubmitting;


  const handleCourseDomain = async (values: z.infer<typeof titleSchema>) => {
    try {
      await axios.put(`/api/course/${courseId}/price`, {
        price: values.price,
      });
      // Handle successful response if needed
    } catch (error) {
      console.error("Failed to update the course price:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold underline underline-offset-2 text-zinc-900 mt-8">
        Pricing setting
      </h2>
      <div className="flex items-center mt-4">
        <span className="font-semibold mr-2">Set Course Price</span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCourseDomain)}
            className="flex gap-2 items-center"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      className="w-80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={formIsLoading}
              variant="secondary"
              size="icon"
              type="submit"
            >
              <Save className="h-4 w-4" />
            </Button>
          </form>
        </Form>
        <span className="text-gray-600 ml-2">USD</span>
      </div>
    </div>
  );
};

export default Price;
