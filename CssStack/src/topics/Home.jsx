import { Link } from "react-router-dom";
import { categories, allTopics } from "../data/topics";

const FEATURES = [
  { icon: "📚", title: `${allTopics.length} CSS methods, explained in 3 tiers`, desc: "Beginner → Technical → Engine-level, on every single page." },
  { icon: "🎛️", title: "Live, interactive demos", desc: "Every method ships with a hands-on playground, not just a static screenshot." },
  { icon: "✅", title: "Built-in practice questions", desc: "Each topic ends with a quiz that checks what actually stuck." },
  { icon: "⚡", title: "Modern, maintainable codebase", desc: "React 19 + Tailwind 4 + Vite — no legacy tooling to untangle." },
];

const BUILT_WITH = ["React 19", "React Router 7", "Tailwind CSS 4", "Vite 8"];

const AUDIENCE = [
  { title: "Educators & bootcamps", desc: "Drop-in curriculum for teaching CSS beyond the basics — structured, sequenced, and quiz-tested." },
  { title: "Advanced developers", desc: "A reference for the parts of CSS that don't come up until something breaks in production." },
  { title: "Course creators", desc: "A ready-made content base and interaction pattern to build a paid CSS course on top of." },
];

const ROADMAP = ["User accounts & progress tracking", "In-browser code playground", "Downloadable cheat sheets per chapter", "Search across all methods"];

export default function Home() {
  return (
    <div className="animate-fade-in-up mx-auto max-w-6xl px-6 py-14 sm:px-10">
      {/* Hero */}
      <section className="mb-16 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400">
          The complete, deep-dive CSS curriculum
        </p>
        <h1 className="mx-auto max-w-3xl bg-gradient-to-r from-indigo-700 via-indigo-500 to-sky-500 bg-clip-text text-5xl font-extrabold leading-[1.1] tracking-tight text-transparent sm:text-6xl dark:from-indigo-400 dark:via-indigo-300 dark:to-sky-300">
          Every CSS method, explained down to the rendering engine.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          For educators, bootcamps, and advanced developers. Each page starts with a{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">beginner-friendly explanation</span>, then goes{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">technical</span>, shows a{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">live animated demo</span>, and ends with{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">practice questions</span> to test what stuck.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/topic/selectors"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 dark:shadow-indigo-950"
          >
            Start with Selectors →
          </Link>
          <a
            href="#deep-dive"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500"
          >
            See a deep dive ↓
          </a>
        </div>
      </section>

      {/* Deep-dive showcase */}
      <section id="deep-dive" className="mb-16 scroll-mt-24">
        <div className="mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">The unique part</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">Not "what it does" — why the engine does it</h2>
        </div>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-sky-50 px-4 py-2 dark:border-slate-800 dark:from-indigo-500/10 dark:to-sky-500/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
              Excerpt · Stacking Context
            </span>
          </div>
          <div className="space-y-3 p-6 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              A <span className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">stacking context</span>{" "}
              is created by properties like <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">position</code> + z-index,{" "}
              <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">opacity &lt; 1</code>,{" "}
              <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">transform</code>, or{" "}
              <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">filter</code>. Once created, every z-index inside it
              is compared <em>only</em> against siblings in that same context — a child with{" "}
              <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">z-index: 9999</code> can never appear above an
              element outside its parent's stacking context, no matter how high the number.
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">— from the "Custom Properties &amp; Stacking Context" method</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">What you get</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 text-2xl">{f.icon}</div>
              <h3 className="mb-1 font-bold text-slate-800 dark:text-slate-100">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Built with</span>
          {BUILT_WITH.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Who is this for */}
      <section className="mb-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">Who this is for</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {AUDIENCE.map((a) => (
            <div key={a.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-1 font-bold text-slate-800 dark:text-slate-100">{a.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topic grid */}
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
                  className="stagger-in group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-500 ease-out hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:shadow-indigo-950"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-50 transition duration-500 ease-out group-hover:scale-125 group-hover:bg-indigo-100 dark:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20" />
                  <div className="relative">
                    <span className="mb-3 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 transition group-hover:bg-indigo-100 group-hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300">
                      {t.tag}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 transition group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-400">
                      {String(ci + 1)}.{ti + 1} {t.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-500 opacity-0 transition duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-100 dark:text-indigo-400">
                      Open method →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Roadmap */}
      <section className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/50">
        <h2 className="mb-3 text-lg font-bold text-slate-800 dark:text-slate-100">Planned next</h2>
        <ul className="grid gap-2 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-2">
          {ROADMAP.map((r) => (
            <li key={r} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {r}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
