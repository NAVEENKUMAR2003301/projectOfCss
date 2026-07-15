import { useState } from "react";
import TopicPage from "../components/TopicPage";
import { Section, Hi, DemoCard, BeginnerNote, ProLabel } from "../components/Bits";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import Quiz from "../components/Quiz";

export default function Cascade() {
  const [active, setActive] = useState(2);
  const layers = [
    { label: "type selector", css: "p { color: slate }", specificity: "0,0,0,1", weight: 1 },
    { label: "class selector", css: ".lead { color: indigo }", specificity: "0,0,1,0", weight: 2 },
    { label: "id selector", css: "#intro { color: rose }", specificity: "0,1,0,0", weight: 3 },
    { label: "inline style", css: 'style="color: amber"', specificity: "1,0,0,0", weight: 4 },
  ];
  const colors = ["#475569", "#4f46e5", "#e11d48", "#d97706"];

  return (
    <TopicPage
      id="cascade"
      category="Foundations"
      tag="Resolution"
      title="Cascade, Specificity & Inheritance"
      summary="When multiple rules target the same element, the browser needs a deterministic tie-breaker. That algorithm is the cascade."
    >
      <Section id="how" kicker="How it works" title="The four-step resolution algorithm">
        <BeginnerNote>
          If two different rules both try to color the same button, which one wins? CSS settles it like a
          courtroom: the rule with the strongest "credentials" wins. An ID (like a person's passport) always beats
          a class (like a name tag), and a class always beats a plain tag name. When it's a total tie, whichever
          rule was written <b>last</b> in your stylesheet wins.
        </BeginnerNote>
        <ProLabel />
        <p>
          For every property on every element, the engine collects <em>all</em> declarations that could apply, then
          resolves conflicts in this exact order:
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li><Hi tone="indigo">Origin & importance</Hi> — user-agent styles lose to author styles, which lose to <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">!important</code> author styles, which lose to user <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">!important</code>.</li>
          <li><Hi tone="sky">Specificity</Hi> — a 4-part tuple (inline, IDs, classes/attrs/pseudo-classes, type/pseudo-elements). Higher wins, compared left to right — a single ID always beats any number of classes.</li>
          <li><Hi tone="amber">Source order</Hi> — if specificity ties exactly, the declaration that appears later in the stylesheet (or later <code className="rounded bg-slate-100 px-1 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">&lt;link&gt;</code>) wins.</li>
          <li><Hi tone="emerald">Inheritance & initial values</Hi> — only if nothing matched: some properties (color, font-*, line-height) inherit from the parent by default; most layout properties (margin, width, border) don't and fall back to their initial value.</li>
        </ol>
        <Callout type="pitfall" title="Specificity is not decimal math">
          0,1,0,0 (one ID) always beats 0,0,99,0 (ninety-nine classes) — it's compared column by column, not summed
          into a single number.
        </Callout>
      </Section>

      <Section id="demo" kicker="Watch it happen" title="Live demo — specificity arm-wrestle">
        <DemoCard label="Click a rule" caption="All four rules target the same <p>. Click one to make it 'win' and see the resulting color + specificity tuple.">
          <div className="flex w-full flex-col items-center gap-5">
            <p
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-lg font-bold transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800"
              style={{ color: colors[active] }}
            >
              The winning rule paints me.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {layers.map((l, i) => (
                <button
                  key={l.label}
                  onClick={() => setActive(i)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-mono transition ${
                    active === i
                      ? "border-indigo-400 bg-indigo-50 shadow-sm dark:border-indigo-500 dark:bg-indigo-500/10"
                      : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  <div className="font-bold" style={{ color: colors[i] }}>{l.label}</div>
                  <div>{l.css}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">specificity {l.specificity}</div>
                </button>
              ))}
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section id="keywords" kicker="Explicit control" title="inherit, initial, and unset — forcing a value">
        <BeginnerNote>
          Normally inheritance just happens quietly in the background. But sometimes you want to <em>force</em> the
          issue: "no really, copy whatever the parent has" or "forget everything, go back to the browser default."{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">inherit</code>,{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">initial</code>, and{" "}
          <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">unset</code> are the three keywords
          that let you say that explicitly, instead of hoping inheritance does what you want.
        </BeginnerNote>
        <p>
          <Hi tone="indigo">inherit</Hi> forces the element to take the parent's <em>computed</em> value for that
          property — even on properties that don't naturally inherit, like <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">background-color</code> or{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">border</code>.{" "}
          <Hi tone="amber">initial</Hi> resets the property to its spec-defined default value, completely ignoring
          the parent — for <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">color</code> that's typically black; for{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">background-color</code> it's transparent.{" "}
          <Hi tone="emerald">unset</Hi> is the chameleon of the three: it acts like{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">inherit</code> on properties that naturally inherit
          (like <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">color</code>), and like{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">initial</code> on properties that don't (like{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">background-color</code>).
        </p>
        <KeywordsPlayground />
        <Callout type="pitfall" title="unset's behavior depends on the property">
          There's no single thing <code>unset</code> "does" — you have to know whether the property inherits by
          default. Flip the property switch above between <code>color</code> (inherits) and{" "}
          <code>background-color</code> (doesn't) and watch <code>unset</code> produce a different result each time,
          even though it's the exact same keyword.
        </Callout>
      </Section>

      <Section id="code" kicker="Reference" title="Inherited vs. non-inherited">
        <CodeBlock
          title="cascade.css"
          code={`/* Inherits by default */
color, font-family, font-size, line-height,
visibility, text-align, list-style

/* Does NOT inherit (falls back to initial) */
margin, padding, border, width, height,
background, position, display

/* Force either direction */
.child { color: inherit; }    /* pull parent's computed value, even on
                                  non-inheriting properties */
.child { color: initial; }    /* reset to the spec default, ignore parent */
.child { color: unset; }      /* inherit if the property inherits,
                                  otherwise initial */
.child { all: unset; }        /* apply "unset" to every property at once */`}
        />
      </Section>

      <Section id="quiz" kicker="Check yourself" title="Practice questions">
        <Quiz
          questions={[
            {
              prompt: "Rule A: #nav .link (specificity 0,1,1,0). Rule B: .nav .link.active.current (0,0,3,0). Which wins?",
              options: ["Rule A — the ID column outranks any number of classes", "Rule B — it has more total selectors", "They tie and source order decides", "Neither applies"],
              answer: 0,
              explain: "Specificity compares column by column left to right. Rule A has a 1 in the ID column, which beats any value in the class column, regardless of how large.",
            },
            {
              prompt: "Two rules have identical specificity and both apply. Which one wins?",
              options: ["The shorter one", "The one written later in the CSS source", "The one with more properties", "It's undefined behavior"],
              answer: 1,
              explain: "When origin, importance, and specificity all tie, the cascade falls back to source order — later declarations win.",
            },
            {
              prompt: "Why does setting color on a <ul> also change the color of text in its <li> children, without any extra rule?",
              options: ["color is an inherited property", "Browsers apply defaults to all descendants", "It's a bug", "li always matches ul's specificity"],
              answer: 0,
              explain: "color is one of the properties that inherits by default — children compute their color from the parent's computed value unless overridden.",
            },
            {
              prompt: "You set background-color: unset on a child element. What happens?",
              options: [
                "It copies the parent's background-color, because unset always means inherit",
                "It resets to transparent (the initial value), because background-color doesn't naturally inherit",
                "It throws a CSS error",
                "Nothing changes until you also set color: unset",
              ],
              answer: 1,
              explain: "unset falls back to initial for properties that don't inherit by default. background-color is one of them, so unset behaves exactly like initial (transparent) here.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}

// Properties chosen to contrast a naturally-inheriting property (color)
// against one that isn't (background-color) — the whole point of unset.
const KEYWORD_PROPERTIES = {
  color: { cssProp: "color", inherits: true, own: "#0f172a", ownLabel: "slate-900" },
  "background-color": { cssProp: "backgroundColor", inherits: false, own: "#e0f2fe", ownLabel: "sky-100" },
};

function KeywordsPlayground() {
  const [property, setProperty] = useState("color");
  const [keyword, setKeyword] = useState("normal");
  const keywords = ["normal", "inherit", "initial", "unset"];
  const info = KEYWORD_PROPERTIES[property];

  const childStyle = {
    [info.cssProp]: keyword === "normal" ? info.own : keyword,
  };

  const descriptions = {
    normal: `The child has its own declared ${property}: ${info.ownLabel} — no keyword involved, inheritance never enters the picture.`,
    inherit: info.inherits
      ? `inherit forces the child to use the parent's computed ${property} — this matches what would happen anyway, since ${property} inherits by default.`
      : `inherit forces the child to copy the parent's computed ${property}, even though ${property} does NOT inherit by default — inherit overrides that.`,
    initial: `initial resets ${property} to the property's spec-defined default (${property === "color" ? "browser text color, typically black" : "transparent"}), ignoring the parent completely.`,
    unset: info.inherits
      ? `unset acts exactly like inherit here, because ${property} is a naturally-inheriting property.`
      : `unset acts exactly like initial here (transparent), because ${property} does NOT naturally inherit.`,
  };

  return (
    <DemoCard label={`${property}: ${keyword}`} caption={descriptions[keyword]}>
      <div className="w-full space-y-3">
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
            <span className="pl-2 font-bold text-slate-400">property</span>
            {Object.keys(KEYWORD_PROPERTIES).map((p) => (
              <button
                key={p}
                onClick={() => setProperty(p)}
                className={`rounded-full px-2 py-1 font-semibold transition ${property === p ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-700"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {keywords.map((k) => (
            <button
              key={k}
              onClick={() => setKeyword(k)}
              className={`rounded-full px-3 py-1 font-semibold transition ${keyword === k ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}
            >
              {k}
            </button>
          ))}
        </div>
        <div
          className="rounded-lg border-2 border-dashed p-4 transition-all duration-300"
          style={{ borderColor: "#4f46e5", color: "#4f46e5", backgroundColor: "#c7d2fe" }}
        >
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide">
            Parent — color: indigo-600, background-color: indigo-200
          </p>
          <div
            className="rounded-md border border-slate-300 bg-white p-3 text-sm font-semibold transition-all duration-300 dark:border-slate-700"
            style={childStyle}
          >
            Child element — {property}: {keyword}
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
