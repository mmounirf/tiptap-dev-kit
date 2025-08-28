import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { remarkHighlightMark } from "remark-highlight-mark";

import {
  remarkProseMirror,
  toPmNode,
  toPmMark,
  type RemarkProseMirrorOptions,
} from "@handlewithcare/remark-prosemirror";
import type { Node, Schema } from "@tiptap/pm/model";

export async function markdownToPM(
  markdown: string,
  schema: Schema
): Promise<Node> {
  const { result } = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHighlightMark)
    .use(remarkProseMirror, {
      schema,
      handlers: {
        paragraph: toPmNode(schema.nodes.paragraph),
        heading: toPmNode(schema.nodes.heading, (heading) => ({
          level: heading.depth,
        })),
        blockquote: toPmNode(schema.nodes.blockquote),
        code: toPmNode(schema.nodes.codeBlock, (code) => ({
          language: code.lang ?? null,
        })),
        thematicBreak: toPmNode(schema.nodes.horizontalRule),

        list(node, _parent, state) {
          const children = state.all(node);
          const type = node.ordered
            ? schema.nodes.orderedList
            : schema.nodes.bulletList;
          return type.createAndFill(
            node.ordered ? { start: node.start ?? 1 } : {},
            children
          );
        },
        listItem: toPmNode(schema.nodes.listItem),
        emphasis: toPmMark(schema.marks.italic),
        strong: toPmMark(schema.marks.bold),
        delete: toPmMark(schema.marks.strike),
        link: toPmMark(schema.marks.link, (link) => ({
          href: link.url,
          title: link.title ?? null,
        })),
        inlineCode: toPmMark(schema.marks.code),
        highlight: toPmMark(schema.marks.highlight),
      },
    } satisfies RemarkProseMirrorOptions)
    .process(markdown);

  return result;
}
