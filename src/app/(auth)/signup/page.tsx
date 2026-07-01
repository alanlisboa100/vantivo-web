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
import { User, Mail, Lock, Sparkles, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex bg-bg overflow-hidden">
      {/* Left decorative */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-pink/10 rounded-full blur-[150px] orb-animate" />
          <div className="absolute bottom-1/3 -left-20 w-[350px] h-[350px] bg-purple/10 rounded-full blur-[120px] orb-animate" style={{ animationDelay: "-7s" }} />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center max-w-lg">
          <LogoMark size={80} animated />
          <h2 className="text-3xl font-black mt-6 mb-3 bg-gradient-to-r from-pink via-purple to-cyan bg-clip-text text-transparent">Comece sua jornada</h2>
          <p className="text-muted leading-relaxed">
            Crie artes incríveis, edite fotos como um profissional, transforme selfies em anime e muito mais. Tudo com IA.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {["🎨 Geração de Imagens", "📸 Editor de Fotos", "🖼️ Capas & Anúncios", "🌟 Anime Studio"].map((f, i) => (
              <span key={i} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-muted">{f}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative">
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[300px] h-[300px] bg-pink/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 w-[300px] h-[300px] bg-purple/8 rounded-full blur-[100px]" />
        </div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <LogoMark size={48} animated />
            <h1 className="text-2xl font-black mt-3 bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">LISBOA</h1>
          </div>

          <div className="glass-strong rounded-[28px] p-8 border border-white/5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-black">Criar conta</h2>
              <p className="text-sm text-muted mt-1">Preencha os dados para começar</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" icon={<User size={16} />} />
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" icon={<Mail size={16} />} />
              <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" icon={<Lock size={16} />} />

              <Button type="submit" loading={loading} className="w-full" size="lg" glow>
                <Sparkles size={16} />
                {t("auth.signup")}
              </Button>
            </form>

            <Divider className="my-6" />

            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted hover:text-cyan transition-colors font-semibold">
              <ArrowLeft size={14} />
              {t("auth.backToLogin")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
