import { cn } from "@/lib/utils";
import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import type { User } from "./UserMention";
import { useEffect, useState } from "react";

const fetchUserData = async (id: string): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const user = await response.json();
  return {
    id: user.id.toString(),
    username: user.username,
    label: user.name,
    email: user.email,
    name: user.name,
  };
};

const fileStyles = cn("text-amber-600 bg-amber-100");
const userStyles = cn("text-blue-600 bg-blue-100");
const getColorStyles = (entity: string) => {
  if (entity === "U") return userStyles;
  if (entity === "F") return fileStyles;
  return cn("text-gray-600 bg-gray-100");
};

export const FileNode = (properties: NodeViewProps) => (
  <span
    className={cn(
      "rounded px-1 py-0.5 font-medium",
      getColorStyles(properties.node.attrs.entity)
    )}
  >
    {properties.node.attrs.mentionSuggestionChar}
    {properties.node.attrs.label}
  </span>
);

export const UserNode = (properties: NodeViewProps) => {
  const [user, setUser] = useState<User>();
  const userId = properties.node.attrs.id;
  useEffect(() => {
    if (user) {
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchUserData(userId);
        setUser(data);
      } catch (err) {
        console.error(`Failed to fetch user data for ID ${userId}:`, err);
      }
    };

    fetchData();
  }, [userId, user]);
  return (
    <span
      className={cn(
        "inline-flex gap-1 items-center rounded px-1 py-0.5 font-medium",
        getColorStyles(properties.node.attrs.entity)
      )}
    >
      {user ? (
        <>
          <img
            className="size-4 shrink-0 not-prose rounded-full"
            width={16}
            height={16}
            src={`https://testingbot.com/free-online-tools/random-avatar/50?u=${
              user?.name ?? userId
            }`}
          />

          <span className="flex flex-col">
            <p className="text-xs">{user?.name}</p>
          </span>
        </>
      ) : (
        <>
          <img
            className="size-4 shrink-0 not-prose rounded-full"
            width={16}
            height={16}
            src={`https://testingbot.com/free-online-tools/random-avatar/50?u=loading`}
          />

          <span className="flex flex-col">
            <p className="text-xs">Loading...</p>
          </span>
        </>
      )}
    </span>
  );
};

export const MentionNode = (properties: NodeViewProps) => {
  const isUser = properties.node.attrs.entity === "U";
  const isFile = properties.node.attrs.entity === "F";
  return (
    <NodeViewWrapper
      className="inline w-fit align-middle"
      data-entity-type={properties.node.attrs.entity}
      data-entity-id={properties.node.attrs.id}
    >
      {isUser && <UserNode {...properties} />}
      {isFile && <FileNode {...properties} />}
    </NodeViewWrapper>
  );
};
