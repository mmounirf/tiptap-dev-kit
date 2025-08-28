// bridges.ts
import type {
  Root,
  RootContent,
  PhrasingContent,
  Paragraph,
  Heading,
  Text as MdText,
  Emphasis,
  Strong,
  Delete,
  Link,
  InlineCode,
  List,
  ListItem,
  Code,
  ThematicBreak,
} from "mdast";
import type {
  Schema,
  Node as PMNode,
  Fragment,
  Mark as PMMark,
} from "@tiptap/pm/model";
import { fromMarkdown, toMarkdown } from "./processors";

type MNode = Root | RootContent;
type PNode = PMNode;

/* --------------------------
 * PM inline → Markdown text (with nested marks handled)
 * -------------------------- */
function escapeText(s: string, inCode: boolean): string {
  if (inCode) return s.replace(/`/g, "\\`");
  return s.replace(/([\\*_~[\]])/g, "\\$1");
}
function escapeAttr(s: string) {
  return String(s ?? "").replace(/"/g, '\\"');
}
function renderHref(href: string) {
  if (!href) return "";
  const cleaned = href.replace(/>/g, "\\>");
  return /[\s()]/.test(cleaned) ? `<${cleaned}>` : cleaned;
}

function renderInline(fragment: Fragment): string {
  let out = "";
  const open: PMMark[] = [];

  const openDelim = (m: PMMark) => {
    switch (m.type.name) {
      case "bold":
        return "**";
      case "italic":
        return "*";
      case "strike":
        return "~~";
      case "code":
        return "`";
      case "link":
        return "[";
      default:
        return "";
    }
  };

  const closeDelim = (m: PMMark) => {
    switch (m.type.name) {
      case "bold":
        return "**";
      case "italic":
        return "*";
      case "strike":
        return "~~";
      case "code":
        return "`";
      case "link": {
        const href = m.attrs?.href ?? "";
        const title = m.attrs?.title ?? null;
        return title
          ? `](${renderHref(href)} "${escapeAttr(title)}")`
          : `](${renderHref(href)})`;
      }
      default:
        return "";
    }
  };

  fragment.forEach((node) => {
    const next = node.marks;

    // close marks no longer present
    for (let i = open.length - 1; i >= 0; i--) {
      if (!next.find((m) => m.eq(open[i]))) {
        out += closeDelim(open[i]);
        open.splice(i, 1);
      }
    }

    // open newly present marks
    next.forEach((m) => {
      if (!open.find((x) => x.eq(m))) {
        out += openDelim(m);
        open.push(m);
      }
    });

    if (node.isText) {
      const inCode = next.some((m) => m.type.name === "code");
      out += escapeText(node.text!, inCode); // reuse your function here
    } else if (node.type.name === "hardBreak") {
      out += "  \n";
    }
  });

  for (let i = open.length - 1; i >= 0; i--) out += closeDelim(open[i]);
  return out;
}

/* --------------------------
 * PM inline → mdast phrasing (parse the small md back to mdast)
 * -------------------------- */
function pmInlineToMd(fragment: Fragment): PhrasingContent[] {
  const md = renderInline(fragment);
  const ast = fromMarkdown(md); // Root
  const first = ast.children[0];
  if (first && first.type === "paragraph") {
    return (first as Paragraph).children ?? [];
  }
  // edge: just inline root
  return (ast.children as unknown as PhrasingContent[]) ?? [];
}

/* --------------------------
 * ProseMirror → mdast (blocks)
 * -------------------------- */
export function pmToMdast(node: PNode): Root {
  const name = node.type.name;
  switch (name) {
    case "doc":
      return {
        type: "root",
        children: node.content.content.map(pmToMdast) as RootContent[],
      };
    case "paragraph":
      return { type: "paragraph", children: pmInlineToMd(node.content) };
    case "heading":
      return {
        type: "heading",
        depth: Math.max(
          1,
          Math.min(6, node.attrs.level ?? 1)
        ) as Heading["depth"],
        children: pmInlineToMd(node.content),
      };
    case "blockquote":
      return {
        type: "blockquote",
        children: node.content.content.map(pmToMdast) as RootContent[],
      };
    case "horizontalRule":
    case "horizontal_rule":
      return { type: "thematicBreak" } as ThematicBreak;
    case "codeBlock":
    case "code_block":
      return {
        type: "code",
        value: node.textContent ?? "",
        lang: node.attrs?.language || undefined,
      } as Code;
    case "bulletList":
    case "orderedList": {
      const ordered = name === "orderedList";
      const start = ordered ? node.attrs?.start ?? 1 : undefined;
      const items: ListItem[] = node.content.content.map((li) => ({
        type: "listItem",
        children: li.content.content.map(pmToMdast) as RootContent[],
      }));
      return { type: "list", ordered, start, children: items } as List;
    }
    case "listItem":
      return {
        type: "listItem",
        children: node.content.content.map(pmToMdast) as RootContent[],
      };
    case "text":
      return { type: "text", value: node.text || "" };
    default:
      // Unknown PM node: preserve as raw Markdown text
      return {
        type: "paragraph",
        children: [{ type: "text", value: node.textContent }],
      };
  }
}

/* --------------------------
 * mdast phrasing → PM inline
 * -------------------------- */
export function phrasingToPm(
  schema: Schema,
  kids: PhrasingContent[]
): PMNode[] {
  const out: PMNode[] = [];
  for (const k of kids) {
    switch (k.type) {
      case "text":
        out.push(schema.text((k as MdText).value));
        break;
      case "inlineCode": {
        const m = schema.marks.code?.create();
        out.push(schema.text((k as InlineCode).value, m ? [m] : undefined));
        break;
      }
      case "emphasis": {
        const mark = schema.marks.italic?.create();
        const inner = phrasingToPm(schema, (k as Emphasis).children || []);
        inner.forEach((n) => (n.marks = mark ? n.marks.concat(mark) : n.marks));
        out.push(...inner);
        break;
      }
      case "strong": {
        const mark = schema.marks.bold?.create();
        const inner = phrasingToPm(schema, (k as Strong).children || []);
        inner.forEach((n) => (n.marks = mark ? n.marks.concat(mark) : n.marks));
        out.push(...inner);
        break;
      }
      case "delete": {
        // GFM strike
        const mark = schema.marks.strike?.create();
        const inner = phrasingToPm(schema, (k as Delete).children || []);
        inner.forEach((n) => (n.marks = mark ? n.marks.concat(mark) : n.marks));
        out.push(...inner);
        break;
      }
      case "break":
        out.push(schema.nodes.hardBreak.create());
        break;
      case "link": {
        const l = k as Link;
        const link = schema.marks.link?.create({
          href: l.url,
          title: l.title || null,
        });
        const inner = phrasingToPm(schema, l.children || []);
        inner.forEach((n) => (n.marks = link ? n.marks.concat(link) : n.marks));
        out.push(...inner);
        break;
      }
      default: {
        // Unknown phrasing -> stringify that fragment and drop as text
        const md = toMarkdown({
          type: "root",
          children: [{ type: "paragraph", children: [k] }],
        } as Root);
        out.push(schema.text(md.trim()));
      }
    }
  }
  return out;
}

/* --------------------------
 * mdast (blocks) → PM nodes
 * -------------------------- */
export function mdToPm(schema: Schema, node: MNode): PMNode {
  if (node.type === "root") {
    const children = (node as Root).children.map((ch) => mdToPm(schema, ch));
    return schema.topNodeType.createAndFill({}, children) as PMNode;
  }
  switch (node.type) {
    case "paragraph": {
      const inlines = phrasingToPm(schema, (node as Paragraph).children || []);
      return schema.nodes.paragraph.createAndFill({}, inlines)!;
    }
    case "heading": {
      const h = node as Heading;
      const inlines = phrasingToPm(schema, h.children || []);
      return schema.nodes.heading.createAndFill({ level: h.depth }, inlines)!;
    }
    case "blockquote": {
      const inner =
        (node as any).children?.map((c: RootContent) => mdToPm(schema, c)) ||
        [];
      return schema.nodes.blockquote.createAndFill({}, inner)!;
    }
    case "thematicBreak":
      return schema.nodes.horizontalRule.create();
    case "code": {
      const c = node as Code;
      return schema.nodes.codeBlock.createAndFill(
        { language: c.lang || null },
        schema.text(c.value)
      )!;
    }
    case "list": {
      const l = node as List;
      const listType = l.ordered
        ? schema.nodes.orderedList
        : schema.nodes.bulletList;
      const attrs = l.ordered ? { start: l.start ?? 1 } : {};
      const items = (l.children || []).map((li) => {
        const body =
          (li as ListItem).children?.map((c) => mdToPm(schema, c)) || [];
        return schema.nodes.listItem.createAndFill({}, body)!;
      });
      return listType.createAndFill(attrs, items)!;
    }
    default: {
      // Unknown block → stringify and insert as text paragraph
      const raw = toMarkdown({ type: "root", children: [node] } as Root);
      return schema.nodes.paragraph.createAndFill({}, schema.text(raw.trim()))!;
    }
  }
}
