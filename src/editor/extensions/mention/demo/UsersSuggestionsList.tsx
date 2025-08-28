import { forwardRef, useImperativeHandle, useState } from "react";

import type { MentionNodeAttrs } from "@tiptap/extension-mention";
import type { SuggestionProps } from "@tiptap/suggestion";
import type { SuggestionListReference } from "../types";
import { cn } from "@/lib/utils";
import type { User } from "./UserMention";

export const UsersSuggestionsList = forwardRef<
  SuggestionListReference,
  SuggestionProps<User, MentionNodeAttrs>
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
      label: suggestion.name,
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
            "z-50 flex w-full cursor-pointer items-start gap-2 rounded-md p-1 hover:bg-blue-100",
            selectedIndex === index ? "bg-blue-100" : ""
          )}
        >
          <img
            width={26}
            height={26}
            src={`https://avatar.iran.liara.run/username?username=${item.name}`}
          />

          <div className="flex flex-col items-start">
            <p className="text-sm">{item.name}</p>
            <p className="text-xs">{item.email}</p>
          </div>
        </button>
      ))}
    </div>
  );
});
