import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { allTopics, categories } from "../data/topics";
import ThemeToggle from "./ThemeToggle";

function TopicSearch() {
  const [query, setQuery] = useState("");
  const [openResults, setOpenResults] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allTopics
      .filter((t) => t.title.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q) || t.categoryTitle.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenResults(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goTo(topic) {
    if (!topic) return;
    navigate(`/topic/${topic.id}`);
    setQuery("");
    setOpenResults(false);
  }

  function onKeyDown(e) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[highlight]);
    } else if (e.key === "Escape") {
      setOpenResults(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative hidden w-56 sm:block">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpenResults(true);
          setHighlight(0);
        }}
        onFocus={() => setOpenResults(true)}
        onKeyDown={onKeyDown}
        placeholder="Search methods…"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm outline-none transition duration-500 ease-out placeholder:text-slate-400 focus:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-500"
      />
      {openResults && results.length > 0 && (
        <ul className="animate-fade-in absolute top-full left-0 z-40 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          {results.map((t, i) => (
            <li key={t.id}>
              <button
                onClick={() => goTo(t)}
                onMouseEnter={() => setHighlight(i)}
                className={`flex w-full flex-col items-start px-3 py-2 text-left transition ${
                  i === highlight ? "bg-indigo-50 dark:bg-indigo-500/10" : ""
                }`}
              >
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.title}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{t.categoryTitle} · {t.tag}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {openResults && query.trim() && results.length === 0 && (
        <div className="animate-fade-in absolute top-full left-0 z-40 mt-2 w-72 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-400 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
          No methods match "{query}"
        </div>
      )}
    </div>
  );
}

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
    <div className="min-h-screen bg-slate-50 transition-colors duration-500 ease-out dark:bg-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur transition-colors duration-500 ease-out dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-black text-white shadow-md transition-transform duration-500 ease-out hover:rotate-6">
              CSS
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              CssStack <span className="font-medium text-indigo-500 dark:text-indigo-400">Atlas</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <TopicSearch />
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

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} CssStack Atlas. All rights reserved. · Created by{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">Naveenkumar V</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:livnaveen@gmail.com" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
              Contact
            </a>
            <a href="https://github.com/NAVEENKUMAR2003301" target="_blank" rel="noreferrer" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
