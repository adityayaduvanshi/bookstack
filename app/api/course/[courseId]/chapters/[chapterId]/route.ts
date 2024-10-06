import { updateCourse } from '@/actions/update-course';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { htmlContent, jsonContent, title, preview } = await req.json();
    if (!htmlContent || !jsonContent) {
      return new NextResponse('Invalid Data', { status: 404 });
    }
    const currentData = await db.chapter.findUnique({
      where: { id: params.chapterId, courseId: params.courseId },
    });
    if (!currentData) {
      return new NextResponse('Chapter not found', { status: 404 });
    }
    const updatedTitle = title || currentData.title;
    const updatedPreview = preview || currentData.previewText;
    const data = await db.chapter.update({
      where: { id: params.chapterId, courseId: params.courseId },
      data: {
        jsonContent,
        htmlContent,
        title: updatedTitle,
        previewText: updatedPreview,
      },
    });
    await updateCourse(params.courseId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Something went wrong!', { status: 500 });
  }
}

// DELETE CHAPTER
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 405 });
    }
    if (!params.chapterId || !params.courseId) {
      return new NextResponse('Bad Request', { status: 404 });
    }
    const creator = await db.user.findUnique({ where: { id: user.id } });
    if (!creator) {
      return new NextResponse('Not authorized', { status: 402 });
    }
    const chapter = await db.chapter.delete({
      where: { id: params.chapterId, courseId: params.courseId },
    });
    // await db.courseHistory.create({
    //   data: {
    //     courseId: params.courseId,
    //     chapterId: params.chapterId,
    //     action: 'DELETE',
    //     performedBy: user.id,
    //     details: 'Permanent delete',
    //   },
    // });
    await updateCourse(params.courseId);
    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
