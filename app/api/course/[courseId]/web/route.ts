import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { htmlContent, cssContent } = await req.json();
    const user = await getCurrentUser();
    if (!htmlContent || !cssContent) {
      return new NextResponse('Bad request', { status: 403 });
    }
    if (!user) {
      return new NextResponse('Unauthorized', { status: 404 });
    }
    const courseDetails = await db.course.findUnique({
      where: { id: params.courseId, userId: user.id },
    });
    if (!courseDetails) {
      return new NextResponse('Create a course first', { status: 403 });
    }
    const existingWebsite = await db.website.findFirst({
      where: { userId: user.id, courseId: params.courseId },
    });
    if (existingWebsite) {
      const updateWebsite = await db.website.update({
        where: { id: existingWebsite.id },
        data: {
          draftHtmlContent: htmlContent,
          draftCssContent: cssContent,
        },
      });
    } else {
      const website = await db.website.create({
        data: {
          courseId: params.courseId,
          userId: user.id,
          siteTitle: courseDetails.title,
          draftHtmlContent: htmlContent,
          draftCssContent: cssContent,
          domain: courseDetails.title.toLowerCase().replaceAll(' ', ''),
          htmlContent: htmlContent,
        },
      });
    }
    return NextResponse.json('Success', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}
