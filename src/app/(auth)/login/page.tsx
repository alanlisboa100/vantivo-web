"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { Button, Input, Divider } from "@/components/ui";
import { LogoMark } from "@/components/brand";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Sparkles, Palette, Image, Camera, Brain, Zap } from "lucide-react";

const showcases = [
  { icon: Sparkles, text: "Gere imagens com IA", color: "from-cyan/30 to-purple/30" },
  { icon: Palette, text: "Transforme fotos em arte", color: "from-pink/30 to-purple/30" },
  { icon: Image, text: "Crie capas profissionais", color: "from-blue/30 to-cyan/30" },
  { icon: Camera, text: "Edite com comandos", color: "from-green/30 to-cyan/30" },
  { icon: Brain, text: "Assistente inteligente", color: "from-purple/30 to-pink/30" },
];

export default function LoginPage() {
  const { t } = useI18n();
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-bg overflow-hidden">
      {/* ─── Left Side: Visual Showcase ─── */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[150px] orb-animate" />
          <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] bg-cyan/10 rounded-full blur-[120px] orb-animate" style={{ animationDelay: "-7s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue/5 rounded-full blur-[180px] orb-animate" style={{ animationDelay: "-14s" }} />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <LogoMark size={72} animated />
              </div>
            </div>
            <h1 className="text-4xl font-black mb-3">
              <span className="bg-gradient-to-r from-cyan via-blue to-purple bg-clip-text text-transparent">
                LISBOA
              </span>
            </h1>
            <p className="text-lg text-muted mb-10">Creative Studio AI — Sua criatividade, potencializada por inteligência artificial.</p>
          </motion.div>

          <div className="space-y-4">
            {showcases.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <item.icon size={22} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-left text-muted group-hover:text-text transition-colors">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Right Side: Login Form ─── */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative">
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[300px] h-[300px] bg-purple/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[300px] h-[300px] bg-cyan/8 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <LogoMark size={48} animated />
            <h1 className="text-2xl font-black mt-3 bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">LISBOA</h1>
          </div>

          {/* Glass form */}
          <div className="glass-strong rounded-[28px] p-8 border border-white/5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-black">{t("auth.welcome")}</h2>
              <p className="text-sm text-muted mt-1">{t("auth.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
              />
              <Input
                label="Senha"
                type={showPw ? "text" : "password"}
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
              />

              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-xs text-dim hover:text-muted transition-colors">
                  {showPw ? "Esconder senha" : "Mostrar senha"}
                </button>
                <Link href="/reset-password" className="text-xs text-cyan hover:underline font-semibold">
                  {t("auth.forgotPassword")}
                </Link>
              </div>

              <Button type="submit" loading={loading} className="w-full" size="lg" glow>
                <Zap size={16} />
                {t("auth.login")}
              </Button>
            </form>

            <Divider label={t("auth.or")} className="my-6" />

            <Button variant="secondary" className="w-full" size="lg" onClick={loginWithGoogle}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t("auth.continueWithGoogle")}
            </Button>

            <p className="text-center mt-6 text-sm text-muted">
              {t("auth.noAccount")}{" "}
              <Link href="/signup" className="text-cyan hover:underline font-semibold">
                {t("auth.signup")}
              </Link>
            </p>
          </div>

          <p className="text-center mt-6 text-[11px] text-dim">
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
