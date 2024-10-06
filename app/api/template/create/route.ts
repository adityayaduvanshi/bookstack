import { getCurrentUser } from '@/actions/user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { json, title, html } = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const template = await db.template.create({
      data: {
        userId: user.id,
        jsonContent: json,
        htmlContent: html,
        title,
      },
    });
    return NextResponse.json(template, { status: 200 });
  } catch (error) {
    console.log('Error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
