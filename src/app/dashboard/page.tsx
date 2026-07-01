"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui";

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/home");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <Spinner />
    </div>
  );
}
