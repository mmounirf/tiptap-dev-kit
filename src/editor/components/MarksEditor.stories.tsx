import { Canvas, Source } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MarksEditor from "./MarksEditor";
import code from "./MarksEditor.tsx?raw";

const meta = {
	title: "Editor/Marks",
	component: MarksEditor,
	parameters: {
		docs: {
			page: () => {
				return (
					<>
						<h1>Marks Editor</h1>
						<p>
							The <strong>MarksEditor</strong> is a TipTap editor preconfigured
							with <em>all available text formatting marks</em>. It includes
							bold, italic, underline, strikethrough, code, link, highlight,
							subscript, and superscript — everything you need for rich text
							editing out of the box.
						</p>

						<p>
							You can use this editor as a playground for formatting or as a
							foundation for building more complex editors with custom behavior
							and extensions. It comes with a placeholder so users know where to
							start typing.
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
								All standard{" "}
								<a
									href="https://tiptap.dev/docs/editor/extensions/marks"
									target="_blank"
									rel="noreferrer"
								>
									TipTap marks
								</a>
								:
								<ul>
									<li>Bold</li>
									<li>Italic</li>
									<li>Underline</li>
									<li>Strike</li>
									<li>Code</li>
									<li>Link</li>
									<li>Highlight</li>
									<li>Subscript</li>
									<li>Superscript</li>
								</ul>
							</li>
						</ul>

						<h2>Keybindings</h2>
						<p>Below are the default keyboard shortcuts for each mark:</p>
						<table>
							<thead>
								<tr>
									<th>Mark</th>
									<th>Shortcut</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Bold</td>
									<td>
										<code>Ctrl + B / Cmd + B</code>
									</td>
								</tr>
								<tr>
									<td>Italic</td>
									<td>
										<code>Ctrl + I / Cmd + I</code>
									</td>
								</tr>
								<tr>
									<td>Underline</td>
									<td>
										<code>Ctrl + U / Cmd + U</code>
									</td>
								</tr>
								<tr>
									<td>Strike</td>
									<td>
										<code>Alt + Shift + S</code>
									</td>
								</tr>
								<tr>
									<td>Code</td>
									<td>
										<code>Ctrl + Shift + C / Cmd + Shift + C</code>
									</td>
								</tr>
								<tr>
									<td>Link</td>
									<td>
										<code>Ctrl + K / Cmd + K</code>
									</td>
								</tr>
								<tr>
									<td>Highlight</td>
									<td>No default shortcut</td>
								</tr>
								<tr>
									<td>Subscript</td>
									<td>
										<code>Ctrl + ,</code>
									</td>
								</tr>
								<tr>
									<td>Superscript</td>
									<td>
										<code>Ctrl + .</code>
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
} satisfies Meta<typeof MarksEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
