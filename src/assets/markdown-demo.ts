export const demoMarkdown = `# Rich Text Editor – Full Extension Demo

This paragraph demonstrates **bold**, *italic*, ~~strike~~, ==highlight==, \`inline code\`, and a [link](https://www.youtube.com/watch?v=Aq5WXmQQooo).

Also a combo: **_bold+italic_**, **==bold+highlight==**, and *[italic linked](https://www.youtube.com/watch?v=Aq5WXmQQooo)*.

## Headings
### H3
#### H4
##### H5
###### H6

> ### Quoted Heading
> A blockquote with **bold**, *italic*, and a nested list:
> - Bullet inside quote
> - Another item with ==highlight==
>   1. Numbered inside bullet
>      - Mixed nested bullet
> > Nested blockquote line
>
> And a bit of \`inline code\` within the quote.

---

### Lists
- Top-level bullet
  - Nested bullet with \`code\`
  - Nested bullet with ~~strike~~ and ==highlight==
- Another bullet with **bold** text

1. Ordered one
2. Ordered two
   1. Sub-ordered
   2. Sub-ordered with *italic*
3. Ordered three with **bold** and \`code\`

### Task List (ListKit)
- [ ] Unchecked task
- [x] Checked task
  - [ ] Nested unchecked task
    - [x] Deep nested checked task with **bold** and ==highlight==

---

### Code Block
\`\`\`ts
// CodeBlock: should render as a fenced block
type User = { id: number; name: string };

function greet(name: string) {
  console.log(\`Hello, \${name}\`);
}

greet("Tiptap");
\`\`\`

### Horizontal Rule (again)
---

### Headings via Input Rules
# H1 via "# " then space
## H2 via "## " then space
### H3 via "### " then space

### Blockquote via Input Rule
> Start a quote with "> " then space

### List Input Rules
- Use "- " or "* " for bullets
1. Use "1. " for ordered
[ ] Use "[ ] " or "[x] " for tasks
[x] Completed task example

### Mixed Inline Combos
**Bold with *italic inside* and \`code\`** plus a [**bold link**](https://www.youtube.com/watch?v=Aq5WXmQQooo) and ==**highlighted bold**==.
Also testing underline variants: ++underlined++ and <u>underlined html</u>.
`;
