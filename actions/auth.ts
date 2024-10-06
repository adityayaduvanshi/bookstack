'use server';
import { db } from '@/lib/db';
import {
  linkOAuthAccountSchema,
  passwordResetSchema,
  passwordUpdateSchemaExtended,
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
  type LinkOAuthAccountInput,
  type PasswordResetFormInput,
  type PasswordUpdateFormInputExtended,
  type SignInWithPasswordFormInput,
  type SignUpWithPasswordFormInput,
} from '@/validations/auth';

export async function linkOAuthAccount(
  rawInput: LinkOAuthAccountInput
): Promise<void> {
  try {
    const validatedInput = linkOAuthAccountSchema.safeParse(rawInput);
    if (!validatedInput.success) return;

    await db.user.update({
      where: {
        id: validatedInput.data.userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error linking OAuth account');
  }
}
