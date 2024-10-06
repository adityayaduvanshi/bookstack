import React, { Suspense } from 'react';
import Navbar from '../../_components/navbar';
import Sidebar from '../../_components/sidebar';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';
import { notFound } from 'next/navigation';
import { LoaderIcon } from 'lucide-react';

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
    where: {
      id: params?.courseId,
      userId: user?.id,
    },
    include: {
      chapters: {
        where: {
          isDeleted: false, // Only include chapters that are not deleted
        },
        orderBy: { order: 'asc' },
      },
    },
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
      <Suspense fallback={<CourseSkeleton />}>
        <main className="md:pl-56 pt-[56px]">{children}</main>
      </Suspense>
    </>
  );
};

export default CourseLayout;
const CourseSkeleton = () => {
  return (
    <div className="h-screen w-screen flex justify-center  items-center">
      <LoaderIcon className=" animate-spin " />
    </div>
  );
};
