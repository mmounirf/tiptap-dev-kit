import { Canvas, Source } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import RichTextEditor from "./RichTextEditor";
import code from "./RichTextEditor.tsx?raw";

const meta = {
  title: "Editor/RichText",
  component: RichTextEditor,
  parameters: {
    docs: {
      page: () => {
        return (
          <>
            <h1>Rich Text Editor</h1>
            <p>
              The <strong>RichTextEditor</strong> is a TipTap editor
              preconfigured with{" "}
              <em>all common marks and block-level extensions</em>. It supports
              bold, italic, underline, strike, code, link, highlight, headings,
              blockquotes, lists (bullet, ordered, task), horizontal rules, hard
              breaks, and code blocks.
            </p>

            <p>
              Use this as a formatting playground or a foundation for building
              richer editors with custom behavior and extensions. It also ships
              with a placeholder so users know where to start typing.
            </p>

            <h2>Shipped with the following extensions</h2>
            <ul>
              <li>
                <a
                  href="https://tiptap.dev/docs/editor/extensions/functionality/undo-redo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Undo/Redo
                </a>{" "}
                — Provides undo/redo keyboard shortcuts.
              </li>
              <li>
                <a
                  href="https://tiptap.dev/docs/editor/extensions/functionality/placeholder"
                  target="_blank"
                  rel="noreferrer"
                >
                  Placeholder
                </a>{" "}
                — Displays a hint when the editor is empty.
              </li>
              <li>
                Formatting <em>marks</em>:
                <ul>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/marks/bold"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Bold
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/marks/italic"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Italic
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/marks/underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Underline
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/marks/strike"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Strike
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/marks/code"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/marks/link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/marks/highlight"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Highlight
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Block <em>nodes</em>:
                <ul>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/nodes/heading"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Heading
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/nodes/blockquote"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Blockquote
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/functionality/list-kit"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ListKit
                    </a>{" "}
                    (bullet, ordered, task list &amp; task item)
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/nodes/horizontal-rule"
                      target="_blank"
                      rel="noreferrer"
                    >
                      HorizontalRule
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/nodes/hard-break"
                      target="_blank"
                      rel="noreferrer"
                    >
                      HardBreak
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiptap.dev/docs/editor/extensions/nodes/code-block"
                      target="_blank"
                      rel="noreferrer"
                    >
                      CodeBlock
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <h2>Keybindings &amp; Input Rules</h2>
            <p>
              TipTap ships sensible input rules for many nodes (Markdown-style
              typing), and some default shortcuts for marks. You can always add
              your own bindings.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Shortcut</th>
                  <th>Input Rule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bold</td>
                  <td>
                    <code>Ctrl + B / Cmd + B</code>
                  </td>
                  <td>
                    <code>**text**</code> or <code>__text__</code>
                  </td>
                </tr>
                <tr>
                  <td>Italic</td>
                  <td>
                    <code>Ctrl + I / Cmd + I</code>
                  </td>
                  <td>
                    <code>*text*</code> or <code>_text_</code>
                  </td>
                </tr>
                <tr>
                  <td>Underline</td>
                  <td>
                    <code>Ctrl + U</code> / <code>Cmd + U</code>
                  </td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Strike</td>
                  <td>
                    <code>Alt + Shift + S</code>
                  </td>
                  <td>
                    <code>~~text~~</code>
                  </td>
                </tr>
                <tr>
                  <td>Code (mark)</td>
                  <td>
                    <code>Ctrl + Shift + C</code> / <code>Cmd + Shift + C</code>
                  </td>
                  <td>
                    <code>`code`</code>
                  </td>
                </tr>
                <tr>
                  <td>Link</td>
                  <td>—</td>
                  <td>
                    <code>[label](https://url)</code>
                  </td>
                </tr>
                <tr>
                  <td>Highlight</td>
                  <td>
                    <code>Ctrl + Shift + H</code> / <code>Cmd + Shift + H</code>
                  </td>
                  <td>==text==</td>
                </tr>
                <tr>
                  <td>Heading</td>
                  <td>
                    <code>Ctrl + Alt + 1</code> / <code>Cmd + Alt + 1</code>
                    <p>Heading level value from 1 to 6</p>
                  </td>
                  <td>
                    <code>#</code>, <code>##</code>, … <code>######</code> then
                    space
                  </td>
                </tr>
                <tr>
                  <td>Blockquote</td>
                  <td>
                    <code>Ctrl + Shift + B</code> / <code>Cmd + Shift + B</code>
                  </td>
                  <td>
                    <code>&gt; </code> at line start
                  </td>
                </tr>
                <tr>
                  <td>Bullet List</td>
                  <td>
                    <code>Ctrl + Shift + 8</code> / <code>Cmd + Shift + 8</code>
                  </td>
                  <td>
                    <code>- </code> or <code>* </code> at line start
                  </td>
                </tr>
                <tr>
                  <td>Ordered List</td>
                  <td>
                    <code>Ctrl + Shift + 7</code> / <code>Cmd + Shift + 7</code>
                  </td>
                  <td>
                    <code>1. </code> at line start
                  </td>
                </tr>
                <tr>
                  <td>Task List / Item</td>
                  <code>Ctrl + Shift + 9</code> / <code>Cmd + Shift + 9</code>
                  <td>
                    <code>[ ] </code> or <code>[x] </code> then space
                  </td>
                </tr>
                <tr>
                  <td>Horizontal Rule</td>
                  <td>—</td>
                  <td>
                    <code>---</code> then Enter
                  </td>
                </tr>
                <tr>
                  <td>Hard Break</td>
                  <td>
                    <code>Shift + Enter</code>
                  </td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Code Block</td>
                  <td>
                    <code>Ctrl + Alt + C</code> / <code>Cmd + Alt + C</code>
                  </td>
                  <td>
                    <code>```</code> then Enter
                  </td>
                </tr>
              </tbody>
            </table>

            <h2>Usage</h2>
            <Source />

            <h2>Demo</h2>
            <Canvas />
          </>
        );
      },
      source: {
        code,
      },
    },
  },
} satisfies Meta<typeof RichTextEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
