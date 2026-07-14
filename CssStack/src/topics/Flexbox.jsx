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
          each book stands <em>across</em> the shelf (top edge, bottom edge, centered). That's the whole idea —
          flexbox just arranges items along one line and gives you knobs for spacing them.
        </BeginnerNote>
        <ProLabel />
        <p>
          Setting <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">display: flex</code> on a container
          creates a <Hi tone="indigo">main axis</Hi> (set by <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">flex-direction</code>)
          and a perpendicular <Hi tone="sky">cross axis</Hi>. Every alignment property picks one of the two:{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">justify-content</code> works on the main axis,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">align-items</code> on the cross axis.
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
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — full flex playground">
        <DemoCard label="Flex container" caption="Every control maps directly to a CSS property on the parent — flip them to see main/cross axis behavior change live.">
          <div className="w-full space-y-3">
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <Selector label="direction" value={direction} onChange={setDirection} options={["row", "row-reverse", "column"]} />
              <Selector label="justify" value={justify} onChange={setJustify} options={["flex-start", "center", "space-between", "space-around"]} />
              <Selector label="align" value={align} onChange={setAlign} options={["stretch", "flex-start", "center", "flex-end"]} />
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
