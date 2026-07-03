"use client";

import { Spinner } from "@/components/ui/barrel";

export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-3">
          <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full animate-pulse" />
          <Spinner size="lg" />
        </div>
        <p className="text-sm text-muted">Carregando...</p>
      </div>
    </div>
  );
}
