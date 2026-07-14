
// Inline highlight for important terms inside prose.
export function Hi({ children, tone = "indigo" }) {
  const tones = {
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
    rose: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300",
    sky: "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300",
  };
  return (
    <mark className={`rounded px-1.5 py-0.5 font-semibold ${tones[tone]} [text-decoration:none]`}>
      {children}
    </mark>
  );
}

// Section wrapper used to break each topic page into readable chapters.
export function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <div>
        {kicker && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">{kicker}</p>
        )}
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">{title}</h2>
      </div>
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
    </section>
  );
}

// A friendly, plain-English explanation for readers new to the topic —
// always sits above the technical deep-dive so both audiences are served.
export function BeginnerNote({ children }) {
  return (
    <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-500/10">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm dark:bg-emerald-400">
        🔰
      </div>
      <div className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-200">
        <p className="mb-1 font-bold uppercase tracking-wide text-emerald-700 text-[11px] dark:text-emerald-400">
          Beginner-friendly explanation
        </p>
        {children}
      </div>
    </div>
  );
}

// Marks the start of the deeper, engine-level explanation for readers who
// already know the basics.
export function ProLabel({ text = "Technical deep dive" }) {
  return (
    <p className="flex items-center gap-2 pt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      ⚙ {text}
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </p>
  );
}

// Wrapper for a live interactive CSS demo with label + technical caption.
export function DemoCard({ label = "Live demo", caption, children, className = "" }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-sky-50 px-4 py-2 dark:border-slate-800 dark:from-indigo-500/10 dark:to-sky-500/10">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          {label}
        </span>
      </div>
      <div
        className={`flex min-h-40 items-center justify-center gap-6 bg-[radial-gradient(circle_at_1px_1px,var(--color-slate-200)_1px,transparent_0)] bg-size-[16px_16px] p-6 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_1px_1px,var(--color-slate-700)_1px,transparent_0)] ${className}`}
      >
        {children}
      </div>
      {caption && (
        <p className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">{caption}</p>
      )}
    </div>
  );
}

export function Pill({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
