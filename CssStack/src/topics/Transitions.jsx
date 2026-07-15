import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Transitions() {
  const [on, setOn] = useState(false);
  const [easing, setEasing] = useState("ease");
  const [staggered, setStaggered] = useState(false);

  return (
    <TopicPage
      id="transitions"
      category="Visual & Motion"
      tag="State Change"
      title="Transitions"
      summary="A transition interpolates a property between two computed values over time — it's the browser's built-in tweening engine for state changes."
    >
      <Section id="how" kicker="How it works" title="Interpolation, the compositor, and easing curves">
        <BeginnerNote>
          Without a transition, a hover effect just snaps instantly from one look to another — it feels jarring.
          Adding <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">transition: 0.3s</code> tells
          the browser "don't jump, glide there over 0.3 seconds instead." That's it — it's the difference between a
          light switch and a dimmer switch.
        </BeginnerNote>
        <ProLabel />
        <p>
          When a transitioned property's value changes (via a class toggle, hover, or JS), the browser doesn't jump —
          it samples <Hi tone="indigo">intermediate values</Hi> every frame between the old and new computed value,
          shaped by a timing function.
        </p>
        <Callout type="important" title="Not every property is cheap to animate">
          Animating <code>width</code>, <code>top</code>, or <code>margin</code> forces <b>layout recalculation</b>{" "}
          on every frame (the browser must re-run the box model). Animating <Hi tone="emerald">transform</Hi> and{" "}
          <Hi tone="emerald">opacity</Hi> instead lets the browser skip layout and paint entirely — the compositor
          thread handles them on the GPU, which is why they're the two properties recommended for smooth 60fps
          motion.
        </Callout>
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">timing-function</code> is a cubic Bézier
          curve mapping elapsed time (x) to progress (y). <Hi tone="amber">ease-out</Hi> front-loads motion (fast
          start, slow settle — feels responsive for things entering the screen);{" "}
          <Hi tone="amber">ease-in</Hi> does the reverse (good for things leaving).{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">cubic-bezier(...)</code> lets you define
          a fully custom curve, and <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">steps(n)</code>{" "}
          produces discrete jumps instead of smooth interpolation, e.g. for sprite animation.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — same move, different curve">
        <DemoCard label="Click to trigger" caption="Same 220px translate, four different timing functions — notice how differently each one feels despite identical duration.">
          <div className="w-full space-y-4">
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {["linear", "ease", "ease-in", "ease-out", "cubic-bezier(.68,-0.55,.27,1.55)"].map((e) => (
                <button key={e} onClick={() => setEasing(e)} className={`rounded-full px-3 py-1 font-bold transition ${easing === e ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>
                  {e === "cubic-bezier(.68,-0.55,.27,1.55)" ? "bounce" : e}
                </button>
              ))}
              <button onClick={() => setOn((o) => !o)} className="rounded-full bg-sky-600 px-3 py-1 font-bold text-white">
                {on ? "Reset" : "Run"}
              </button>
            </div>
            <div className="relative h-14 w-full max-w-md rounded-full bg-slate-100">
              <div
                className="absolute top-1 left-1 h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg"
                style={{ transform: `translateX(${on ? 220 : 0}px)`, transition: `transform 900ms ${easing}` }}
              />
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="delay" kicker="Sequencing" title="transition-delay — staggering a group">
        <BeginnerNote>
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">transition-delay</code> just tells
          the browser "wait this long before starting the glide." If three boxes all get the same transition but
          different delays (0ms, 150ms, 300ms), they start one after another instead of all at once — the classic
          trick behind staggered card/list entrance animations.
        </BeginnerNote>
        <ProLabel />
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">transition-delay</code> only
          postpones the <em>start</em> of the interpolation — the duration and easing still apply in full once it
          begins. Giving a list of siblings incrementing delays (often via{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">nth-child</code> selectors or inline styles
          driven by index) is a common, CSS-only way to fake a choreographed sequence without JavaScript timers.
        </p>
        <DemoCard label="Click to trigger" caption="Same 60px lift and 400ms duration on all three boxes — only transition-delay differs (0ms, 150ms, 300ms).">
          <div className="w-full space-y-4">
            <div className="flex justify-center">
              <button onClick={() => setStaggered((s) => !s)} className="rounded-full bg-sky-600 px-3 py-1 text-xs font-bold text-white transition hover:bg-sky-500">
                {staggered ? "Reset" : "Run staggered"}
              </button>
            </div>
            <div className="flex items-end justify-center gap-6 pb-2">
              {[0, 150, 300].map((delay) => (
                <div key={delay} className="flex flex-col items-center gap-2">
                  <div
                    className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg"
                    style={{
                      transform: `translateY(${staggered ? -24 : 0}px)`,
                      transition: `transform 400ms ease-out ${delay}ms`,
                    }}
                  />
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">delay: {delay}ms</span>
                </div>
              ))}
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="Transition shorthand">
        <CodeBlock
          title="transitions.css"
          code={`.button {
  transform: scale(1);
  opacity: 1;
  transition:
    transform 200ms ease-out,
    opacity 150ms linear;
}

.button:hover {
  transform: scale(1.05);   /* GPU-composited, no layout cost */
}

.button:active {
  transition-duration: 80ms; /* snappier on press */
}`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "Why are transform and opacity considered the 'cheap' properties to transition?",
              options: [
                "They're processed by the compositor/GPU without triggering layout or paint",
                "They use less CSS syntax",
                "They're the only properties that support transitions",
                "Browsers cache their values automatically",
              ],
              answer: 0,
              explain: "Both can be handled entirely on the compositor thread — the browser skips the expensive layout and paint steps that properties like width or top require on every frame.",
            },
            {
              prompt: "What does ease-out feel like compared to ease-in?",
              options: ["Identical", "ease-out starts fast and slows into the end; ease-in starts slow and speeds up", "ease-out only works on opacity", "ease-out is always instant"],
              answer: 1,
              explain: "ease-out front-loads velocity so motion decelerates into its resting state, which reads as natural for elements entering — ease-in is the mirror image, good for exits.",
            },
            {
              prompt: "What does transition: all 300ms actually do under the hood?",
              options: [
                "Nothing — 'all' is invalid",
                "It watches every animatable property for changes and interpolates each one that changes, independently",
                "It only animates color",
                "It disables transitions",
              ],
              answer: 1,
              explain: "'all' is shorthand for every animatable property, each transitioned independently with the same duration/easing — convenient, but can trigger unwanted transitions on properties you didn't intend to animate.",
            },
            {
              prompt: "Three sibling cards share the same transition but have transition-delay: 0ms, 150ms, and 300ms. What happens when they all animate at once?",
              options: [
                "They all animate simultaneously, delay is ignored",
                "Each waits its own delay before starting, so they animate one after another — a staggered effect",
                "Only the first one animates",
                "transition-delay reverses the animation direction",
              ],
              answer: 1,
              explain: "transition-delay only postpones the start of the interpolation for that element; giving siblings incrementing delays makes them kick off in sequence, producing a staggered entrance.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
