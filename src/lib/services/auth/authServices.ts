const BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://nexop-backend.onrender.com";

interface SignUpPayload {
  fullname: string;
  email: string;
  password: string;
  role: "customer" | "admin";
}

interface SignInPayload {
  email: string;
  password: string;
  role: "customer" | "admin";
}

interface ApiResponse<T> {
  status: number;
  data: T | null;
  error: string | null;
  message?: string | null;
}
export async function signUp(
  payload: SignUpPayload
): Promise<
  ApiResponse<{ id: string; fullName: string; email: string; role: string }>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Sign-up Error:", result.error || result.message);
      // Pass through the server error message directly
      throw new Error(result.error || result.message || "Failed to sign up");
    }

    console.log("Sign-up Success:", result.message);
    return result;
  } catch (error) {
    const err = error as Error;
    console.error("Sign-up Error:", error);
    // For network errors or other unexpected errors
    if (err.message.includes("Failed to fetch")) {
      throw new Error("Network error. Please check your connection.");
    }
    throw err; // Re-throw the original error to preserve the message
  }
}

export async function signIn(
  payload: SignInPayload
): Promise<
  ApiResponse<{ id: string; fullName: string; email: string; role: string }>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Sign-in Error:", result.error || result.message);
      // Pass through the server error message directly
      throw new Error(result.error || result.message || "Failed to sign in");
    }

    console.log("Sign-in Success:", result.message);
    return result;
  } catch (error) {
    const err = error as Error;
    console.error("Sign-in Error:", error);
    // For network errors or other unexpected errors
    if (err.message.includes("Failed to fetch")) {
      throw new Error("Network error. Please check your connection.");
    }
    throw err; // Re-throw the original error to preserve the message
  }
}
export async function signOut(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-out`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      const result = await response.json();
      console.error("Sign-out Error:", result.error || result.message);
      throw new Error(result.error || result.message || "Failed to sign out");
    }

    console.log("Sign-out Success");
  } catch (error) {
    const err = error as Error;
    console.error("Sign-out Error:", error);
    throw new Error(`Failed to sign out: ${err.message}`);
  }
}
