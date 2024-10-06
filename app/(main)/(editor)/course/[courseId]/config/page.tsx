import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import DomainSettingForm from './_components/mainsection';
import ConfigMain from './_components/config-main';

interface ConfigPageProps {
  params: { courseId: string };
}

const ConfigPage = async ({ params }: ConfigPageProps) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/');
  }
  const course = await db.course.findUnique({
    where: { id: params.courseId, userId: user.id },
  });

  if (!course) {
    return notFound();
  }
  const website = await db.website.findUnique({
    where: { courseId: course.id },
    include: { user: true, course: true },
  });

  if (!website) {
    return notFound();
  }

  // console.log(website?.user.name)

  return (
    <div>
      <ConfigMain data={website}></ConfigMain>
    </div>
  );
};

export default ConfigPage;
