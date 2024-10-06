import React from 'react';
import { Icons } from '@/components/icons';
import SubscribeModelFrom from '@/components/forms/subscribe-model-form';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

const page = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: { chapters: true },
  });
  if (!course) {
    return notFound();
  }
  return (
    <div>
      <div className="flex items-center px-3 gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out py-3">
        <Icons.rocket className="size-6 md:hidden lg:flex" />
        <span className="hidden md:flex">{course.title}</span>
      </div>
      <SubscribeModelFrom course={course} />
    </div>
  );
};

export default page;
