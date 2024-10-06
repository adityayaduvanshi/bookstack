import { updateCourse } from '@/actions/update-course';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    const { title, content } = await req.json();
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

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        order: 'desc',
      },
    });
    console.log('last pos', lastChapter);
    const newPosition = lastChapter ? lastChapter.order + 1 : 1;
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        order: newPosition,
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
