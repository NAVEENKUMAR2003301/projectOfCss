import { Link } from "react-router-dom";
import { categories } from "../data/topics";

export default function Home() {
  return (
    <div className="animate-fade-in-up mx-auto max-w-6xl px-6 py-14 sm:px-10">
      <section className="mb-16 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400">
          A hierarchical field guide to CSS
        </p>
        <h1 className="mx-auto max-w-3xl bg-gradient-to-r from-indigo-700 via-indigo-500 to-sky-500 bg-clip-text text-5xl font-extrabold leading-[1.1] tracking-tight text-transparent sm:text-6xl dark:from-indigo-400 dark:via-indigo-300 dark:to-sky-300">
          Every CSS method, explained down to the rendering engine.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          Pick a method below. Each page starts with a{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">beginner-friendly explanation</span>, then goes{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">technical</span>, shows a{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">live animated demo</span>, and ends with{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">practice questions</span> to test what stuck.
        </p>
      </section>

      <div className="space-y-14">
        {categories.map((cat, ci) => (
          <section key={cat.id}>
            <div className="mb-5 flex items-baseline gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                {ci + 1}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{cat.title}</h2>
              <p className="hidden text-sm text-slate-400 dark:text-slate-500 sm:block">{cat.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.topics.map((t, ti) => (
                <Link
                  key={t.id}
                  to={`/topic/${t.id}`}
                  style={{ animationDelay: `${(ci * 3 + ti) * 40}ms` }}
                  className="stagger-in group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:shadow-indigo-950"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-50 transition duration-300 group-hover:scale-125 group-hover:bg-indigo-100 dark:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20" />
                  <div className="relative">
                    <span className="mb-3 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 transition group-hover:bg-indigo-100 group-hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300">
                      {t.tag}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 transition group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-400">
                      {String(ci + 1)}.{ti + 1} {t.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-500 opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-indigo-400">
                      Open method →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
