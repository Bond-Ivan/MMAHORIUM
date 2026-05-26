import {
    type ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styles from "./Ai.module.css";
import Footer from "../../Footer/Footer";
import type { Message, QuickAction } from "./Ai.types";
import ChatInput from "./components/ChatInput/ChatInput";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import TypingIndicator from "./components/TypingIndicator/TypingIndicator";
import QuickActions from "./components/QuickActions/QuickActions";

const INITIAL_MESSAGE: Message = {
    id: "welcome-message",
    role: "assistant",
    timestamp: new Date().toISOString(),
    content:
        "## MMA Oracle\n" +
        "Брат, ты залетел в **боевую AI-зону**.\n\n" +
        "Я могу:\n" +
        "- разобрать любого бойца как надо;\n" +
        "- объяснить, почему один стиль ломает другой;\n" +
        "- смоделировать dream fight по раундам;\n" +
        "- дать прогноз не как сухой бот, а как свой человек из мира MMA.\n\n" +
        "**Жми подсказку ниже или спроси что-то своё.**",
};

const QUICK_ACTIONS: QuickAction[] = [
    {
        id: "fighter-breakdown",
        title: "Разбор бойца",
        subtitle: "Путь, пик, стиль, сильные и слабые стороны",
        prompt:
            "Расскажи про Конора Макгрегора в ярком фирменном стиле: путь, лучшие годы, менталка, плюсы, минусы и влияние на MMA.",
        emoji: "🥊",
        accent: "orange",
    },
    {
        id: "dream-fight",
        title: "Dream Fight",
        subtitle: "Несостоявшиеся и легендарные матчапы",
        prompt:
            "Разбери, каким мог бы быть бой Хабиб против Тони Фергюсона: стили, опасности, ключевые моменты и твой честный вердикт.",
        emoji: "🔥",
        accent: "red",
    },
    {
        id: "prediction",
        title: "Прогноз на бой",
        subtitle: "Сценарии, риски и итоговый вывод",
        prompt:
            "Дай прогноз на бой Том Аспиналл vs Сергей Павлович. Разложи по сценариям и скажи, кто для тебя фаворит.",
        emoji: "🔮",
        accent: "gold",
    },
    {
        id: "simulation",
        title: "Симуляция",
        subtitle: "Текстовая трансляция по раундам",
        prompt:
            "Симулируй бой Ислам Махачев против Чарльза Оливейры по раундам, как будто это элитная текстовая трансляция.",
        emoji: "⚡",
        accent: "neutral",
    },
];

function Ai(): ReactElement {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState("");
    const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLDivElement | null>(null);

    const hasUserMessages = useMemo(
        () => messages.some((message) => message.role === "user"),
        [messages]
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamingMessage, isLoading]);

    const handleHeroMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const card = heroRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -10;

        setHeroTilt({ x: rotateX, y: rotateY });
    };

    const resetHeroMove = () => {
        setHeroTilt({ x: 0, y: 0 });
    };

    const pushUserMessage = useCallback((content: string) => {
        const trimmed = content.trim();
        if (!trimmed) return;

        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "user",
                content: trimmed,
                timestamp: new Date().toISOString(),
            },
        ]);
    }, []);

    const pushAssistantMessage = useCallback((content: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "assistant",
                content,
                timestamp: new Date().toISOString(),
            },
        ]);
    }, []);

    const simulateStreamingResponse = useCallback(async (prompt: string) => {
        const lowerPrompt = prompt.toLowerCase();

        const mockAnswer =
            lowerPrompt.includes("хабиб") || lowerPrompt.includes("ферг")
                ? "## Хабиб vs Тони — бой, который стал мифом\n" +
                  "Брат, это не просто матчап, это **многолетнее проклятие MMA**.\n\n" +
                  "**По стилям:**\n" +
                  "- Хабиб — давление, сетка, борьба, контроль, терпение;\n" +
                  "- Тони — хаос, нестандарт, локти, темп, дикие переходы;\n" +
                  "- ключевой вопрос — выдержал бы Тони ранний контроль и не утонул бы под прессом.\n\n" +
                  "**Где решался бы бой:**\n" +
                  "- у сетки;\n" +
                  "- в моментах после первых переводов;\n" +
                  "- в умении Тони вставать без потери позиций.\n\n" +
                  "**Мой вердикт:**\n" +
                  "Это был бы легендарный бой с сумасшедшим напряжением, но мой холодный выбор — Хабиб решением или поздним удушением."
                : lowerPrompt.includes("конор")
                ? "## Конор Макгрегор — поп-звезда и снайпер\n" +
                  "Брат, Конор — это не просто боец, это **культурный удар по MMA**.\n\n" +
                  "**Сильные стороны на пике:**\n" +
                  "- тайминг;\n" +
                  "- чтение дистанции;\n" +
                  "- левая рука как выстрел;\n" +
                  "- психология и давление ещё до гонга.\n\n" +
                  "**Минусы:**\n" +
                  "- проседание по темпу в поздних раундах;\n" +
                  "- уязвимость под борьбу и клинч-контроль;\n" +
                  "- зависимость от ритма и контроля центра.\n\n" +
                  "**Вердикт Oracle:**\n" +
                  "На пике это был лютый эстет-киллер, который ломал людей ещё в голове."
                : "## Разбор готов\n" +
                  "Брат, тут уже чувствуется мясо и нормальный потенциал для MMA Oracle.\n\n" +
                  "**Что я вижу:**\n" +
                  "- эту зону можно сделать главным retention-разделом;\n" +
                  "- сюда идеально ложатся прогнозы, разборы и симуляции;\n" +
                  "- визуально это уже должно ощущаться как отдельный premium-продукт.\n\n" +
                  "**Коротко:**\n" +
                  "Если добьём backend, память и streaming — это уже не просто страница, а сильная продуктовая фича.";

        setStreamingMessage("");
        setIsLoading(true);

        let current = "";
        for (const char of mockAnswer) {
            current += char;
            setStreamingMessage(current);
            await new Promise((resolve) => setTimeout(resolve, 8));
        }

        setStreamingMessage("");
        pushAssistantMessage(mockAnswer);
        setIsLoading(false);
    }, [pushAssistantMessage]);

    const handleSend = useCallback(
        async (value?: string) => {
            const content = (value ?? inputValue).trim();
            if (!content || isLoading) return;

            pushUserMessage(content);
            setInputValue("");
            await simulateStreamingResponse(content);
        },
        [inputValue, isLoading, pushUserMessage, simulateStreamingResponse]
    );

    const handleClear = useCallback(() => {
        setMessages([INITIAL_MESSAGE]);
        setInputValue("");
        setStreamingMessage("");
        setIsLoading(false);
    }, []);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.background}>
                    <div className={styles.noise} />
                    <div className={`${styles.orb} ${styles.orbOne}`} />
                    <div className={`${styles.orb} ${styles.orbTwo}`} />
                    <div className={`${styles.lineField} ${styles.lineFieldLeft}`} />
                    <div className={`${styles.lineField} ${styles.lineFieldRight}`} />
                    <div className={styles.vignette} />
                </div>

                <section
                    ref={heroRef}
                    className={styles.hero}
                    onMouseMove={handleHeroMove}
                    onMouseLeave={resetHeroMove}
                    style={{
                        transform: `perspective(1400px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
                    }}
                >
                    <div className={styles.heroGlow} />
                    <div className={styles.heroTop}>
                        <div className={styles.badge}>
                            <span className={styles.badgeDot} />
                            MMA Oracle
                        </div>

                        <div className={styles.heroStatus}>
                            <span className={styles.heroStatusPing} />
                            AI live preview
                        </div>
                    </div>

                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <h1 className={styles.title}>
                                Твоя личная
                                <span className={styles.titleAccent}> бойцовская нейросеть</span>
                            </h1>

                            <p className={styles.subtitle}>
                                Не просто чат, а отдельная премиальная зона: разборы бойцов,
                                dream fights, симуляции по раундам и прогнозы в фирменном MMA-вайбе.
                            </p>

                            <div className={styles.heroStats}>
                                <div className={styles.heroStatCard}>
                                    <span className={styles.heroStatLabel}>Mode</span>
                                    <span className={styles.heroStatValue}>Arena AI</span>
                                </div>
                                <div className={styles.heroStatCard}>
                                    <span className={styles.heroStatLabel}>UX</span>
                                    <span className={styles.heroStatValue}>Streaming-first</span>
                                </div>
                                <div className={styles.heroStatCard}>
                                    <span className={styles.heroStatLabel}>Future</span>
                                    <span className={styles.heroStatValue}>Memory + Fights</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.heroPanel}>
                            <div className={styles.heroPanelHead}>
                                <span className={styles.panelTag}>Preview</span>
                                <span className={styles.panelMini}>Oracle engine</span>
                            </div>

                            <div className={styles.previewCard}>
                                <div className={styles.previewCardTop}>
                                    <span className={styles.previewAvatar}>🔮</span>
                                    <div>
                                        <strong className={styles.previewTitle}>Oracle verdict</strong>
                                        <p className={styles.previewSubtitle}>Dream fight analyzer</p>
                                    </div>
                                </div>

                                <p className={styles.previewText}>
                                    “Хабиб vs Тони — это бой, который пахнет кровью, хаосом и
                                    вечным сожалением фанатов.”
                                </p>

                                <div className={styles.previewBars}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.shell}>
                    <div className={styles.shellTop}>
                        <div className={styles.shellTopLeft}>
                            <div className={styles.windowDots}>
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className={styles.shellTitleWrap}>
                                <h2 className={styles.chatTitle}>Oracle Console</h2>
                                <p className={styles.chatDescription}>
                                    Production-ready AI UI под будущий backend
                                </p>
                            </div>
                        </div>

                        <button className={styles.clearButton} onClick={handleClear} type="button">
                            Очистить чат
                        </button>
                    </div>

                    {!hasUserMessages && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyStateBg} />
                            <div className={styles.emptyStateHead}>
                                <span className={styles.emptyBadge}>Quick launch</span>
                                <h3 className={styles.emptyTitle}>
                                    Выбирай сценарий и сразу в бой
                                </h3>
                                <p className={styles.emptyDescription}>
                                    Здесь пользователь не должен думать “а что писать?” — мы сразу
                                    подсовываем сильные точки входа.
                                </p>
                            </div>

                            <QuickActions actions={QUICK_ACTIONS} onSelect={handleSend} />
                        </div>
                    )}

                    <div className={styles.chatArea}>
                        <div className={styles.messages}>
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}

                            {isLoading && !streamingMessage && <TypingIndicator />}

                            {streamingMessage && (
                                <ChatMessage
                                    message={{
                                        id: "streaming-message",
                                        role: "assistant",
                                        content: streamingMessage,
                                        timestamp: new Date().toISOString(),
                                    }}
                                    isStreaming
                                />
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <ChatInput
                            value={inputValue}
                            onChange={setInputValue}
                            onSend={handleSend}
                            disabled={isLoading}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Ai;