import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Github,
  ExternalLink,
  Zap,
  Lightbulb,
  AlertCircle,
  Wrench,
  ListChecks,
  TrendingUp,
  Building2,
  Monitor,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";

const complexityColor: Record<string, string> = {
  "Sistema em produção": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Regra de negócio complexa":
    "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Integração externa": "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

interface SectionBlockProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function SectionBlock({ icon, label, children }: SectionBlockProps) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80 mb-3">
        {icon}
        {label}
      </p>
      {children}
    </div>
  );
}

interface ImageGalleryProps {
  images: string[];
  projectName: string;
}

function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : 0,
    );
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : 0));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card/40 border border-white/5 rounded-2xl p-7"
      >
        <SectionBlock
          icon={<Monitor size={14} />}
          label="Screenshots do sistema"
        >
          <div
            className={`grid gap-4 mt-2 ${images.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
          >
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="group/img relative overflow-hidden rounded-xl border border-white/5 hover:border-primary/30 transition-colors aspect-video bg-card cursor-zoom-in"
              >
                <img
                  src={src}
                  alt={`${projectName} - screenshot ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                  <ExternalLink
                    size={20}
                    className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                  />
                </div>
              </button>
            ))}
          </div>
        </SectionBlock>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 text-white/60 hover:text-white transition-colors p-2"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-4 text-white/60 hover:text-white transition-colors p-2"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[lightboxIndex]}
              alt={`${projectName} - screenshot ${lightboxIndex + 1}`}
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <div className="absolute bottom-4 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${i === lightboxIndex ? "bg-primary" : "bg-white/30"}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Projeto não encontrado</p>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const colorClass =
    complexityColor[project.complexity] ??
    "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar minimal */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/#projetos")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Voltar aos projetos
          </button>
          <a href="/" className="text-lg font-display font-bold">
            .JSantos<span className="text-primary">_</span>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${colorClass}`}
            >
              <Zap size={11} />
              {project.complexity}
            </span>
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-tight mb-2">
            {project.name}
          </h1>

          {/* Company */}
          <p className="flex items-center gap-2 text-base text-muted-foreground mb-6">
            <Building2 size={16} />
            {project.company}
          </p>

          {/* Summary */}
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
            {project.summary}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {project.github && project.github !== "#" && (
              <Button variant="outline" asChild className="gap-2">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild className="gap-2 px-0 py-0">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-auto py-2 px-6 flex gap-2"
                >
                  <ExternalLink size={16} /> Acessar sistema
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {/* Contexto + Problema */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card/40 border border-white/5 rounded-2xl p-7"
            >
              <SectionBlock icon={<Lightbulb size={14} />} label="Contexto">
                <p className="text-muted-foreground leading-relaxed">
                  {project.context}
                </p>
              </SectionBlock>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-red-500/5 border border-red-500/15 rounded-2xl p-7"
            >
              <SectionBlock
                icon={<AlertCircle size={14} className="text-red-400" />}
                label="Problema"
              >
                <p className="text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </SectionBlock>
            </motion.div>
          </div>

          {/* Solução */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/40 border border-white/5 rounded-2xl p-7"
          >
            <SectionBlock icon={<Wrench size={14} />} label="Solução">
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </SectionBlock>
          </motion.div>

          {/* Screenshots — only if there are images */}
          {project.images.length > 0 && (
            <ImageGallery images={project.images} projectName={project.name} />
          )}

          {/* Contribuições + Decisões técnicas */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card/40 border border-white/5 rounded-2xl p-7"
            >
              <SectionBlock
                icon={<ListChecks size={14} />}
                label="Principais contribuições"
              >
                <ul className="space-y-3 mt-1">
                  {project.contributions.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-primary/70 mt-0.5 shrink-0"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </SectionBlock>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary/5 border border-primary/15 rounded-2xl p-7"
            >
              <SectionBlock
                icon={<BrainCircuit size={14} />}
                label="Decisões técnicas"
              >
                <ul className="space-y-3 mt-1">
                  {project.technicalDecisions.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </SectionBlock>
            </motion.div>
          </div>

          {/* Impacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-green-500/5 border border-green-500/20 rounded-2xl p-7"
          >
            <SectionBlock
              icon={<TrendingUp size={14} className="text-green-400" />}
              label="Impacto"
            >
              <p className="text-lg text-foreground font-medium leading-relaxed">
                {project.impact}
              </p>
            </SectionBlock>
          </motion.div>
        </div>

        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-10 border-t border-white/5 flex justify-center"
        >
          <Button
            variant="outline"
            onClick={() => navigate("/#projetos")}
            className="gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Ver todos os projetos
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
