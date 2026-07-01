"use client";

import { DashboardLayout } from "@/components/layout/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
