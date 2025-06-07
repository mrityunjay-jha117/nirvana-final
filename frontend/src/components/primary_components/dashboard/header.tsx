import { motion } from "framer-motion";
import Sidebar from "./sidebar";
import Tags from "../primary_components/common_html_components/list_tags";

function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed h-16 top-0 left-0 w-full bg-black backdrop-blur-sm text-white z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left side - Sidebar */}
          <div className="flex-shrink-0">
            <Sidebar />
          </div>

          {/* Right side - Navigation */}
          <nav className="flex items-center">
            <ul className="flex items-center space-x-6 md:space-x-8 lg:space-x-12">
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Tags
                  link="blog_page"
                  name="BLOGS"
                  className="text-sm md:text-base font-medium tracking-wide"
                />
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                  layoutId="underline"
                />
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Tags
                  link="user"
                  name="MY PAGE"
                  className="text-sm md:text-base font-medium tracking-wide"
                />
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                  layoutId="underline"
                />
              </motion.li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;