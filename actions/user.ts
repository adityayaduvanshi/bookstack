import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  GetUserByEmailInput,
  getUserByEmailSchema,
  GetUserByIdInput,
  getUserByIdSchema,
} from '@/validations/user';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

export async function getUserById(
  rawInput: GetUserByIdInput
): Promise<User | null> {
  try {
    const validatedInput = getUserByIdSchema.safeParse(rawInput);
    if (!validatedInput.success) return null;

    return await db.user.findUnique({
      where: {
        id: validatedInput.data.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user by Id');
  }
}
export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user by email');
  }
}

export const getCurrentUser = async () => {
  try {
    const session = await auth();
    if (!session?.user.email) return null;
    return await db.user.findUnique({ where: { email: session?.user.email } });
  } catch (error) {
    console.log(error);
  }
};
