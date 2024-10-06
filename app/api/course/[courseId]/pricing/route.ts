import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { isCourseFree, productId, lemonApiKey } = await req.json();

    const course = await db.course.update({
      where: { id: params.courseId },
      data: {
        isCourseFree: isCourseFree,
        productID: productId,
      },
    });

    if (lemonApiKey) {
      await db.user.update({
        where: { id: user.id },
        data: { lemonApiKey: lemonApiKey },
      });
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error updating course pricing:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}