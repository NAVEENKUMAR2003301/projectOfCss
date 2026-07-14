import { Link } from "react-router-dom";
import { neighbors } from "../data/topics";
import { Pill } from "./Bits";

export default function TopicPage({ id, title, tag, category, summary, children }) {
  const { prev, next } = neighbors(id);

  return (
    <div className="animate-fade-in-up mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <header className="mb-10 space-y-4 border-b border-slate-200 pb-8 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="indigo">{category}</Pill>
          <Pill>{tag}</Pill>
        </div>
        <h1 className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-sky-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl dark:from-indigo-400 dark:via-indigo-300 dark:to-sky-300">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">{summary}</p>
      </header>

      <div className="topic-content space-y-16">{children}</div>

      <nav className="mt-16 grid grid-cols-1 gap-3 border-t border-slate-200 pt-8 dark:border-slate-800 sm:grid-cols-2">
        {prev ? (
          <Link
            to={`/topic/${prev.id}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">← Previous</span>
            <span className="font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            to={`/topic/${next.id}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 sm:ml-auto"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Next →</span>
            <span className="font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">{next.title}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
