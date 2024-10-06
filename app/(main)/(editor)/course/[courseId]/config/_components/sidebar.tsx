'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const Sidebar = () => {
  const section1 = [
    {
      id: '1',
      title:
        'You can sell your courses to your audience across the world and get paid directly in your bank/ PayPal account.',
    },

    {
      id: '2',
      title:
        'To enable this, Rainbox connects with payment gateway service providers like LemonSqueezy to give you and your audience a smooth experience.',
    },

    {
      id: '3',
      title:
        'Simply follow the step-by-step instructions to set up the payment system for your course.',
    },
  ];

  const section2 = [
    {
      id: '1',
      question: 'How does Rainbox charge me?',
      content:
        'You get charged directly to your account every month based on the total number of emails sent in that month.',
    },
    {
      id: '1',
      question: 'Where can I see the paid subscriber list?',
    },

    {
      id: '1',
      question: 'What if I want to add subscribers online?',
    },
  ];

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-hidden bg-white shadow-sm ">
        <div className="px-6 flex gap-2 items-center py-4 border-b-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <span>Rainbox</span>
          </Link>
        </div>
        {section1.map((section) => (
          <div key={section.id} className="px-3 py-2">
            <div className=" mb-2">
              <h6 className="text-xs">{section.title}</h6>
            </div>
          </div>
        ))}

        <Separator className=" bg-slate-800"></Separator>
        <div className="text-md font-semibold mt-2 ml-2">FAQ</div>
        {section2.map((section) => (
          <Accordion type="single" collapsible key={section.id}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm text-left font-semibold px-4">
                {section.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs px-2 ml-2">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

        <div className="text-sm mt-5 ml-4">
          <p>Got more questions?</p>
          <p>
            Write to us at{' '}
            <Link className="underline underline-offset-1" href="">
              support@rainbox.app
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
