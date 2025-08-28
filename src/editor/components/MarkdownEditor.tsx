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
import {
  defaultEditorOptions,
  defaultExtensions,
  editorClassName,
} from "../defaults";
import { makePlaceholderOptions } from "../extensions/placeholder";

import { Editor } from "../Editor";
import { useState } from "react";
import { demoMarkdown } from "@/assets/markdown-demo";
export default function MarkdownEditor() {
  const markdownEditor = useEditor({
    ...defaultEditorOptions,
    editorProps: {
      ...defaultEditorOptions.editorProps,
      attributes: {
        class: editorClassName("max-h-none bg-slate-50"),
      },
    },
    extensions: Object.values({
      ...defaultExtensions,
      Placeholder: Placeholder.configure(
        makePlaceholderOptions({
          placeholder: "You can input/output markdown from here",
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
      Markdown: Markdown.configure({
        initialMarkdown: demoMarkdown,
      }),
    }),
  });
  const [output, setOutput] = useState<string>("");

  return (
    <div className="relative">
      <div className="flex gap-2 w-full sticky top-0 z-50 p-2 bg-white mb-2">
        <button
          className="border text-sm cursor-pointer px-2 bg-slate-200 rounded-xs"
          onClick={() => setOutput(markdownEditor.getMarkdown())}
        >
          Markdown output (check down below)
        </button>

        <button
          className="border text-sm cursor-pointer px-2 bg-slate-200 rounded-xs"
          onClick={() => console.log(markdownEditor.getJSON())}
        >
          JSON output (check console)
        </button>
      </div>
      <Editor editor={markdownEditor} />

      {output && (
        <div className="p-2 m-2 w-full h-full border rounded-sm whitespace-break-spaces font-mono text-sm">
          {output}
        </div>
      )}
    </div>
  );
}
