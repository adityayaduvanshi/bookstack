import React from 'react';

// import Sidebar from '../../_components/sidebar';
import Sidebar from '../publish/_components/sidebar'

import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/user';
import { notFound } from 'next/navigation';
import Navbar from '../_components/navbar';

const ConfigLayout = async ({
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
    return notFound();
  }

  return (
    <>
      <div className=" h-[66px] bg-white md:pl-56 fixed  w-full z-50">
        <Navbar data={course} />
      </div>
      <div className="hidden md:flex  w-56 flex-col fixed inset-y-0 z-50">
         <Sidebar  /> 
        
      </div>

      <main className="md:pl-56 pt-[56px]">{children}</main>
    </>
  );
};

export default ConfigLayout;
