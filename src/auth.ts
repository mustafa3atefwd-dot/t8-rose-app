import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { IApiResponse } from "./shared/lib/types/api";
import { LoginPayload } from "./shared/lib/types/auth";


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login", 
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload: IApiResponse<LoginPayload> = await response.json();
        
        if (!payload.status) {
          throw new Error(payload.message);
        }
        return {
          id: payload.payload?.user.id,
          accessToken: payload.payload?.token,
          user: payload.payload?.user
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  }
};