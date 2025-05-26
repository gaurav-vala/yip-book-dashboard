"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authToken = Cookies.get("auth-token");
    if (authToken) {
      // If authenticated, redirect to dashboard
      router.replace("/dashboard");
    } else {
      // If not authenticated, redirect to login
      router.replace("/login");
    }
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="animate-pulse">Redirecting...</div>
    </div>
  );
}
