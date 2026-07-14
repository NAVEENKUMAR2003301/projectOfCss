import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function VariablesStacking() {
  const [hue, setHue] = useState(245);
  const [z, setZ] = useState({ a: 1, b: 2 });

  return (
    <TopicPage
      id="variables-stacking"
      category="Responsive & Advanced"
      tag="System Design"
      title="Custom Properties & Stacking Context"
      summary="Two systems that separate junior from senior CSS: custom properties (real, cascading, inheritable variables) and stacking contexts (why z-index sometimes 'just doesn't work')."
    >
      <Section id="how" kicker="How it works" title="Variables cascade like any other property">
        <BeginnerNote>
          A custom property (written <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">--name</code>)
          is just a labeled value you can reuse anywhere with <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">var(--name)</code> —
          like a nickname for a color so you only have to update it in one place. Stacking context is the reason{" "}
          <b>z-index</b> sometimes seems to "not work": it only settles fights between elements that share the same
          parent "layer group" — it can't reach outside that group no matter how big the number is.
        </BeginnerNote>
        <ProLabel />
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">--brand-color: #4f46e5</code> is a real
          CSS declaration — it participates in the <Hi tone="indigo">cascade and inheritance</Hi> exactly like{" "}
          <code>color</code> does. Redeclaring it inside a nested selector overrides it for that subtree only, which
          is what makes custom properties a native theming mechanism (dark mode, component variants) without any
          preprocessor.
        </p>
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">var(--x, fallback)</code> resolves at{" "}
          <Hi tone="sky">computed-value time</Hi>, not parse time — unlike Sass variables, which are compiled away
          before the browser ever sees them. This means custom properties can be changed live via JavaScript or
          media queries and the browser will re-paint instantly.
        </p>
        <Callout type="pitfall" title="z-index only compares within the same stacking context">
          A <Hi tone="amber">stacking context</Hi> is created by properties like <code>position</code> + z-index,{" "}
          <code>opacity &lt; 1</code>, <code>transform</code>, or <code>filter</code>. Once created, every z-index
          inside it is compared <em>only</em> against siblings in that same context — a child with{" "}
          <code>z-index: 9999</code> can never appear above an element outside its parent's stacking context, no
          matter how high the number.
        </Callout>
        <p>
          This is the single most common z-index bug: adding <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">transform</code> or{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">opacity</code> to a parent for an
          unrelated reason silently creates a new stacking context and traps all its children's z-index values
          inside it.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — one variable, many consumers">
        <DemoCard label="--hue custom property" caption="One custom property drives background, border, and text color of three separate elements simultaneously.">
          <div className="w-full space-y-4" style={{ "--hue": hue }}>
            <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(+e.target.value)} className="w-full accent-indigo-500" />
            <div className="flex flex-wrap justify-center gap-3">
              <div className="h-14 w-14 rounded-lg" style={{ background: `hsl(${hue} 80% 60%)` }} />
              <div className="grid h-14 w-14 place-items-center rounded-lg border-4 bg-white text-xs font-bold dark:bg-slate-800" style={{ borderColor: `hsl(${hue} 80% 60%)`, color: `hsl(${hue} 80% 40%)` }}>
                text
              </div>
              <div className="h-14 w-14 rounded-full" style={{ boxShadow: `0 0 0 4px hsl(${hue} 80% 60% / 0.3), 0 8px 16px hsl(${hue} 80% 60% / 0.4)`, background: `hsl(${hue} 80% 60%)` }} />
            </div>
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">--hue: {hue} → hsl({hue} 80% 60%)</p>
          </div>
        </DemoCard>

        <DemoCard label="Stacking context trap" caption="Box B has a higher z-index, but its parent has opacity < 1 (a new stacking context) — click to prove B still can't escape above A.">
          <div className="relative h-32 w-full max-w-sm">
            <div className="absolute left-6 top-4 h-16 w-24 rounded-lg bg-rose-400 text-center text-xs font-bold text-white shadow-lg" style={{ zIndex: z.a }}>
              A · z:{z.a}
            </div>
            <div className="absolute left-16 top-10 h-16 w-24 rounded-lg" style={{ opacity: 0.99 }}>
              <div className="grid h-full w-full place-items-center rounded-lg bg-indigo-500 text-center text-xs font-bold text-white shadow-lg" style={{ zIndex: z.b }}>
                B · z:{z.b} (parent has opacity)
              </div>
            </div>
          </div>
          <button onClick={() => setZ((s) => ({ ...s, b: s.b === 2 ? 999 : 2 }))} className="mt-3 rounded-full bg-slate-800 px-3 py-1.5 text-xs font-bold text-white">
            Try z-index: {z.b === 2 ? "999" : "2"} on B
          </button>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="Theming with custom properties">
        <CodeBlock
          title="variables.css"
          code={`:root {
  --brand: #4f46e5;
  --surface: #ffffff;
}

[data-theme="dark"] {
  --brand: #818cf8;
  --surface: #0f172a;
}

.card {
  background: var(--surface);
  border: 1px solid var(--brand, #ccc); /* fallback if undefined */
}`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "Why can var(--x) respond live to a JS-driven style change, while a Sass variable can't?",
              options: [
                "Sass variables are faster",
                "CSS custom properties resolve at computed-value time in the browser, not compile time, so runtime changes trigger a repaint",
                "var() only works with numbers",
                "They behave identically",
              ],
              answer: 1,
              explain: "Sass variables are stripped out during compilation into static values; CSS custom properties remain live in the browser and are re-evaluated whenever their value changes.",
            },
            {
              prompt: "A child has z-index: 9999 but never appears above a sibling of its parent. Most likely cause?",
              options: [
                "z-index doesn't support 4-digit numbers",
                "The parent creates its own stacking context, trapping the child's z-index comparisons within it",
                "The child needs position: fixed",
                "CSS is broken",
              ],
              answer: 1,
              explain: "z-index only competes against other elements within the same stacking context — a parent with opacity, transform, or filter set creates a new context that boxes the child in.",
            },
            {
              prompt: "Which of these does NOT create a new stacking context?",
              options: ["opacity: 0.99", "transform: translateZ(0)", "margin: 20px", "position: relative combined with z-index: 1"],
              answer: 2,
              explain: "margin has no effect on stacking — opacity < 1, any transform, and a positioned element with a z-index all establish new stacking contexts.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
