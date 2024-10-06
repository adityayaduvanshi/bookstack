import { db } from '@/lib/db';
import MasterTemplateEditor from './_components/master-template';
import MasterTemplateContainer from './_components/master-template-container';
import { notFound, redirect } from 'next/navigation';
interface ChapterProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const MasterTemplate = async ({ params }: ChapterProps) => {
  const chapter = await db.chapter.findFirst({
    where: { id: params.chapterId, courseId: params.courseId },
    include: { course: true },
  });

  const course = await db.course.findUnique({
    where: {
      id: params.chapterId,
    },
  });
  if (!course) {
    return notFound();
  }
  return (
    <>
      {/* <Button onClick={sednEm}>Send</Button> */}
      {/* <MasterTemplateEditor  /> */}
      <MasterTemplateContainer course={course} />
    </>
  );
};

export default MasterTemplate;
