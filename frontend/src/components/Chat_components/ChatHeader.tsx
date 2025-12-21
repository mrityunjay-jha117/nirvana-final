import { X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser.email);

  return (
    <div className="p-3  sm:p-4 lg:p-5 border-b border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl shadow-xl shadow-black/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="avatar relative group">
            <div
              className={`size-10 sm:size-12  lg:size-14 rounded-full relative ring-2 overflow-hidden transition-all duration-300 group-hover:ring-4 ${
                isOnline
                  ? "ring-emerald-500/50 group-hover:ring-emerald-500/70"
                  : "ring-white/10 group-hover:ring-white/20"
              }`}
            >
              <img
                src="/images/icons/thumb.jpg"
                alt={selectedUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`absolute bottom-0 right-0 size-2.5 sm:size-3 lg:size-3.5 rounded-full ring-2 ring-slate-950 transition-all ${
                isOnline ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-base sm:text-lg lg:text-xl text-white">
              {selectedUser.name}
            </h3>
            <div className="flex items-center gap-1.5">
              <span
                className={`size-1.5 rounded-full ${
                  isOnline ? "bg-emerald-400" : "bg-zinc-600"
                }`}
              />
              <p
                className={`text-xs sm:text-sm font-medium ${
                  isOnline ? "text-emerald-300" : "text-zinc-500"
                }`}
              >
                {isOnline ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="flex items-center justify-center size-8 sm:size-9 lg:size-10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 hover:rotate-90"
        >
          <X className="size-4 sm:size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
