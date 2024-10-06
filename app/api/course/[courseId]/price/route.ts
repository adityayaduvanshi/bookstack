import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { price } = await req.json();
    if (!price) {
      return new NextResponse('Bad Request', { status: 404 });
    }
    const updatedCourse = await db.course.update({
      where: { id: params.courseId },
      data: { price },
    });

    return NextResponse.json('success', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
