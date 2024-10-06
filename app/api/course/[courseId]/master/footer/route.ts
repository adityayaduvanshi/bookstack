import { db } from '@/lib/db';
import { applyFooter } from '@/lib/editor';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { footerJsonContent } = await req.json();

    if (!footerJsonContent) {
      return new NextResponse('Bad Request', { status: 404 });
    }
    const updateheader = await db.course.update({
      where: { id: params.courseId },
      data: {
        footerJson: footerJsonContent,
      },
    });
    const chapters = await db.chapter.findMany({
      where: { courseId: params.courseId },
    });
    for (const chapter of chapters) {
      const updatedJsonContent = applyFooter(
        chapter.jsonContent,
        footerJsonContent
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
