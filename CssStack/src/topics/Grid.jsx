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
  const [alignItems, setAlignItems] = useState("stretch");
  const [justifyItems, setJustifyItems] = useState("stretch");
  const [fitWidth, setFitWidth] = useState(420);
  const [fitMode, setFitMode] = useState("auto-fit");

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

      <Section id="grid-align" kicker="Grid has its own alignment" title="justify-items & align-items — positioning inside each cell">
        <BeginnerNote>
          Grid gives every cell its own little "text-align" — except it works on both axes. Once the tracks are
          drawn, each item might not fill its whole cell (it could be smaller). <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">justify-items</code>{" "}
          decides where the item sits <em>left-to-right</em> inside its cell, and <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">align-items</code>{" "}
          decides <em>top-to-bottom</em>. Shrink the items below and watch them slide around inside their cells as
          you flip the buttons.
        </BeginnerNote>
        <ProLabel />
        <p>
          These are easy to confuse with Flexbox's <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">align-items</code>, but
          the axis meaning is different: Grid's <Hi tone="indigo">justify-items</Hi> and{" "}
          <Hi tone="sky">align-items</Hi> always mean "inline axis" and "block axis" respectively, regardless of
          any flex-direction-like setting, because Grid places items in a fixed row/column grid rather than a
          single reflowable axis. Both accept <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">stretch</code> (default),{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">start</code>,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">center</code>, and{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">end</code>. The shorthand{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">place-items: center</code> sets both
          at once — a quick way to perfectly center something inside a grid cell.
        </p>
        <DemoCard label="justify-items / align-items" caption="Each item is smaller than its cell on purpose — flip the buttons to see how it repositions within that cell on each axis.">
          <div className="w-full space-y-3">
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                <span className="pl-2 font-bold text-slate-400">justify-items</span>
                {["stretch", "start", "center", "end"].map((v) => (
                  <button key={v} onClick={() => setJustifyItems(v)} className={`rounded-full px-2 py-1 font-semibold transition ${justifyItems === v ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-700"}`}>{v}</button>
                ))}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                <span className="pl-2 font-bold text-slate-400">align-items</span>
                {["stretch", "start", "center", "end"].map((v) => (
                  <button key={v} onClick={() => setAlignItems(v)} className={`rounded-full px-2 py-1 font-semibold transition ${alignItems === v ? "bg-sky-600 text-white" : "text-slate-500 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-700"}`}>{v}</button>
                ))}
              </div>
            </div>
            <div
              className="w-full rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-3 transition-all duration-300"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: 72, gap: 10, justifyItems, alignItems }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="grid h-10 w-14 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-bold text-white shadow transition-all duration-300"
                  style={{ height: justifyItems === "stretch" && alignItems === "stretch" ? "100%" : 40, width: justifyItems === "stretch" ? "100%" : 56 }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </DemoCard>
        <Callout type="pitfall" title="Wrong property, wrong axis">
          <b>justify-items</b>/<b>align-items</b> position content <em>inside each cell</em>. They're easily
          confused with <b>justify-content</b>/<b>align-content</b>, which instead position the <em>whole track
          grid</em> within the container — and only do anything when the tracks don't add up to the container's
          full size.
        </Callout>
      </Section>

      <Section id="auto-fit" kicker="Responsive without media queries" title="repeat(auto-fit, minmax(...)) — self-adjusting columns">
        <BeginnerNote>
          Instead of writing a media query for every screen size, you can tell Grid "fit as many columns as you
          can, each at least 120px wide, and stretch to fill any leftover space." Drag the slider below to resize
          the container — no breakpoints, no JavaScript, the column count just adjusts itself.
        </BeginnerNote>
        <ProLabel />
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">repeat(auto-fit, minmax(120px, 1fr))</code>{" "}
          asks the engine to repeat as many <Hi tone="indigo">120px-minimum, 1fr-maximum</Hi> tracks as fit in the
          container, then collapse any tracks left empty (because there weren't enough items) down to 0 width — so
          the tracks that do have content stretch to fill the row.
        </p>
        <DemoCard label="Resize the container" caption={`Container width: ${fitWidth}px, mode: grid-template-columns: repeat(${fitMode}, minmax(120px, 1fr))`}>
          <div className="w-full space-y-3">
            <input type="range" min="200" max="700" value={fitWidth} onChange={(e) => setFitWidth(+e.target.value)} className="w-full accent-indigo-500" />
            <div className="flex justify-center gap-2 text-xs">
              {["auto-fit", "auto-fill"].map((m) => (
                <button key={m} onClick={() => setFitMode(m)} className={`rounded-full px-3 py-1 font-bold transition ${fitMode === m ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>{m}</button>
              ))}
            </div>
            <div
              className="mx-auto rounded-lg border-2 border-dashed border-slate-300 bg-white p-3 transition-all duration-150 dark:border-slate-700 dark:bg-slate-800/60"
              style={{ width: fitWidth }}
            >
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${fitMode}, minmax(120px, 1fr))`, gap: 8 }}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="grid h-12 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-bold text-white shadow transition-all duration-300">
                    card {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DemoCard>
        <Callout type="pitfall" title="auto-fit vs. auto-fill — the genuinely confusing part">
          Both repeat as many tracks as fit. The difference only shows up when there are <em>fewer items than
          columns</em>: <b>auto-fit</b> collapses the leftover empty tracks to 0 width, so your existing items
          stretch (via the <code>1fr</code> max) to fill the row. <b>auto-fill</b> keeps those empty tracks
          reserved at their minmax size — your items stay at their minimum width, left-aligned, with visible empty
          space trailing after them. Drag the slider wide with only 3 cards above to see it: auto-fit stretches
          the 3 cards to fill the row, auto-fill leaves gaps where unused columns would go.
        </Callout>
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
        <CodeBlock
          title="grid-alignment-and-auto-fit.css"
          code={`.cell-alignment {
  display: grid;
  justify-items: center;  /* inline axis, per cell: stretch | start | center | end */
  align-items: center;    /* block axis, per cell: same keywords */
  /* place-items: center; -- shorthand for both at once */
}

.responsive-cards {
  display: grid;
  gap: 12px;
  /* fills the row with as many 120px+ columns as fit; collapses
     leftover empty tracks so existing items stretch to fill space */
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  /* auto-fill instead keeps the empty tracks reserved — items stay
     at minmax's minimum width, leaving visible empty space */
}`}
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
            {
              prompt: "A grid item is smaller than its cell. Which property moves it left-to-right within that cell?",
              options: ["justify-content", "justify-items (or justify-self on the item)", "align-content", "grid-auto-flow"],
              answer: 1,
              explain: "justify-items (container) / justify-self (item) position content on the inline axis inside a single cell — justify-content instead moves the whole track grid within the container.",
            },
            {
              prompt: "grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) has only 3 items but room for 5 columns. What happens, and how would auto-fill differ?",
              options: [
                "Nothing differs between auto-fit and auto-fill",
                "auto-fit collapses the 2 empty tracks to 0 width so the 3 items stretch to fill the row; auto-fill keeps the empty tracks reserved, leaving the 3 items at 120px with visible empty space",
                "auto-fit adds more items automatically",
                "auto-fill deletes the extra tracks entirely, breaking the layout",
              ],
              answer: 1,
              explain: "Both fit as many minmax tracks as possible, but auto-fit collapses unused (empty) tracks to zero width so existing items grow via the 1fr max; auto-fill keeps those empty tracks at their minmax size, so items don't stretch and gaps stay visible.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
