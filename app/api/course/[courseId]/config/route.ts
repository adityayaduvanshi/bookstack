import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { domain } = await req.json();
    const user = await getCurrentUser();
    if (!domain) {
      return new NextResponse('Bad Request', { status: 403 });
    }
    if (!user) {
      return new NextResponse('Unauhorized', { status: 404 });
    }
    const existingDomain = await db.website.findUnique({
      where: { domain },
    });
    if (existingDomain) {
      return NextResponse.json({ available: false }, { status: 200 });
    }
    const courseDetails = await db.course.findUnique({
      where: { id: params.courseId, userId: user.id },
      include: { website: true },
    });
    if (!courseDetails || !courseDetails.website) {
      return new NextResponse('Course or website not found', { status: 404 });
    }
    const updatedWebsite = await db.website.update({
      where: { id: courseDetails.website.id },
      data: { domain },
    });
    return NextResponse.json(
      { available: true, website: updatedWebsite },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
