import React from 'react';
import CourseCard from './course-card';
import LaunchCard from './launch-card';
import { Chapter, Course, User, Website } from '@prisma/client';

interface PublishFormProps {
  data: (Course & { user: User; website: Website; chapters: Chapter }) | any;
  chapterCount: number;
  website: Website | any;
}

const PublishForm = ({ data, chapterCount, website }: PublishFormProps) => {
  return (
    <div className="flex gap-10 p-8">
      <CourseCard data={data} chapterCount={chapterCount}></CourseCard>
      <LaunchCard data={data} chapterCount={chapterCount}></LaunchCard>
    </div>
  );
};

export default PublishForm;
