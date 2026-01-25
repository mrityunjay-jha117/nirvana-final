import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
type Message = { text: string; isBot: boolean; loading?: boolean };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          "https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          },
        );

        const data = await res.json();
        if (data.success) {
          const loadedMessages = data.chats.map((chat: any) => ({
            text: chat.message,
            isBot: chat.isBot,
          }));
          setMessages(loadedMessages);
        } else {
          console.error("Failed to fetch chats:", data.error);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchMessages();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isBot: false };
    const loadingMessage: Message = {
      text: "Typing...",
      isBot: true,
      loading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    const messageToSend = input;
    setInput("");

    try {
      const jwt = localStorage.getItem("jwt");

      // Step 1: Save user message
      await fetch(
        "https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ message: messageToSend, isBot: false }),
        },
      );

      // Step 2: Call Gemini API with the user prompt
      const geminiRes = await fetch(
        `https://backend.mrityunjay-jha2005.workers.dev/api/v1/gemini/generate`, // your Gemini proxy route
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ prompt: messageToSend }),
        },
      );

      const geminiData = await geminiRes.json();
      const botResponse = geminiData?.response ?? "No response";

      // Step 3: Save Gemini bot response
      await fetch(
        "https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ message: botResponse, isBot: true }),
        },
      );

      // Step 4: Replace "Typing..." with actual bot response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: botResponse, isBot: true },
      ]);
    } catch (error) {
      console.error("Error during chat flow:", error);
    }
  };

  return (
    <div className="w-full h-[60vh] sm:h-[500px] sm:w-[350px] flex flex-col rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="h-14 bg-gray-900 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
            <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold tracking-wide">
              AI Assistant
            </span>
            <span className="text-gray-400 text-[10px] font-medium">
              Powered by Gemini
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-4">
        {messages.map((msg, index) => (
          <InViewMessage key={index} message={msg} />
        ))}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2 opacity-50">
            <div className="text-4xl">👋</div>
            <p className="text-xs">Say hello to start chatting!</p>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function InViewMessage({ message }: { message: Message }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "0px 0px -40px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={`flex ${message.isBot ? "justify-start" : "justify-end"} w-full`}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`max-w-[85%] text-xs sm:text-sm rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm ${
          message.isBot
            ? "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
            : "bg-black text-white rounded-br-none"
        }`}
      >
        {message.loading ? (
          <div className="flex gap-1 items-center px-1">
            <span className="w-1 h-1 bg-current rounded-full animate-bounce"></span>
            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        ) : (
          <p className="leading-relaxed">{message.text}</p>
        )}
      </div>
    </motion.div>
  );
}
