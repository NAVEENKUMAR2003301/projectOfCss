import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Responsive() {
  const [width, setWidth] = useState(500);
  const [containerWidth, setContainerWidth] = useState(500);

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

      <Section id="container-queries" kicker="The modern alternative" title="Container queries — responding to a parent, not the viewport">
        <BeginnerNote>
          A media query asks "how wide is the whole browser window?" A <b>container query</b> asks a narrower,
          more useful question: "how wide is <em>my direct parent</em>, wherever it happens to be placed on the
          page?" That difference matters the moment you build a reusable card component — the same card might sit
          in a wide main column on one page and a skinny sidebar on another. A media query can't tell the
          difference; a container query can, because it measures the box the component actually lives in, not the
          screen.
        </BeginnerNote>
        <ProLabel />
        <p>
          Container queries need two pieces set up before they'll do anything.{" "}
          <Hi tone="indigo">container-type: inline-size</Hi> on an ancestor opts that element into being a "query
          container" — it tells the engine to track that element's inline-axis (usually horizontal) size and make
          it queryable. Optionally, <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">container-name: sidebar</code>{" "}
          gives that container a name, so a query can target a specific named ancestor rather than "whichever
          container happens to be nearest."
        </p>
        <p>
          Once a container exists, descendants query it with{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">@container (min-width: 400px) {"{ }"}</code>{" "}
          — same syntax shape as <code>@media</code>, but the condition is evaluated against the nearest ancestor
          query container instead of the viewport. This is what makes truly reusable, layout-agnostic components
          possible: the component itself decides how to reflow based on the space it's actually given.
        </p>
        <Callout type="pitfall" title="A container query needs an ancestor opted in — and can't query itself">
          <code>@container</code> rules silently do nothing unless <em>some ancestor</em> has{" "}
          <code>container-type</code> set — there's no implicit container the way the viewport is implicitly
          available to <code>@media</code>. And an element can never container-query its own size: sizing yourself
          based on your own size is circular, so the query always targets an ancestor, never the element carrying
          the rule.
        </Callout>
        <DemoCard label="Simulated @container" caption={`Dragging this slider changes a "container" box's width — a real @container query reacts to exactly this (the parent's size), never the browser viewport. Contrast with the demo above: that one simulates @media (viewport width); this one simulates @container (a specific ancestor's width) — the card grid below can react completely differently depending on where it's dropped on the page, which is the whole point.`}>
          <div className="w-full space-y-3">
            <input type="range" min="220" max="600" value={containerWidth} onChange={(e) => setContainerWidth(+e.target.value)} className="w-full accent-sky-500" />
            <div className="mx-auto rounded-lg border-2 border-dashed border-sky-300 bg-white dark:border-sky-700 dark:bg-slate-800/60 p-3 transition-all duration-150" style={{ width: containerWidth }}>
              <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-wide text-sky-500">container-type: inline-size</p>
              <div className={`grid gap-2 ${containerWidth < 380 ? "grid-cols-1" : containerWidth < 500 ? "grid-cols-2" : "grid-cols-3"}`}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="grid h-12 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-bold text-white transition-all duration-300">
                    card {n}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-center text-[11px] font-semibold text-slate-400">container width: {containerWidth}px → {containerWidth < 380 ? "@container (max-width: 380px)" : containerWidth < 500 ? "@container (min-width: 380px)" : "@container (min-width: 500px)"}</p>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="environment-features" kicker="Beyond size" title="Environment media features">
        <p>
          Not every media feature is about size. <Hi tone="emerald">prefers-color-scheme</Hi> and{" "}
          <Hi tone="emerald">prefers-reduced-motion</Hi> are "environment" features — they report something about
          the user's OS-level settings or preferences, not the dimensions of anything. They can't be simulated with
          a draggable slider the way width can, because there's no "size" to drag; the browser reads them straight
          from the operating system.
        </p>
        <Callout type="tip" title="Two settings worth always respecting">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <code>@media (prefers-color-scheme: dark)</code> — matches when the user's OS/browser is set to a
              dark theme, letting a site ship a dark palette without any JS or a manual toggle.
            </li>
            <li>
              <code>@media (prefers-reduced-motion: reduce)</code> — matches when the user has asked their OS to
              minimize animation (often for vestibular disorders or motion sensitivity). Wrapping transitions and
              keyframe animations in this query so they're disabled or shortened is considered an accessibility
              baseline, not an optional nicety.
            </li>
          </ul>
        </Callout>
      </Section>

      <Section id="code" kicker="Reference" title="Mobile-first breakpoints + fluid type + container queries">
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
}

/* container query: reacts to the parent's width, not the viewport */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 400px) {
  .card { grid-template-columns: repeat(2, 1fr); }
}

@media (prefers-color-scheme: dark) {
  body { background: #0f172a; color: #e2e8f0; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
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
            {
              prompt: "How does a container query (@container) fundamentally differ from a media query (@media (width: ...))?",
              options: [
                "They're two names for the same feature",
                "@container measures the size of a specific ancestor container, while @media measures the viewport — so the same component can respond differently depending on where it's placed",
                "@container only works on mobile devices",
                "@container replaces flexbox entirely",
              ],
              answer: 1,
              explain: "A container query needs an ancestor with container-type set and reacts to that ancestor's size, not the browser window — making components reflow based on the space they're actually given, wherever they're dropped.",
            },
            {
              prompt: "What kind of condition do prefers-color-scheme and prefers-reduced-motion check?",
              options: [
                "The current viewport width",
                "The element's own computed size",
                "User/OS-level environment preferences, not a size at all",
                "The number of grid columns available",
              ],
              answer: 2,
              explain: "These are 'environment' media features — they report OS-level user preferences (dark mode, reduced motion) rather than measuring any dimension, unlike width/height-based media and container queries.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
