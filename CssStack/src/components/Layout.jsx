import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { categories } from "../data/topics";
import ThemeToggle from "./ThemeToggle";

function Sidebar({ onNavigate }) {
  const location = useLocation();
  return (
    <nav className="space-y-7 px-1">
      {categories.map((cat) => (
        <div key={cat.id}>
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            {cat.title}
          </p>
          <ul className="space-y-1">
            {cat.topics.map((t) => {
              const to = `/topic/${t.id}`;
              const active = location.pathname === to;
              return (
                <li key={t.id}>
                  <NavLink
                    to={to}
                    onClick={onNavigate}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-950"
                        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                    }`}
                  >
                    <span>{t.title}</span>
                    {active && <span className="text-xs">●</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-black text-white shadow-md transition-transform duration-300 hover:rotate-6">
              CSS
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              CssStack <span className="font-medium text-indigo-500 dark:text-indigo-400">Atlas</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300 lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
            <div className="hidden items-center gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 lg:flex">
              <Link to="/" className="rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                Home
              </Link>
              <Link
                to="/"
                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
              >
                12 Methods · 4 Chapters
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl items-start gap-8 px-4 py-6 sm:px-6">
        <aside className="hidden w-64 shrink-0 lg:sticky lg:top-20 lg:block">
          <Sidebar />
        </aside>

        {open && (
          <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
            <div
              className="animate-fade-in-up h-full w-72 overflow-y-auto bg-white p-4 shadow-xl dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
