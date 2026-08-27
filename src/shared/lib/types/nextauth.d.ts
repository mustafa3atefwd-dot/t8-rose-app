import { IUser } from "./auth";

declare module "next-auth" {
  interface User {
    user:IUser;
    accessToken: string;
    rememberMe?: boolean;
  }

  interface Session {
    user: IUser;
    rememberMe?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user:IUser;
    accessToken: string;
    rememberMe?: boolean;
  }
}