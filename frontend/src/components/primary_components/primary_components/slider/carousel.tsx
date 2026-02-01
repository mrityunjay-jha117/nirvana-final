import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import get_dev_backend from "../../../../store/get_backend_url";
import HimeSkeleton from "../../../../skeletons/userpage_skeleton";
interface CarouselProps {
  className?: string;
}

interface Blog {
  id: string;
  blogHead: string;
  title: string;
  description1: string;
}

export default function Carousel({ className = "" }: CarouselProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch top 6 blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const res = await fetch(
          `${get_dev_backend()}/blog/paginated_bulk?page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused || blogs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, blogs]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % blogs.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);

  return (
  <>
    {loading ? (
      <HimeSkeleton  variant={1} />
    ) : (
      <div
        className={`relative w-full h-44 sm:h-52 md:h-64 lg:h-72 mx-auto rounded-lg shadow-lg overflow-hidden ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          {blogs.map((slide, index) =>
            index === currentIndex ? (
              <motion.div
                key={slide.id}
                onClick={() => navigate(`/blog/${slide.id}`)}
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
              >
                <img
                  src={slide.blogHead}
                  className="w-full h-full object-cover"
                  alt={slide.title}
                />

                <div className="absolute bottom-0 left-0 w-full bg-black/80 p-3 sm:p-6 flex flex-col text-white pointer-events-none">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xs md:text-sm lg:text-lg font-bold tracking-wide"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xs md:text-sm line-clamp-2 font-thin"
                  >
                    {slide.description1}
                  </motion.p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="hidden sm:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition"
                >
                  &#9665;
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition"
                >
                  &#9655;
                </button>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {blogs.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    )}
  </>
);

}
