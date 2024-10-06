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
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const course = await db.course.findUnique({
      where: { id: params.courseId, userId: user.id },
    });
    if (!course) {
      return new NextResponse('Unauthorized', { status: 404 });
    }
    const publish = await db.course.update({
      where: { id: course.id },
      data: { published: true },
    });

    return NextResponse.json('Published', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
