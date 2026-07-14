import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function DisplayPosition() {
  const [display, setDisplay] = useState("block");
  const [pos, setPos] = useState("static");

  return (
    <TopicPage
      id="display-position"
      category="Layout Systems"
      tag="Flow"
      title="Display & Position"
      summary="display decides how an element generates boxes and joins the flow. position decides whether it stays in that flow or is pulled out of it entirely."
    >
      <Section id="how" kicker="How it works" title="Two independent axes">
        <BeginnerNote>
          <b>display</b> decides how an element behaves like a shape on the page — does it stack like a brick
          (block), sit inline like a word in a sentence (inline), or something in between? <b>position</b> is a
          totally separate question: does the element stay where the normal flow puts it, or do you want to
          manually pin it somewhere (like a sticky note on a page)? Beginners often mix these two up — just
          remember: display = "what kind of box," position = "does it leave its spot."
        </BeginnerNote>
        <ProLabel />
        <p>
          Every element has a <Hi tone="indigo">display</Hi> value that controls its formatting context —{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">block</code> generates a box that stacks
          vertically and takes the full available width; <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">inline</code>{" "}
          flows within text and ignores width/height; <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">inline-block</code>{" "}
          flows like text but accepts box-model sizing.
        </p>
        <p>
          <Hi tone="sky">position</Hi> is a separate concern: it decides whether the element participates in{" "}
          <em>normal flow</em> at all.
        </p>
        <Callout type="spec" title="The five position values">
          <ul className="list-disc space-y-1 pl-5">
            <li><b>static</b> — default. top/left/right/bottom do nothing.</li>
            <li><b>relative</b> — stays in flow, but top/left offset it visually from where it would've been.</li>
            <li><b>absolute</b> — removed from flow entirely; positioned against the nearest ancestor with position ≠ static.</li>
            <li><b>fixed</b> — removed from flow; positioned against the viewport (or a transformed ancestor).</li>
            <li><b>sticky</b> — hybrid: acts relative until a scroll threshold, then behaves fixed within its containing block.</li>
          </ul>
        </Callout>
        <p>
          This is why <Hi tone="amber">relative</Hi> is so often paired with absolute children: setting{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">position: relative</code> on a parent doesn't
          have to move it — it just establishes the <em>containing block</em> that descendants with{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">position: absolute</code> will anchor to.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — flip the switches">
        <DemoCard label="Interactive box" caption="Change display to see how boxes 1/2/3 pack. Switch position to see box 2 leave (or stay in) the flow.">
          <div className="w-full space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {["block", "inline-block", "inline"].map((d) => (
                <button key={d} onClick={() => setDisplay(d)} className={`rounded-full px-3 py-1 text-xs font-bold transition ${display === d ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>{d}</button>
              ))}
              <span className="mx-1 text-slate-300">|</span>
              {["static", "relative", "absolute"].map((p) => (
                <button key={p} onClick={() => setPos(p)} className={`rounded-full px-3 py-1 text-xs font-bold transition ${pos === p ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>{p}</button>
              ))}
            </div>
            <div className="relative min-h-[120px] w-full rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-3">
              <span style={{ display }} className="m-1 rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">1</span>
              <span
                style={{
                  display,
                  position: pos,
                  top: pos !== "static" ? 10 : undefined,
                  left: pos === "absolute" ? 10 : pos === "relative" ? 20 : undefined,
                }}
                className="m-1 rounded bg-indigo-500 px-3 py-2 text-xs font-bold text-white shadow transition-all duration-300"
              >
                2 (watch me)
              </span>
              <span style={{ display }} className="m-1 rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">3</span>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="The relative + absolute pattern">
        <CodeBlock
          title="position.css"
          code={`.badge-parent {
  position: relative;      /* establishes containing block */
}
.badge {
  position: absolute;
  top: -8px;
  right: -8px;              /* anchors to .badge-parent, not the page */
}

.header {
  position: sticky;
  top: 0;                   /* sticks once it hits the viewport top */
}`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "An element has position: absolute but no ancestor has position set. What does it anchor to?",
              options: ["Its immediate parent", "The nearest sibling", "The initial containing block (viewport/root)", "It doesn't render"],
              answer: 2,
              explain: "Without a positioned ancestor, absolute elements fall back to the initial containing block, which is effectively the viewport.",
            },
            {
              prompt: "Which position value keeps the element in normal flow while still allowing top/left offsets?",
              options: ["absolute", "fixed", "relative", "static"],
              answer: 2,
              explain: "relative reserves the element's original space in the flow and then shifts it visually — siblings still lay out as if it hadn't moved.",
            },
            {
              prompt: "Why do inline elements ignore an explicit width: 200px?",
              options: ["It's a browser bug", "Inline boxes size to their content and flow like text, not block boxes", "width only works with position: absolute", "It doesn't — inline respects width"],
              answer: 1,
              explain: "Inline-level boxes participate in text flow; width/height are meaningless for them because their box is derived from content, not explicit dimensions.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
