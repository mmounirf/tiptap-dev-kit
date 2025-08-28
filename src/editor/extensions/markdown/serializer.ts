import { unified } from "unified";
import remarkStringify from "remark-stringify";
import { remarkHighlightMark } from "remark-highlight-mark";

import {
  fromProseMirror,
  fromPmNode,
  fromPmMark,
} from "@handlewithcare/remark-prosemirror";
import remarkGfm from "remark-gfm";
import type { Node, Schema } from "@tiptap/pm/model";

export function pmToMarkdown(doc: Node, schema: Schema): string {
  const mdast = fromProseMirror(doc, {
    schema,
    nodeHandlers: {
      paragraph: fromPmNode("paragraph"),
      heading: fromPmNode("heading", (node) => ({ depth: node.attrs.level })),
      blockquote: fromPmNode("blockquote"),
      codeBlock: fromPmNode("code", (node) => ({
        lang: node.attrs.language ?? undefined,
        value: node.textContent,
      })),
      horizontalRule: fromPmNode("thematicBreak"),
      orderedList: fromPmNode("list", (node) => ({
        ordered: true,
        start: node.attrs.start ?? 1,
      })),
      bulletList: fromPmNode("list", () => ({ ordered: false })),
      listItem: fromPmNode("listItem"),
    },
    markHandlers: {
      italic: fromPmMark("emphasis"),
      bold: fromPmMark("strong"),
      strike: fromPmMark("delete"),
      highlight: fromPmMark("highlight"),
      code(_, node) {
        return {
          type: "inlineCode",
          value: node.textContent ?? "",
        };
      },
      link: fromPmMark("link", (mark) => ({
        url: mark.attrs.href,
        title: mark.attrs.title ?? undefined,
      })),
    },
  });

  return unified()
    .use(remarkGfm)
    .use(remarkHighlightMark)
    .use(remarkStringify, { resourceLink: true, fences: true, rule: "-" })
    .stringify(mdast);
}
