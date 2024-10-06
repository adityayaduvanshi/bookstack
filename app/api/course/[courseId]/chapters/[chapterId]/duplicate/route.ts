import { updateCourse } from '@/actions/update-course';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the user is the owner of the course
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the chapter to be duplicated
    const chapterToDuplicate = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });

    if (!chapterToDuplicate) {
      return new NextResponse('Chapter not found', { status: 404 });
    }

    // Generate a unique title for the duplicated chapter
    const title = await generateUniqueTitle(
      params.courseId,
      chapterToDuplicate.title
    );

    // Increment the order of chapters that are after the duplicated chapter's order
    await db.chapter.updateMany({
      where: {
        courseId: params.courseId,
        order: {
          gt: chapterToDuplicate.order,
        },
      },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    // Create the duplicated chapter with the incremented order
    const duplicatedChapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        order: chapterToDuplicate.order + 1,
        content: chapterToDuplicate.content,
        htmlContent: chapterToDuplicate.htmlContent,
        jsonContent: chapterToDuplicate.jsonContent
          ? chapterToDuplicate.jsonContent
          : [],
      },
    });
    await updateCourse(params.courseId);
    return NextResponse.json(duplicatedChapter);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

async function generateUniqueTitle(
  courseId: string,
  baseTitle: string
): Promise<string> {
  let title = `${baseTitle} (Copy)`;
  let suffix = 1;
  let exists = true;

  while (exists) {
    const existingChapter = await db.chapter.findFirst({
      where: {
        title: title,
        courseId: courseId,
      },
    });

    if (!existingChapter) {
      exists = false;
    } else {
      title = `${baseTitle} (Copy ${suffix})`;
      suffix++;
    }
  }

  return title;
}
