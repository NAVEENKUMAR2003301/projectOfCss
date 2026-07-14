import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Selectors() {
  return (
    <TopicPage
      id="selectors"
      category="Foundations"
      tag="Targeting"
      title="Selectors & Combinators"
      summary="Before the browser can style anything, it has to answer one question for every element: does this rule apply to you? Selectors are that matching language."
    >
      <Section id="how" kicker="How it works" title="The matching engine, technically">
        <BeginnerNote>
          Think of a selector as an address you write on an envelope so the browser knows which element(s) should
          get the styles inside. <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">.card</code>{" "}
          means "deliver to anything with <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">class="card"</code>",
          and <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">.card p</code> means "deliver to
          every paragraph living somewhere inside a card." That's really all a selector is — a search query for
          elements.
        </BeginnerNote>
        <ProLabel />
        <p>
          When the browser parses a stylesheet, it doesn't read selectors left‑to‑right like you do. Internally,
          engines like Blink and WebKit evaluate selectors <Hi>right‑to‑left</Hi>. For a rule like{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">.card p.title</code>, the engine first
          finds every <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">p.title</code> element, then
          walks <em>up</em> the ancestor chain checking for <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">.card</code>.
        </p>
        <p>
          This is a deliberate performance decision: right‑to‑left matching lets the engine reject non‑matching
          elements immediately (most elements don't have class <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">title</code>),
          instead of walking the entire DOM tree for every rule.
        </p>
        <Callout type="spec" title="Selector categories">
          <ul className="list-disc space-y-1 pl-5">
            <li><Hi tone="indigo">Simple selectors</Hi> — type (<code>div</code>), class (<code>.card</code>), ID (<code>#nav</code>), universal (<code>*</code>), attribute (<code>[type="text"]</code>)</li>
            <li><Hi tone="sky">Combinators</Hi> — descendant (<code>A B</code>), child (<code>A &gt; B</code>), adjacent sibling (<code>A + B</code>), general sibling (<code>A ~ B</code>)</li>
            <li><Hi tone="amber">Pseudo-classes / elements</Hi> — state and virtual nodes, covered in a later chapter</li>
          </ul>
        </Callout>
        <p>
          Combinators define the <Hi tone="emerald">relationship</Hi> between elements, not their own properties. This
          is the core mental model: a selector list is a tree‑walk query, and every extra combinator adds a
          traversal cost the engine has to pay on every recalculation of styles.
        </p>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — combinators in action">
        <DemoCard label="Hover the group" caption="A + B and A ~ B: hover the first pink box — only its immediate sibling (adjacent) or matching siblings (general) light up.">
          <DemoCombinators />
        </DemoCard>
      </Section>

      <Section id="code" kicker="Reference" title="Syntax cheat sheet">
        <CodeBlock
          title="selectors.css"
          code={`/* Simple */
.card              { }      /* class */
#hero              { }      /* id */
[data-state="open"] { }     /* attribute */

/* Combinators */
.card p            { }      /* descendant: any depth */
.card > p           { }      /* child: direct only */
.card + p           { }      /* adjacent sibling: next element */
.card ~ p           { }      /* general sibling: any later sibling */

/* Lists (comma = OR) */
h1, h2, h3          { }`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "Browser engines evaluate the selector .list li.active in which direction?",
              options: ["Left to right", "Right to left", "Random order", "Top to bottom in the DOM"],
              answer: 1,
              explain: "Engines match the rightmost simple selector (li.active) first, then verify ancestors match .list — it's cheaper to reject non-matches early.",
            },
            {
              prompt: "Which selector picks only the direct <li> children of .list, not nested ones?",
              options: [".list li", ".list > li", ".list ~ li", ".list + li"],
              answer: 1,
              explain: "The child combinator > restricts matches to direct children only; the descendant combinator (space) matches at any depth.",
            },
            {
              prompt: "What does .card + .card select?",
              options: [
                "Every element with class card",
                "The first .card element",
                "A .card that is the immediate next sibling of another .card",
                "Any .card inside another .card",
              ],
              answer: 2,
              explain: "The adjacent sibling combinator (+) matches an element only when it immediately follows a sibling matching the first selector.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}

function DemoCombinators() {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex items-center gap-3" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className={`h-14 w-14 rounded-lg transition-colors duration-300 ${hover ? "bg-rose-500" : "bg-rose-300"}`} />
      <div className={`h-14 w-14 rounded-lg transition-colors duration-300 ${hover ? "bg-sky-500" : "bg-slate-200"}`} title="adjacent sibling (+)" />
      <div className={`h-14 w-14 rounded-lg transition-colors duration-500 delay-150 ${hover ? "bg-emerald-500" : "bg-slate-200"}`} title="general sibling (~)" />
      <div className={`h-14 w-14 rounded-lg transition-colors duration-700 delay-300 ${hover ? "bg-emerald-500" : "bg-slate-200"}`} title="general sibling (~)" />
    </div>
  );
}
