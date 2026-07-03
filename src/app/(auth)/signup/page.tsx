"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { Button, Input, Divider, Card } from "@/components/ui/barrel";
import { LogoWordmark, PremiumBadge, IconTile } from "@/components/brand";
import { Sparkles, Mail, Lock, User, ArrowRight, Zap, Gift, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const PERKS = [
  "Pontos grátis pra começar",
  "Acesso a 12+ ferramentas IA",
  "Histórico ilimitado de criações",
];

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
    if (!name || !email || !password) {
      toast.error("Preencha todos os campos.");
      return;
    }
    if (password.length < 6) {
      toast.error("A senha precisa ter no mínimo 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password);
      toast.success("Conta criada! Verifique seu email.");
      router.push(`/otp?email=${encodeURIComponent(email)}&purpose=signup`);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lg:hidden text-center mb-8">
        <LogoWordmark size={32} animated />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <PremiumBadge className="mb-4" variant="purple" icon={<Gift size={11} />}>
          Grátis pra começar
        </PremiumBadge>
        <h1 className="text-2xl sm:text-3xl font-black mb-1.5">
          Crie sua conta
        </h1>
        <p className="text-sm text-muted mb-5">
          Em segundos você começa a criar com IA.
        </p>

        {/* Perks */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-br from-cyan/5 via-purple/5 to-pink/5 border border-cyan/10">
          <div className="space-y-1.5">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-xs text-muted">
                <div className="w-4 h-4 rounded-full bg-green/20 flex items-center justify-center shrink-0">
                  <Check size={10} className="text-green" />
                </div>
                {perk}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-6 sm:p-7" glow="none" hover={false}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como você quer ser chamado"
              icon={<User size={16} />}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              icon={<Mail size={16} />}
              autoComplete="email"
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              icon={<Lock size={16} />}
              hint="Use letras, números e um caractere especial pra mais segurança"
              autoComplete="new-password"
            />

            <Button type="submit" loading={loading} fullWidth size="lg" glow leftIcon={<Sparkles size={16} />}>
              Criar conta grátis
            </Button>
          </form>

          <p className="text-[10px] text-dim text-center mt-4 leading-relaxed">
            Ao criar conta, você concorda com nossos{" "}
            <a href="#" className="hover:text-muted underline">Termos</a> e{" "}
            <a href="#" className="hover:text-muted underline">Política de Privacidade</a>.
          </p>
        </Card>

        <p className="text-center mt-6 text-sm text-muted">
          Já tem conta?{" "}
          <Link href="/login" className="text-cyan hover:underline font-bold">
            Entrar <ArrowRight size={12} className="inline" />
          </Link>
        </p>
      </motion.div>
    </>
  );
}
