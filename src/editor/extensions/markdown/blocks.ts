import type {
  Root,
  BlockContent,
  Paragraph,
  Heading,
  Blockquote,
  List,
  ListItem,
  Code,
  ThematicBreak,
  PhrasingContent,
} from "mdast";
import type { Node, Fragment } from "@tiptap/pm/model";

export type PmInlineToMd = (fragment: Fragment) => PhrasingContent[];

/**
 * Convert a ProseMirror *block* node into an mdast BlockContent.
 */
export function pmToMdastBlock(
  node: Node,
  pmInline: PmInlineToMd
): BlockContent {
  const name = node.type.name;

  switch (name) {
    case "paragraph": {
      const children: Paragraph["children"] = pmInline(node.content);
      return { type: "paragraph", children } satisfies Paragraph;
    }

    case "heading": {
      const depth = Math.max(
        1,
        Math.min(6, node.attrs.level ?? 1)
      ) as Heading["depth"];
      const children: Heading["children"] = pmInline(node.content);
      return { type: "heading", depth, children } satisfies Heading;
    }

    case "blockquote": {
      const children: Blockquote["children"] = node.content.content.map(
        (content) => pmToMdastBlock(content, pmInline)
      );
      return { type: "blockquote", children } satisfies Blockquote;
    }

    case "horizontalRule":
    case "horizontal_rule": {
      return { type: "thematicBreak" } satisfies ThematicBreak;
    }

    case "codeBlock":
    case "code_block": {
      const lang = node.attrs?.language || undefined;
      return {
        type: "code",
        value: node.textContent ?? "",
        lang,
      } satisfies Code;
    }

    case "bulletList":
    case "orderedList": {
      const ordered = name === "orderedList";
      const start = ordered ? node.attrs?.start ?? 1 : undefined;

      const children: List["children"] = node.content.content.map((liNode) => {
        const liChildren: ListItem["children"] = liNode.content.content.map(
          (content) => pmToMdastBlock(content, pmInline)
        );
        return {
          type: "listItem",
          children: liChildren,
          checked: liNode.attrs?.checked,
        } satisfies ListItem;
      });

      return { type: "list", ordered, start, children } satisfies List;
    }

    case "listItem": {
      const children: Paragraph["children"] = [
        { type: "text", value: node.textContent ?? "" },
      ];
      return { type: "paragraph", children } satisfies Paragraph;
    }

    case "text":
    default: {
      const children: Paragraph["children"] = [
        { type: "text", value: node.textContent ?? "" },
      ];
      return { type: "paragraph", children } satisfies Paragraph;
    }
  }
}

/**
 * - PM `doc` → mdast `Root`
 * - Any other PM block → mdast `BlockContent`
 */
export function pmToMdast(
  node: Node,
  pmInline: PmInlineToMd
): Root | BlockContent {
  if (node.type.name === "doc") {
    const children: Root["children"] = node.content.content.map((content) =>
      pmToMdastBlock(content, pmInline)
    );
    return { type: "root", children } satisfies Root;
  }
  return pmToMdastBlock(node, pmInline);
}
