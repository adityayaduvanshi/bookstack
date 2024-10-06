import React from 'react';
import Navbar from '../_components/navbar';
import Sidebar from '../_components/sidebar'
// import Navbar from '../../_components/navbar';
// import Sidebar from '../../_components/sidebar';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';
import { notFound } from 'next/navigation';

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }
  const course = await db.course.findFirst({
    where: { id: params?.courseId, userId: user?.id },
    include: { chapters: { orderBy: { order: 'asc' } } },
  });
  if (!course) {
    return null;
  }

  return (
    <>
      <div className="  bg-white md:pl-56 fixed  w-full z-50">
        <Navbar data={course} />
      </div>
      <div className="hidden md:flex  w-56 flex-col fixed  z-50">
        <Sidebar data={course} />
      </div>

      <main className="md:pl-56 pt-[56px]">{children}</main>
    </>
  );
};

export default CourseLayout;
