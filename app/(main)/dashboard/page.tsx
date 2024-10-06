import { getCurrentUser } from '@/actions/user';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { db } from '@/lib/db';
import { DataTable } from '@/components/dashboard/dataTable';
import { courseColumn } from '@/components/dashboard/columns';

const DashboardPage = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/');
  }
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/');
  }
  const getUserCouses = await db.course.findMany({
    where: { userId: user.id, trash: false },
    include: {
      website: true,
      _count: {
        select: { subscriber: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className=" h-full ">
      <DashboardHeader />
      <DataTable columns={courseColumn} data={getUserCouses} />
    </div>
  );
};

export default DashboardPage;
