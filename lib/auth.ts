import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { db } from './db';
import { linkOAuthAccount } from '@/actions/auth';
import { getUserById } from '@/actions/user';
import authConfig from './auth.config';
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 daysd
    updateAge: 24 * 60 * 60,
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) await linkOAuthAccount({ userId: user.id });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;
      const existingUser = await db.user.findUnique({
        where: { id: user.id },
      });
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  // callbacks: {
  //   async signIn({ user, account }) {
  //     if (!user.id) return false;
  //     if (account?.provider !== 'credentials') return true;

  //     const existingUser = await getUserById({ id: user.id });

  //     return !existingUser?.emailVerified ? false : true;
  //   },
  // },
  ...authConfig,
});
// providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     allowDangerousEmailAccountLinking: true,
//   }),
// ],
