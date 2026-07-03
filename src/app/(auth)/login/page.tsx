"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { Button, Input, Divider, Card } from "@/components/ui/barrel";
import { LogoWordmark, PremiumBadge, IconTile } from "@/components/brand";
import { Sparkles, Mail, Lock, Eye, EyeOff, Zap, ArrowRight, Chrome } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { t } = useI18n();
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha email e senha.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Bem-vindo de volta!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      toast.error(err?.message || "Erro com Google");
      setGoogleLoading(false);
    }
  };

  return (
    <>
      {/* Mobile logo */}
      <div className="lg:hidden text-center mb-8">
        <LogoWordmark size={32} animated />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <PremiumBadge className="mb-4" icon={<Zap size={11} />}>Entrar na sua conta</PremiumBadge>
        <h1 className="text-2xl sm:text-3xl font-black mb-1.5">
          Bem-vindo de volta 👋
        </h1>
        <p className="text-sm text-muted mb-7">
          Entre pra continuar criando com IA.
        </p>

        <Card className="p-6 sm:p-7" glow="none" hover={false}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              autoComplete="email"
            />
            <Input
              label="Senha"
              type={showPw ? "text" : "password"}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="hover:text-cyan transition-colors"
                  aria-label={showPw ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-panel text-cyan focus:ring-cyan/20" />
                Lembrar de mim
              </label>
              <Link href="/reset-password" className="text-cyan hover:underline font-semibold">
                Esqueci a senha
              </Link>
            </div>

            <Button type="submit" loading={loading} fullWidth size="lg" glow leftIcon={<Zap size={16} />}>
              Entrar
            </Button>
          </form>

          <Divider label="ou continue com" className="my-5" />

          <Button
            variant="secondary"
            fullWidth
            size="lg"
            loading={googleLoading}
            onClick={handleGoogle}
            leftIcon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            }
          >
            Google
          </Button>
        </Card>

        <p className="text-center mt-6 text-sm text-muted">
          Não tem conta?{" "}
          <Link href="/signup" className="text-cyan hover:underline font-bold">
            Criar agora <ArrowRight size={12} className="inline" />
          </Link>
        </p>

        <p className="text-center mt-5 text-[10px] text-dim">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="hover:text-muted">Termos</a> e{" "}
          <a href="#" className="hover:text-muted">Privacidade</a>.
        </p>
      </motion.div>
    </>
  );
}
