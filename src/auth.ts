import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { BACKEND_URL } from "./shared/lib/constants/api.constant";
import { IApiResponse } from "./shared/lib/types/api";
import { LoginPayload } from "./shared/lib/types/auth";

const loginEndpoint = `${BACKEND_URL}/auth/login`;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
        rememberMe: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(loginEndpoint, {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload: IApiResponse<LoginPayload> = await response.json();

        if (!payload.status) {
          throw new Error(payload.message);
        }

        const user = payload.payload?.user;
        const accessToken = payload.payload?.token;

        if (!user || !accessToken) {
          throw new Error("Invalid login response");
        }

        return {
          id: user.id,
          accessToken,
          rememberMe: credentials?.rememberMe === "true",
          user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.accessToken;
        token.rememberMe = Boolean(user.rememberMe);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.rememberMe = Boolean(token.rememberMe);
      }
      return session;
    },
  },
};
