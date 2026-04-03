import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, BrainCircuit, CheckCircle2, Zap, Building2 } from "lucide-react";
import type { Project } from "@/data/projects";

const complexityColor: Record<string, string> = {
  "Sistema em produção": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Regra de negócio complexa": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Integração externa": "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [, navigate] = useLocation();

  const colorClass =
    complexityColor[project.complexity] ??
    "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/projetos/${project.slug}`)}
      className="group relative flex flex-col h-full bg-background rounded-3xl p-7 border border-white/5 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:shadow-[0_0_50px_-12px_hsl(355,85%,65%,0.25)] hover:-translate-y-1"
    >
      {/* Top: complexity badge */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${colorClass}`}>
          <Zap size={11} />
          {project.complexity}
        </span>
      </div>

      {/* Title + Company */}
      <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors leading-snug">
        {project.name}
      </h3>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mb-4">
        <Building2 size={12} />
        {project.company}
      </p>

      {/* Summary */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {project.summary}
      </p>

      {/* Highlights */}
      <ul className="space-y-2 mb-6 flex-1">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 size={14} className="text-primary/70 mt-0.5 shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      {/* Impact */}
      <div className="mb-5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
          <BrainCircuit size={13} className="text-primary" />
          Impacto
        </p>
        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
          {project.impact}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-1">
        Ver detalhes completos
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </div>
    </motion.article>
  );
}
