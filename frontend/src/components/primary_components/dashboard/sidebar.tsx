import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import sidebaricon from "/drawer.svg";
import { useAuthStore } from "../../../store/useAuthStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthStore();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { label: "PROFILE", path: "/user" },
    { label: "CHAT", path: "/chat" },
    { label: "ABOUT", path: "example", isLink: true },
    {
      label: "WHO AM I",
      path: "https://www.linkedin.com/in/mrityunjay-jha-7b0436303/",
      isLink: true,
      external: true,
    },
    { label: "LOGOUT", action: "logout" },
  ];

  const handleNavigation = (item: any) => {
    if (item.action === "logout") {
      logout();
      localStorage.removeItem("jwt");
      navigate("/");
    } else if (item.isLink) {
      if (item.external) {
        window.open(item.path, "_blank");
      } else {
        // Handle internal anchors if needed
      }
    } else {
      console.log(`Navigating to ${item.path}`);
      navigate(item.path);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={sidebarRef}>
      {/* Toggle Button */}
      <div className="fixed top-2 left-2  sm:top-2 sm:gap-10  z-50 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-black/20 transition-colors"
        >
          <img
            src={sidebaricon}
            alt="Toggle Sidebar"
            className="w-6 h-6 sm:w-8 sm:h-8 "
          />
        </motion.button>

        <motion.img
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          src="/logo.png"
          alt="logo"
          className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer drop-shadow-lg"
        />
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] bg-[#0f0e0e]/95 backdrop-blur-xl border-r border-white/10 z-50 shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col h-full pt-24 pb-10 px-6">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <div
                      onClick={() => handleNavigation(item)}
                      className="group flex items-center px-4 py-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
                    >
                      <span className="text-white text-sm sm:text-base font-medium tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Footer */}
              <div className="mt-auto pt-10 border-t border-white/10">
                <p className="text-white/40 text-xs text-center tracking-widest uppercase">
                  Nirvana © 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
