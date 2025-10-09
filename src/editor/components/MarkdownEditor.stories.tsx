import { Canvas, Source } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import code from "./MarkdownEditor.tsx?raw";
import MarkdownEditor from "./MarkdownEditor";

const meta = {
  title: "Editor/Markdown",
  component: MarkdownEditor,
  parameters: {
    docs: {
      page: () => {
        return (
          <>
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
} satisfies Meta<typeof MarkdownEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
