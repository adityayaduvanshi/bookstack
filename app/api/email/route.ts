import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend: any = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { html } = await req.json();
    console.log(html);
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['aditya97y@gmail.com'],
      subject: 'Hello world',
      html: html,
    });
    console.log(data);
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
