import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/user';
import TemplateEditor from './_components/template-editio';

interface TemplatePageProps {
  params: {
    courseId: string;
  };
}

const TemplatePage = async ({ params }: TemplatePageProps) => {
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
      <TemplateEditor
        website={website}
        courseId={params.courseId}
        data={course}
      />
    </div>
  );
};

export default TemplatePage;
