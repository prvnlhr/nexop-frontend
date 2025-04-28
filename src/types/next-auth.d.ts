import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    fullname: string;
    email: string;
    role: "customer" | "admin";
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      fullname: string;
      email: string;
      role: "customer" | "admin";
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    fullname?: string;
    email?: string;
    role?: "customer" | "admin";
  }
}
