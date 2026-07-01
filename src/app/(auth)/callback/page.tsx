"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push("/dashboard");
      else router.push("/login");
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="animate-spin h-8 w-8 rounded-full border-2 border-cyan border-t-transparent" />
    </div>
  );
}
