import { db } from '@/lib/db';
import CustomEmailEditor from './_components/email-editor';
import Editor from '../../../../../../../components/tiptap-editor';

interface ChapterPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const Chapterpage = async ({ params }: ChapterPageProps) => {
  const chapter = await db.chapter.findFirst({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
      isDeleted: false,
    },
    include: { course: true },
  });
  return (
    <>
      {/* <Button onClick={sednEm}>Send</Button> */}
      {/* <CustomEmailEditor
        courseId={params.courseId}
        chapterId={params.chapterId}
        data={chapter}
      /> */}

      <Editor
        courseId={params.courseId}
        chapterId={params.chapterId}
        data={chapter}
      />
    </>
  );
};

export default Chapterpage;
