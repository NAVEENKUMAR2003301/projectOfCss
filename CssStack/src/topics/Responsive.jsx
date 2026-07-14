import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Responsive() {
  const [width, setWidth] = useState(500);

  return (
    <TopicPage
      id="responsive"
      category="Responsive & Advanced"
      tag="Adaptation"
      title="Media Queries & Responsive Units"
      summary="Responsive CSS is really two systems working together: conditional rule application (media queries) and units that resolve differently depending on context (%, vw, vh, clamp)."
    >
      <Section id="how" kicker="How it works" title="Breakpoints are conditions, not devices">
        <BeginnerNote>
          A media query is just an "if" statement for your CSS: <i>"if the screen is at least 640px wide, use these
          styles instead."</i> That's it. It doesn't know or care whether it's a phone, tablet, or a browser
          window someone resized — it only checks the current width (or another condition) and reacts.
        </BeginnerNote>
        <ProLabel />
        <p>
          A <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">@media</code> query is evaluated
          continuously by the layout engine — any time the viewport (or another queried feature) changes, matching
          rules are applied or removed, triggering a fresh layout pass. It has nothing to do with detecting a
          "device"; it only measures the current <Hi tone="indigo">viewport and environment</Hi>.
        </p>
        <p>
          <Hi tone="sky">mobile-first</Hi> CSS writes unprefixed rules for the smallest layout, then overrides with{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">min-width</code> queries as the viewport
          grows — this means small screens never have to parse or override desktop-only rules, and the cascade
          naturally layers complexity upward.
        </p>
        <Callout type="spec" title="Viewport units">
          <ul className="list-disc space-y-1 pl-5">
            <li><code>vw</code> / <code>vh</code> — 1% of viewport width/height</li>
            <li><code>%</code> — relative to the nearest sized ancestor, not the viewport</li>
            <li><code>clamp(min, preferred, max)</code> — fluid value that scales with the viewport but never leaves the min/max bounds</li>
            <li><code>min()</code> / <code>max()</code> — pick the smaller/larger of a list of values, evaluated live</li>
          </ul>
        </Callout>
        <p>
          <Hi tone="amber">clamp()</Hi> in particular replaced a huge amount of media-query-based font scaling: a
          single declaration like <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">clamp(1.5rem, 4vw, 3rem)</code>{" "}
          produces continuously fluid type instead of jumping at fixed breakpoints.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — drag the 'viewport'">
        <DemoCard label="Simulated container" caption="Dragging changes the container's width — a real @media query would react to this the same way the layout below does.">
          <div className="w-full space-y-3">
            <input type="range" min="220" max="600" value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full accent-indigo-500" />
            <div className="mx-auto rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-3 transition-all duration-150" style={{ width }}>
              <div className={`grid gap-2 ${width < 380 ? "grid-cols-1" : width < 500 ? "grid-cols-2" : "grid-cols-3"}`}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="grid h-12 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-bold text-white">
                    card {n}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-center text-[11px] font-semibold text-slate-400">{width}px → {width < 380 ? "grid-cols-1" : width < 500 ? "grid-cols-2" : "grid-cols-3"}</p>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="Mobile-first breakpoints + fluid type">
        <CodeBlock
          title="responsive.css"
          code={`.grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem); /* fluid, no jump */
}`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "In mobile-first CSS, why do you write min-width queries instead of max-width?",
              options: [
                "min-width is faster to parse",
                "Base styles target the smallest screens, and min-width queries layer complexity on as the viewport grows, so small devices never load unused overrides",
                "max-width doesn't work in most browsers",
                "There's no difference",
              ],
              answer: 1,
              explain: "Mobile-first keeps the simplest case as the default and progressively enhances upward — it avoids small screens having to override desktop-first rules.",
            },
            {
              prompt: "clamp(1rem, 4vw, 2rem) — what happens at a very wide viewport?",
              options: ["It keeps growing indefinitely", "It's capped at 2rem, the max bound", "It resets to 1rem", "It becomes invalid"],
              answer: 1,
              explain: "clamp(min, preferred, max) scales with the preferred value (4vw here) but is hard-capped at the max argument once that would be exceeded.",
            },
            {
              prompt: "An element's width: 50% — relative to what?",
              options: ["The viewport width", "The nearest ancestor with a defined size (its containing block)", "The root element always", "The element's own font-size"],
              answer: 1,
              explain: "Percentage units resolve against the containing block, not the viewport — vw/vh are the units that reference the viewport directly.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
