import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TypingEffect from "../components/primary_components/primary_components/unique_components/word_typing_animate";
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
          }
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
      await fetch("https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ message: messageToSend, isBot: false }),
      });

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
        }
      );

      const geminiData = await geminiRes.json();
      const botResponse = geminiData?.response ?? "No response";

      // Step 3: Save Gemini bot response
      await fetch("https://backend.mrityunjay-jha2005.workers.dev/api/v1/message/chat/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ message: botResponse, isBot: true }),
      });

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
    <motion.div
      className="absolute bottom-0 right-0 sm:bottom-2 sm:right-4 lg:bottom-6 lg:right-6 w-3/4 h-[80vh] sm:w-1/3 md:w-80  xl:w-1/4 h-[60vh] sm:h-[70vh] flex flex-col rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-2xl "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div className="h-1/7 bg-[#333446] flex items-center px-5">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-inner"></div>
          <span className="text-white text-sm sm:text-lg font-semibold tracking-wide">
            Chat Assistant
          </span>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="h-5/7 p-1 sm:p-4 overflow-y-auto bg-[#7F8CAA] scrollbar-hide space-y-3">
        {messages.map((msg, index) => (
          <InViewMessage key={index} message={msg} />
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <motion.div className="h-1/7  p-2 bg-white">
        <div className="flex flex-row items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-4/5 text-[10px] rounded-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-shadow shadow-inner"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="w-1/5 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-all shadow-md text-white "
          ></button>
        </div>
      </motion.div>
    </motion.div>
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
      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`max-w-[75%] text-[8px] sm:text-xs rounded-2xl px-4 py-2 shadow transition-transform duration-300 hover:scale-[1.02] ${
          message.isBot
            ? "bg-[#333446] text-white rounded-bl-none"
            : "bg-[#B8CFCE] text-black rounded-br-none"
        }`}
      >
        {message.loading ? (
          <div className="">
            <TypingEffect
              color="text-white"
              typingSpeed={400}
              wordsize="text-[13px] sm:text-2xl text-white tracking-widest"
              texts={["........"]}
            />
          </div>
        ) : (
          message.text
        )}
      </div>
    </motion.div>
  );
}
