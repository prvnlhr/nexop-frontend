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
        const token = cookieStore.get("auth_token")?.value;
        if (!token) return { user: null };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/session`,
          {
            headers: { Cookie: `auth_token=${token}` },
          }
        );

        if (!res.ok) {
          throw new Error(
            `Session validation failed with status ${res.status}`
          );
        }

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
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 5, // 5 minutes
        });
      } catch (error) {
        console.error("Failed to set session cookie:", error);
      }
    },
  };
}
