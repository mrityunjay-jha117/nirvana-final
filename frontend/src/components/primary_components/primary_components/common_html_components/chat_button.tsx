import { useState, useEffect, useRef } from "react";
import Chat from "../../../../pages/chat";
import { AnimatePresence, motion } from "framer-motion";

export default function Chatbutton() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close chat on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <motion.div
        className=" fixed bottom-10 right-4 sm:right-10 z-30"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="w-17 h-17 text-white text-sm font-semibold rounded-full shadow-xl bg-gradient-to-br from-gray-800 via-gray-700 to-black border border-white/10 hover:shadow-2xl transition-all duration-300"
          style={{
            boxShadow: "0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.05)",
          }}
        >
          CHAT
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chatbox"
            ref={wrapperRef}
            className="fixed bottom-0 right-0 w-full z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Chat />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
