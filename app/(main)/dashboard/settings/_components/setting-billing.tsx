import React from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BillingSettings = () => {
  return (
    <div>
      <div className="p-4 w-96 ">
        <h2 className="text-lg underline underline-offset-2 font-semibold mb-3 text-zinc-900">
        Connect your Payment Account
        </h2>
         <p className="text-xs mb-2">
          Connect your payment account with Rainbox account to publish courses.
        </p>
        <p className="text-xs mb-2">
          We at Rainbox get paid only when your audience subscribe to your course. Rainbox charges $0.05 for every course email sent to subscribers.
        </p>
        <p className="text-xs mb-4">
          The montly total will be billed to you on the last day of every month. The amount will be auto-deducted from your bank account or card linked to your Rainbox account.
        </p>
        <p className="text-sm mt-7 mb-4">$0.05/email billed monthly</p>
        <Button className="px-7 text-sm  bg-blue-600 text-white ">
        <Wallet className="mr-2 w-5 h-5" />
          Link your payment account
          
        </Button>
      </div>

      <div className="p-4 mt-7 ">
        <h2 className="text-lg underline underline-offset-2 font-semibold mb-3 text-zinc-900">
          Frequently Asked Questions
        </h2>
        <div className=" grid grid-cols-2 gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is considered as course email</AccordionTrigger>
            <AccordionContent>
             Course emails are each unit sent to the subscribers
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is considered as course email</AccordionTrigger>
            <AccordionContent>
             
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How and when do I make the payment?</AccordionTrigger>
            <AccordionContent> 
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How and when do I make the payment?</AccordionTrigger>
            <AccordionContent>
           
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What if I have How do I raise a dispute?</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What if I have How do I raise a dispute?</AccordionTrigger>
            <AccordionContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
