import { updateCourse } from '@/actions/update-course';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { header, footer } = await req.json();

    const course = await db.course.update({
      where: { id: params.courseId },
      data: { headerJson: header, footerJson: footer },
    });
    await updateCourse(params.courseId);
    return NextResponse.json('Success', { status: 200 });
  } catch (error) {
    console.error('Error updating course social media links:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
