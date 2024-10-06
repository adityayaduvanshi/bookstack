import { updateCourse } from '@/actions/update-course';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

const generateUniqueTitle = async (courseId: string) => {
  let baseTitle = 'Untitled';
  let title = baseTitle;
  let counter = 1;

  while (true) {
    const existingChapter = await db.chapter.findFirst({
      where: {
        courseId,
        title,
      },
    });

    if (!existingChapter) break;

    title = `${baseTitle}-${counter}`;
    counter++;
  }

  return title;
};

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    const { insertPosition } = await req.json();
    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });
    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const title = await generateUniqueTitle(params.courseId);

    // Increase the order of chapters after the insert position
    await db.chapter.updateMany({
      where: {
        courseId: params.courseId,
        order: {
          gte: insertPosition,
        },
      },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    // Create the new chapter
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        order: insertPosition,
        content:
          '<h1>Chapter 1: Introduction</h1><p>This is the <strong>HTML</strong> content for Chapter 1.</p>',
      },
    });
    await updateCourse(params.courseId);
    return NextResponse.json(chapter);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
