import { useEffect, useState } from "react";
import { useChatStore, User } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
const Chat_list = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user: User) => onlineUsers.includes(user.email))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full lg:w-80 bg-gradient-to-b from-slate-950 to-slate-900 text-white border-r border-white/5 flex flex-col transition-all duration-300 shadow-2xl shadow-black/50">
      <div className="border-b border-white/10 w-full p-4 backdrop-blur-sm bg-white/5">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg text-white">Contacts</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-4 flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-white/5 border-white/10 checked:bg-emerald-500 focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            />
            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
              Show online only
            </span>
          </label>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 w-full py-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
        {filteredUsers.map((user: User) => (
          <button
            key={user.email}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 lg:p-4 flex items-center gap-3 lg:gap-4
              transition-all duration-200 relative group
              ${
                selectedUser?.email === user.email
                  ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border-l-4 border-emerald-500 shadow-lg shadow-emerald-500/10"
                  : "hover:bg-white/5 border-l-4 border-transparent hover:border-white/10"
              }
            `}
          >
            <div className="relative flex-shrink-0">
              <div
                className={`size-12 lg:size-14 rounded-full overflow-hidden ring-2 transition-all duration-200 ${
                  selectedUser?.email === user.email
                    ? "ring-emerald-500/50"
                    : "ring-white/10 group-hover:ring-white/20"
                }`}
              >
                <img
                  src="/images/icons/thumb.jpg"
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {onlineUsers.includes(user.email) && (
                <span className="absolute bottom-0 right-0 size-3 lg:size-4 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-pulse" />
              )}
            </div>

            {/* User info - visible on all screens now since list is full width on mobile */}
            <div className="flex flex-col text-left min-w-0 flex-1">
              <div className="font-semibold text-base truncate text-white group-hover:text-emerald-300 transition-colors">
                {user.name}
              </div>
              <div
                className={`text-xs font-medium flex items-center gap-1.5 mt-0.5 ${
                  onlineUsers.includes(user.email)
                    ? "text-emerald-400"
                    : "text-zinc-500"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    onlineUsers.includes(user.email)
                      ? "bg-emerald-400"
                      : "bg-zinc-500"
                  }`}
                />
                {onlineUsers.includes(user.email) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-8 px-4">
            <p className="text-sm">No users found</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Chat_list;
