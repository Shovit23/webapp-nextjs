import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../database/dbconfig";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1200, // 5 min
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          return null;
        }
        const validPassword = await bcryptjs.compare(password, user!.password);
        if (!validPassword) {
          return null;
        }

        const roles = await prisma.userRoles.findMany({
          where: { userId: user.id },
          select: { roleName: true }, // Select only the roleName field
        });
        const userRoles = roles.map((role) => role.roleName);

        return {
          id: "${user.id}",
          email: user.email,
          username: user.username,
          role: userRoles
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          role: user.role
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role,
        },
      };
    },
    
  },
};
