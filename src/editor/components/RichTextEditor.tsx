import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import { ListKit } from "@tiptap/extension-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";
import CodeBlock from "@tiptap/extension-code-block";
import { Placeholder } from "@tiptap/extensions";
import { Editor } from "@/editor/Editor";
import { useEditor } from "@/editor/hooks/useEditor";
import { defaultEditorOptions, defaultExtensions } from "../defaults";
import { makePlaceholderOptions } from "../extensions/placeholder";

export default function RichTextEditor() {
  const richTextEditor = useEditor({
    ...defaultEditorOptions,
    extensions: Object.values({
      ...defaultExtensions,
      Placeholder: Placeholder.configure(
        makePlaceholderOptions({
          placeholder: "You can use all the marks here...",
        })
      ),
      Bold,
      Code,
      Highlight: Highlight.configure({ multicolor: true }),
      Italic,
      Link,
      Strike,
      Underline,
      Heading,
      Blockquote,
      ListKit: ListKit.configure({
        taskList: {
          HTMLAttributes: {
            class: "not-prose",
          },
        },
        taskItem: {
          nested: true,
          HTMLAttributes: {
            class: "flex gap-1 [&>label]:items-center [&>label]:flex",
          },
        },
      }),
      HorizontalRule,
      HardBreak,
      CodeBlock,
    }),
  });

  return <Editor editor={richTextEditor} />;
}
