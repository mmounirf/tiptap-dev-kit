export const demoMarkdown = `
hi there is is markdown demo
`;

export const demoMarkdownMentions = `
**The current mentions uses dummy data, for files we have static list, for users, we hit a json placeholder api**

Now I can mention users like: <@U1> which will resolve to our custom syntax \`<@U1>\`.

> 1 is the user id from users api being used in the demo

I'm extensible enough to support any kind of custom syntax, as an example, imagine a file entity mention custom syntax.

> Following our previous practice with users mention, I imagine it will look like this

\`\`\`markdown
<@F123-456-789>

// Where "F" indicates a file mention, right?
\`\`\`

File entity also have its own custom node, as an example this is how files are being mentioned in this demo #WEBP - node renderer is basically a react component - so it's your playground to craft interactive rich nodes
`;
