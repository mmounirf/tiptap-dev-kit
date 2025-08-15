import { Canvas, Source } from "@storybook/addon-docs/blocks";

import type { Meta, StoryObj } from "@storybook/react-vite";
import DefaultEditor from "./DefaultEditor";
import code from "./DefaultEditor.tsx?raw";

const meta = {
	title: "Editor/Default",
	component: DefaultEditor,
	parameters: {
		docs: {
			page: () => {
				return (
					<>
						<h1>Default Editor</h1>
						<p>
							The <strong>DefaultEditor</strong> is a <em>bare-bones</em> TipTap
							setup that starts with{" "}
							<strong>no rich text formatting enabled</strong>. It’s
							intentionally minimal so you can selectively add{" "}
							<strong>
								<em>only</em>
							</strong>{" "}
							the text formats and behaviors you need for your use case —
							whether that’s underline-only, bold-only, or something more
							advanced.
						</p>

						<p>
							Think of it as a clean foundation: you can extend it to create
							anything from a simple title field to a fully featured rich text
							editor. For example, you might extend it with an emoji picker
							triggered by typing <code>:</code>, <em>without</em> adding any
							other formatting options like bold, italic, or strikethrough.
						</p>

						<h2>Shipped with following extensions</h2>
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
						</ul>

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
} satisfies Meta<typeof DefaultEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
