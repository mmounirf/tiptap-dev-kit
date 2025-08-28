import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export const MentionNode = (properties: NodeViewProps) => {
  return (
    <NodeViewWrapper className="inline w-fit">
      <span className="rounded bg-blue-100 px-1 py-0.5 font-medium text-blue-600">
        @{properties.node.attrs.label}
      </span>
    </NodeViewWrapper>
  );
};
