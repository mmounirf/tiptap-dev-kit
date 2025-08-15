import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Placeholder, UndoRedo } from "@tiptap/extensions";
import type { EditorProps } from "@tiptap/pm/view";
import type { UseEditorOptions } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { makePlaceholderOptions } from "./extensions/placeholder";

export const editorClassName = (className: string | undefined = "") =>
	cn(
		"flex-1 flex-col h-full rounded-sm border border-transparent bg-film-subtle p-1 leading-snug font-normal tracking-tight transition-colors duration-200 hover:border-input focus:border-ring hover:bg-accemt outline-none overflow-y-auto resize-y min-h-20 max-h-40",
		className,
	);

export const editorProps: EditorProps = {
	attributes: {
		class: editorClassName(),
	},
};

export const defaultExtensions = {
	Document,
	Paragraph,
	Placeholder: Placeholder.configure(makePlaceholderOptions()),
	Text,
	UndoRedo,
};

export const defaultEditorOptions: UseEditorOptions = {
	editorProps,
	extensions: [
		Document,
		Paragraph,
		Text,
		UndoRedo,
		Placeholder.configure(makePlaceholderOptions()),
	],
};
