'use client';

import { Chapter, Course } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MasterHeader from './master-header';
import MasterFooter from './master-footer';
interface CustomMasterProps {
  course: Course;
}

const MasterTemplateContainer = ({ course }: CustomMasterProps) => {
  return (
    <div className="px-4 mt-6 h-full overflow-y-hidden">
      <Tabs defaultValue="header">
        <TabsList>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>
        <TabsContent value="header">
          <MasterHeader course={course} />
        </TabsContent>
        <TabsContent value="footer">
          <MasterFooter course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MasterTemplateContainer;
