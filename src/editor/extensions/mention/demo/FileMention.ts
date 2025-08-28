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
  addNodeView() {
    return ReactNodeViewRenderer(MentionNode);
  },
  name: "file-mention",
});
