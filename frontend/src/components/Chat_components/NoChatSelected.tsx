import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-md text-center space-y-6 sm:space-y-8 relative z-10">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-400/30 flex items-center justify-center shadow-2xl shadow-emerald-500/20 animate-bounce">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-emerald-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full border border-blue-400/40 flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4 text-blue-300" />
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            Welcome to Nirvana Chat
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed">
            Select a contact from the sidebar to start a conversation. Your
            messages are secure, real-time, and beautifully styled.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="size-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-zinc-300 font-medium">
              End-to-end encrypted
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="size-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-zinc-300 font-medium">
              Real-time messaging
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
