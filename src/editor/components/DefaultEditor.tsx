import { Editor } from "@/editor/Editor";
import { useEditor } from "@/editor/hooks/useEditor";

export default function DefaultEditor() {
	const defaultEditor = useEditor();

	return <Editor editor={defaultEditor} />;
}
