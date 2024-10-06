import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import PublishForm from './_components/publish-form';

interface PublishPageProps {
  params: { courseId: string };
}

const PublishPage = async ({ params }: PublishPageProps) => {
  const user = await getCurrentUser();
  if (!user?.email) {
    return redirect('/');
  }
  const course = await db.course.findUnique({
    where: { id: params.courseId, userId: user.id },
    include: { user: true, website: true, chapters: true },
  });

  const chapterCount = await db.chapter.count({
    where: { courseId: params.courseId, isDeleted: false },
  });

  if (!course) {
    return notFound();
  }
  const website = await db.website.findUnique({
    where: { courseId: course.id },
  });

  return (
    <div>
      {/* <PublishForm data={course} website={website} courseId={course.id}/> */}
      <PublishForm
        data={course}
        website={website}
        chapterCount={chapterCount}
      />
    </div>
  );
};

export default PublishPage;
