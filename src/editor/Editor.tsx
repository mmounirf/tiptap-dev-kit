import { EditorContent, type EditorContentProps } from "@tiptap/react";
import type { FC } from "react";
import { cn } from "@/lib/utils";

export const Editor: FC<EditorContentProps> = (properties) => {
	const { className, editor } = properties;

	return (
		<EditorContent
			className={cn("w-full flex-1 overflow-y-auto", className)}
			editor={editor}
		/>
	);
};

Editor.displayName = "Editor";
