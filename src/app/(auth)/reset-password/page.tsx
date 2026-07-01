"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/contexts/I18nContext";
import { Button, Input } from "@/components/ui";
import { LogoWordmark, NeonBackdrop } from "@/components/brand";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/callback`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao enviar");
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
          <h1 className="text-2xl font-black">{t("auth.resetPassword")}</h1>
        </div>

        {sent ? (
          <div className="text-center">
            <p className="text-green mb-4">E-mail enviado! Verifique sua caixa de entrada.</p>
            <Link href="/login">
              <Button variant="secondary">{t("auth.backToLogin")}</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label={t("auth.email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              {t("auth.resetPassword")}
            </Button>
          </form>
        )}

        <p className="text-center mt-6 text-sm text-muted">
          <Link href="/login" className="text-cyan hover:underline font-semibold">
            {t("auth.backToLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}
