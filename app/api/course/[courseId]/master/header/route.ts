import { db } from '@/lib/db';
import { applyHeader } from '@/lib/editor';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { headerJsonContent } = await req.json();

    if (!headerJsonContent) {
      return new NextResponse('Bad Request', { status: 404 });
    }
    const updateheader = await db.course.update({
      where: { id: params.courseId },
      data: {
        headerJson: headerJsonContent,
      },
    });
    const chapters = await db.chapter.findMany({
      where: { courseId: params.courseId },
    });
    for (const chapter of chapters) {
      const updatedJsonContent = applyHeader(
        chapter.jsonContent,
        headerJsonContent
      );
      await db.chapter.update({
        where: { id: chapter.id },
        data: { jsonContent: updatedJsonContent },
      });
    }
    return NextResponse.json(
      { message: 'Header and footer updated and chapters updated' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse('Something went wrong!', { status: 500 });
  }
}
