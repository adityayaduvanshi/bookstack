import { updateCourse } from '@/actions/update-course';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const chapter = await db.chapter.findUnique({
      where: { courseId: params.courseId, id: params.chapterId },
    });
    if (!chapter) {
      return new NextResponse('Chapter not found', { status: 404 });
    }
    const moveChaptertoTrash = await db.chapter.update({
      where: { id: chapter.id },
      data: {
        isDeleted: false,
        deletedAt: new Date(),
      },
    });
    await db.courseHistory.create({
      data: {
        courseId: chapter.courseId,
        chapterId: moveChaptertoTrash.id,
        action: 'RESTORE',
        details: { reason: 'Restored' },
        performedBy: currentUser.id,
      },
    });
    await updateCourse(params.courseId);
    return NextResponse.json(moveChaptertoTrash, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error soft deleting chapter' },
      { status: 500 }
    );
  }
}
