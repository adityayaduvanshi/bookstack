import { updateCourse } from '@/actions/update-course';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { title } = await req.json();
    if (!title) {
      return new NextResponse('Invalid Data', { status: 404 });
    }
    const chapter = await db.chapter.update({
      where: { id: params.chapterId, courseId: params.courseId },
      data: { title: title },
    });
    await updateCourse(params.courseId);
    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
