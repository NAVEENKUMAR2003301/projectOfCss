import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Grid() {
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(10);
  const [spanFirst, setSpanFirst] = useState(false);

  return (
    <TopicPage
      id="grid"
      category="Layout Systems"
      tag="2-D Layout"
      title="CSS Grid"
      summary="Grid lays out children on rows and columns simultaneously — it's the only native CSS system that reasons about layout in two dimensions at once."
    >
      <Section id="how" kicker="How it works" title="Tracks, lines, and the fr unit">
        <BeginnerNote>
          Think of Grid like drawing a spreadsheet on your page: you decide how many columns and rows exist, then
          you place each item in a specific cell (or let it flow automatically). Unlike Flexbox — which only
          thinks about one line at a time — Grid lets you plan the whole layout, rows and columns together, before
          any content goes in.
        </BeginnerNote>
        <ProLabel />
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">grid-template-columns</code> defines{" "}
          <Hi tone="indigo">tracks</Hi> — the column widths — and implicitly numbers the <Hi tone="sky">lines</Hi>{" "}
          between them starting at 1. Every child is placed by referencing these line numbers (explicitly via{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">grid-column</code>, or implicitly by
          document order).
        </p>
        <p>
          The <Hi tone="amber">fr</Hi> unit represents a fraction of the leftover space <em>after</em> fixed-size
          tracks are subtracted — <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">grid-template-columns: 200px 1fr 1fr</code>{" "}
          reserves 200px, then splits whatever remains evenly between the other two. This is different from
          percentages, which are always relative to the full container, not the remainder.
        </p>
        <Callout type="spec" title="Explicit vs. implicit grid">
          Tracks you declare with <code>grid-template-*</code> form the <b>explicit grid</b>. If content overflows
          it (e.g. a child placed on row 5 when you only defined 3), the engine auto-generates extra{" "}
          <b>implicit</b> tracks, sized by <code>grid-auto-rows</code> / <code>grid-auto-columns</code>.
        </Callout>
        <p>
          <Hi tone="emerald">grid-template-areas</Hi> layers a readable name on top of the same line-based system —
          you draw the layout as ASCII art, and each named cell maps back to line coordinates automatically.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — track & span playground">
        <DemoCard label="Grid container" caption="Change column count and gap on the parent; toggle spanning on the first cell to see grid-column: span 2 in action.">
          <div className="w-full space-y-3">
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                <span className="pl-2 font-bold text-slate-400">cols</span>
                {[2, 3, 4].map((c) => (
                  <button key={c} onClick={() => setCols(c)} className={`rounded-full px-2 py-1 font-semibold transition ${cols === c ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-700"}`}>{c}</button>
                ))}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                <span className="pl-2 font-bold text-slate-400">gap</span>
                {[4, 10, 20].map((g) => (
                  <button key={g} onClick={() => setGap(g)} className={`rounded-full px-2 py-1 font-semibold transition ${gap === g ? "bg-sky-600 text-white" : "text-slate-500 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-700"}`}>{g}px</button>
                ))}
              </div>
              <button onClick={() => setSpanFirst((s) => !s)} className={`rounded-full px-3 py-1 font-bold transition ${spanFirst ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>
                span 2: {spanFirst ? "on" : "off"}
              </button>
            </div>
            <div
              className="w-full rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-3 transition-all duration-300"
              style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="grid h-16 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-bold text-white shadow transition-all duration-300"
                  style={{ gridColumn: n === 1 && spanFirst ? "span 2" : undefined }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="grid-template-areas layout">
        <CodeBlock
          title="grid.css"
          code={`.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main   { grid-area: main; }
.footer { grid-area: footer; }`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "grid-template-columns: 200px 1fr 2fr — if the container is 800px wide, how wide is the 1fr track?",
              options: ["200px", "300px", "200px", "600px ÷ 3 = 200px"],
              answer: 2,
              explain: "800 - 200 fixed = 600px leftover, split 1:2 across the fr tracks → 1fr = 200px, 2fr = 400px.",
            },
            {
              prompt: "A child is placed on grid-row: 6 but the container only defines 3 explicit rows. What happens?",
              options: ["The child disappears", "It throws a CSS error", "The engine creates implicit rows to fit it, sized by grid-auto-rows", "It gets clipped to row 3"],
              answer: 2,
              explain: "Grid always accommodates out-of-bounds placement by generating implicit tracks — grid-auto-rows controls their size (default: auto).",
            },
            {
              prompt: "What's the key difference between Grid and Flexbox?",
              options: ["Grid can't wrap; Flexbox can", "Grid reasons about rows and columns together; Flexbox lays out along one axis at a time", "Flexbox is newer", "There's no real difference"],
              answer: 1,
              explain: "Flexbox is fundamentally one-dimensional (it packs along a main axis, wrapping to new lines independently); Grid places items against both row and column tracks simultaneously.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
