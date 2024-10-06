import { createChapter } from '@/actions/chapters';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

interface CourseIdParams {
  params: { courseId: string };
}

const Coursepage = async ({ params }: CourseIdParams) => {
  const user = await getCurrentUser();

  const course = await db.course.findFirst({
    where: { id: params?.courseId },
    include: { chapters: { orderBy: { order: 'asc' } } },
  });
  if (!course) {
    return redirect('/');
  }
  if (!course.chapters[0]) {
    const ss = await createChapter(params.courseId);
  }
  return redirect(`/course/${course.id}/chapters/${course.chapters[0].id}`);
};

export default Coursepage;
