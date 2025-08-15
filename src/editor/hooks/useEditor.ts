import {
	type Editor,
	useEditor as tiptapUseEdtior,
	type UseEditorOptions,
} from "@tiptap/react";
import { defaultEditorOptions } from "../defaults";

export const useEditor = (
	properties: UseEditorOptions = defaultEditorOptions,
): Editor => {
	return tiptapUseEdtior(properties);
};
