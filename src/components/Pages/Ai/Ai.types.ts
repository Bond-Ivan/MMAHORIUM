export type MessageRole = "user" | "assistant";

export type Message = {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: string;
};

export type QuickAction = {
    id: string;
    title: string;
    subtitle: string;
    prompt: string;
    emoji: string;
    accent: "orange" | "red" | "gold" | "neutral";
};