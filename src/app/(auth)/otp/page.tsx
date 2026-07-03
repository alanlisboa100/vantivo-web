"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Card } from "@/components/ui/barrel";
import { LogoWordmark, PremiumBadge } from "@/components/brand";
import { Mail, ArrowRight, RotateCw, ShieldCheck, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[i] = digit;
    setCode(next);
    if (digit && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = code.join("");
    if (token.length !== 6) {
      toast.error("Digite o código de 6 dígitos.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });
      if (error) throw error;
      toast.success("Email verificado! Entrando...");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Código inválido ou expirado");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (countdown > 0) return;
    setResendLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (error) throw error;
      toast.success("Código reenviado!");
      setCountdown(60);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao reenviar");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-bg">
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <LogoWordmark size={32} animated className="justify-center mb-6" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="relative inline-flex mb-5"
          >
            <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan/20 to-purple/20 border border-white/10 flex items-center justify-center">
              <Mail size={32} className="text-cyan" />
            </div>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">Confirme seu email</h1>
          <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
            Enviamos um código de 6 dígitos pra <strong className="text-text break-all">{email}</strong>
          </p>
        </motion.div>

        <Card className="p-6 sm:p-7" glow="cyan" hover={false}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-2 block">
                Código de verificação
              </label>
              <div className="flex gap-1.5 sm:gap-2" onPaste={handlePaste}>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKey(i, e)}
                    className="flex-1 min-w-0 h-14 sm:h-16 text-center text-xl sm:text-2xl font-black bg-panel border border-white/10 rounded-xl focus:outline-none focus:border-cyan/50 focus:ring-2 focus:ring-cyan/20 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all"
                    maxLength={1}
                    aria-label={`Dígito ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} fullWidth size="lg" glow rightIcon={<ArrowRight size={16} />}>
              Verificar e entrar
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/5 text-center">
            <p className="text-xs text-muted mb-2">Não recebeu o código?</p>
            <button
              type="button"
              onClick={resend}
              disabled={countdown > 0 || resendLoading}
              className="text-xs text-cyan font-bold hover:underline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
            >
              <RotateCw size={11} className={resendLoading ? "animate-spin" : ""} />
              {countdown > 0 ? `Reenviar em ${countdown}s` : "Reenviar código"}
            </button>
          </div>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-dim">
          <ShieldCheck size={11} className="text-green" />
          <span>Seus dados estão protegidos com criptografia de ponta a ponta.</span>
        </div>
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
