import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useChatStore, Message } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedUser) return;

    getMessages(selectedUser.email);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto scrollbar-hide p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
        {messages.map((message: Message, idx: number) => {
          const isSender = message.senderId === authUser?.email;

          return (
            <div
              key={message._id}
              className={`flex ${
                isSender ? "justify-end" : "justify-start"
              } animate-fadeIn`}
              ref={idx === messages.length - 1 ? messageEndRef : null}
            >
              <div
                className={`flex items-end gap-1.5 sm:gap-2 max-w-full ${
                  isSender ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="hidden sm:flex flex-shrink-0">
                  <div
                    className={`size-7 lg:size-8 rounded-full border overflow-hidden transition-all hover:scale-110 ${
                      isSender ? "border-emerald-500/30" : "border-white/20"
                    }`}
                  >
                    <img
                      src="/images/icons/thumb.jpg"
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-lg backdrop-blur-sm border transition-all duration-300 w-[90%] hover:scale-[1.01] ${
                    isSender
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400/50 text-white shadow-emerald-500/20"
                      : "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-zinc-50 shadow-black/20"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="w-full max-h-40 sm:max-h-48 lg:max-h-56 object-cover rounded-lg border border-white/10 mb-1.5 hover:scale-105 transition-transform cursor-pointer"
                    />
                  )}
                  {message.text && (
                    <p className="leading-relaxed text-xs break-words">
                      {message.text}
                    </p>
                  )}
                  <div
                    className={`mt-1 text-xs text-right font-medium ${
                      isSender ? "text-emerald-100/80" : "text-zinc-400"
                    }`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
