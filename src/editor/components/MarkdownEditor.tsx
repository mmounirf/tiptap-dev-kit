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

import { Markdown } from "../extensions/markdown/extension";
import { Placeholder } from "@tiptap/extensions";
import { useEditor } from "@/editor/hooks/useEditor";
import { defaultEditorOptions, defaultExtensions } from "../defaults";
import { makePlaceholderOptions } from "../extensions/placeholder";

import { MARKDOWN_TEST } from "../static";
import { Editor } from "../Editor";
import { useState } from "react";
export default function MarkdownEditor() {
  const markdownEditor = useEditor({
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
      Highlight,
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
      Markdown: Markdown.configure({
        initialMarkdown: MARKDOWN_TEST,
      }),
    }),
  });
  const [output, setOutput] = useState<string>("");

  return (
    <>
      <div className="flex gap-2 mb-2">
        <button onClick={() => setOutput(markdownEditor.getMarkdown())}>
          Markdown Output
        </button>

        <button onClick={() => console.log(markdownEditor.getJSON())}>
          JSON output
        </button>
      </div>
      <Editor editor={markdownEditor} />

      {output && (
        <div className="p-2 m-2 w-full h-full border rounded-sm">
          <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
        </div>
      )}
    </>
  );
}
