import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCurrentUser, getUserByEmail } from '@/actions/user';
export async function POST(req: Request) {
  const session = await auth();

  try {
    const { title, description } = await req.json();

    if (!session?.user.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!title) {
      return new NextResponse('Bad Request', { status: 404 });
    }
    const currentUser = await getUserByEmail(session?.user.email);

    const userId = currentUser?.id;

    if (!userId) {
      return new NextResponse('Invalid User', { status: 403 });
    }
    if (!currentUser.name) {
      return new NextResponse('Invalid User', { status: 403 });
    }
    const user = await getCurrentUser();
    const courses = await db.course.findMany({ where: { userId: userId } });
    const sanitizedCreator = currentUser.name.toLowerCase().replace(/\s+/g, '');
    if (!courses) {
      await db.user.update({
        where: { id: userId },
        data: {
          replyTo: user?.email,
          senderName: user?.name,
          creatorName: sanitizedCreator,
        },
      });
    }

    const createCourse = await db.course.create({
      data: {
        title,
        description,
        userId: userId,
        creator: sanitizedCreator,

        chapters: {
          create: [
            {
              title: 'Introduction',

              content:
                '<h1>Chapter 1: Introduction</h1><p>This is the <strong>HTML</strong> content for Chapter 1.</p>',
            },
          ],
        },
      },
    });
    return NextResponse.json(createCourse);
  } catch (error) {
    console.log(error);
    return new NextResponse('[COURSE_CREATE]:Internal Error', { status: 500 });
  }
}
