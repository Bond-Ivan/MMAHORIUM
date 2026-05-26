import { type ReactElement } from "react";
import type { Message } from "../../Ai.types";
import styles from "./ChatMessage.module.css";
import ReactMarkdown from "react-markdown";

type Props = {
    message: Message;
    isStreaming?: boolean;
};

function ChatMessage({ message, isStreaming = false }: Props): ReactElement {
    const isAssistant = message.role === "assistant";

    return (
        <article
            className={`${styles.message} ${isAssistant ? styles.assistant : styles.user}`}
        >
            <div className={styles.avatar}>
                {isAssistant ? "🔮" : "🥷"}
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.meta}>
                    <span className={styles.author}>
                        {isAssistant ? "MMA Oracle" : "Ты"}
                    </span>
                    <span className={styles.time}>
                        {new Date(message.timestamp).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>

                <div
                    className={`${styles.bubble} ${
                        isAssistant ? styles.assistantBubble : styles.userBubble
                    }`}
                >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                    {isStreaming && <span className={styles.cursor} />}
                </div>
            </div>
        </article>
    );
}

export default ChatMessage;