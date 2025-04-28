"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

interface AuthenticateResponse {
  success?: boolean;
  message?: string;
  error?: {
    message: string;
    details?: string;
  };
}

type Credentials = {
  email: string;
  password: string;
  role: "customer" | "admin";
};

export async function authenticate(
  formData: Credentials
): Promise<AuthenticateResponse> {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      redirect: false,
    });
    return { success: true, message: "Login successful" };
  } catch (err: unknown) {
    console.error("Authenticate error:", err);

    if (err instanceof AuthError) {
      return { error: { message: err.message } };
    }

    if (err instanceof Error) {
      return {
        error: {
          message: "Failed to login",
          details: err.message,
        },
      };
    }

    return {
      error: {
        message: "Failed to login",
        details: "Unknown error occurred",
      },
    };
  }
}
