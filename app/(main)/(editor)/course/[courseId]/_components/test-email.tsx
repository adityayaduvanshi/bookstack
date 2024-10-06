import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
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
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

const testEmailSchema = z.object({
  email: z.string().min(2).max(500),
});

interface TestEmailProps {
  isOpen: boolean;
  handleDialogOpen: () => void;
  onCheck: () => void;
}

const TestEmail = ({ isOpen, handleDialogOpen, onCheck }: TestEmailProps) => {
  const form = useForm<z.infer<typeof testEmailSchema>>({
    resolver: zodResolver(testEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async () => {
    try {
      onCheck();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email addresses</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="foo@gmail.com, bat@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Use comma to separate multiple email addresses.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}

              

              />

              <Button type='button' onClick={onCheck}>Test</Button>

              <Button type="submit">Send Test Email</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestEmail;
