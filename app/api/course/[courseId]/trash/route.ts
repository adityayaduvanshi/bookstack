import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const updateCourse = await db.course.update({
      where: { id: params.courseId, userId: user.id },
      data: { trash: true },
    });
    return NextResponse.json('Success', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}
