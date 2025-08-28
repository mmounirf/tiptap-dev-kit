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
        code(code) {
          return schema.nodes.codeBlock.create(
            { language: code.lang ?? null },
            schema.text(code.value)
          );
        },
        thematicBreak: toPmNode(schema.nodes.horizontalRule),

        list(list, _parent, state) {
          const isTask =
            Array.isArray(list.children) &&
            list.children.some(
              (listItem) => typeof listItem?.checked === "boolean"
            );

          const children = state.all(list);

          if (isTask) {
            return schema.nodes.taskList.createAndFill({}, children);
          }

          const type = list.ordered
            ? schema.nodes.orderedList
            : schema.nodes.bulletList;
          return type.createAndFill(
            list.ordered ? { start: list.start ?? 1 } : {},
            children
          );
        },

        listItem(listItem, _parent, state) {
          const content = state.all(listItem);

          if (typeof listItem.checked === "boolean") {
            return schema.nodes.taskItem.createAndFill(
              {
                checked: !!listItem.checked,
                nested: true,
              },
              content
            );
          }

          return schema.nodes.listItem.createAndFill({}, content);
        },
        emphasis: toPmMark(schema.marks.italic),
        strong: toPmMark(schema.marks.bold),
        delete: toPmMark(schema.marks.strike),
        link: toPmMark(schema.marks.link, (link) => ({
          href: link.url,
          title: link.title ?? null,
        })),
        inlineCode(inlineCode) {
          return schema.text(inlineCode.value ?? "", [
            schema.marks.code.create(),
          ]);
        },
        highlight: toPmMark(schema.marks.highlight),
      },
    } satisfies RemarkProseMirrorOptions)
    .process(markdown);

  return result;
}
