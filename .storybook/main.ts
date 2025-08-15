import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/editor/components/**/*.stories.@(ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		defaultName: "Documentation",
	},
};
export default config;
