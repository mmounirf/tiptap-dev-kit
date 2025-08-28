import type { Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

const parseProcessor = unified().use(remarkParse).use(remarkGfm);

const stringifyProcessor = unified()
  .use(remarkStringify, {
    resourceLink: true,
    fences: true,
    bullet: "-",
    listItemIndent: "one",
    rule: "-",
    ruleRepetition: 3,
    ruleSpaces: false,
    closeAtx: false,
    tightDefinitions: true,
  })
  .use(remarkGfm);

/**
 * Parses a Markdown string into an MDAST (Markdown Abstract Syntax Tree).
 *
 * Uses `remark-parse` and `remark-gfm` under the hood to support
 * GitHub Flavored Markdown extensions such as tables, task lists,
 * and strikethrough.
 *
 * @param {string} markdown - The Markdown source string to parse.
 * @returns {Root} An MDAST `Root` node representing the parsed Markdown.
 */
export const fromMarkdown = (markdown: string) =>
  parseProcessor.parse(markdown);

/**
 * Converts an MDAST (Markdown Abstract Syntax Tree) back into a Markdown string.
 *
 * Uses `remark-stringify` with specific options (e.g., `-` bullets, fenced code blocks,
 * and tight definitions) plus `remark-gfm` to serialize nodes into GitHub Flavored Markdown.
 *
 * @param {Root} ast - The MDAST `Root` node to stringify.
 * @returns {string} A Markdown string representation of the given AST.
 */
export const toMarkdown = (ast: Root) =>
  String(stringifyProcessor.stringify(ast));
