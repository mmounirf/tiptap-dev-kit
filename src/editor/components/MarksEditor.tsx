import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extensions";
import { Editor } from "@/editor/Editor";
import { useEditor } from "@/editor/hooks/useEditor";
import { defaultEditorOptions, defaultExtensions } from "../defaults";
import { makePlaceholderOptions } from "../extensions/placeholder";

export default function MarksEditor() {
	const marksEditor = useEditor({
		...defaultEditorOptions,
		extensions: Object.values({
			...defaultExtensions,
			Placeholder: Placeholder.configure(
				makePlaceholderOptions({
					placeholder: "You can use all the marks here...",
				}),
			),
			Bold,
			Code,
			Highlight,
			Italic,
			Link,
			Strike,
			Subscript,
			Superscript,
			Underline,
		}),
	});

	return <Editor editor={marksEditor} />;
}
