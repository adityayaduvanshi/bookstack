import { getVerifationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
export const generateVerificatinToken = async (email: string) => {
  const token = uuidv4();
  //  Valid for  ONE HOUR
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerifationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
