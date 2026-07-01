"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/contexts/I18nContext";
import { Button, Input } from "@/components/ui";
import { LogoWordmark, NeonBackdrop } from "@/components/brand";
import { toast } from "sonner";

function OtpForm() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "signup",
      });
      if (error) throw error;
      toast.success("Conta criada com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-bg">
      <NeonBackdrop />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <LogoWordmark size={40} className="justify-center mb-4" />
          <h1 className="text-2xl font-black">{t("common.confirm")}</h1>
          <p className="text-muted text-sm mt-2">Digite o código enviado para <strong className="text-text">{email}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label={t("auth.code")}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
            maxLength={6}
            className="text-center text-2xl tracking-[0.5em] font-mono"
          />
          <Button type="submit" loading={loading} className="w-full" size="lg">
            {t("auth.sendCode")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-cyan border-t-transparent" />
      </div>
    }>
      <OtpForm />
    </Suspense>
  );
}
