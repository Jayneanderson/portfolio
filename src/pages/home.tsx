import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Terminal,
  Database,
  Layout,
  Wrench,
  Github,
  Linkedin,
  ArrowRight,
  Mail,
  Code2,
  Target,
  Menu,
  X,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { Link } from 'wouter';

// --- Form Validation Schema ---
const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Sobre", href: "#sobre" },
    { name: "Projetos", href: "#projetos" },
    { name: "Stack", href: "#stack" },
    { name: "Contato", href: "#contato" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="#home"
          className="text-2xl font-display font-bold tracking-tighter hover:text-primary transition-colors"
        >
          Jayneanderson<span className="text-primary">_</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-xl border-b border-white/5 shadow-2xl py-6 px-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
};

const SectionHeading = ({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="mb-16 md:mb-24">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-display font-bold text-gradient mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Main Page Component ---

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-glow.png`}
            alt="Background Glow"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] object-cover opacity-30 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            style={{ opacity, scale }}
            className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20"
          >
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8"
              >
                <Terminal size={16} />
                <span>Desenvolvedor Pleno</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6"
              >
                Transformo problemas complexos em{" "}
                <br className="hidden lg:block" />
                <span className="text-gradient-primary">
                  soluções escaláveis.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                Olá! Me chamo Jayneanderson e sou desenvolvedor full stack com
                experiência em startups e empresas de tecnologia. Construo
                microsserviços e monolitos robustos, além de interfaces que os
                usuários realmente precisam.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto p-0 group"
                >
                  <Link
                    href="#projetos"
                    className="w-full h-12 flex items-center px-8"
                  >
                    Ver Projetos
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto p-0"
                >
                  <Link
                    href="#contato"
                    className="w-full h-12 flex items-center px-8"
                  >
                    Entrar em contato
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 shrink-0"
            >
              {/* Abstract Avatar Placeholder */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-orange-500 blur-2xl opacity-40 animate-pulse" />
              <div className="absolute inset-2 rounded-full glass-panel flex items-center justify-center border-white/10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-card to-background flex items-center justify-center text-5xl sm:text-7xl font-display font-bold text-white/80">
                  Jay
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-panel px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 animate-[bounce_3s_ease-in-out_infinite]">
                <Code2 size={16} className="text-primary" /> React
              </div>
              <div className="absolute -bottom-4 -left-4 glass-panel px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 animate-[bounce_4s_ease-in-out_infinite]">
                <Database size={16} className="text-primary" /> Node.js
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SOBRE MIM */}
      <section id="sobre" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>Sobre mim</SectionHeading>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                Sou desenvolvedor full stack com trajetória construída em
                ambiente de startup, onde aprendi que
                <strong className="text-foreground">
                  {" "}
                  velocidade e qualidade não são opostos — são complementares.
                </strong>
              </p>
              <p>
                Tenho experiência real com todo o ciclo de desenvolvimento: da
                modelagem à entrega de features em produção. Já automatizei
                processos que economizaram horas de trabalho manual, integrei
                sistemas externos e contribuí para a evolução de arquiteturas
                monolíticas e de microsserviços.
              </p>
              <p>
                Hoje atuo como{" "}
                <strong className="text-foreground text-primary">
                  desenvolvedor pleno
                </strong>{" "}
                com foco em tranformar negócio em solução digital que escala e
                resolve o problema certo.
              </p>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full"
                >
                  <Link
                    href="https://br.linkedin.com/in/jayneandersonn"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 flex"
                  >
                    <Linkedin size={20} />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full"
                >
                  <Link
                    href="mailto:jayneanderson@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10"
                  >
                    <Mail size={20} />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full"
                >
                  <Link
                    href="https://github.com/Jayneanderson"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10"
                  >
                    <Github size={20} />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid gap-6">
              {[
                {
                  title: "3+ anos de experiência",
                  desc: "Trabalhando em startups com que realizam sonhos de usuários todos os dias.",
                  icon: <Terminal className="text-primary" size={24} />,
                },
                {
                  title: "Soluções Back-end escaláveis",
                  desc: "Arquitetura, APIs, segurança e performance no back-end.",
                  icon: <Database className="text-primary" size={24} />,
                },
                {
                  title: "Monitoramento e observabilidade",
                  desc: "São pontos centrais para maanter e evoluir o negócio.",
                  icon: <Layout className="text-primary" size={24} />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:border-primary/30 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section
        id="projetos"
        className="py-24 md:py-32 bg-card/30 border-y border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Clique em qualquer projeto para ver o storytelling completo, bem como contexto, decisões técnicas e impacto gerado.">
            Projetos em destaque
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STACK TÉCNICA */}
      <section id="stack" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>Stack Técnica</SectionHeading>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Backend",
                icon: <Terminal className="text-primary" />,
                items: [
                  "Node.js",
                  "NestJS",
                  "ORMs (TypeORM, Prisma, Sequelize)",
                  "Jest",
                  "Supertest",
                  "Mocha/Chai",
                ],
              },
              {
                title: "Frontend",
                icon: <Layout className="text-primary" />,
                items: [
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "React Hook Form",
                  "Zustand",
                  "Material UI",
                  "React Query",
                  "React Testing Library",
                ],
              },
              {
                title: "Banco de Dados",
                icon: <Database className="text-primary" />,
                items: ["PostgreSQL", "MySQL", "MongoDB", "DynamonDB", "Redis"],
              },
              {
                title: "Ferramentas",
                icon: <Wrench className="text-primary" />,
                items: [
                  "Git",
                  "GitHub",
                  "TDD",
                  "CI/CD",
                  "Docker",
                  "AWS",
                  "GCP",
                  "Jira",
                ],
              },
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-3xl"
              >
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-muted-foreground text-sm font-medium"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section
        id="diferenciais"
        className="py-24 md:py-32 bg-card/30 border-y border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Além de código, entrego valor para o negócio.">
            Por que me contratar?
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Visão de produto",
                icon: <Target size={32} className="text-primary mb-4" />,
                desc: "Não apenas executo tarefas. Entendo o problema de negócio por trás de cada feature e proponho soluções que fazem sentido econômico e técnico.",
              },
              {
                title: "Cultura de qualidade",
                icon: <Code2 size={32} className="text-primary mb-4" />,
                desc: "Escrevo código limpo, documentado e testável. Me preocupo com a experiência de quem vai dar manutenção depois de mim na base de código.",
              },
              {
                title: "Habilidades comportamentais",
                icon: <Users size={32} className="text-primary mb-4" />,
                desc: "Gosto muito de ouvir, dialogar, debater e compreender pessoas. Acredito que a comunicação é a principal chave para um bom trabalho em equipe.",
              },
            ].map((diff, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-white/5 p-8 rounded-3xl hover:bg-card/50 transition-colors"
              >
                {diff.icon}
                <h3 className="text-xl font-bold mb-4">{diff.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {diff.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4"
            >
              Vamos trabalhar juntos?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg md:text-xl"
            >
              Estou aberto a oportunidades novas. Entre em contato e vamos
              conversar.
            </motion.p>
          </div>

          <div className="gap-12 flex justify-center bg-card/40 border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl">
            {/* Info */}
            <div className="md:col-span-2 flex flex-col justify-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Informações de contato
                </h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href="mailto:jayneanderson@gmail.com"
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <Mail size={20} />
                    </div>
                    <span className="font-medium break-all">
                      jayneanderson@gmail.com
                    </span>
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <Linkedin size={20} />
                    </div>
                    <span className="font-medium">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Form 
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    placeholder="Seu nome"
                    {...register("name")}
                    className={
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.name && (
                    <span className="text-destructive text-sm mt-2 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    {...register("email")}
                    className={
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.email && (
                    <span className="text-destructive text-sm mt-2 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Sua mensagem..."
                    {...register("message")}
                    className={
                      errors.message
                        ? "border-destructive focus-visible:ring-destructive min-h-[150px]"
                        : "min-h-[150px]"
                    }
                  />
                  {errors.message && (
                    <span className="text-destructive text-sm mt-2 block">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensagem <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-display font-bold">
            Jayneanderson<span className="text-primary">_</span>
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            Desenvolvido por Jayneanderson · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
