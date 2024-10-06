import { db } from '@/lib/db';

import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/user';
import GrapeJsEditor from './_components/grapejs-editor';
import InfoAlert from './_components/info-alert';

interface WebsitePageProps {
  params: {
    courseId: string;
  };
}

const WebsitePage = async ({ params }: WebsitePageProps) => {
  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }
  const course = await db.course.findUnique({
    where: { id: params.courseId },
  });
  if (!course) {
    return notFound();
  }
  if (course.userId !== user.id) {
    redirect('/');
  }
  const website = await db.website.findUnique({
    where: { courseId: course.id },
  });

  return (
    <div>
      <InfoAlert></InfoAlert>

      <GrapeJsEditor
        website={website}
        courseId={params.courseId}
        data={course}
      />
      {/* <CustomEditor /> */}
    </div>
  );
};

export default WebsitePage;
