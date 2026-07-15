import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Pseudo() {
  const [selected, setSelected] = useState(2);
  const [checked, setChecked] = useState(false);

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

      <Section id="modern-selectors" kicker="Grouping & negation" title=":not(), :is(), and :where()">
        <BeginnerNote>
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">:not(.excluded)</code> means "match
          this, but only if it does <em>not</em> also match that." <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">:is(h1, h2, h3)</code>{" "}
          is a shortcut for writing <code>h1, h2, h3</code> as one selector so you don't repeat the rest of a long
          selector three times. <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">:where(...)</code>{" "}
          does the exact same matching as <code>:is()</code>, but with one superpower: it always counts as zero
          specificity, so it's the polite way to group selectors without accidentally out-muscling other rules.
        </BeginnerNote>
        <ProLabel />
        <p>
          <Hi tone="indigo">:not()</Hi> takes a selector and inverts it — <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">li:not(:last-child)</code>{" "}
          matches every list item except the last. As of modern CSS it accepts a full selector list, so{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">:not(.a, .b)</code>{" "}
          reads as "neither .a nor .b."
        </p>
        <p>
          <Hi tone="sky">:is()</Hi> and <Hi tone="amber">:where()</Hi> both collapse a list of selectors into one —{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">:is(h1, h2, h3) {"{ }"}</code>{" "}
          behaves like <code>h1, h2, h3 {"{ }"}</code> written once. The difference is entirely about{" "}
          specificity — as covered in the cascade chapter, <code>:is()</code> takes on the specificity of its{" "}
          <em>most specific</em> argument, while <code>:where()</code> always contributes zero, no matter what's
          inside it. That makes <code>:where()</code> ideal for reset/utility styles you want to be trivially
          overridable later.
        </p>
        <Callout type="pitfall" title=":is() can quietly win a specificity fight — :where() never does">
          <code>a:is(.card, #hero)</code> inherits the specificity of <code>#hero</code> (an ID!), so it can
          override rules you didn't expect it to. Swap it for <code>a:where(.card, #hero)</code> and the whole
          selector drops to zero specificity, losing to almost anything else that also targets the element — a
          common pattern for base/reset stylesheets.
        </Callout>
        <DemoCard label=":not() in action" caption="Click an item to select it — every OTHER item is styled with li:not(.selected), dimming everything except your pick.">
          <ul className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n}>
                <button
                  onClick={() => setSelected(n)}
                  className={`grid h-12 w-12 place-items-center rounded-lg text-sm font-bold shadow transition-all duration-300 ${
                    n === selected
                      ? "bg-gradient-to-br from-indigo-500 to-sky-500 text-white scale-110"
                      : "bg-slate-200 text-slate-400 opacity-50 dark:bg-slate-700 dark:text-slate-500"
                  }`}
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </DemoCard>
      </Section>

      <Section id="forms" kicker="Form state & content selection" title=":checked, :disabled, ::placeholder, ::selection">
        <BeginnerNote>
          Forms have their own state pseudo-classes: <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">:checked</code>{" "}
          for a ticked checkbox/radio, <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">:disabled</code>{" "}
          for a greyed-out control the user can't interact with. And two more pseudo-elements let you restyle
          content the browser normally controls: <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">::placeholder</code>{" "}
          (the grey hint text in an empty input) and <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">::selection</code>{" "}
          (the highlight color when you drag-select text).
        </BeginnerNote>
        <ProLabel />
        <p>
          <Hi tone="indigo">:checked</Hi> only applies to checkboxes, radios, and <code>&lt;option&gt;</code>{" "}
          elements, and it flips live as the user interacts — no JavaScript needed to restyle a custom toggle based
          on its actual checked state via a sibling selector. <Hi tone="sky">:disabled</Hi> matches any form control
          with the <code>disabled</code> attribute; browsers apply default dimming automatically, and you can layer
          your own cursor/opacity rules on top.
        </p>
        <DemoCard label="Try it" caption="Click the toggle to flip :checked. The disabled button is greyed out by the browser's default :disabled styling plus a custom cursor.">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <span
                onClick={() => setChecked((c) => !c)}
                className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${checked ? "left-6" : "left-1"}`}
                />
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">:checked → {String(checked)}</span>
            </label>
            <div className="flex gap-2">
              <button className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white">enabled</button>
              <button disabled className="cursor-not-allowed rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40">
                :disabled
              </button>
            </div>
          </div>
        </DemoCard>
        <p>
          <Hi tone="amber">::placeholder</Hi> and <Hi tone="emerald">::selection</Hi> restyle browser-owned UI that
          isn't a real child element — placeholder text disappears the moment there's real content, and selection
          highlighting is normally the OS/browser's default blue.
        </p>
        <DemoCard label="Custom placeholder & selection" caption="The input's placeholder is styled with ::placeholder. Try selecting (drag across) the paragraph below to see a custom ::selection background/color instead of the browser default.">
          <div className="w-full max-w-sm space-y-3">
            <input
              placeholder="type nothing, just look at me…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none [&::placeholder]:italic [&::placeholder]:text-rose-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
            <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600 [&::selection]:bg-amber-300 [&::selection]:text-slate-900 dark:bg-slate-800 dark:text-slate-300">
              Select this sentence by dragging across it — the highlight color comes from a custom ::selection rule.
            </p>
          </div>
        </DemoCard>
        <Callout type="tip" title="::placeholder and ::selection accept a limited property set">
          Both are pseudo-elements with restricted styling — ::placeholder mostly supports text/color properties
          (no layout changes like padding), and ::selection only reliably supports color, background-color, and a
          few text-decoration properties. They style existing rendered content rather than generating a new box.
        </Callout>
      </Section>

      <Section id="code" kicker="Reference" title="::before / ::after, :is/:where, form states">
        <CodeBlock
          title="pseudo.css"
          code={`.quote::before { content: "\\201C"; }   /* generated box, not in the DOM */
.quote::after  { content: "\\201D"; }

.field:focus-visible {
  outline: 2px solid #4f46e5;   /* only for keyboard nav */
}

li:nth-child(2n) { background: #e0f2fe; }   /* even rows */
li:first-child   { font-weight: 700; }

/* :not / :is / :where */
li:not(.selected)         { opacity: 0.5; }
:is(h1, h2, h3)           { font-family: "Poppins", sans-serif; }
:where(.card, #hero) p    { margin: 0; }   /* always 0 specificity */

/* form state + content pseudo-elements */
input:checked + .toggle-dot { transform: translateX(20px); }
button:disabled             { opacity: 0.4; cursor: not-allowed; }
input::placeholder          { color: #fb7185; font-style: italic; }
p::selection                { background: #fcd34d; color: #1e293b; }`}
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
            {
              prompt: "a:is(.card, #hero) and a:where(.card, #hero) match the exact same elements. What's the practical difference?",
              options: [
                ":where() is faster to compute",
                ":is() takes on the specificity of its most specific argument (here, the ID), while :where() always contributes zero specificity",
                "There is no difference at all",
                ":where() doesn't support ID selectors",
              ],
              answer: 1,
              explain: ":is() and :where() match identically, but :is() inherits the highest specificity among its arguments, while :where() is defined to always count as zero specificity — useful for easily-overridable base styles.",
            },
            {
              prompt: "Which pseudo-class matches a checkbox that has been ticked, letting you style a sibling element based on it with no JavaScript?",
              options: [":active", ":checked", ":focus", ":target"],
              answer: 1,
              explain: ":checked applies to checkboxes, radio buttons, and <option> elements whenever they're in the checked/selected state, and updates live as the user interacts — commonly paired with a sibling selector to build custom toggles.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}
