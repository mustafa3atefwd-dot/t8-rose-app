import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { REMEMBER_ME_SESSION_MAX_AGE_SECONDS } from "./features/auth/lib/session-policy";

type LoginApiResponse = {
  status: boolean;
  message?: string;
  payload?: {
    token: string;
    user: {
      id: string;
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      photo?: string | null;
    };
  };
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/en/login",
  },
  session: {
    strategy: "jwt",
    maxAge: REMEMBER_ME_SESSION_MAX_AGE_SECONDS,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
        rememberMe: {},
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = (await response.json()) as LoginApiResponse;

        if (!response.ok || !data.status || !data.payload) {
          throw new Error(data.message || "Invalid credentials");
        }

        return {
          id: data.payload.user.id,
          accessToken: data.payload.token,
          rememberMe: credentials?.rememberMe === "true",
          user: data.payload.user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.rememberMe = user.rememberMe;
        token.user = user.user;
      }

      return token;
    },
    async session({ session, token }) {
      session.rememberMe = Boolean(token.rememberMe);
      session.user = token.user;

      return session;
    },
  },
};
