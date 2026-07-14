import { useState } from "react";

function Question({ index, q }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const choose = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <p className="mb-3 flex gap-2 font-semibold text-slate-800 dark:text-slate-100">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
          {index + 1}
        </span>
        {q.prompt}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isPicked = i === selected;
          let style =
            "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10";
          if (revealed && isCorrect)
            style = "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-300";
          else if (revealed && isPicked && !isCorrect)
            style = "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500 dark:bg-rose-500/10 dark:text-rose-300";
          else if (revealed)
            style = "border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600";

          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${style}`}
            >
              {opt}
              {revealed && isCorrect && <span className="ml-1">✓</span>}
              {revealed && isPicked && !isCorrect && <span className="ml-1">✗</span>}
            </button>
          );
        })}
      </div>
      {revealed && (
        <p className="animate-fade-in-up mt-3 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-300">
          <span className="font-bold">Why: </span>
          {q.explain}
        </p>
      )}
    </div>
  );
}

export default function Quiz({ questions = [] }) {
  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <Question key={i} index={i} q={q} />
      ))}
    </div>
  );
}
