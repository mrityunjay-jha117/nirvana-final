import { useChatStore } from "../store/useChatStore";
import Chat_list from "../components/Chat_components/Chat_list";
import NoChatSelected from "../components/Chat_components/NoChatSelected";
import ChatContainer from "../components/Chat_components/ChatContainer";
// import Header from "../components/primary_components/dashboard/header";
const Nirvana_Chat = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Chat Container - Full Screen */}
      {/* <Header /> */}
      <div className="flex-1 flex h-full overflow-hidden">
        <Chat_list />
        <div className="flex-1 flex flex-col min-w-0">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
export default Nirvana_Chat;
