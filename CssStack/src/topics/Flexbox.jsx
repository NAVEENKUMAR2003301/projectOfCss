import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Flexbox() {
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [alignContent, setAlignContent] = useState("flex-start");
  const [wrap, setWrap] = useState(false);

  return (
    <TopicPage
      id="flexbox"
      category="Layout Systems"
      tag="1-D Layout"
      title="Flexbox"
      summary="Flexbox lays out children along a single axis, then lets you redistribute leftover space and control cross-axis alignment — all without magic numbers."
    >
      <Section id="how" kicker="How it works" title="The two-axis mental model">
        <BeginnerNote>
          Imagine putting books on a single shelf. <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">display: flex</code>{" "}
          turns a container into that shelf. <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">justify-content</code>{" "}
          controls how the books are spaced out <em>along</em> the shelf (left, center, spread out).{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">align-items</code> controls how tall
          each book stands <em>across</em> the shelf (top edge, bottom edge, centered). If you stack books on{" "}
          <em>multiple</em> shelves (wrapping), <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">align-content</code>{" "}
          controls how those shelves themselves are spaced apart. That's the whole idea — flexbox just arranges
          items along one line (or several, when wrapped) and gives you knobs for spacing them.
        </BeginnerNote>
        <ProLabel />
        <p>
          Setting <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">display: flex</code> on a container
          creates a <Hi tone="indigo">main axis</Hi> (set by <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">flex-direction</code>)
          and a perpendicular <Hi tone="sky">cross axis</Hi>. Every alignment property picks one of the two:{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">justify-content</code> works on the main axis,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">align-items</code> aligns items on the cross axis
          <em> within a single line</em>, and <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">align-content</code>{" "}
          aligns entire lines on the cross axis <em>when there's more than one</em> (i.e. only matters together with{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">flex-wrap: wrap</code>).
        </p>
        <p>
          Sizing is where flexbox actually earns its name. Each child has three growth inputs:{" "}
          <Hi tone="amber">flex-grow</Hi> (how much of the leftover space it claims, proportionally),{" "}
          <Hi tone="amber">flex-shrink</Hi> (how much it gives up when space is tight), and{" "}
          <Hi tone="amber">flex-basis</Hi> (its starting size before grow/shrink is applied). The shorthand{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">flex: 1</code> expands to{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">flex: 1 1 0%</code> — grow and shrink
          equally from a zero basis, which is why it produces perfectly equal columns.
        </p>
        <Callout type="tip" title="The algorithm, briefly">
          The engine first lays out every child at its flex-basis. If there's leftover space, it distributes it
          proportionally to flex-grow values. If children overflow, it removes space proportionally to{" "}
          <code>flex-shrink × flex-basis</code> — which is why a child with flex-shrink: 0 refuses to compress
          even when its siblings do.
        </Callout>
        <Callout type="pitfall" title="justify-content vs. align-items vs. align-content — don't mix them up">
          <b>justify-content</b>: spaces items along the <em>main</em> axis (one line). <b>align-items</b>: aligns
          items along the <em>cross</em> axis, within their own line. <b>align-content</b>: spaces whole lines
          apart on the cross axis — it does nothing unless <code>flex-wrap: wrap</code> is set <em>and</em> there
          are extra lines to distribute.
        </Callout>
      </Section>

      <Section id="justify" kicker="Main axis" title="justify-content — every value, side by side">
        <BeginnerNote>
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">justify-content</code> answers one
          question: "where does the leftover space along the shelf go?" Click each button below and watch the
          same five boxes rearrange — that's the entire property.
        </BeginnerNote>
        <AxisPlayground
          property="justify-content"
          styleKey="justifyContent"
          values={["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]}
          descriptions={{
            "flex-start": "Default. Items pack against the start of the main axis, leftover space pushed to the end.",
            "flex-end": "Items pack against the end of the main axis, leftover space pushed to the start.",
            "center": "Items huddle in the middle; equal leftover space on both sides.",
            "space-between": "Leftover space is split into equal gaps between items only — first and last items touch the edges.",
            "space-around": "Each item gets equal space on both sides — edge gaps end up half the size of between-item gaps.",
            "space-evenly": "Every gap — including the two edges — is exactly equal.",
          }}
        />
      </Section>

      <Section id="align-items" kicker="Cross axis, single line" title="align-items — every value, side by side">
        <BeginnerNote>
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">align-items</code> answers "how tall
          does each item stand, across the shelf?" Items below have different natural heights so the differences
          are obvious — watch the numbers shift as you switch values.
        </BeginnerNote>
        <AxisPlayground
          property="align-items"
          styleKey="alignItems"
          crossAxis
          values={["stretch", "flex-start", "center", "flex-end", "baseline"]}
          descriptions={{
            stretch: "Default. Items with no explicit height stretch to fill the container's cross-axis size.",
            "flex-start": "Items align to the start (top, in a row) of the cross axis, keeping their own height.",
            center: "Items are centered on the cross axis.",
            "flex-end": "Items align to the end (bottom, in a row) of the cross axis.",
            baseline: "Items align so their text baselines line up — handy when font sizes differ.",
          }}
        />
      </Section>

      <Section id="align-content" kicker="Cross axis, multiple lines" title="align-content — spacing wrapped lines">
        <BeginnerNote>
          This one only makes sense once items <em>wrap</em> onto more than one line.{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">align-content</code> then controls
          how those lines (not individual items) are spaced across the container — the exact same keywords as{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">justify-content</code>, just applied
          to whole rows instead of items.
        </BeginnerNote>
        <AlignContentPlayground
          value={alignContent}
          onChange={setAlignContent}
        />
        <Callout type="pitfall" title="Common mix-up">
          A single-line flex container ignores <code>align-content</code> entirely — if changing it does nothing,
          check that <code>flex-wrap: wrap</code> is on <em>and</em> there's enough content to actually create a
          second line.
        </Callout>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — full flex playground">
        <DemoCard label="Flex container" caption="Every control maps directly to a CSS property on the parent — flip them to see main/cross axis behavior change live.">
          <div className="w-full space-y-3">
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <Selector label="direction" value={direction} onChange={setDirection} options={["row", "row-reverse", "column"]} />
              <Selector label="justify" value={justify} onChange={setJustify} options={["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]} />
              <Selector label="align" value={align} onChange={setAlign} options={["stretch", "flex-start", "center", "flex-end", "baseline"]} />
              <button onClick={() => setWrap((w) => !w)} className={`rounded-full px-3 py-1 font-bold transition ${wrap ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>wrap: {wrap ? "wrap" : "nowrap"}</button>
            </div>
            <div
              className="min-h-[160px] w-full gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-3 transition-all duration-300"
              style={{ display: "flex", flexDirection: direction, justifyContent: justify, alignItems: align, flexWrap: wrap ? "wrap" : "nowrap" }}
            >
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="grid place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-bold text-white shadow transition-all duration-300" style={{ width: 60, height: n === 2 ? 90 : 60 }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="Grow, shrink, basis">
        <CodeBlock
          title="flexbox.css"
          code={`.row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.sidebar   { flex: 0 0 240px; }   /* fixed: never grow or shrink */
.main      { flex: 1 1 0%;    }   /* fills all remaining space  */
.no-shrink { flex-shrink: 0;  }   /* refuses to compress under pressure */`}
        />
        <CodeBlock
          title="alignment-cheatsheet.css"
          code={`.shelf {
  display: flex;
  flex-wrap: wrap;             /* required for align-content to matter */

  justify-content: center;     /* main axis: start | end | center |
                                   space-between | space-around | space-evenly */
  align-items: center;         /* cross axis, per line: stretch | start |
                                   end | center | baseline */
  align-content: space-between;/* cross axis, across lines: same keywords
                                   as justify-content, only kicks in when
                                   there is more than one line */
}`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "In a row flex container, which property controls vertical alignment of items?",
              options: ["justify-content", "align-items", "flex-direction", "align-content"],
              answer: 1,
              explain: "With flex-direction: row, the main axis is horizontal, so align-items (cross-axis) controls vertical positioning.",
            },
            {
              prompt: "Two children both have flex: 1. One has more content than the other. What happens?",
              options: ["The one with more content gets a wider box", "They end up equal width, since flex:1 sets a zero basis and equal grow", "The layout breaks", "Only the first child grows"],
              answer: 1,
              explain: "flex: 1 expands to flex: 1 1 0% — both start from zero basis and grow equally, ignoring content size, producing equal-width columns.",
            },
            {
              prompt: "A flex item has flex-shrink: 0. What happens when the container is too narrow to fit all children?",
              options: ["It shrinks anyway", "It overflows rather than shrinking, while siblings shrink to compensate", "The whole layout collapses", "It wraps to a new line automatically"],
              answer: 1,
              explain: "flex-shrink: 0 opts that item out of the shrink algorithm entirely — the remaining negative space is taken from shrinkable siblings only.",
            },
            {
              prompt: "What's the difference between space-between and space-evenly on justify-content?",
              options: ["They're identical", "space-between leaves no gap at the edges; space-evenly makes the edge gaps equal to the between-item gaps", "space-evenly only works with 2 items", "space-between only works vertically"],
              answer: 1,
              explain: "space-between puts all leftover space strictly between items (edges touch the container); space-evenly distributes it so every gap, including the two edges, is identical.",
            },
            {
              prompt: "You set flex-wrap: wrap and align-content: space-between, but nothing visually changes. Most likely reason?",
              options: ["align-content is misspelled in all browsers", "The container only has one line of items — align-content needs multiple lines to have any effect", "align-content requires flex-direction: column", "space-between is not a valid align-content value"],
              answer: 1,
              explain: "align-content distributes leftover space between wrapped lines. With only a single line, there's nothing for it to distribute — it silently does nothing.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}

function Selector({ label, value, onChange, options }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
      <span className="pl-2 font-bold text-slate-400">{label}</span>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} className={`rounded-full px-2 py-1 font-semibold transition ${value === o ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-700"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

// Heights/font-sizes chosen so cross-axis demos (align-items, baseline) show a visible difference.
const ITEM_HEIGHTS = [46, 78, 34, 62, 50];
const ITEM_FONT_SIZES = [12, 26, 12, 20, 16];

function AxisPlayground({ property, styleKey, values, descriptions, crossAxis = false }) {
  const [active, setActive] = useState(values[0]);

  return (
    <DemoCard
      label={property}
      caption={descriptions[active]}
    >
      <div className="w-full space-y-3">
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {values.map((v) => (
            <button
              key={v}
              onClick={() => setActive(v)}
              className={`rounded-full px-3 py-1 font-semibold transition ${active === v ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}`}
            >
              {v}
            </button>
          ))}
        </div>
        <div
          className="min-h-[140px] w-full rounded-lg border-2 border-dashed border-slate-300 bg-white p-3 transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/60"
          style={{ display: "flex", gap: 10, [styleKey]: active }}
        >
          {ITEM_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="grid shrink-0 place-items-end justify-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 font-bold text-white shadow transition-all duration-300"
              style={{
                width: 52,
                height: crossAxis && property === "align-items" ? h : 52,
                fontSize: property === "align-items" ? ITEM_FONT_SIZES[i] : 14,
                alignSelf: "auto",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </DemoCard>
  );
}

function AlignContentPlayground({ value, onChange }) {
  const values = ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"];
  const descriptions = {
    "flex-start": "Lines pack against the start of the cross axis; leftover space collects at the end.",
    "flex-end": "Lines pack against the end of the cross axis; leftover space collects at the start.",
    center: "Lines huddle in the middle of the container, equal space above and below.",
    "space-between": "Leftover cross-axis space is split into equal gaps between lines only.",
    "space-around": "Each line gets equal space above and below it.",
    stretch: "Default. Lines stretch to fill the leftover cross-axis space evenly.",
  };

  return (
    <DemoCard label="align-content" caption={descriptions[value]}>
      <div className="w-full space-y-3">
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {values.map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`rounded-full px-3 py-1 font-semibold transition ${value === v ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}`}
            >
              {v}
            </button>
          ))}
        </div>
        <div
          className="h-[260px] w-full rounded-lg border-2 border-dashed border-slate-300 bg-white p-3 transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/60"
          style={{ display: "flex", flexWrap: "wrap", gap: 8, alignContent: value, justifyContent: "center" }}
        >
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-bold text-white shadow transition-all duration-300"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </DemoCard>
  );
}
