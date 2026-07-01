"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { Button, Input } from "@/components/ui";
import { LogoWordmark, NeonBackdrop } from "@/components/brand";
import { toast } from "sonner";

export default function SignupPage() {
  const { t } = useI18n();
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setLoading(true);
    try {
      await signup(name, email, password);
      toast.success("Código enviado! Verifique seu e-mail.");
      router.push(`/otp?email=${encodeURIComponent(email)}&purpose=signup`);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao criar conta");
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
          <h1 className="text-2xl font-black">{t("auth.signup")}</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label={t("auth.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
          <Input
            label={t("auth.email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
          <Input
            label={t("auth.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
          />
          <Button type="submit" loading={loading} className="w-full" size="lg">
            {t("auth.signup")}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-muted">
          <Link href="/login" className="text-cyan hover:underline font-semibold">
            {t("auth.backToLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}
