import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

const wiggleStyle = `
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-8deg) scale(1.05); }
  75% { transform: rotate(8deg) scale(1.05); }
}
.wiggle-demo { animation: wiggle 0.9s ease-in-out infinite; }

@keyframes bounce-demo {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
}
.bounce-demo { animation: bounce-demo 0.7s cubic-bezier(0.5, 0, 1, 0.5) infinite alternate; }

@keyframes pulse-demo {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.25); opacity: 0.6; }
}
.pulse-demo { animation: pulse-demo 1.1s ease-in-out infinite; }

@keyframes orbit-smooth {
  0% { transform: translateX(0); }
  100% { transform: translateX(140px); }
}
.orbit-smooth { animation: orbit-smooth 1.6s ease-in-out infinite alternate; }

@keyframes orbit-steps {
  0% { transform: translateX(0); }
  100% { transform: translateX(140px); }
}
.orbit-steps { animation: orbit-steps 1.6s steps(6, end) infinite alternate; }

@keyframes gallery-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.gallery-fade-in { animation: gallery-fade-in 0.6s ease-out both; }

@keyframes gallery-slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.gallery-slide-up { animation: gallery-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes gallery-flip {
  from { transform: rotateY(180deg); opacity: 0; }
  to { transform: rotateY(0deg); opacity: 1; }
}
.gallery-flip { animation: gallery-flip 0.7s ease-out both; }

@keyframes gallery-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}
.gallery-shake { animation: gallery-shake 0.6s ease-in-out both; }

@keyframes gallery-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.6); }
  50% { box-shadow: 0 0 0 12px rgba(79, 70, 229, 0); }
}
.gallery-glow { animation: gallery-glow 1.4s ease-out infinite; }

@keyframes gallery-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.gallery-spin { animation: gallery-spin 1.1s linear infinite; }
`;

const GALLERY_EXAMPLES = [
  { key: "gallery-fade-in", label: "fade-in", desc: "opacity 0 → 1", swatch: "from-indigo-500 to-sky-500" },
  { key: "gallery-slide-up", label: "slide-up", desc: "translateY(24px) → 0, eased", swatch: "from-emerald-400 to-teal-500" },
  { key: "gallery-flip", label: "flip", desc: "rotateY(180deg) → 0deg", swatch: "from-rose-400 to-amber-400" },
  { key: "gallery-shake", label: "shake", desc: "alternating translateX", swatch: "from-amber-400 to-rose-500" },
  { key: "gallery-glow", label: "glow (infinite)", desc: "expanding box-shadow ring", swatch: "from-indigo-500 to-purple-500" },
  { key: "gallery-spin", label: "spin (infinite)", desc: "linear rotate, no easing", swatch: "from-sky-400 to-indigo-500" },
];

function AnimationGallery() {
  const [replayCount, setReplayCount] = useState(0);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-slate-400 dark:text-slate-500">Six common patterns — click "Replay" to re-trigger the one-shot ones.</p>
        <button
          onClick={() => setReplayCount((c) => c + 1)}
          className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white transition hover:bg-indigo-500"
        >
          Replay
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {GALLERY_EXAMPLES.map((ex) => (
          <div key={ex.key} className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div
              key={`${ex.key}-${replayCount}`}
              className={`h-10 w-10 rounded-lg bg-gradient-to-br shadow-lg ${ex.key} ${ex.swatch}`}
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{ex.label}</span>
            <span className="text-center text-[11px] text-slate-400 dark:text-slate-500">{ex.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Animations() {
  const [transform, setTransform] = useState("translate");
  const [playing, setPlaying] = useState(true);
  const [stepsPlaying, setStepsPlaying] = useState(true);

  const transformMap = {
    translate: "translateX(40px)",
    rotate: "rotate(45deg)",
    scale: "scale(1.4)",
    skew: "skewX(20deg)",
  };

  return (
    <TopicPage
      id="animations"
      category="Visual & Motion"
      tag="Motion"
      title="Transforms & Keyframe Animations"
      summary="transform repositions an element without touching layout. @keyframes choreographs multiple states over time, looping and easing between each one automatically."
    >
      <style>{wiggleStyle}</style>

      <Section id="how" kicker="How it works" title="A separate coordinate space, and a state machine">
        <BeginnerNote>
          <b>transform</b> moves, spins, or resizes an element visually — like sliding a sticker around on glass,
          without changing anything underneath it. <b>@keyframes</b> is a mini script for transforms: you describe
          what the element should look like at 0%, 50%, 100% of the animation, and the browser smoothly fills in
          everything between those checkpoints for you.
        </BeginnerNote>
        <ProLabel />
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">transform</code> functions —{" "}
          <Hi tone="indigo">translate, rotate, scale, skew</Hi> — operate in their own coordinate space applied{" "}
          <em>after</em> layout is computed. That's why transforming an element never reflows its siblings: as far
          as layout is concerned, the element never moved — only its rendered pixels did.
        </p>
        <p>
          Multiple functions combine by <Hi tone="sky">matrix multiplication</Hi>, applied right to left:{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">transform: translateX(50px) rotate(45deg)</code>{" "}
          rotates first, then translates along the <em>new</em> rotated axis — which is rarely what people expect,
          and is why order matters.
        </p>
        <Callout type="spec" title="@keyframes is a percentage-based timeline">
          Each percentage in a keyframe block is a checkpoint of computed style. The browser interpolates between
          consecutive checkpoints exactly like a transition, but chained across as many steps as you define.{" "}
          <code>animation-iteration-count: infinite</code> loops it; <code>animation-direction: alternate</code>{" "}
          reverses every other loop instead of snapping back to 0%.
        </Callout>
        <p>
          <Hi tone="amber">animation-fill-mode: forwards</Hi> is the detail most people miss — without it, the
          element snaps back to its pre-animation style the instant the animation ends, even though it visually
          looked "finished" a moment ago.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — transform functions + a running keyframe loop">
        <DemoCard label="Transform functions" caption="Each button sets a single transform function on the box. transform-origin defaults to the element's center.">
          <div className="w-full space-y-5">
            <div className="flex flex-col items-center gap-3">
              <div className="grid h-24 w-full place-items-center">
                <div
                  className="h-14 w-14 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg transition-transform duration-500 ease-out"
                  style={{ transform: transformMap[transform] }}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {Object.keys(transformMap).map((t) => (
                  <button key={t} onClick={() => setTransform(t)} className={`rounded-full px-3 py-1 font-bold transition ${transform === t ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-6">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 shadow-lg ${playing ? "wiggle-demo" : ""}`} />
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg ${playing ? "bounce-demo" : ""}`} />
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg ${playing ? "pulse-demo" : ""}`} />
              </div>
              <button onClick={() => setPlaying((p) => !p)} className="rounded-full bg-sky-600 px-3 py-1 text-xs font-bold text-white transition hover:bg-sky-500">
                {playing ? "Pause @keyframes" : "Play @keyframes"}
              </button>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                wiggle · bounce · pulse — three independent @keyframes rules, toggled via{" "}
                <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">animation-play-state</code>
              </p>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="steps" kicker="Timing functions" title="steps() vs. smooth easing — discrete motion">
        <BeginnerNote>
          Most easing curves (<code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">ease</code>,{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">linear</code>) glide smoothly between
          checkpoints. <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">steps(6, end)</code>{" "}
          instead "ticks" through 6 fixed positions with no motion in between — like a clock's second hand instead
          of a sweeping hand. Watch the two dots below travel the exact same distance in the exact same time, one
          smooth and one ticking.
        </BeginnerNote>
        <ProLabel />
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">steps(n, jumpterm)</code> divides
          the animation's range into <Hi tone="indigo">n</Hi> equal jumps instead of interpolating continuously.{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">end</code> (the default) holds each
          value until the <em>end</em> of its step interval, which is exactly the behavior a sprite-sheet animation
          needs: show frame 1, then frame 2, then frame 3 — never a blend between two frames.{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">start</code> instead jumps
          immediately at the beginning of each interval.
        </p>
        <DemoCard label="animation-play-state + steps()" caption="Left: ease-in-out (smooth interpolation). Right: steps(6, end) (6 discrete jumps) — same distance, same 1.6s duration.">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-10 w-full max-w-[180px] rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`absolute top-1 left-1 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg ${stepsPlaying ? "orbit-smooth" : ""}`}
                    style={{ animationPlayState: stepsPlaying ? "running" : "paused" }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">ease-in-out (smooth)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-10 w-full max-w-[180px] rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`absolute top-1 left-1 h-8 w-8 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 shadow-lg ${stepsPlaying ? "orbit-steps" : ""}`}
                    style={{ animationPlayState: stepsPlaying ? "running" : "paused" }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">steps(6, end) (ticking)</span>
              </div>
            </div>
            <button onClick={() => setStepsPlaying((p) => !p)} className={`rounded-full px-3 py-1 text-xs font-bold transition ${stepsPlaying ? "bg-rose-600 text-white" : "bg-sky-600 text-white"}`}>
              animation-play-state: {stepsPlaying ? "running (click to pause)" : "paused (click to run)"}
            </button>
          </div>
        </DemoCard>
        <Callout type="pitfall" title="steps() isn't 'choppy easing' — it's a different mental model">
          A smooth easing function still visits every intermediate pixel on the way. <code>steps(n)</code>{" "}
          skips straight from checkpoint to checkpoint with <em>zero</em> motion in between — there is no
          in-between frame to see. That's precisely why it's the right (and only correct) tool for frame-by-frame
          sprite animation, and the wrong tool whenever you want motion to look fluid.
        </Callout>
      </Section>

      <Section id="gallery" kicker="More examples" title="A gallery of common animation patterns">
        <BeginnerNote>
          These are the animation "moves" you'll reach for constantly: fading things in, sliding them up as they
          appear, flipping a card, shaking an input on a validation error, pulsing a glow to draw the eye, and
          spinning a loading icon.
        </BeginnerNote>
        <DemoCard label="Gallery" caption="fade-in and slide-up commonly run once on mount; glow and spin loop forever for persistent attention-grabbers.">
          <AnimationGallery />
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="The wiggle animation, in full">
        <CodeBlock
          title="animations.css"
          code={`@keyframes wiggle {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25%       { transform: rotate(-8deg) scale(1.05); }
  75%       { transform: rotate(8deg) scale(1.05); }
}

.icon {
  animation: wiggle 0.9s ease-in-out infinite;
  animation-fill-mode: forwards; /* keep the last frame's style once stopped */
}`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "Why doesn't transform: translateX(100px) cause sibling elements to reflow?",
              options: [
                "Because translate is instant",
                "Because transforms are applied after layout, in their own compositing step, without changing the box's layout position",
                "Because it's a bug in most browsers",
                "It does cause reflow",
              ],
              answer: 1,
              explain: "Layout is computed first; transforms then reposition the painted pixels visually. Siblings never see a layout change, so they never reflow.",
            },
            {
              prompt: "transform: translateX(50px) rotate(45deg) — what order do the functions apply in?",
              options: ["Left to right: translate, then rotate", "Right to left: rotate first, then translate along the rotated axis", "Simultaneously, order doesn't matter", "CSS picks whichever is cheaper"],
              answer: 1,
              explain: "Transform functions compose via matrix multiplication applied right-to-left, so the rightmost function is effectively applied to the element first.",
            },
            {
              prompt: "An animation ends but the element instantly snaps back to its original style. What's missing?",
              options: ["animation-delay", "animation-fill-mode: forwards", "animation-timing-function", "@keyframes 100%"],
              answer: 1,
              explain: "Without fill-mode: forwards, the browser discards the animated styles once the animation completes and reverts to the element's pre-animation computed style.",
            },
            {
              prompt: "How is animation: move 1.6s steps(6, end) infinite different from the same animation with a smooth easing function like ease-in-out?",
              options: [
                "They look identical",
                "steps() jumps between 6 fixed positions with no motion in between, instead of continuously interpolating every intermediate value",
                "steps() only works with opacity",
                "steps() ignores the animation-duration",
              ],
              answer: 1,
              explain: "A smooth timing function samples a continuous curve; steps(n) instead divides the range into n discrete jumps with no in-between frames — the look sprite-sheet animations rely on.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
