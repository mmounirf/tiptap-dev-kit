import type { ComponentType, RefObject } from "react";

import type {
  MentionNodeAttrs,
  MentionOptions,
} from "@tiptap/extension-mention";
import type {
  SuggestionKeyDownProps,
  SuggestionProps,
} from "@tiptap/suggestion";

export interface MentionItem {
  id: string;
  label: string;
}
export interface SuggestionComponentProperties<T extends MentionItem>
  extends SuggestionProps<T, MentionNodeAttrs> {
  ref: RefObject<SuggestionListReference>;
}
export interface SuggestionListReference {
  onKeyDown: (properties: SuggestionKeyDownProps) => boolean;
}
export interface CreateSuggestionConfig<T extends MentionItem = MentionItem>
  extends Omit<MentionOptions<T>["suggestion"], "render"> {
  ListComponent: ComponentType<SuggestionComponentProperties<T>>;
}
