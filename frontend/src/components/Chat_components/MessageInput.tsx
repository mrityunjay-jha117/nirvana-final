import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../../store/useChatStore";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, isSending } = useChatStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendMessageLogic = async () => {
    if (!text.trim() && !imagePreview) return;
    if (isSending) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview as string | null,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageLogic();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageLogic();
    }
  };

  return (
    <div className="p-3 sm:p-4 pb-6 sm:pb-4 lg:p-5 w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 animate-fadeIn">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border-2 border-emerald-500/30 shadow-lg group-hover:scale-105 transition-transform"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 border border-red-400/50 flex items-center justify-center hover:bg-red-500 transition-all hover:scale-110"
              type="button"
            >
              <X className="size-3.5 text-white" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-white">Image Ready</span>
            <span className="text-xs text-zinc-400">Click send to share</span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-3"
      >
        <div className="flex-1 flex gap-2 items-center bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl px-3 sm:px-4 py-2 sm:py-3 shadow-inner shadow-black/30 focus-within:border-emerald-500/30 focus-within:bg-white/10 transition-all duration-200">
          <textarea
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 text-zinc-100 text-sm sm:text-base resize-none overflow-hidden disabled:opacity-50"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
            rows={1}
            style={{ minHeight: "24px", maxHeight: "120px" }}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            disabled={isSending}
            className={`flex items-center justify-center size-8 sm:size-10 rounded-full transition-all duration-200 ${
              imagePreview
                ? "bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30"
                : "hover:bg-white/10 text-zinc-400 hover:text-white"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} className="sm:size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center size-10 sm:size-11 lg:size-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-none shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95"
          disabled={(!text.trim() && !imagePreview) || isSending}
        >
          {isSending ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send size={18} className="sm:size-5" />
          )}
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
