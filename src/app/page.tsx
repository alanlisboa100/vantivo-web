"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Image as ImageIcon, Camera, Palette, Brain, Clock,
  Check, Star, Zap, ArrowRight, MessageSquare,
  Video, UserCircle2, Music, Box, Maximize2, Play, Quote,
  Globe, Wand2, Layers, Heart, Flame, Sparkle, Cpu,
  Mic, TrendingUp, Shield,
} from "lucide-react";

import {
  Button, Card, Tabs, StatCard, Section,
  GradientText, AuroraBg, NoiseOverlay,
} from "@/components/ui/barrel";

import { LogoWordmark, NeonBackdrop, PremiumBadge, SectionHeader, IconTile } from "@/components/brand";
import { EPIC_VIDEOS, EPIC_PHOTOS } from "@/constants/samples";
import { NAV, TESTIMONIALS, SOCIAL_PROOF } from "@/constants/nav";
import {
  IMAGE_MODELS,
  VIDEO_MODELS,
  VIDEO_COMPARISON,
  IMAGE_COMPARISON,
} from "@/constants/models";

import { ModelCard } from "@/components/landing/ModelCard";
import { ModelComparison } from "@/components/landing/ModelComparison";
import { EpicVideoGallery, EpicVideoCard } from "@/components/landing/EpicVideoGallery";
import { EpicPhotoGallery } from "@/components/landing/EpicPhotoGallery";
import { ModelMarqueeStack, ModelStatBar } from "@/components/landing/ModelMarquee";
import { LiveFeed, StatsTicker, PulsingCTA } from "@/components/landing/LiveFeed";
import { UseCasesGrid } from "@/components/landing/UseCases";
import { ModelShowcase } from "@/components/landing/ModelShowcase";
import { MouseSpotlight } from "@/components/landing/MouseSpotlight";

const ICON_MAP_NAV: Record<string, any> = {
  Sparkles, Image: ImageIcon, Camera, Palette, Brain, Clock, Video,
  UserCircle2, MessageSquare, Music, Box, Maximize2,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const FAQ = [
  {
    q: "Preciso ser designer pra usar o LISBOA?",
    a: "Não. O LISBOA foi feito pra ser usado por qualquer pessoa — basta descrever o que você quer em poucas palavras. A IA cuida do resto. Designers também usam pra acelerar o trabalho.",
  },
  {
    q: "Como funcionam os pontos?",
    a: "Cada ação consome pontos: gerar imagem (1-4 pts), editar foto (1-3 pts), gerar vídeo (20-50 pts), avatar animado (25-35 pts). Você compra pontos avulsos ou assina um plano mensal com pontos inclusos.",
  },
  {
    q: "Posso testar antes de pagar?",
    a: "Sim! Crie uma conta gratuita e ganhe pontos pra explorar o Studio. Sem cartão de crédito, sem pegadinha. Quando curtir, aí você escolhe um plano.",
  },
  {
    q: "Quais modelos de IA vocês têm?",
    a: "Temos 8+ modelos de imagem (GPT Image 2, Nano Banana 2, Flux 2 Klein, Imagen 4 Ultra, Seedream 4, Ghibli AI, Qwen Image, Reve v1) e 8+ modelos de vídeo (Seedance 2.0, WAN 2.7, Veo 3.1, Kling 3.0, Sora 2, Pika 2.2, Hailuo 2, ElevenLabs LipSync). Toda semana adicionamos modelos novos.",
  },
  {
    q: "Minhas criações ficam salvas?",
    a: "Sim, tudo fica salvo automaticamente no seu histórico e pode ser acessado de qualquer dispositivo. Você pode baixar em alta resolução ou compartilhar direto.",
  },
  {
    q: "Funciona em celular?",
    a: "Sim! A versão web é totalmente responsiva. Também temos app nativo Android com a mesma experiência. Pra iOS, use o navegador Safari — funciona perfeitamente.",
  },
  {
    q: "Posso usar comercialmente?",
    a: "Sim. Tudo que você cria com o LISBOA é seu. Use em posts, anúncios, vídeos monetizados, produtos — sem royalties ou marcas d'água.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Você pode refinar quantas vezes quiser gastando apenas os pontos da nova geração. O assistente também ajuda a melhorar seu prompt pra resultados cada vez melhores.",
  },
];

const PLANS = [
  { name: "Start", id: "start", price: 14.9, pts: 120, highlight: false, tagline: "Pra começar a criar sem compromisso",
    features: ["120 pontos por mês", "8+ modelos de imagem", "Editor de fotos básico", "Anime Studio (limitado)", "Suporte por email"] },
  { name: "Pro", id: "pro", price: 34.9, pts: 320, highlight: true, tagline: "O mais escolhido pelos criadores",
    features: ["320 pontos por mês", "Tudo do Start", "8+ modelos de vídeo", "Editor de fotos premium", "Anime Studio ilimitado", "Suporte prioritário"] },
  { name: "Ultra", id: "ultra", price: 69.9, pts: 700, highlight: false, tagline: "Pra quem produz em escala",
    features: ["700 pontos por mês", "Tudo do Pro", "Sora 2 + Veo 3.1 inclusos", "Avatar animado", "Avatar falante", "Suporte VIP 24/7"] },
];

const CATEGORIES = [
  { id: "all", label: "Todas", icon: Layers },
  { id: "criacao", label: "Criação", icon: Wand2 },
  { id: "edicao", label: "Edição", icon: Camera },
  { id: "video", label: "Vídeo", icon: Video },
  { id: "avancado", label: "Avançado", icon: Sparkles },
];

const USE_CASES = [
  {
    id: "uc-youtube",
    title: "Capas virais pra YouTube",
    description: "Crie thumbnails que param o scroll com GPT Image 2 e texto perfeito.",
    example: "Thumbnail YouTube: homem surpreso apontando pra texto 'IA MATOU O PHOTOSHOP' com fundo gradiente neon",
    icon: ImageIcon,
    model: IMAGE_MODELS[0],
    accent: "cyan" as const,
    metric: "+340%",
    metricLabel: "CTR médio",
  },
  {
    id: "uc-reels",
    title: "Reels que viralizam",
    description: "Vídeos cinematográficos com Seedance 2.0 pra Instagram, TikTok e Shorts.",
    example: "Drone cinematográfico sobrevoando cidade cyberpunk à noite, luzes neon, chuva, 9:16",
    icon: Video,
    model: VIDEO_MODELS[0],
    accent: "purple" as const,
    metric: "1M+",
    metricLabel: "Views possíveis",
  },
  {
    id: "uc-anime",
    title: "Avatar estilo Ghibli",
    description: "Transforme selfies em retratos anime perfeitos pra perfil e merch.",
    example: "Retrato estilo Ghibli de uma pessoa olhando pro horizonte, traços delicados, fundo pastel",
    icon: Palette,
    model: IMAGE_MODELS[7],
    accent: "pink" as const,
    metric: "100k+",
    metricLabel: "Avatares criados",
  },
  {
    id: "uc-anuncio",
    title: "Anúncios que convertem",
    description: "Copy + visual prontos pra Facebook Ads e Google em 30 segundos.",
    example: "Anúncio de perfume em fundo escuro, partículas douradas, texto premium em português",
    icon: TrendingUp,
    model: IMAGE_MODELS[0],
    accent: "amber" as const,
    metric: "5x",
    metricLabel: "ROAS médio",
  },
  {
    id: "uc-product",
    title: "Mockup de produto",
    description: "Foto de produto profissional sem precisar de estúdio.",
    example: "Frasco de perfume flutuando em fundo infinito cinza, iluminação de estúdio",
    icon: Box,
    model: IMAGE_MODELS[1],
    accent: "green" as const,
    metric: "90%",
    metricLabel: "Menos custo",
  },
  {
    id: "uc-avatar",
    title: "Avatar falante",
    description: "Foto virando vídeo com lip-sync perfeito em qualquer idioma.",
    example: "Foto de rosto sincronizada com narração em português, lip-sync realista",
    icon: Mic,
    model: VIDEO_MODELS[7],
    accent: "purple" as const,
    metric: "47",
    metricLabel: "Idiomas",
  },
  {
    id: "uc-foto",
    title: "Edição corporal IA",
    description: "Mude corpo, roupa, pose e ângulo sem perder a identidade.",
    example: "Modelo em vestido vermelho de noite, fundo parisiense, pose elegante",
    icon: Camera,
    model: IMAGE_MODELS[4],
    accent: "blue" as const,
    metric: "4K",
    metricLabel: "Resolução",
  },
  {
    id: "uc-conceito",
    title: "Concept art épico",
    description: "Visualize ideias pra livros, jogos e filmes em minutos.",
    example: "Cavaleiro em armadura negra montando dragão vermelho, montanhas ao fundo, épico cinematográfico",
    icon: Wand2,
    model: IMAGE_MODELS[3],
    accent: "purple" as const,
    metric: "10x",
    metricLabel: "Mais rápido",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [modelFilter, setModelFilter] = useState<"all" | "image" | "video">("all");
  const yearlyDiscount = 0.7;

  const filteredFeatures = activeCategory === "all"
    ? NAV.features
    : NAV.features.filter((f) => f.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-bg overflow-x-hidden">
      <NeonBackdrop intensity="default" />
      <NoiseOverlay opacity={0.02} />

      {/* ─── Navigation ─── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-bg/60 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <LogoWordmark size={28} animated />
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Modelos", href: "#modelos" },
              { label: "Vídeo", href: "#video" },
              { label: "Galeria", href: "#galeria" },
              { label: "Comparar", href: "#comparar" },
              { label: "Planos", href: "#planos" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="px-3 py-1.5 text-sm font-semibold text-muted hover:text-text rounded-lg hover:bg-white/5 transition-colors">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" rightIcon={<ArrowRight size={14} />}>Começar grátis</Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ─── HERO ÉPICO ─── */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24">
        <AuroraBg intensity="md" className="opacity-40" />
        <div className="absolute inset-0 bg-grid-fine pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
            {/* Live feed acima do badge */}
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <LiveFeed />
            </motion.div>

            <motion.div variants={fadeUp}>
              <PremiumBadge className="mb-6" icon={<Flame size={11} />}>
                Estúdio Criativo com IA · 16+ modelos · Beta aberta
              </PremiumBadge>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6">
              Crie artes{" "}
              <GradientText from="#22d3ee" via="#a855f7" to="#ec4899">
                profissionais
              </GradientText>
              <br />
              com IA em segundos.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
              8 modelos de imagem e 8 modelos de vídeo — incluindo GPT Image 2, Seedance 2.0, Sora 2 e Veo 3.1 — todos numa única plataforma.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 flex-wrap mb-10">
              <Link href="/signup">
                <Button size="xl" rightIcon={<ArrowRight size={18} />} className="shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                  Começar grátis
                </Button>
              </Link>
              <a href="#video">
                <Button variant="secondary" size="xl" leftIcon={<Play size={16} />}>
                  Ver em ação
                </Button>
              </a>
            </motion.div>

            {/* Ticker de stats em tempo real */}
            <motion.div variants={fadeUp} className="mb-10">
              <StatsTicker />
            </motion.div>

            {/* Social proof bar */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber text-amber" />
                  ))}
                </div>
                <span className="font-bold text-text">{SOCIAL_PROOF.rating}</span>
                <span>de {SOCIAL_PROOF.creators} criadores</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-cyan" />
                <span>Usado em {SOCIAL_PROOF.countries} países</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-green" />
                <span>Uso comercial livre</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── LOGO MARQUEE (modelos passando) ─── */}
      <section className="relative py-6 sm:py-10 border-y border-white/5">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-dim mb-6">
          16+ modelos de IA de última geração
        </p>
        <ModelMarqueeStack models={[...IMAGE_MODELS, ...VIDEO_MODELS]} />
      </section>

      {/* ─── STATS BARR ─── */}
      <Section className="py-10">
        <ModelStatBar />
      </Section>

      {/* ─── USE CASES (cards com background image) ─── */}
      <Section id="recursos" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="purple" icon={<Sparkles size={11} />}>Use cases</PremiumBadge>}
          title={<>Use cases que <GradientText>todo criador</GradientText> precisa</>}
          description="Os 8 cenários mais populares — copy, modelo e prompt prontos pra usar."
        />

        <UseCasesGrid useCases={USE_CASES} />
      </Section>

      {/* ─── MODEL SHOWCASE (destaque épico individual) ─── */}
      <Section id="modelos" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="cyan" icon={<Cpu size={11} />}>Modelos</PremiumBadge>}
          title={<>Cada modelo, um <GradientText>superpoder</GradientText></>}
          description="Passe o mouse pra ver em tempo real. Clique pra experimentar."
        />

        <ModelShowcase models={VIDEO_MODELS.slice(0, 6)} />
      </Section>

      {/* ─── COMPARISON VÍDEO ─── */}
      <Section id="comparar" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="cyan" icon={<Zap size={11} />}>Comparativo</PremiumBadge>}
          title={<>Qual modelo de <GradientText>vídeo</GradientText> usar?</>}
          description="Comparação honesta entre os principais modelos do mercado."
        />

        <div className="space-y-12">
          <ModelComparison
            title={VIDEO_COMPARISON.title}
            subtitle={VIDEO_COMPARISON.subtitle}
            columns={VIDEO_COMPARISON.columns}
            rows={VIDEO_COMPARISON.rows}
            accent="cyan"
          />

          <ModelComparison
            title={IMAGE_COMPARISON.title}
            subtitle={IMAGE_COMPARISON.subtitle}
            columns={IMAGE_COMPARISON.columns}
            rows={IMAGE_COMPARISON.rows}
            accent="purple"
          />
        </div>
      </Section>

      {/* ─── EPIC VIDEO GALLERY ─── */}
      <Section id="video" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="pink" icon={<Video size={11} />}>Vídeo IA</PremiumBadge>}
          title={<>Vídeos <GradientText>cinematográficos</GradientText> com um clique</>}
          description="Seedance 2.0, WAN 2.7, Veo 3.1, Sora 2 — passe o mouse pra ver o vídeo."
        />

        <EpicVideoGallery videos={EPIC_VIDEOS.slice(0, 9)} />
      </Section>

      {/* ─── EPIC PHOTO GALLERY (masonry) ─── */}
      <Section id="galeria" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="amber" icon={<Wand2 size={11} />}>Galeria</PremiumBadge>}
          title={<>Imagens que <GradientText>pararam o scroll</GradientText></>}
          description="Capas, anúncios, conceito, anime, lifestyle — tudo gerado por usuários do LISBOA."
        />

        <EpicPhotoGallery photos={EPIC_PHOTOS.slice(0, 15)} />
      </Section>

      {/* ─── FEATURES com tabs + SpotlightCard ─── */}
      <Section className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="cyan" icon={<Sparkles size={11} />}>Ferramentas</PremiumBadge>}
          title={<>12+ ferramentas <GradientText>premium</GradientText> numa só plataforma</>}
          description="Tudo que você precisa pra criar como um pro, sem trocar de app."
        />

        <div className="flex justify-center mb-8">
          <Tabs
            value={activeCategory}
            onChange={(v) => setActiveCategory(v as string)}
            tabs={CATEGORIES.map((c) => ({ id: c.id, label: c.label, icon: <c.icon size={14} /> }))}
          />
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feature, i) => {
              const Icon = ICON_MAP_NAV[feature.icon] || Sparkles;
              const color = ["cyan", "purple", "pink", "green", "amber", "blue"][i % 6] as any;
              return (
                <motion.div
                  key={feature.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <MouseSpotlight
                    className="rounded-[20px] p-6 h-full border border-white/5 bg-card/40 backdrop-blur-sm hover:border-white/15 transition-colors"
                    color="rgba(34, 211, 238, 0.1)"
                  >
                    <IconTile variant={color} size="lg" className="mb-4">
                      <Icon size={24} />
                    </IconTile>
                    <h3 className="text-lg font-black mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-4">{feature.desc}</p>
                    <div className="flex items-center gap-1.5 text-xs text-cyan font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Saiba mais <ArrowRight size={12} />
                    </div>
                  </MouseSpotlight>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* ─── SPLIT SHOWCASE (antes/depois) ─── */}
      <Section className="py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PremiumBadge className="mb-4" variant="purple" icon={<Sparkle size={11} />}>Demonstração</PremiumBadge>
            <h3 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
              Foto parada vira <GradientText>vídeo em segundos</GradientText>
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Faça upload de qualquer imagem e veja ela ganhar vida com movimento de câmera, expressão facial, animação de produto e muito mais. Sem prompt complicado — clique e pronto.
            </p>
            <ul className="space-y-2 text-sm text-muted">
              {["Movimento de câmera suave", "Expressão facial realista", "Anima produto / personagem", "1080p · até 15s", "Compatível com qualquer imagem"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan/20 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-cyan" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EpicVideoCard
              video={{
                ...EPIC_VIDEOS[0],
                title: "Foto original animada",
                model: "Seedance 2.0",
                category: "Demonstração",
                prompt: "Foto estática transformada em vídeo cinematográfico com IA",
                duration: "8s",
                resolution: "1080p",
                accent: "cyan",
              }}
              index={0}
            />
          </motion.div>
        </div>
      </Section>

      {/* ─── STATS ─── */}
      <Section className="py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard value={SOCIAL_PROOF.creators} label="Criadores ativos" icon={<Heart size={18} />} color="pink" />
          <StatCard value={SOCIAL_PROOF.images} label="Imagens geradas" icon={<ImageIcon size={18} />} color="cyan" />
          <StatCard value="48k+" label="Vídeos criados" icon={<Video size={18} />} color="purple" />
          <StatCard value={`${SOCIAL_PROOF.rating}★`} label="Avaliação média" icon={<Star size={18} />} color="amber" />
        </div>
      </Section>

      {/* ─── MODEL CARDS (grid 3 colunas pra cada categoria) ─── */}
      <Section className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="cyan" icon={<Cpu size={11} />}>Catálogo</PremiumBadge>}
          title={<>Conheça <GradientText>todos os modelos</GradientText></>}
          description="Cada modelo tem personalidade própria. Escolha o melhor pra cada projeto."
        >
          <div className="flex justify-center mt-4">
            <Tabs
              value={modelFilter}
              onChange={(v) => setModelFilter(v as "all" | "image" | "video")}
              tabs={[
                { id: "all", label: "Todos", count: IMAGE_MODELS.length + VIDEO_MODELS.length },
                { id: "image", label: "Imagem", count: IMAGE_MODELS.length, icon: <ImageIcon size={14} /> },
                { id: "video", label: "Vídeo", count: VIDEO_MODELS.length, icon: <Video size={14} /> },
              ]}
            />
          </div>
        </SectionHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={modelFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {(modelFilter === "all"
              ? [...IMAGE_MODELS, ...VIDEO_MODELS]
              : modelFilter === "image"
              ? IMAGE_MODELS
              : VIDEO_MODELS
            ).map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section id="depoimentos" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="gold" icon={<Star size={11} />}>Depoimentos</PremiumBadge>}
          title={<>Criadores que <GradientText>transformaram</GradientText> seu trabalho</>}
          description="De YouTubers a agências, veja o que estão dizendo sobre o LISBOA."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Card className="p-6 h-full flex flex-col" glow="none" hover>
                <Quote className="text-cyan/30 mb-3" size={28} />
                <p className="text-sm text-muted leading-relaxed mb-5 flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-black text-white shadow-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-dim">{t.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} size={11} className="fill-amber text-amber" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── PLANS ─── */}
      <Section id="planos" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="cyan" icon={<Zap size={11} />}>Preços</PremiumBadge>}
          title={<>Planos que <GradientText>cabem no bolso</GradientText></>}
          description="Sem letras miúdas. Cancele quando quiser."
        >
          <div className="flex justify-center mt-2">
            <Tabs
              value={billing}
              onChange={(v) => setBilling(v as "monthly" | "yearly")}
              tabs={[
                { id: "monthly", label: "Mensal" },
                { id: "yearly", label: "Anual · -30%" },
              ]}
            />
          </div>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => {
            const price = billing === "yearly" ? plan.price * yearlyDiscount : plan.price;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <PremiumBadge variant="cyan" icon={<Flame size={11} />}>Mais popular</PremiumBadge>
                  </div>
                )}
                <Card
                  className={`p-7 h-full flex flex-col ${plan.highlight ? "md:scale-105 border-cyan/30 bg-card/80" : ""}`}
                  glow={plan.highlight ? "cyan" : "none"}
                  hover={!plan.highlight}
                >
                  <div className="mb-5">
                    <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted">{plan.tagline}</p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted">R$</span>
                      <span className="text-5xl font-black">{price.toFixed(2).split(",")[0]}</span>
                      <span className="text-sm text-muted">,{(price.toFixed(2).split(",")[1] || "00")}</span>
                    </div>
                    <p className="text-xs text-muted mt-1">/mês</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/20 font-bold">
                      <Zap size={11} /> {plan.pts} pontos inclusos
                    </div>
                  </div>
                  <div className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm">
                        <div className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-green/20 flex items-center justify-center">
                          <Check size={10} className="text-green" />
                        </div>
                        <span className="text-muted">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/signup" className="block">
                    <Button variant={plan.highlight ? "primary" : "secondary"} fullWidth size="lg">
                      {plan.highlight ? "Assinar Pro" : `Assinar ${plan.name}`}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <p className="text-center text-xs text-dim mt-8">Todos os planos incluem 7 dias de garantia. Cancele quando quiser.</p>
      </Section>

      {/* ─── FAQ ─── */}
      <Section id="faq" className="py-12 sm:py-20">
        <SectionHeader
          align="center"
          badge={<PremiumBadge variant="purple" icon={<MessageSquare size={11} />}>FAQ</PremiumBadge>}
          title={<>Perguntas <GradientText>frequentes</GradientText></>}
          description="Tudo que você precisa saber antes de começar."
        />

        <div className="max-w-3xl mx-auto space-y-2.5">
          {FAQ.map((item, i) => {
            const open = openFaq === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <button onClick={() => setOpenFaq(open ? null : i)} className="w-full text-left">
                  <Card className={`p-5 transition-all ${open ? "border-cyan/30 bg-white/[0.03]" : ""}`} glow="none" hover={false}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-sm sm:text-base">{item.q}</span>
                      <div className={`shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${open ? "rotate-45 bg-cyan/10 border-cyan/30" : ""}`}>
                        <span className="text-cyan text-lg leading-none">+</span>
                      </div>
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted mt-4 leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </button>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <Section className="py-12 sm:py-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card className="relative p-10 sm:p-16 text-center overflow-hidden" glow="cyan" hover={false}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-purple/5 to-pink/10" />
            <AuroraBg intensity="high" hue="vivid" className="opacity-40" />
            <NoiseOverlay opacity={0.03} />
            <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles size={48} className="mx-auto mb-5 text-cyan float" />
              <h2 className="text-3xl sm:text-5xl font-black mb-4">
                Sua próxima obra-prima está a <GradientText>um clique</GradientText>.
              </h2>
              <p className="text-muted text-base sm:text-lg mb-8 max-w-md mx-auto">
                Junte-se a mais de 12 mil criadores que já transformam ideias em arte com IA.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link href="/signup">
                  <PulsingCTA>Criar conta gratuita</PulsingCTA>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="xl">Já tenho conta</Button>
                </Link>
              </div>
              <p className="text-xs text-dim mt-6">Sem cartão · Sem compromisso · Cancele quando quiser</p>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="relative border-t border-white/5 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <LogoWordmark size={24} />
              <p className="text-xs text-muted mt-3 max-w-xs leading-relaxed">
                Crie, edite e transforme imagens com IA premium. Feito pra criadores.
              </p>
            </div>
            {[
              { title: "Produto", links: [{ label: "Modelos", href: "#modelos" }, { label: "Vídeo IA", href: "#video" }, { label: "Galeria", href: "#galeria" }, { label: "Planos", href: "#planos" }] },
              { title: "Empresa", links: [{ label: "Sobre", href: "#" }, { label: "Blog", href: "#" }, { label: "Contato", href: "#" }] },
              { title: "Legal", links: [{ label: "Termos", href: "#" }, { label: "Privacidade", href: "#" }, { label: "Cookies", href: "#" }] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-wider text-dim mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-muted hover:text-text transition-colors">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
            <p className="text-xs text-dim">© 2026 LISBOA. Todos os direitos reservados.</p>
            <p className="text-xs text-dim flex items-center gap-1.5">Feito com <Heart size={11} className="text-pink fill-pink" /> no Brasil</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
