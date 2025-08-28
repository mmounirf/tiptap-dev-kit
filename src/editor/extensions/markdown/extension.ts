import { Extension } from "@tiptap/core";
import type { Node, Schema } from "@tiptap/pm/model";
import { pmToMarkdown } from "./serializer";
import { markdownToPM } from "./parser";

type MarkdownStorage = {
  get: () => string;
  parse: (markdown: string) => Promise<Node>;
};

export interface MarkdownOptions {
  initialMarkdown?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    markdown: {
      setMarkdown: (markdown: string, emitUpdate?: boolean) => ReturnType;
    };
  }
  interface Storage {
    markdown: MarkdownStorage;
  }
  interface Editor {
    getMarkdown(): string;
  }
}

export const Markdown = Extension.create<MarkdownOptions, MarkdownStorage>({
  name: "markdown",

  addOptions() {
    return {
      initialMarkdown: undefined,
    };
  },

  addStorage() {
    const notReady = () => {
      throw new Error("[Markdown] storage not initialized yet.");
    };
    return {
      get: notReady,
      parse: notReady,
    };
  },

  async onCreate() {
    const schema: Schema = this.editor.schema;

    this.storage.get = () => pmToMarkdown(this.editor.state.doc, schema);

    this.storage.parse = (markdown: string) => markdownToPM(markdown, schema);

    if (this.options.initialMarkdown) {
      const doc = await this.storage.parse(this.options.initialMarkdown);
      this.editor.commands.setContent(doc.toJSON(), { emitUpdate: false });
    }

    this.editor.getMarkdown = () => this.storage.get();
  },

  addCommands() {
    return {
      setMarkdown:
        (markdown, emitUpdate = false) =>
        ({ editor }) => {
          this.storage
            .parse(markdown)
            .then((doc) =>
              editor.commands.setContent(doc.toJSON(), { emitUpdate })
            )
            .catch((error) => {
              console.error("[Markdown] Error parsing markdown:", error);
            });
          return true;
        },
    };
  },
});
