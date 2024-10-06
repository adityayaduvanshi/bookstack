'use server';

import { LoginSchema } from '@/schemas';
import { z } from 'zod';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { db } from '@/lib/db';
import { generateVerificatinToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';
export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await db.user.findUnique({ where: { email: email } });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificatinToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: 'Confirmation email sent!' };
  }
  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials!' };
        default:
          return {
            error: 'Something went wrong!',
          };
      }
    }
    throw error;
  }
};
