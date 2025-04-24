"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface User {
  id: string;
  email: string;
  fullname: string;
  role: "admin" | "customer";
}

interface Session {
  user: User | null;
}

export function useSession(): Session {
  const [session, setSession] = useState<Session>({ user: null });
  const pathname = usePathname();

  useEffect(() => {
    const getSessionFromCookies = (): Session => {
      try {
        const sessionCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("session_data="))
          ?.split("=")[1];

        if (!sessionCookie) {
          return { user: null };
        }

        const decoded = decodeURIComponent(sessionCookie);
        const parsed = JSON.parse(decoded) as Session;

        // Validate the session structure
        if (parsed.user && typeof parsed.user === "object") {
          return parsed;
        }
        return { user: null };
      } catch (error) {
        console.error("Error parsing session cookie:", error);
        return { user: null };
      }
    };

    const checkSession = () => {
      const currentSession = getSessionFromCookies();
      setSession(currentSession);
    };

    // Initial check
    checkSession();

    // Set up polling
    const interval = setInterval(checkSession, 30000);
    return () => clearInterval(interval);
  }, [pathname]);

  return session;
}
