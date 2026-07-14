import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function TypographyColor() {
  const [size, setSize] = useState(16);
  const [leading, setLeading] = useState(1.5);
  const [alpha, setAlpha] = useState(1);

  return (
    <TopicPage
      id="typography-color"
      category="Visual & Motion"
      tag="Aesthetics"
      title="Typography & Color"
      summary="Type and color are computed independently, but they share one mechanism worth understanding deeply: how the browser resolves relative units and color spaces down to actual pixels and light."
    >
      <Section id="how" kicker="How it works" title="rem/em resolution and color models">
        <BeginnerNote>
          Font sizes and colors both need a "starting point" to measure from. Sizing units like{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">rem</code> mean "a multiple of the
          page's base font size" — so if the base is 16px, <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">2rem</code>{" "}
          is always 32px, everywhere. For color, <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">rgba()</code>{" "}
          just adds a 4th number (alpha) that controls transparency — 1 is fully solid, 0 is fully invisible.
        </BeginnerNote>
        <ProLabel />
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">em</code> is relative to the{" "}
          <Hi tone="indigo">font-size of the current element</Hi> (compounding through nested elements), while{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">rem</code> is always relative to the{" "}
          <Hi tone="sky">root (&lt;html&gt;) font-size</Hi> — which is why design systems standardize on rem for
          predictable, non-compounding scaling.
        </p>
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">line-height</code> as a unitless number
          (e.g. <code>1.5</code>) is a <Hi tone="amber">multiplier</Hi> of that element's own font-size and is
          inherited as the raw number — recomputed per element. Given as a length (e.g. <code>24px</code>), it's
          inherited as that fixed pixel value instead, which can break child elements with different font sizes.
        </p>
        <Callout type="spec" title="Color: sRGB vs. modern spaces">
          <code>rgb()</code>/<code>hex</code>/<code>hsl()</code> operate in the sRGB space, limited to about 16.7M
          colors. <code>oklch()</code> is a perceptually-uniform space where equal numeric steps in lightness
          <em>look</em> equally spaced to the human eye — and it can address the wider{" "}
          <b>display-p3</b> gamut modern screens support, which sRGB cannot reach.
        </Callout>
        <p>
          Alpha transparency composites via the standard <Hi tone="emerald">"over" operator</Hi>: the final pixel
          color is <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">fg × alpha + bg × (1 − alpha)</code>,
          computed per color channel against whatever is painted underneath.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — type scale & alpha compositing">
        <DemoCard label="Typography + color" caption="Drag to see em-based sizing and alpha compositing recompute live against the dotted background.">
          <div className="w-full space-y-5">
            <div className="flex flex-col items-center gap-2">
              <p style={{ fontSize: size, lineHeight: leading }} className="max-w-md text-center font-bold text-slate-800 transition-all duration-150 dark:text-slate-100">
                The quick brown fox jumps.
              </p>
              <input type="range" min="12" max="36" value={size} onChange={(e) => setSize(+e.target.value)} className="w-48 accent-indigo-500" />
              <span className="text-xs text-slate-400">font-size: {size}px · line-height: {leading}</span>
              <input type="range" min="1" max="2.4" step="0.1" value={leading} onChange={(e) => setLeading(+e.target.value)} className="w-48 accent-sky-500" />
            </div>
            <div className="flex flex-col items-center gap-2 border-t border-slate-100 pt-4">
              <div className="h-16 w-40 rounded-lg" style={{ backgroundColor: `rgba(79, 70, 229, ${alpha})` }} />
              <input type="range" min="0.1" max="1" step="0.05" value={alpha} onChange={(e) => setAlpha(+e.target.value)} className="w-48 accent-indigo-500" />
              <span className="text-xs text-slate-400">rgba(79, 70, 229, {alpha.toFixed(2)})</span>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="A resilient type scale">
        <CodeBlock
          title="typography.css"
          code={`html { font-size: 100%; }        /* respects user browser settings */

.h1 { font-size: 2.25rem; line-height: 1.15; }
.body { font-size: 1rem;   line-height: 1.6;  }
.small { font-size: 0.875rem; line-height: 1.5; }

/* Perceptually uniform + wide-gamut */
.accent { color: oklch(62% 0.19 260); }`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "A parent has font-size: 20px. A child has font-size: 1.5em. What's the child's computed font-size?",
              options: ["1.5px", "20px", "30px", "15px"],
              answer: 2,
              explain: "em is relative to the current element's inherited font-size context — 1.5 × 20px = 30px. If nested further, em compounds; rem would not.",
            },
            {
              prompt: "Why do design systems generally prefer rem over em for base font sizing?",
              options: ["rem is faster to parse", "rem always resolves against the root font-size, avoiding compounding across nested elements", "em doesn't work in modern browsers", "There's no real difference"],
              answer: 1,
              explain: "em compounds through nested elements (each one multiplies against its own parent), which makes deeply nested UI unpredictable — rem stays anchored to a single root value.",
            },
            {
              prompt: "What makes oklch() different from rgb() for defining color?",
              options: ["oklch is perceptually uniform and can reach the wider display-p3 gamut, unlike sRGB-based rgb()", "oklch is just a syntax alias for rgb()", "oklch doesn't support transparency", "rgb() is always more accurate"],
              answer: 0,
              explain: "oklch models lightness the way human vision perceives it and isn't capped at the sRGB gamut, so equal steps look equal and colors can be more saturated on capable displays.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
