import { useChatStore } from "../store/useChatStore";
import Chat_list from "../components/Chat_components/Chat_list";
import NoChatSelected from "../components/Chat_components/NoChatSelected";
import ChatContainer from "../components/Chat_components/ChatContainer";
const Nirvana_Chat = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black h-[100dvh]">
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Chat List Sider - Hidden on mobile when chat is selected */}
        <div
          className={`${
            selectedUser ? "hidden lg:block" : "block w-full"
          } lg:w-auto h-full transition-all duration-300`}
        >
          <Chat_list />
        </div>

        {/* Chat Container - Hidden on mobile when no chat selected */}
        <div
          className={`${
            !selectedUser ? "hidden lg:flex" : "flex"
          } flex-1 flex-col h-full min-w-0 bg-slate-900`}
        >
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
export default Nirvana_Chat;
