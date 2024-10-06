// import convertToHtml from '@/lib/editorjs-to-html';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ChapterEmail } from '@/components/email-templates/chapter-email';
import Email from './_components/email';
import React from 'react';
import { db } from '@/lib/db';
const resend = new Resend('re_45q8c2za_9wbjdc3eL2QehJr4W8AZfVvN');

export async function POST(req: Request) {
  try {
    const { content, chapterId } = await req.json();
    // const htmlContent = convertToHtml(content).join('');

    if (!content) {
      return new NextResponse('Bad Request', { status: 404 });
    }
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
      include: { course: true },
    });

    if (!chapter) {
      return new NextResponse('Chapter not found', { status: 404 });
    }
    const course = chapter.course;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['mrinmayee.sarkar23@gmail.com'],
      subject: chapter.title,
      react: React.createElement(Email, {
        content: content,
        course: course,
        chapter: chapter,
      }),
    });
    console.log(data, content);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}
