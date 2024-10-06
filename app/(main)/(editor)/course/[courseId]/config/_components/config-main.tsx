'use client';
import { Course, User, Website } from '@prisma/client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DomainTab from './domain-tab';
import PricingTab from './pricing-tab';
import { Separator } from '@/components/ui/separator';

interface ConfigProps {
  data: Website & { course: Course; user: User };
}

const ConfigMain = ({ data }: ConfigProps) => {
  return (
    <div>
      <div className="p-8 bg-white">
        {/* {data.user.name} */}
        <Tabs defaultValue="domain" className="w-full">
          <TabsList>
            <div className="flex ">
              <TabsTrigger value="domain" className="text-zinc-900 text-md ">
                Domain
              </TabsTrigger>
              <TabsTrigger value="pricing" className="text-zinc-900 text-md">
                Pricing & Payment
              </TabsTrigger>
            </div>
          </TabsList>
          <Separator className=" mt-2 bg-gray-700 w-full" />
          <TabsContent value="domain">
            <DomainTab data={data} />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingTab dataa={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfigMain;
