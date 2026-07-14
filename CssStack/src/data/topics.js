// Central nav map: category -> topics. Each topic id maps to a route + a component in src/topics.
export const categories = [
  {
    id: "foundations",
    title: "Foundations",
    blurb: "The rules every CSS engine runs before it paints a pixel.",
    topics: [
      { id: "selectors", title: "Selectors & Combinators", tag: "Targeting" },
      { id: "box-model", title: "The Box Model", tag: "Sizing" },
      { id: "cascade", title: "Cascade, Specificity & Inheritance", tag: "Resolution" },
    ],
  },
  {
    id: "layout",
    title: "Layout Systems",
    blurb: "How elements are placed, sized, and arranged on the page.",
    topics: [
      { id: "display-position", title: "Display & Position", tag: "Flow" },
      { id: "flexbox", title: "Flexbox", tag: "1-D Layout" },
      { id: "grid", title: "CSS Grid", tag: "2-D Layout" },
    ],
  },
  {
    id: "visual-motion",
    title: "Visual & Motion",
    blurb: "Making things look and move the way you intend.",
    topics: [
      { id: "typography-color", title: "Typography & Color", tag: "Aesthetics" },
      { id: "transitions", title: "Transitions", tag: "State Change" },
      { id: "animations", title: "Transforms & Keyframe Animations", tag: "Motion" },
    ],
  },
  {
    id: "responsive-advanced",
    title: "Responsive & Advanced",
    blurb: "Adapting to the viewport and mastering the engine's edge cases.",
    topics: [
      { id: "responsive", title: "Media Queries & Responsive Units", tag: "Adaptation" },
      { id: "pseudo", title: "Pseudo-classes & Pseudo-elements", tag: "Virtual Nodes" },
      { id: "variables-stacking", title: "Custom Properties & Stacking Context", tag: "System Design" },
    ],
  },
];

export const allTopics = categories.flatMap((c) =>
  c.topics.map((t) => ({ ...t, category: c.id, categoryTitle: c.title }))
);

export function findTopic(id) {
  return allTopics.find((t) => t.id === id);
}

export function neighbors(id) {
  const idx = allTopics.findIndex((t) => t.id === id);
  return { prev: allTopics[idx - 1] ?? null, next: allTopics[idx + 1] ?? null };
}
