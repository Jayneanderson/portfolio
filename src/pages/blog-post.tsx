import { useParams, useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { posts, readingTime, formatDate } from "@/data/posts";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  const index = posts.findIndex((p) => p.slug === params.slug);
  const post = posts[index];
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const next = index > 0 ? posts[index - 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-2xl font-bold mb-4">Artigo não encontrado</p>
          <Button onClick={() => navigate("/blog")} className='cursor-pointer'>Voltar ao blog</Button>
        </div>
      </div>
    );
  }

  const minutes = readingTime(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO meta via document title */}
      {typeof document !== "undefined" &&
        (() => {
          document.title = `${post.title} | JSantos Blog`;
          return null;
        })()}

      {/* Minimal Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/blog")}
            className="cursor-pointer flex items-center gap-2 text-sm text-muted-foreground bg-transparent hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Blog
          </button>
          <Link
            href="/"
            className="text-lg font-display font-bold hover:text-primary transition-colors"
          >
            .JSantos<span className="text-primary">_</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {minutes} min de leitura
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-semibold"
              >
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Divider */}
        <div className="border-t border-white/5 mb-12" />

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="prose-container"
        >
          <ReactMarkdown
            rehypePlugins={[rehypeUnwrapImages]}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;
                if (isInline) {
                  return (
                    <code
                      className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[0.85em] font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <CodeBlock language={match[1]}>
                    {String(children).replace(/\n$/, "")}
                  </CodeBlock>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="text-2xl font-display font-bold mt-12 mb-4 text-foreground">
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="text-xl font-display font-semibold mt-8 mb-3 text-foreground">
                    {children}
                  </h3>
                );
              },
              p({ children }) {
                return (
                  <p className="text-muted-foreground leading-[1.85] mb-5 text-[1.05rem]">
                    {children}
                  </p>
                );
              },
              ul({ children }) {
                return (
                  <ul className="space-y-2 mb-6 pl-5 list-none">{children}</ul>
                );
              },
              ol({ children }) {
                return (
                  <ol className="space-y-2 mb-6 pl-5 list-decimal text-muted-foreground">
                    {children}
                  </ol>
                );
              },
              li({ children }) {
                return (
                  <li className="flex items-start gap-2 text-muted-foreground text-[1.05rem] leading-relaxed before:content-['→'] before:text-primary/60 before:mt-0.5 before:shrink-0">
                    <span>{children}</span>
                  </li>
                );
              },
              strong({ children }) {
                return (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                );
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-primary/50 pl-5 py-1 my-6 text-muted-foreground italic bg-primary/5 rounded-r-lg pr-4">
                    {children}
                  </blockquote>
                );
              },
              a({ href, children }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {children}
                  </a>
                );
              },
              hr() {
                return <hr className="border-white/8 my-10" />;
              },
              img({ src, alt }) {
                return (
                  <figure className="my-8">
                    <img
                      src={src}
                      alt={alt}
                      className="rounded-xl w-full border border-white/10"
                      loading="lazy"
                    />
                    {alt && (
                      <figcaption className="text-center text-sm text-muted-foreground mt-2">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Navigation between posts */}
        {(prev || next) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-10 border-t border-white/5 grid sm:grid-cols-2 gap-4"
          >
            {prev ? (
              <button
                onClick={() => navigate(`/blog/${prev.slug}`)}
                className="group text-left bg-card/30 border cursor-pointer border-white/5 hover:border-primary/30 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              >
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <ArrowLeft size={12} /> Artigo anterior
                </p>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">
                  {prev.title}
                </p>
              </button>
            ) : (
              <div />
            )}
            {next ? (
              <button
                onClick={() => navigate(`/blog/${next.slug}`)}
                className="group text-right bg-card/30 border border-white/5 hover:border-primary/30 rounded-2xl p-5 transition-all hover:-translate-y-0.5 sm:ml-auto w-full"
              >
                <p className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground mb-2">
                  Próximo artigo <ArrowRight size={12} />
                </p>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">
                  {next.title}
                </p>
              </button>
            ) : (
              <div />
            )}
          </motion.div>
        )}

        {/* Back to blog */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/blog")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Ver todos os artigos
          </Button>
        </div>
      </main>
    </div>
  );
}
