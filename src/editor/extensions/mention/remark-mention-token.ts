import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Root, Text, PhrasingContent } from "mdast";
import type { Node } from "unist";

export const MENTION_TYPES = ["U", "F"] as const;
export type MentionType = (typeof MENTION_TYPES)[number];

export interface MentionNode extends Node {
  type: "mention";
  entity: MentionType;
  id: string;
  mentionSuggestionChar: string;
  label: string;
}

export function isMentionType(value: string): value is MentionType {
  return (MENTION_TYPES as readonly string[]).includes(value);
}

const MENTION_REGEX = /<@([A-Z])([^>]+)>/g;

function tokenizeMentions(value: string): PhrasingContent[] | null {
  const output: PhrasingContent[] = [];
  let last = 0;
  let matches: RegExpExecArray | null;

  while ((matches = MENTION_REGEX.exec(value))) {
    const [full, entityRaw, id] = matches;
    console.log(matches);
    const start = matches.index;

    if (start > last) {
      output.push({ type: "text", value: value.slice(last, start) } as Text);
    }

    const entity = entityRaw.toUpperCase();
    if (isMentionType(entity)) {
      output.push({
        type: "mention",
        entity,
        id,
        label: id,
      } as unknown as PhrasingContent);
    } else {
      output.push({ type: "text", value: full } as Text);
    }

    last = start + full.length;
  }

  if (output.length === 0) return null;

  if (last < value.length) {
    output.push({ type: "text", value: value.slice(last) } as Text);
  }
  return output;
}

export const remarkMentionToken: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit<Root, "text">(tree, "text", (node, index, parent) => {
      if (index == null || !parent) return;
      const replacement = tokenizeMentions(node.value);
      if (!replacement) return;
      (parent.children as Node[]).splice(index, 1, ...replacement);
      return index + replacement.length;
    });
  };
};

declare module "mdast" {
  interface PhrasingContentMap {
    mention: MentionNode;
  }
  interface RootContentMap {
    mention: MentionNode;
  }
}
