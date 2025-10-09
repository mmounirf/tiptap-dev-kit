import Mention from "@tiptap/extension-mention";
import { createSuggestion } from "../suggestions";
import { FilesSuggestionsList } from "./FilesSuggestionsList";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { MentionNode } from "./MentionNode";

const items = [
  {
    id: "1",
    label: "DOC",
  },
  {
    id: "2",
    label: "DOCX",
  },
  {
    id: "3",
    label: "PDF",
  },
  {
    id: "4",
    label: "JPG",
  },
  {
    id: "5",
    label: "WEBP",
  },
  {
    id: "6",
    label: "PNG",
  },
];

export const FileMention = Mention.configure({
  HTMLAttributes: {
    "data-label": "file-mention",
  },
  suggestion: createSuggestion({
    char: "#",
    items: ({ query }) =>
      items.filter(({ label }) =>
        label.toLowerCase().startsWith(query.toLowerCase())
      ),
    ListComponent: FilesSuggestionsList,
  }),
}).extend({
  name: "fileMention",
  addNodeView() {
    return ReactNodeViewRenderer(MentionNode);
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      entity: {
        default: "F",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-entity-type"),
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-entity-type": attributes.entity,
        }),
      },
    };
  },
});
