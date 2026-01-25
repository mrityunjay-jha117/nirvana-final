import { useState, useRef, useEffect } from "react";
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
        className="fixed bottom-6 right-4 sm:bottom-10 sm:right-10 z-[60]"
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
          className="w-14 h-14 sm:w-16 sm:h-16 text-white text-xs sm:text-sm font-semibold rounded-full shadow-xl bg-gradient-to-br from-gray-800 via-gray-700 to-black border border-white/10 hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-[60]"
          style={{
            boxShadow:
              "0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.05)",
          }}
        >
          {open ? "CLOSE" : "CHAT"}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={wrapperRef}
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-10 z-[55] w-[90vw] sm:w-auto"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Chat />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
