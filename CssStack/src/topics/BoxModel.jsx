import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function BoxModel() {
  const [box, setBox] = useState({ content: false, padding: true, border: true, margin: true });
  return (
    <TopicPage
      id="box-model"
      category="Foundations"
      tag="Sizing"
      title="The Box Model"
      summary="Every rendered element is a rectangle made of four nested regions. Layout math — flex, grid, position — all resolves against these boxes."
    >
      <Section id="how" kicker="How it works" title="Four boxes, one element">
        <BeginnerNote>
          Picture a framed photo on a wall: the <b>photo</b> is the content, the <b>mat board</b> around it is
          padding, the <b>frame</b> itself is the border, and the empty <b>wall space</b> you leave around the
          frame before hanging the next picture is the margin. Every element on a webpage is built the same way —
          content wrapped in padding, wrapped in a border, wrapped in margin.
        </BeginnerNote>
        <ProLabel />
        <p>
          The rendering engine builds a box for every element with four layers, from inside out:{" "}
          <Hi tone="sky">content</Hi> → <Hi tone="emerald">padding</Hi> → <Hi tone="amber">border</Hi> →{" "}
          <Hi tone="rose">margin</Hi>. Each layer adds space, but only <em>border</em> is visually paintable —
          margin is always transparent and doesn't participate in background/click hit-testing.
        </p>
        <Callout type="important" title="box-sizing changes what 'width' means">
          By default (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">content-box</code>), the{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">width</code> property sets only the content
          area — padding and border are added on top, so a 200px box with 20px padding and a 2px border actually
          occupies 244px. Setting <Hi tone="indigo">box-sizing: border-box</Hi> makes width include padding + border,
          which is why almost every modern reset applies it globally.
        </Callout>
        <p>
          Margins between block-level elements can also <Hi tone="amber">collapse</Hi>: when two vertical margins
          meet with no border/padding/content between them, the browser keeps only the larger one, not the sum.
          This trips up more layouts than any other box-model rule.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — toggle each layer">
        <DemoCard label="Interactive box model" caption="Toggle a layer to see it collapse to zero and watch the rectangle resize in real time.">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {["content", "padding", "border", "margin"].map((k) => (
                <button
                  key={k}
                  onClick={() => setBox((b) => ({ ...b, [k]: !b[k] }))}
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition ${
                    box[k] ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <div
              className="bg-rose-200/60 transition-all duration-300"
              style={{ padding: box.margin ? 16 : 0 }}
            >
              <div
                className="border-amber-500 bg-amber-200/60 transition-all duration-300"
                style={{ borderWidth: box.border ? 6 : 0 }}
              >
                <div
                  className="bg-emerald-200/70 transition-all duration-300"
                  style={{ padding: box.padding ? 18 : 0 }}
                >
                  <div
                    className="grid place-items-center bg-sky-400 text-xs font-bold text-white transition-all duration-300"
                    style={{ width: box.content ? 60 : 90, height: box.content ? 40 : 60 }}
                  >
                    content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="box-sizing in practice">
        <CodeBlock
          title="box-model.css"
          code={`/* The one line most CSS resets start with */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 240px;         /* now includes padding + border */
  padding: 16px;
  border: 2px solid #6366f1;
  margin: 24px 0;        /* collapses with adjacent vertical margins */
}`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "With box-sizing: content-box, an element has width: 100px, padding: 10px, border: 5px. What's its rendered width?",
              options: ["100px", "110px", "120px", "130px"],
              answer: 3,
              explain: "content-box excludes padding/border from `width`, so total = 100 + 10*2 (padding) + 5*2 (border) = 130px.",
            },
            {
              prompt: "Two stacked <div>s have margin-bottom: 20px and margin-top: 30px respectively. What's the gap between them?",
              options: ["50px", "30px", "20px", "0px"],
              answer: 1,
              explain: "Adjacent vertical margins collapse to the larger value (30px), not the sum — a classic box-model gotcha.",
            },
            {
              prompt: "Which box layer is never visually painted, even with a background color set?",
              options: ["Padding", "Border", "Margin", "Content"],
              answer: 2,
              explain: "Margin is always transparent space outside the border — background-color paints up to the border edge, never into the margin.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
