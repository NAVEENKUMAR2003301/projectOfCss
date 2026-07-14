import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Pseudo() {
  return (
    <TopicPage
      id="pseudo"
      category="Responsive & Advanced"
      tag="Virtual Nodes"
      title="Pseudo-classes & Pseudo-elements"
      summary="Pseudo-classes select real elements based on state the DOM doesn't expose as an attribute. Pseudo-elements go further — they let CSS generate content that isn't in the DOM at all."
    >
      <Section id="how" kicker="How it works" title="One colon vs. two, and the anonymous box">
        <BeginnerNote>
          A <b>pseudo-class</b> (one colon, like <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">:hover</code>)
          styles a real element when something happens to it — the mouse moves over it, it gets clicked, etc. A{" "}
          <b>pseudo-element</b> (two colons, like <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">::before</code>)
          isn't reacting to anything — it's CSS conjuring up a brand new, invisible-to-HTML box you can decorate,
          like adding a little icon before a heading without writing extra markup.
        </BeginnerNote>
        <ProLabel />
        <p>
          <Hi tone="indigo">Pseudo-classes</Hi> (single colon: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">:hover</code>,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">:nth-child()</code>,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">:focus-visible</code>) match an existing
          element when it's in a particular state — the engine re-evaluates them continuously as state changes
          (mouse position, focus, DOM position), triggering a style recalculation but not a DOM mutation.
        </p>
        <p>
          <Hi tone="sky">Pseudo-elements</Hi> (double colon: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">::before</code>,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">::after</code>) are different in kind:
          they generate an <Hi tone="amber">anonymous box</Hi> that's inserted into the render tree as if it were a
          real child — it isn't in the DOM, isn't selectable as text by default, but is fully styleable and requires{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">content</code> to render at all (even{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">content: ""</code>).
        </p>
        <Callout type="spec" title="nth-child uses an+b algebra">
          <code>:nth-child(2n)</code> matches even children, <code>2n+1</code> matches odd, <code>3n</code> matches
          every third. The formula is evaluated for n = 0, 1, 2, ... until it exceeds the sibling count — it's
          literal algebra, not a magic keyword list.
        </Callout>
        <p>
          <Hi tone="emerald">:focus-visible</Hi> exists because <code>:focus</code> fires for both keyboard and
          mouse interaction, but sighted mouse users don't need a visible focus ring. focus-visible lets the
          browser's own heuristic (keyboard vs. pointer) decide when the ring should actually paint.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — state-driven pseudo-classes">
        <DemoCard label="Try interacting" caption="Hover, focus (Tab into it), and active states — each is a distinct pseudo-class the engine tracks live.">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-lg bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white hover:shadow-lg active:scale-95">
              :hover / :active
            </button>
            <input
              placeholder="Tab to me: :focus"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-400 transition focus:border-indigo-400 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <ul className="flex gap-1.5 rounded-lg bg-slate-100 p-1.5 text-xs font-bold dark:bg-slate-800">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className={`grid h-8 w-8 place-items-center rounded ${n % 2 === 0 ? "bg-sky-400 text-white" : "bg-white text-slate-400 dark:bg-slate-900 dark:text-slate-500"}`}>
                  {n}
                </li>
              ))}
            </ul>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">:nth-child(2n)</span>
          </div>
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="::before / ::after in practice">
        <CodeBlock
          title="pseudo.css"
          code={`.quote::before { content: "\\201C"; }   /* generated box, not in the DOM */
.quote::after  { content: "\\201D"; }

.field:focus-visible {
  outline: 2px solid #4f46e5;   /* only for keyboard nav */
}

li:nth-child(2n) { background: #e0f2fe; }   /* even rows */
li:first-child   { font-weight: 700; }`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "Why does .box::before { } render nothing until you add content: \"\"?",
              options: [
                "It's a browser bug",
                "Pseudo-elements only generate their anonymous box when a content value is present",
                "::before requires a class selector",
                "You must also add display: block",
              ],
              answer: 1,
              explain: "The content property is what triggers the pseudo-element's box generation in the render tree — without it, nothing is inserted at all.",
            },
            {
              prompt: "What does li:nth-child(3n) select in a 9-item list?",
              options: ["Items 1, 2, 3", "Items 3, 6, 9", "Every item", "Only item 3"],
              answer: 1,
              explain: "3n evaluates for n = 0,1,2,3... giving positions 0, 3, 6, 9 — position 0 doesn't exist, so it matches the 3rd, 6th, and 9th children.",
            },
            {
              prompt: "Why use :focus-visible instead of :focus for a custom outline style?",
              options: [
                "focus-visible is faster",
                "It only shows the ring for keyboard/non-pointer focus, avoiding an outline flash on every mouse click",
                "focus doesn't work on buttons",
                "They're functionally identical",
              ],
              answer: 1,
              explain: ":focus matches on any focus event including mouse clicks; :focus-visible applies the browser's heuristic so mouse users don't see a ring meant for keyboard navigation.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
