import Mention from "@tiptap/extension-mention";
import { createSuggestion } from "../suggestions";
import { UsersSuggestionsList } from "./UsersSuggestionsList";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { MentionNode } from "./MentionNode";

const fetchUsers = async (query: string): Promise<User[]> => {
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/users?name_like=${query}`
  );
  return await request.json();
};

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  label: string;
}

export const UserMention = Mention.configure({
  HTMLAttributes: {
    "data-label": "user-mention",
  },
  suggestion: createSuggestion({
    char: "@",
    ListComponent: UsersSuggestionsList,
    items: async ({ query }) => await fetchUsers(query),
  }),
}).extend({
  name: "userMention",
  addNodeView() {
    return ReactNodeViewRenderer(MentionNode);
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      entity: {
        default: "U",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-entity-type"),
        renderHTML: (attributes: Record<string, unknown>) => ({
          "data-entity-type": attributes.entity,
        }),
      },
    };
  },
});
