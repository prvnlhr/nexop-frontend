import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["customer", "admin"]),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = signInSchema.safeParse(credentials);

          if (!parsedCredentials.success) {
            throw new Error("Invalid credentials format");
          }

          const { email, password, role } = parsedCredentials.data;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/sign-in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, role }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Authentication failed");
          }

          const userResponse = await response.json();

          // Check if user data exists
          if (!userResponse?.data) {
            console.error("No user data in API response");
            return null;
          }

          const userData = userResponse.data;

          return {
            id: userData.id,
            email: userData.email,
            name: userData.fullName,
            fullname: userData.fullName,
            role: userData.role,
            emailVerified: null,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
});
