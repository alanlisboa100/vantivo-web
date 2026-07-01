"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogoWordmark, NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Button, Card } from "@/components/ui";
import { useState } from "react";
import { SAMPLES } from "@/constants/samples";
import {
  Sparkles, Image, Camera, Palette, Brain, Clock,
  ChevronDown, Check, Star, Zap, ArrowRight, TrendingUp,
  Shield, Smartphone, Globe, MessageSquare
} from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "Geração de Imagens", desc: "Crie artes profissionais com IA em segundos. Descreva o que quer ver e pronto." },
  { icon: Camera, title: "Editor de Fotos", desc: "Melhore, edite corpo, troque roupa, mude ângulos — tudo com comandos simples." },
  { icon: Image, title: "Capas & Anúncios", desc: "Design pronto para YouTube, Instagram e TikTok. Sem precisar de Photoshop." },
  { icon: Palette, title: "Anime Studio", desc: "Transforme selfies em arte anime com estilos como Ghibli, Shoujo e Cyberpunk." },
  { icon: Brain, title: "Assistente IA", desc: "Converse, peça ideias de legenda, revise textos e crie conteúdo." },
  { icon: Clock, title: "Modo Foco", desc: "Timer pomodoro inteligente com metas e streaks." },
  { icon: Sparkles, title: "Vídeo IA", desc: "Gere vídeos a partir de texto ou imagens com Seedance 2.0 e Wan 2.7." },
  { icon: Image, title: "Face Swap", desc: "Troque rostos em fotos e vídeos com precisão realista." },
  { icon: Camera, title: "Avatar Falante", desc: "Transforme fotos em vídeos com áudio sincronizado." },
  { icon: Palette, title: "Música IA", desc: "Componha músicas originais descrevendo o estilo e o mood." },
  { icon: Sparkles, title: "Modelos 3D", desc: "Crie assets 3D de alta qualidade a partir de texto ou imagem." },
  { icon: Image, title: "Upscale", desc: "Aumente a resolução de imagens sem perder qualidade." },
];

const BENEFITS = [
  { icon: Zap, title: "Rápido", desc: "Imagens em segundos" },
  { icon: Smartphone, title: "Multi-plataforma", desc: "Web + App Android" },
  { icon: Shield, title: "Seguro", desc: "Seus dados protegidos" },
  { icon: Globe, title: "i18n", desc: "Português e Inglês" },
];

const FAQ = [
  { q: "Preciso baixar algum aplicativo?", a: "Não! A versão web funciona direto no navegador. Também temos app nativo para Android." },
  { q: "Como funcionam os pontos?", a: "Cada ação (gerar imagem, editar foto, conversar) gasta pontos. Você ganha pontos ao assinar um plano ou comprar pacotes extras." },
  { q: "Posso testar antes de pagar?", a: "Sim! Crie uma conta gratuita e explore o Studio. Alguns recursos são liberados para teste." },
  { q: "Minhas criações ficam salvas?", a: "Sim, tudo fica salvo automaticamente no seu histórico e pode ser acessado de qualquer dispositivo." },
  { q: "O LISBOA funciona em inglês também?", a: "Sim! O suporte é completo em português e inglês. Você alterna no perfil." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      <NeonBackdrop />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <LogoWordmark size={28} />
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Criar conta</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <PremiumBadge className="mb-5">Estúdio Criativo com IA</PremiumBadge>
          </motion.div>

          <div className="relative mb-8 mx-auto max-w-3xl">
            <div className="absolute -inset-4 gradient-cyan rounded-[40px] opacity-5 blur-3xl" />
            <div className="relative grid grid-cols-3 gap-2 rounded-[24px] overflow-hidden border border-white/5 p-1">
              {SAMPLES.hero.slice(0, 3).map((url, i) => (
                <img key={i} src={url} alt="" className="w-full aspect-[4/3] object-cover rounded-[16px]" loading={i === 0 ? "eager" : "lazy"} />
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-5">
            Transforme ideias em{" "}
            <span className="bg-gradient-to-r from-purple via-cyan to-blue bg-clip-text text-transparent">
              artes profissionais
            </span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Crie, edite e transforme imagens com IA premium. Capas, anúncios, anime, avatar animado, editor de fotos e muito mais — tudo em um só lugar.
          </p>

          <motion.div
            className="flex items-center justify-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/signup">
              <Button size="lg" className="text-base px-8 py-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                Começar grátis
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="text-base px-8 py-4">
                Já tenho conta
              </Button>
            </Link>
          </motion.div>

          {/* Benefits row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6 mt-10 flex-wrap"
          >
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-center gap-2 text-sm text-muted">
                <b.icon size={16} className="text-cyan" />
                <span className="font-semibold text-text">{b.title}</span>
                <span className="hidden sm:inline">· {b.desc}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 text-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 0.8, y: { duration: 2, repeat: Infinity } }}
        >
          <ChevronDown size={24} className="mx-auto" />
        </motion.div>
      </section>

      {/* Showcase - Exemplos Reais */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <PremiumBadge className="mb-4">EXEMPLOS REAIS</PremiumBadge>
          <h2 className="text-4xl font-black mb-3">Veja o que a IA pode fazer</h2>
          <p className="text-muted max-w-xl mx-auto">
            Imagens geradas por IA em segundos. Fotorrealismo, anime, design comercial e muito mais.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {SAMPLES.models.map((sample, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-cyan/20 transition-all duration-300"
            >
              <img
                src={sample.url}
                alt={sample.label}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div>
                  <p className="text-sm font-bold">{sample.label}</p>
                  <p className="text-[11px] text-muted">{sample.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link href="/signup">
            <Button variant="secondary" size="lg">
              Gerar imagens como essas
              <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <PremiumBadge className="mb-4">Ferramentas</PremiumBadge>
          <h2 className="text-4xl font-black mb-3">Tudo que você precisa para criar</h2>
          <p className="text-muted max-w-xl mx-auto">
            Do rascunho à arte final — ferramentas premium pra criar, editar e transformar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-6 h-full group hover:border-cyan/20 hover:bg-white/[0.02] transition-all duration-500" glow="none">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/20 to-purple/20 text-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <PremiumBadge className="mb-4">Preços</PremiumBadge>
          <h2 className="text-4xl font-black mb-3">Planos simples e transparentes</h2>
          <p className="text-muted">Escolha o plano ideal para o seu ritmo de criação.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { name: "Start", price: "R$ 14,90", pts: "120 pts/mês", highlight: false, features: ["120 pontos/mês", "Geração de imagens", "Editor básico", "Suporte email"] },
            { name: "Pro", price: "R$ 34,90", pts: "320 pts/mês", highlight: true, features: ["320 pontos/mês", "Geração ilimitada", "Editor premium", "Anime Studio", "Suporte prioritário"] },
            { name: "Ultra", price: "R$ 69,90", pts: "700 pts/mês", highlight: false, features: ["700 pontos/mês", "Tudo do Pro", "Avatar animado", "Modo Foco", "Suporte VIP"] },
          ].map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`p-6 text-center relative h-full ${
                  plan.highlight
                    ? "border-cyan/40 shadow-[0_0_40px_rgba(34,211,238,0.12)] scale-105 md:scale-110 bg-card/80 backdrop-blur-sm"
                    : ""
                }`}
                glow={plan.highlight ? "cyan" : "none"}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <PremiumBadge> Mais usado</PremiumBadge>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                  <p className="text-4xl font-black mb-1">{plan.price}</p>
                  <p className="text-sm text-muted mb-4">/mês · {plan.pts}</p>

                  <div className="space-y-2 mb-6 text-left">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-green shrink-0" />
                        <span className="text-muted">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/signup">
                    <Button variant={plan.highlight ? "primary" : "secondary"} className="w-full">
                      Assinar {plan.name}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-20 max-w-3xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <PremiumBadge className="mb-4">FAQ</PremiumBadge>
          <h2 className="text-3xl font-black mb-3">Perguntas frequentes</h2>
        </motion.div>

        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left"
              >
                <Card className={`p-4 transition-all ${openFaq === i ? "border-cyan/20 bg-white/[0.02]" : ""}`} glow="none">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{item.q}</span>
                    <MessageSquare size={16} className={`text-dim transition-transform duration-300 ${openFaq === i ? "rotate-180 text-cyan" : ""}`} />
                  </div>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-muted mt-3 leading-relaxed"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </Card>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="p-10 md:p-14 text-center relative overflow-hidden" glow="cyan">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5 pointer-events-none" />
            <div className="relative z-10">
              <Sparkles size={40} className="mx-auto mb-4 text-cyan" />
              <h2 className="text-3xl md:text-4xl font-black mb-3">Pronto para criar?</h2>
              <p className="text-muted mb-6 max-w-md mx-auto">
                Junte-se a milhares de criadores que já transformam suas ideias em arte com IA.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link href="/signup">
                  <Button size="lg" className="text-base px-10 py-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    Criar conta gratuita
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/5 py-8 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <LogoWordmark size={20} className="justify-center mb-3" />
          <p className="text-sm text-dim">© 2026 LISBOA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
