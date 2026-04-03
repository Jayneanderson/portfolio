import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  children: string;
}

export function CodeBlock({ language = "text", children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-white/10">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a2e] border-b border-white/5">
        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/5"
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green-400" />
              <span className="text-green-400">Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              Copiar
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.85rem",
          lineHeight: "1.65",
          padding: "1.25rem 1.5rem",
          background: "#0d0d1a",
        }}
        showLineNumbers={children.split("\n").length > 6}
        lineNumberStyle={{
          color: "rgba(255,255,255,0.15)",
          fontSize: "0.75rem",
          paddingRight: "1.5rem",
          userSelect: "none",
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
