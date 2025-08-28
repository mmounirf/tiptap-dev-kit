import { unified } from "unified";
import remarkStringify from "remark-stringify";
import { remarkHighlightMark } from "remark-highlight-mark";

import {
  fromProseMirror,
  fromPmNode,
  fromPmMark,
} from "@handlewithcare/remark-prosemirror";
import remarkGfm from "remark-gfm";
import type { Mark, Node, Schema } from "@tiptap/pm/model";

const hasMark = (node: Node, name: string) =>
  (node.marks as Mark[] | undefined)?.some((mark) => mark.type.name === name) ??
  false;

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
      orderedList: fromPmNode("list", (pm) => ({
        ordered: true,
        start: pm.attrs.start ?? 1,
      })),
      bulletList: fromPmNode("list", () => ({ ordered: false })),
      listItem: fromPmNode("listItem"),

      // fix for inlinecode mark
      text: fromPmNode("text", (node) =>
        hasMark(node, "code")
          ? { type: "inlineCode", value: node.textContent }
          : { type: "text", value: node.textContent }
      ),
    },
    markHandlers: {
      italic: fromPmMark("emphasis"),
      bold: fromPmMark("strong"),
      strike: fromPmMark("delete"),
      highlight: fromPmMark("highlight"),
      // code: fromPmMark("inlineCode"),
      link: fromPmMark("link", (mark) => ({
        url: mark.attrs.href,
        title: mark.attrs.title ?? undefined,
      })),
    },
  });

  return unified()
    .use(remarkGfm)
    .use(remarkHighlightMark)
    .use(remarkStringify, { resourceLink: true })
    .stringify(mdast);
}
