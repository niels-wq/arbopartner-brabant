const icon = {
  type: "element",
  tagName: "svg",
  properties: {
    className: ["ap-mark"],
    viewBox: "0 0 48 48",
    width: 32,
    height: 32,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    ariaHidden: "true",
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: { d: "M8 36V22M18 36V14M28 36V26M38 36V10M6 40h36" },
      children: [],
    },
  ],
};

function walk(node) {
  if (!node || !node.children) return;
  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];
    if (child.type === "element" && child.tagName === "h2") {
      child.children = [structuredClone(icon), { type: "text", value: " " }, ...child.children];
      continue;
    }
    walk(child);
  }
}

export function rehypeMarks() {
  return (tree) => walk(tree);
}
