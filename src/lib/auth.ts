import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async createUser({ user }) {
      // Auto-assign SUPER_ADMIN role to the configured email
      const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
      if (superAdminEmail && user.email === superAdminEmail) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "SUPER_ADMIN" },
        });
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true, id: true },
      });
      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
