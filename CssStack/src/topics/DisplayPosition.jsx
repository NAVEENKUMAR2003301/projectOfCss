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
        <DemoCard label="Interactive box" caption={DISPLAY_POSITION_CAPTIONS(display, pos)}>
          <div className="w-full space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {["block", "inline-block", "inline", "flex", "grid", "none"].map((d) => (
                <button key={d} onClick={() => setDisplay(d)} className={`rounded-full px-3 py-1 text-xs font-bold transition ${display === d ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>{d}</button>
              ))}
              <span className="mx-1 text-slate-300">|</span>
              {["static", "relative", "absolute", "fixed", "sticky"].map((p) => (
                <button key={p} onClick={() => setPos(p)} className={`rounded-full px-3 py-1 text-xs font-bold transition ${pos === p ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>{p}</button>
              ))}
            </div>
            <div
              className="relative min-h-[120px] w-full rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-3"
              style={{
                transform: "translateZ(0)",
                display: display === "flex" || display === "grid" ? display : "block",
                gap: display === "flex" || display === "grid" ? 8 : undefined,
                gridTemplateColumns: display === "grid" ? "repeat(3, auto)" : undefined,
              }}
            >
              <span style={{ display: display === "flex" || display === "grid" ? "block" : display === "none" ? "block" : display }} className="m-1 rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">1</span>
              <span
                style={{
                  display: display === "none" ? "none" : display === "flex" || display === "grid" ? "block" : display,
                  position: pos,
                  top: pos !== "static" ? 10 : undefined,
                  left: pos === "absolute" || pos === "fixed" ? 10 : pos === "relative" ? 20 : undefined,
                }}
                className="m-1 rounded bg-indigo-500 px-3 py-2 text-xs font-bold text-white shadow transition-all duration-300"
              >
                2 (watch me)
              </span>
              <span style={{ display: display === "flex" || display === "grid" ? "block" : display === "none" ? "block" : display }} className="m-1 rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">3</span>
            </div>
          </div>
        </DemoCard>
        <Callout type="pitfall" title="display: none vs. visibility: hidden">
          Both hide an element visually, but they are not the same. <b>display: none</b> removes the element from
          the render tree entirely — it takes up <em>zero</em> space, and siblings collapse into the gap it left.{" "}
          <b>visibility: hidden</b> keeps the element's box exactly where it was — it still occupies layout space,
          it's just invisible (and can't be clicked). If a layout shifts unexpectedly when something is hidden,
          check which of the two was actually used.
        </Callout>
        <VisibilityVsDisplayDemo />
      </Section>

      <Section id="sticky" kicker="A special hybrid" title="position: sticky — the scroll-aware demo">
        <BeginnerNote>
          Think of <code className="rounded bg-emerald-100 px-1 dark:bg-emerald-500/20">position: sticky</code> like
          a bookmark that's clipped to the top of a notebook page — it stays put while you flip through (scroll)
          the pages underneath it, but only within that one page (its scrolling container). Scroll past the last
          page and the bookmark scrolls away with it.
        </BeginnerNote>
        <ProLabel />
        <p>
          A sticky element behaves like <Hi tone="sky">relative</Hi> until its scroll container's scroll position
          crosses the offset you give it (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">top: 0</code>{" "}
          below), at which point it behaves like <Hi tone="indigo">fixed</Hi> — but only relative to its nearest
          scrolling ancestor, and only until that ancestor itself scrolls out of view. Scroll the box below and
          watch the header pin itself to the top of the frame, then release when the frame ends.
        </p>
        <DemoCard label="Scrollable container" caption="Scroll inside the frame — the 'Section header' pins to the top the moment it would otherwise scroll off, then lets go once the scrollable content ends.">
          <div className="h-56 w-full overflow-y-auto rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800/60">
            <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-xs font-bold text-white shadow">
              Section header (position: sticky; top: 0)
            </div>
            <div className="space-y-3 p-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="rounded-lg bg-slate-100 p-4 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Content block {n} — keep scrolling to see the header stay pinned.
                </div>
              ))}
            </div>
          </div>
        </DemoCard>
        <Callout type="pitfall" title="Sticky needs room to move — and no clipped ancestor">
          sticky only has an effect inside a <em>scrollable</em> container that's taller than the sticky element,
          and it silently stops working if any ancestor sets <code>overflow: hidden</code> (or <code>auto</code>{" "}
          with a fixed height that clips the sticky element's own box) — the browser needs an unbroken scrolling
          context to calculate when to "stick."
        </Callout>
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
            {
              prompt: "A sticky header stops sticking halfway through a page. Most likely cause?",
              options: ["sticky is deprecated", "An ancestor has overflow: hidden (or auto with a clipping height), breaking the scrolling context sticky needs", "top: 0 is not a valid value", "The header has too much padding"],
              answer: 1,
              explain: "position: sticky needs an unbroken, scrollable ancestor to calculate its stick point — an ancestor that clips overflow interrupts that and silently disables the effect.",
            },
            {
              prompt: "You hide a sidebar with visibility: hidden instead of display: none. What's the visible difference?",
              options: ["There is none, they're interchangeable", "visibility: hidden still reserves the sidebar's layout space, leaving a gap; display: none removes the space entirely", "display: none keeps the element clickable", "visibility: hidden deletes the element from the DOM"],
              answer: 1,
              explain: "display: none takes the element out of the render tree completely (zero space, siblings collapse into the gap). visibility: hidden only toggles paint — the box still occupies its spot in the layout.",
            },
          ]}
        />
      </Section>
    </TopicPage>
  );
}

// Dynamic caption for the display/position playground above.
function DISPLAY_POSITION_CAPTIONS(display, pos) {
  const displayNote =
    display === "none"
      ? "display: none removes box 2 from the layout entirely — box 1 and 3 close the gap as if it never existed."
      : display === "flex"
      ? "The frame itself is now display: flex, so 1/2/3 lay out along a flex row."
      : display === "grid"
      ? "The frame itself is now display: grid, so 1/2/3 land in grid cells."
      : "Change display to see how boxes 1/2/3 pack (block stacks, inline-block/inline flow like text).";

  const posNote = {
    static: "position: static (default) — top/left below are ignored.",
    relative: "position: relative — box 2 stays in flow (its space is reserved) but shifts visually via top/left.",
    absolute: "position: absolute — box 2 leaves flow and anchors to the dashed frame, which establishes the containing block.",
    fixed: "position: fixed — normally anchors to the browser viewport, but this frame has a CSS transform applied, which (per spec) makes the frame the containing block instead, so box 2 stays pinned inside it for this demo.",
    sticky: "position: sticky — behaves like relative here because this frame isn't scrolling; see the dedicated scroll demo below to watch it actually stick.",
  }[pos];

  return `${displayNote} ${posNote}`;
}

// Small side-by-side comparison of display: none vs. visibility: hidden —
// the classic "did it disappear, or just go invisible?" gotcha.
function VisibilityVsDisplayDemo() {
  const [hideDisplay, setHideDisplay] = useState(false);
  const [hideVisibility, setHideVisibility] = useState(false);

  return (
    <DemoCard
      label="display: none vs. visibility: hidden"
      caption="Toggle each independently — display: none collapses the gap where box B sat; visibility: hidden leaves the gap in place."
    >
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <button
            onClick={() => setHideDisplay((v) => !v)}
            className={`w-full rounded-full px-3 py-1 text-xs font-bold transition ${hideDisplay ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}
          >
            display: {hideDisplay ? "none" : "block"}
          </button>
          <div className="flex min-h-[52px] items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800/60">
            <span className="rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">A</span>
            {!hideDisplay && (
              <span className="rounded bg-gradient-to-br from-indigo-500 to-sky-500 px-3 py-2 text-xs font-bold text-white shadow transition-all duration-300">B</span>
            )}
            <span className="rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">C</span>
          </div>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => setHideVisibility((v) => !v)}
            className={`w-full rounded-full px-3 py-1 text-xs font-bold transition ${hideVisibility ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}
          >
            visibility: {hideVisibility ? "hidden" : "visible"}
          </button>
          <div className="flex min-h-[52px] items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800/60">
            <span className="rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">A</span>
            <span
              style={{ visibility: hideVisibility ? "hidden" : "visible" }}
              className="rounded bg-gradient-to-br from-indigo-500 to-sky-500 px-3 py-2 text-xs font-bold text-white shadow transition-all duration-300"
            >
              B
            </span>
            <span className="rounded bg-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:bg-slate-600 dark:text-slate-100">C</span>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
