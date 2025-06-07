import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/primary_components/dashboard/header";
import Footer from "../components/primary_components/dashboard/footer";
import TypingEffect from "../components/primary_components/primary_components/unique_components/word_typing_animate";
import BlogCard from "../components/primary_components/primary_components/cards/blog_card";
import HimeSkeleton from "../skeletons/userpage_skeleton";

interface Author {
  id: string;
  name: string;
  email: string;
  image: string;
  about: string;
}

interface Blog {
  id: string;
  blogHead: string;
  title: string;
  description1: string;
}

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Hime() {
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Create a ref for the "My Stories" section
  const storiesRef = useRef<HTMLElement | null>(null);

  const handlePageChange = (pageNumber: number) => {
  setLoading(true);
  setCurrentPage(pageNumber);
  if (storiesRef.current) {
    const top = storiesRef.current.offsetTop - 70; // adjust 100 as needed
    window.scrollTo({ top, behavior: "smooth" });
  }
};


  // Fetch user and stats once
  useEffect(() => {
    const fetchAll = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const [userRes, statsRes] = await Promise.all([
          fetch("https://backend.mrityunjay-jha2005.workers.dev/api/v1/user/me", { headers }),
          fetch("https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog/stats", { headers }),
        ]);

        const userData = await userRes.json();
        const statsData = await statsRes.json();

        if (userRes.ok) {
          setAuthor(userData);
        } else {
          console.error("User fetch error:", userData);
        }

        if (statsRes.ok) {
          setTotalLikes(statsData.totalLikes);
          setBlogCount(statsData.blogCount);
        } else {
          console.error("Stats fetch error:", statsData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchAll();
  }, []);

  // Fetch blogs whenever author and currentPage change
  useEffect(() => {
    if (!author?.id) return;

    const fetchBlogs = async () => {
      const token = localStorage.getItem("jwt");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const res = await fetch(
          `https://backend.mrityunjay-jha2005.workers.dev/api/v1/user/author/${author.id}?page=${currentPage}`,
          { headers }
        );
        const data = await res.json();

        if (data.blogs) {
          setBlogs(data.blogs);
          setTotalPages(data.totalPages);
        } else {
          console.error("Blog fetch error:", data);
        }
      } catch (err) {
        console.error("Fetch blogs error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [author?.id, currentPage]);

  // Only block-render skeleton until author is known; blog-grid has its own loading state
  if (!author) return <HimeSkeleton />;

  return (
    <AnimatePresence>
      <Header />

      <motion.main
        className="min-h-screen mt-20 sm:mt-32 bg-[#e9ddd0] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto px-4 sm:px-8 lg:px-12">
          {/* Hero Section */}
          <motion.section variants={fadeInUp} initial="initial" animate="animate">
            <motion.h1
              className="text-5xl sm:text-7xl md:text-8xl tracking-wide font-bold text-gray-900"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {author.name}
            </motion.h1>
            <motion.div
              className="w-full lg:w-3/4 mt-4 h-8 sm:h-24 lg:h-28"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypingEffect
                wordsize="text-sm leading-tight xl:text-lg"
                color="text-gray-900"
                texts={[
                  "The mountains are calling, and I must go",
                  "Trekking is the art of getting lost in nature, and finding yourself",
                  "Life is either a daring adventure or nothing at all",
                  "Not all those who wander are lost",
                  "Every mountain top is within reach if you just keep climbing",
                  "In every walk with nature, one receives far more than he seeks",
                  "It's not the mountain we conquer, but ourselves",
                  "Take only pictures, leave only footprints",
                  "The best view comes after the hardest climb",
                ]}
              />
            </motion.div>
          </motion.section>

          {/* About Section */}
          <motion.section
            className="mt-16 lg:w-15/16 mx-auto sm:mt-0"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-row items-center justify-between gap-4 mb-5">
                <motion.h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  About
                </motion.h2>
                <motion.button
                  onClick={() => navigate("/create")}
                  className="w-auto px-5 py-2 sm:px-10 sm:py-2 text-md sm:text-lg rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-xl hover:from-red-600 hover:to-red-700"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  CREATE
                </motion.button>
              </div>
              <motion.p
                className="text-sm lg:text-lg text-gray-700 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {author.about}
              </motion.p>
              <motion.p
                className="mt-6 text-sm sm:text-lg text-gray-500 italic"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {author.email}
              </motion.p>
            </motion.div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            className="mt-16 sm:mt-20 lg:mt-24 w-5/6 mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {[
                {
                  label: "Total Likes",
                  value: totalLikes,
                  icon: "heart",
                  gradient: "from-500 to-red-500",
                },
                {
                  label: "Blog Posts",
                  value: blogCount,
                  icon: "blog",
                  gradient: "from-500 to-indigo-500",
                },
              ].map(({ label, value, icon, gradient }, index) => (
                <motion.div
                  key={label}
                  className={`w-full sm:w-1/2 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg p-6 sm:p-8 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl`}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <div className="flex flex-col items-center text-white">
                    <motion.img
                      src={`./../images/icons/${icon}.png`}
                      alt={label}
                      className="h-12 sm:h-14 lg:h-16 w-auto mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.span
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    >
                      {value}
                    </motion.span>
                    <span className="text-base sm:text-lg lg:text-xl font-medium text-white/90">
                      {label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
<hr className="h-1 rounded-full w-14/15 mx-auto bg-black my-8 sm:my-20 lg:my-24"/>
          {/* Blog Grid */}
          <motion.section
            ref={storiesRef}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >

            <motion.h2
              className="text-6xl sm:text-6xl lg:text-8xl font-bold text-gray-900 sm:mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-gray-800 text-7xl sm:text-6xl lg:text-8xl">B</span>
              logs...
            </motion.h2>

            {/* Only the blog section shows the skeleton when loading */}
            {loading ? (
              <div>
                <HimeSkeleton />
              </div>
            ) : (
              <>
                <div className="mt-20 sm:mt-30 grid grid-cols-1 sm:grid-cols-2 space-y-10 sm:space-y-20 lg:grid-cols-3 gap-8">
                  {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{
                          scale: 1.03,
                          transition: { duration: 0.2 },
                        }}
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        // className="mx-2"
                      >
                        <BlogCard
                          image={blog.blogHead}
                          title={blog.title}
                          description={blog.description1}
                          showActions={true}
                          image_size="h-70"
                          id={blog.id}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      className="col-span-full text-center text-xl text-gray-500 py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      No stories published yet
                    </motion.p>
                  )}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-row justify-center my-10 space-x-3">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 text-lg rounded-full border ${
                        currentPage === i + 1
                          ? "bg-red-500 text-white"
                          : "bg-white border-2"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.section>
        </div>
      </motion.main>

      <Footer color="bg-black" fontColor="text-white font-bold" />
    </AnimatePresence>
  );
}
