import { useState } from "react";

export default function CodeBlock({ code, lang = "css", title }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm dark:border-slate-800 dark:shadow-none">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          {title && (
            <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {title}
            </span>
          )}
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {lang}
          </span>
        </div>
        <button
          onClick={copy}
          className="rounded-md px-2 py-1 text-[11px] font-medium text-slate-300 opacity-70 transition hover:bg-white/10 hover:opacity-100"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-sky-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
