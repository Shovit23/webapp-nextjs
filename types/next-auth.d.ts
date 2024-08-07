import NextAuth from "next-auth";
import internal from "stream";

declare module "next-auth" {
  interface User {
    username: string;
    role: Array
  }
  interface Session {
    user: User & {
      username: string;
      role: Array
    };
    token: {
      username: string;
      role: Array
    };
  }
}
