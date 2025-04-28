import { cookies } from "next/headers";

interface User {
  id: string;
  email: string;
  fullname: string;
  role: "admin" | "customer";
}

interface UserSession {
  user: User | null;
}

export async function getSession(): Promise<UserSession> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_data")?.value;
    return sessionCookie ? JSON.parse(sessionCookie) : { user: null };
  } catch (error) {
    console.error("Failed to parse session cookie:", error);
    return { user: null };
  }
}

interface ServerClient {
  getSession: () => Promise<UserSession>;
  setSession: (session: UserSession) => void;
}

export async function createServerClient(): Promise<ServerClient> {
  const cookieStore = await cookies();
  return {
    getSession: async (): Promise<UserSession> => {
      try {
        const authToken = cookieStore.get("auth_token")?.value;
        if (!authToken) return { user: null };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/session`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Cookie: `auth_token=${authToken}`,
            },
          }
        );

        const data = await res.json();
        return data.data || { user: null };
      } catch (error) {
        console.error("Session validation error:", error);
        return { user: null };
      }
    },
    setSession: (session: UserSession): void => {
      try {
        cookieStore.set({
          name: "session_data",
          value: JSON.stringify(session),
          httpOnly: false,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24,
        });
      } catch (error) {
        console.error("Failed to set session cookie:", error);
      }
    },
  };
}
