'use server';

import { LoginSchema, RegisterSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { generateVerificatinToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, name, password } = validatedFields.data;
  const hashPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: 'Email already in use! ' };
  }
  await db.user.create({ data: { name, email, password: hashPassword } });
  const verificationToken = await generateVerificatinToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: 'Confirmation Email sent!' };
};
