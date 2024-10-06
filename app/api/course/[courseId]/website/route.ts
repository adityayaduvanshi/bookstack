import { updateCourse } from '@/actions/update-course';
import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

function generateRandomString(length: number): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    const { htmlContent, jsonContent } = await req.json();
    if (!htmlContent || !jsonContent) {
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
    const randomString = generateRandomString(6);
    const domain = `${courseDetails.title.toLowerCase()}${randomString}`;
    if (existingWebsite) {
      const updateWebsite = await db.website.update({
        where: { id: existingWebsite.id },
        data: {
          htmlContent,
          jsonContent,
        },
      });
    } else {
      const website = await db.website.create({
        data: {
          courseId: params.courseId,
          userId: user.id,
          siteTitle: courseDetails.title,
          htmlContent,
          jsonContent,
          domain,
        },
      });
    }
    await updateCourse(params.courseId);
    return NextResponse.json('Success', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
