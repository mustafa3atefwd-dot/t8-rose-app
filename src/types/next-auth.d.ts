import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    rememberMe?: boolean;
    user?: DefaultSession["user"] & {
      id?: string;
      username?: string;
      firstName?: string;
      lastName?: string;
      photo?: string | null;
    };
  }

  interface User {
    accessToken?: string;
    rememberMe?: boolean;
    user?: Session["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    rememberMe?: boolean;
    user?: import("next-auth").Session["user"];
  }
}
