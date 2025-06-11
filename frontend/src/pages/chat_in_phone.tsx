import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TypingEffect from "../components/primary_components/primary_components/unique_components/word_typing_animate";
import ResponsiveParticleCanvas from "../../unused/animations/responsivewindow";
type Message = { text: string; isBot: boolean; loading?: boolean; time?: any };

export default function Chatin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          "https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/all",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          }
        );

        const data = await res.json();
        if (data.success) {
          const loadedMessages = data.chats.map((chat: any) => ({
            text: chat.message,
            isBot: chat.isBot,
            time: chat.createdAt,
          }));
          setMessages(loadedMessages);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchMessages();
  }, []);

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

      await fetch("https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ message: messageToSend, isBot: false }),
      });

      const geminiRes = await fetch(
        "https://backend.mrityunjay-jha2005.workers.dev/api/v1/gemini/generate",       
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ prompt: messageToSend }),
        }
      );

      const geminiData = await geminiRes.json();
      const botResponse = geminiData?.response ?? "No response";

      await fetch("https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ message: botResponse, isBot: true }),
      });

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: botResponse, isBot: true },
      ]);
    } catch (error) {
      console.error("Error during chat flow:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="sm:w-1/5 bg-black h-screen ">
        <ResponsiveParticleCanvas />
      </div>
      <div className=" w-full ml-auto bg-black h-screen flex flex-col bg-[#f1f1f1]">
        <div className="  text-sm sm:text-8xl h-30 bg-black text-white px-4 flex items-center justify-start font-bold text-base shadow-md">
          Chat-Bot
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-10 py-2 space-y-2 sm:space-y-4 bg-[#e9ddd0] scrollbar-hide">
          {messages.map((msg, index) => (
            <InViewMessage key={index} message={msg} />
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-8 bg-black border-t flex items-center gap-2 sticky bottom-0">
          <input
            type="text"
            className="flex-grow rounded-lg px-4 py-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-inner"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-green-400 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-md hover:bg-gray-800 transition-all"
          >
            Send
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

  const formatTime = (iso: string | undefined) => {
    if (!iso) return "";
    const date = new Date(iso);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
    return formattedTime;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[80%] sm:max-w-[40%] px-4 py-2 rounded-xl shadow-md text-xs ${
          message.isBot
            ? "bg-gray-700 text-[#F1EFEC] rounded-bl-none"
            : "bg-blue-500 text-white rounded-br-none"
        }`}
      >
        <div className="whitespace-pre-wrap">
          {message.loading ? (
            <TypingEffect
              color={"text-white"}
              typingSpeed={400}
              wordsize="text-sm tracking-widest"
              texts={["........"]}
            />
          ) : (
            message.text
          )}
        </div>
        {!message.loading && message.time && (
          <div className="text-[10px] text-gray-300 mt-1 text-right">
            {formatTime(message.time)}
          </div>
        )}
      </div>
    </motion.div>
  );
}
