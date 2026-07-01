import { IUser } from "./auth";

declare module "next-auth" {
  interface User {
    user:IUser;
    accessToken: string;
  }

  interface Session {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user:IUser;
    accessToken: string;
  }
}