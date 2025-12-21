import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sidebaricon from "/drawer.svg";
import { useAuthStore } from "../../../store/useAuthStore";
export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const { logout } = useAuthStore();
  return (
    <div className="relative">
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed top-2 left-4 sm:left-10 z-50 flex items-center space-x-4 sm:space-x-10">
        <img
          onClick={toggleSidebar}
          src={sidebaricon}
          alt="Toggle Sidebar"
          className="w-6 h-6 cursor-pointer"
        />
        <img
          src="/logo.png"
          alt="logo"
          className="w-10 h-10 cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>

      {/* ───────────────────────────────────────────────────────
         Sidebar Container
         • When isOpen=false: translate‐x‐full offscreen left
         • When isOpen=true: translate‐x‐0 onscreen
         • Responsive width: 12rem on mobile, 14rem on sm, 16rem on lg
      ─────────────────────────────────────────────────────── */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-[#0f0e0e] text-white z-40 
          transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-60 sm:w-56 lg:w-70
        `}
      >
        <div className="pt-25 flex flex-col h-4/5 justify-between ">
          <div
            style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
            className={`
              transform transition-all duration-300 ease-in-out
              flex items-center justify-center h-14 text-sm sm:text-xs
              rounded-lg hover:bg-white/10 hover:translate-x-4 cursor-pointer
              ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-52 opacity-0"
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Profile clicked, navigating to /user");
              navigate("/user");
              setIsOpen(false);
            }}
          >
            PROFILE
          </div>

          <div
            style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
            className={`
              transform transition-all duration-300 ease-in-out
              flex items-center justify-center h-14 text-sm sm:text-xs
              rounded-lg hover:bg-white/10 hover:translate-x-4 cursor-pointer
              ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-52 opacity-0"
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Chat clicked, navigating to /chat");
              navigate("/chat");
              setIsOpen(false);
            }}
          >
            CHAT
          </div>

          <a href="example">
            <div
              style={{ transitionDelay: isOpen ? "450ms" : "0ms" }}
              className={`
                transform transition-all duration-300 ease-in-out
                flex items-center justify-center h-14 text-sm sm:text-xs
                rounded-lg hover:bg-white/10 hover:translate-x-4
                ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-52 opacity-0"
                }
              `}
            >
              ABOUT
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/mrityunjay-jha-7b0436303/"
            target="_blank"
          >
            <div
              style={{ transitionDelay: isOpen ? "600ms" : "0ms" }}
              className={`
                transform transition-all duration-300 ease-in-out
                flex items-center justify-center h-14 text-sm sm:text-xs
                rounded-lg hover:bg-white/10 hover:translate-x-4
                ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-52 opacity-0"
                }
              `}
            >
              WHO AM I
            </div>
          </a>

          <div
            style={{ transitionDelay: isOpen ? "750ms" : "0ms" }}
            className={`
              transform transition-all duration-300 ease-in-out
              flex items-center justify-center h-14 text-sm sm:text-xs
              rounded-lg hover:bg-white/10 hover:translate-x-4
              ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-52 opacity-0"
              }
            `}
            onClick={() => {
              localStorage.removeItem("jwt");
              navigate("/");
              logout();
            }}
          >
            LOGOUT
          </div>
        </div>
      </div>
    </div>
  );
}
