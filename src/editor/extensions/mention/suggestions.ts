import type {
  CreateSuggestionConfig,
  MentionItem,
  SuggestionListReference,
} from "./types";
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/react-dom";
import { Editor } from "@tiptap/core";
import type {
  MentionNodeAttrs,
  MentionOptions,
} from "@tiptap/extension-mention";
import { posToDOMRect, ReactRenderer } from "@tiptap/react";
import type {
  SuggestionKeyDownProps,
  SuggestionProps,
} from "@tiptap/suggestion";

const createVirtualElement = (editor: Editor) => ({
  getBoundingClientRect: () =>
    posToDOMRect(
      editor.view,
      editor.state.selection.from,
      editor.state.selection.to
    ),
});

export const createSuggestion = <T extends MentionItem>({
  ListComponent,
  ...suggestionOptions
}: CreateSuggestionConfig<T>): MentionOptions<T>["suggestion"] => ({
  ...suggestionOptions,
  render: () => {
    let component:
      | ReactRenderer<
          SuggestionListReference,
          SuggestionProps<T, MentionNodeAttrs>
        >
      | undefined;
    let element: HTMLElement | undefined;
    let cleanupAutoUpdate: (() => void) | undefined;

    const cleanup = () => {
      cleanupAutoUpdate?.();
      if (element && document.body.contains(element)) {
        element.remove();
      }
      component?.destroy();
      component = undefined;
      element = undefined;
      cleanupAutoUpdate = undefined;
    };

    const updatePosition = () => {
      if (!element || !component) return;

      const virtualElement = createVirtualElement(component.props.editor);

      void (async () => {
        try {
          const { strategy, x, y } = await computePosition(
            virtualElement,
            element,
            {
              middleware: [offset(4), shift({ padding: 8 }), flip()],
              placement: "bottom-start",
              strategy: "absolute",
            }
          );

          Object.assign(element.style, {
            left: `${x}px`,
            position: strategy,
            top: `${y}px`,
            visibility: "visible",
          });
        } catch {
          throw new Error("Failed to update suggestion position:");
        }
      })();
    };

    return {
      onExit() {
        cleanup();
      },

      onKeyDown(properties: SuggestionKeyDownProps) {
        if (properties.event.key === "Escape") {
          cleanup();
          return true;
        }

        return component?.ref?.onKeyDown(properties) ?? false;
      },

      onStart: (properties) => {
        cleanup();

        component = new ReactRenderer(ListComponent, {
          editor: properties.editor,
          props: properties,
        });

        element = component.element as HTMLElement;

        if (!properties.clientRect) {
          return;
        }

        Object.assign(element.style, {
          position: "absolute",
          visibility: "hidden",
        });

        document.body.append(element);

        const virtualElement = createVirtualElement(properties.editor);

        cleanupAutoUpdate = autoUpdate(virtualElement, element, updatePosition);
      },

      onUpdate(properties) {
        if (!component) return;

        component.updateProps(properties);

        if (!properties.clientRect) {
          if (element) {
            element.style.visibility = "hidden";
          }
          return;
        }

        updatePosition();
      },
    };
  },
});
