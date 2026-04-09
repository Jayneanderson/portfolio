import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, Search } from "lucide-react";
import { posts, readingTime, formatDate } from "@/data/posts";

const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

export default function Blog() {
  const [, navigate] = useLocation();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = posts
    .filter((p) => !activeTag || p.tags.includes(activeTag))
    .filter(
      (p) =>
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-display font-bold hover:text-primary transition-colors"
          >
            .JSantos<span className="text-primary">_</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-white transition-colors">
              Portfólio
            </Link>
            <span className="text-foreground font-medium">Blog</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tutoriais técnicos, estudos de caso e explicações de conceitos que
            uso no dia a dia como desenvolvedor.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50"
            />
            <input
              type="search"
              placeholder="Buscar artigos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-card/40 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Todos
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Post list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum artigo encontrado.
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group bg-card/30 border border-white/5 hover:border-primary/30 rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_-12px_hsl(355,85%,65%,0.2)] hover:-translate-y-0.5"
              >
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {readingTime(post.content)} min de leitura
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTag(activeTag === tag ? null : tag);
                        }}
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    Ler artigo
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
