import React from 'react';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';
import { notFound, redirect } from 'next/navigation';
import Footer from './_components/footer';
import Header from './_components/header';

interface HeaderFooterPageProps {
  params: {
    courseId: string;
  };
}

const HeaderFooterPage = async ({ params }: HeaderFooterPageProps) => {
  const user = await getCurrentUser();
  if (!user?.email) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId, userId: user.id },
  });

  if (!course) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen pb-10">
      <Header courseID={params.courseId} course={course} />
      <Footer courseID={params.courseId} course={course} />
    </div>
  );
};

export default HeaderFooterPage;
