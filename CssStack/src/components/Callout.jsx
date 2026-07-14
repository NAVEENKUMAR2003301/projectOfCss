
const STYLES = {
  important: {
    wrap: "border-amber-300 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-500/10",
    icon: "bg-amber-400 text-white dark:bg-amber-400",
    label: "text-amber-700 dark:text-amber-300",
    glyph: "!",
  },
  tip: {
    wrap: "border-emerald-300 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-500/10",
    icon: "bg-emerald-400 text-white dark:bg-emerald-400",
    label: "text-emerald-700 dark:text-emerald-300",
    glyph: "i",
  },
  pitfall: {
    wrap: "border-rose-300 bg-rose-50 dark:border-rose-800/60 dark:bg-rose-500/10",
    icon: "bg-rose-400 text-white dark:bg-rose-400",
    label: "text-rose-700 dark:text-rose-300",
    glyph: "×",
  },
  spec: {
    wrap: "border-indigo-300 bg-indigo-50 dark:border-indigo-800/60 dark:bg-indigo-500/10",
    icon: "bg-indigo-400 text-white dark:bg-indigo-400",
    label: "text-indigo-700 dark:text-indigo-300",
    glyph: "§",
  },
};

export default function Callout({ type = "important", title, children }) {
  const s = STYLES[type] ?? STYLES.important;
  return (
    <div className={`flex gap-3 rounded-xl border ${s.wrap} p-4 shadow-sm transition-colors duration-300`}>
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${s.icon}`}>
        {s.glyph}
      </div>
      <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {title && <p className={`mb-1 font-semibold ${s.label}`}>{title}</p>}
        {children}
      </div>
    </div>
  );
}
