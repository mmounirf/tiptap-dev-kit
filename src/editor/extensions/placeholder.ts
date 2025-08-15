import type { PlaceholderOptions } from "@tiptap/extensions";
import { cn } from "@/lib/utils";

export const makePlaceholderOptions = ({
	emptyEditorClass,
	placeholder,
}: Partial<PlaceholderOptions> = {}) => ({
	emptyEditorClass: cn(
		"first:before:content-[attr(data-placeholder)] first:before:float-left first:before:text-neutral-200 first:before:h-0 first:before:pointer-events-none",
		emptyEditorClass ?? "",
	),
	placeholder: placeholder ?? "Write a message...",
});
