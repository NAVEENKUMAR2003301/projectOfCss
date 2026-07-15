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

      <Section id="attributes" kicker="Matching by attribute" title="Attribute selectors, :not(), and selector lists">
        <BeginnerNote>
          Sometimes class names aren't enough — you want to target elements based on an attribute they actually
          carry, like an <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">&lt;input type="text"&gt;</code>{" "}
          versus an <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">&lt;input type="checkbox"&gt;</code>.
          Attribute selectors let you write "match anything with this attribute" (and even "starts with" or
          "contains" that value), while <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">:not()</code>{" "}
          lets you say "match everything <em>except</em> this."
        </BeginnerNote>
        <ProLabel />
        <p>
          The attribute selector family: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">[attr]</code>{" "}
          matches any element carrying that attribute regardless of value;{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">[attr="val"]</code>{" "}
          requires an exact match; <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">[attr^="val"]</code>{" "}
          means "starts with"; <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">[attr$="val"]</code>{" "}
          means "ends with"; and <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">[attr*="val"]</code>{" "}
          means "contains anywhere" — the same shorthand syntax used by regular expressions, borrowed for CSS.
        </p>
        <p>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">:not(selector)</code>{" "}
          is a functional pseudo-class — it matches an element only when it does <em>not</em> match whatever
          selector is passed inside the parentheses. And a comma‑separated{" "}
          <Hi tone="sky">selector list</Hi> like <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">h1, h2, h3</code>{" "}
          is a logical OR: the whole rule applies to any element matched by <em>any</em> selector in the list,
          exactly as if you'd written three separate rules with identical declarations.
        </p>
        <AttributePlayground />
        <Callout type="pitfall" title=":not() isn't specificity-free">
          <code>:not()</code> itself contributes zero specificity, but whatever you put inside it counts fully —{" "}
          <code>:not(#nav)</code> carries the specificity of an ID selector, not zero. It's easy to assume "negation
          selectors are cheap" and get surprised when one outranks a rule you expected to win.
        </Callout>
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

/* Attribute selectors */
[type="text"]       { }      /* exact value match */
[href^="https"]     { }      /* starts with */
[class*="btn"]      { }      /* contains anywhere */

/* Negation */
li:not(.active)     { }      /* every li EXCEPT .active ones */

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
            {
              prompt: 'What does [href^="https"] select?',
              options: [
                "Any element with an href attribute anywhere",
                "Only href attributes that equal exactly 'https'",
                "Any element whose href attribute starts with 'https'",
                "Any element whose href attribute contains 'https' anywhere",
              ],
              answer: 2,
              explain: "The ^= operator means 'starts with' — it matches hrefs like https://example.com but not http://example.com or a relative path.",
            },
            {
              prompt: "What does button:not(.btn-outline) match?",
              options: [
                "Nothing — :not() is invalid on buttons",
                "Every <button>, since :not() is ignored",
                "Every <button> that does NOT have class btn-outline",
                "Only elements with class btn-outline",
              ],
              answer: 2,
              explain: ":not(selector) matches elements that fail to match the selector inside the parentheses — here, every button except ones carrying btn-outline.",
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

// Sample "elements" for the attribute-selector playground — plain data objects
// standing in for real DOM nodes, so we can run each selector's logic in JS.
const ATTR_ELEMENTS = [
  { id: 1, tag: "input", type: "text", className: "field", display: 'input[type="text"]' },
  { id: 2, tag: "input", type: "checkbox", className: "field", display: 'input[type="checkbox"]' },
  { id: 3, tag: "a", href: "https://example.com", className: "btn-primary", display: 'a[href="https://…"]' },
  { id: 4, tag: "a", href: "/local-page", className: "btn-secondary", display: 'a[href="/local-page"]' },
  { id: 5, tag: "button", className: "btn-outline", display: "button.btn-outline" },
  { id: 6, tag: "div", className: "card", display: "div.card" },
];

const ATTR_SELECTORS = [
  {
    css: '[type="text"]',
    desc: 'Exact attribute-value match — only elements whose type attribute equals "text" exactly.',
    test: (el) => el.type === "text",
  },
  {
    css: '[href^="https"]',
    desc: '^= means "starts with" — matches any href beginning with https, handy for flagging secure/external links.',
    test: (el) => typeof el.href === "string" && el.href.startsWith("https"),
  },
  {
    css: '[class*="btn"]',
    desc: '*= means "contains anywhere" — matches any class attribute that includes the substring "btn", wherever it sits.',
    test: (el) => typeof el.className === "string" && el.className.includes("btn"),
  },
  {
    css: ":not([type])",
    desc: ":not() negates — this matches every element that does NOT carry a type attribute at all.",
    test: (el) => el.type === undefined,
  },
  {
    css: "input, a",
    desc: "A comma-separated selector list is OR — matches elements that are either an <input> or an <a>.",
    test: (el) => el.tag === "input" || el.tag === "a",
  },
];

function AttributePlayground() {
  const [active, setActive] = useState(0);
  const selector = ATTR_SELECTORS[active];

  return (
    <DemoCard label={selector.css} caption={selector.desc}>
      <div className="w-full space-y-3">
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {ATTR_SELECTORS.map((s, i) => (
            <button
              key={s.css}
              onClick={() => setActive(i)}
              className={`rounded-full px-3 py-1 font-mono font-semibold transition ${active === i ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}
            >
              {s.css}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {ATTR_ELEMENTS.map((el) => {
            const matches = selector.test(el);
            return (
              <div
                key={el.id}
                className={`rounded-lg px-3 py-2 text-xs font-semibold shadow transition-all duration-300 ${
                  matches
                    ? "scale-105 bg-gradient-to-br from-indigo-500 to-sky-500 text-white"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                }`}
              >
                {el.display}
              </div>
            );
          })}
        </div>
      </div>
    </DemoCard>
  );
}
