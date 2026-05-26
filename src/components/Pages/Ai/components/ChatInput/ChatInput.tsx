import { type KeyboardEvent, type ReactElement, useEffect, useRef } from "react";
import styles from "./ChatInput.module.css";

type Props = {
    value: string;
    onChange: (value: string) => void;
    onSend: (value?: string) => void;
    disabled?: boolean;
};

function ChatInput({ value, onChange, onSend, disabled = false }: Props): ReactElement {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = "0px";
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }, [value]);

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSend();
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.inputShell}>
                <div className={styles.topGlow} />
                <div className={styles.leftChip}>Oracle Input</div>

                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    placeholder="Например: кто победит, как прошёл бы бой, расскажи про бойца..."
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    disabled={disabled}
                />

                <button
                    className={styles.sendButton}
                    type="button"
                    onClick={() => onSend()}
                    disabled={disabled || !value.trim()}
                    aria-label="Отправить сообщение"
                >
                    <span className={styles.sendInner}>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M4 12.5L20 4L13.5 20L11.5 13L4 12.5Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </button>
            </div>

            <div className={styles.bottomMeta}>
                <span>Enter — отправить</span>
                <span>Shift + Enter — новая строка</span>
                <span>Дальше сюда подключим real streaming</span>
            </div>
        </div>
    );
}

export default ChatInput;