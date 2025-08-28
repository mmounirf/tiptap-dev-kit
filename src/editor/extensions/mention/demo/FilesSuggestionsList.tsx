import { forwardRef, useImperativeHandle, useState } from "react";

import type { MentionNodeAttrs } from "@tiptap/extension-mention";
import type { SuggestionProps } from "@tiptap/suggestion";
import type { MentionItem, SuggestionListReference } from "../types";
import { cn } from "@/lib/utils";

export const FilesSuggestionsList = forwardRef<
  SuggestionListReference,
  SuggestionProps<MentionItem, MentionNodeAttrs>
>((properties, reference) => {
  const itemsLength = properties.items.length;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectItem = (index: number) => {
    if (index >= properties.items.length) {
      return;
    }
    const suggestion = properties.items[index];

    if (!suggestion) {
      return;
    }

    const mentionItem: MentionNodeAttrs = {
      id: suggestion.id,
      label: suggestion.label,
    };

    properties.command(mentionItem);
  };

  const upHandler = () => {
    setSelectedIndex(
      (previousIndex) => (previousIndex - 1 + itemsLength) % itemsLength
    );
  };

  const downHandler = () => {
    setSelectedIndex((previousIndex) => (previousIndex + 1) % itemsLength);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useImperativeHandle(reference, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  if (properties.items.length === 0) {
    return;
  }

  return (
    <div className="max-h-[70vh] min-w-64 overflow-y-auto rounded-lg p-1 shadow-md bg-white">
      {properties.items.map((item, index) => (
        <button
          onClick={() => {
            selectItem(index);
          }}
          key={item.id}
          className={cn(
            "z-50 flex w-full cursor-pointer items-start gap-2 rounded-md p-1 hover:bg-amber-100",
            selectedIndex === index ? "bg-amber-100" : ""
          )}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
});
