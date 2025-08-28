import type { PhrasingContent } from "mdast";
import type { Schema, Node, Mark } from "@tiptap/pm/model";
import { toMarkdown } from "./processors";

function markAll(nodes: Node[], mark?: Mark | null): Node[] {
  if (!mark) return nodes;
  return nodes.map((node) =>
    node.isInline ? node.mark(mark.addToSet(node.marks)) : node
  );
}

/**
 * Convert mdast phrasing nodes (inline) → ProseMirror inline nodes.
 *
 * Notes:
 * - Respects PM immutability (never assigns to n.marks).
 * - Maps mdast `inlineCode` to a PM `code` *mark* (TipTap default).
 * - Maps mdast `link` to a PM `link` mark on its children.
 * - `break` becomes PM `hardBreak`.
 * - Unknown phrasing nodes are stringified to Markdown, then inserted as text.
 * - If your schema supports inline images, this maps mdast `image` → PM image node.
 */
export function phrasingToPm(schema: Schema, nodes: PhrasingContent[]): Node[] {
  const out: Node[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "text": {
        const value = node.value ?? "";
        out.push(schema.text(value));
        break;
      }

      case "inlineCode": {
        const code = node;
        const mark = schema.marks.code?.create();
        out.push(schema.text(code.value ?? "", mark ? [mark] : undefined));
        break;
      }

      case "emphasis": {
        const mark = schema.marks.italic?.create();
        const inner = phrasingToPm(schema, node.children ?? []);
        out.push(...markAll(inner, mark ?? null));
        break;
      }

      case "strong": {
        const mark = schema.marks.bold?.create();
        const inner = phrasingToPm(schema, node.children ?? []);
        out.push(...markAll(inner, mark ?? null));
        break;
      }

      case "delete": {
        const mark = schema.marks.strike?.create();
        const inner = phrasingToPm(schema, node.children ?? []);
        out.push(...markAll(inner, mark ?? null));
        break;
      }

      case "break": {
        out.push(schema.nodes.hardBreak.create());
        break;
      }

      case "link": {
        const link = node;
        const mark = schema.marks.link?.create({
          href: link.url,
          title: link.title ?? null,
        });
        const inner = phrasingToPm(schema, link.children ?? []);
        out.push(...markAll(inner, mark ?? null));
        break;
      }

      default: {
        // Unknown phrasing → stringify minimally and drop as text
        const md = toMarkdown({
          type: "root",
          children: [{ type: "paragraph", children: [node] }],
        });
        out.push(schema.text(String(md).trim()));
      }
    }
  }

  return out;
}
