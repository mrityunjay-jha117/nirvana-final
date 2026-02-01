import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import get_dev_backend from "../../../../store/get_backend_url";
interface DataCardProps {
  image: string;
  title: string;
  description: string;
  showActions?: boolean;
  id?: string;
  image_size?: string;
}

export default function BlogCard({
  image,
  title,
  description,
  showActions,
  id,
  image_size = "h-52",
}: DataCardProps) {
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!id) return;

    const token = localStorage.getItem("jwt");
    try {
      const res = await fetch(`${get_dev_backend()}/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Delete error:", errorData.message);
      }
      // Optionally, refresh parent state here to remove this card
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <motion.div
      // Fade-in + slide-from-bottom when card mounts
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => id && navigate(`/blog/${id}`)}
      className="relative  flex flex-col gap-3 p-5  bg-[#C3A584] bg-gray-700 rounded-2xl "
    >
      {/* Decorative blurred circles (static) */}
      <div className="absolute top-2 right-2 w-20 h-20 bg-yellow-300/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl pointer-events-none" />

      {/* Image container with a simple scale-on-hover */}
      <div className="relative w-full -mt-16 mb-2">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className={`${image_size} object-cover w-full rounded-xl border-4 border-white/80 shadow-lg`}
          whileHover={{
            scale: 1.03,
          }}
          transition={{ duration: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 to-transparent rounded-xl pointer-events-none" />
      </div>

      {/* Text content */}
      <div className="flex flex-col text-left px-4 py-3">
        <h1 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {title}
        </h1>
        <p className="text-xs text-white/80 line-clamp-3">{description}</p>
      </div>

      {/* Optional action buttons */}
      {showActions && (
        <div className="flex flex-row gap-2 px-4">
          {/* DELETE button */}
          <motion.button
            onClick={handleDelete}
            whileTap={{ scale: 0.95 }}
            className="w-1/2 h-8 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors duration-200"
          >
            DELETE
          </motion.button>

          {/* UPDATE button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              if (id) navigate(`/update/${id}`);
            }}
            whileTap={{ scale: 0.95 }}
            className="w-1/2 h-8 rounded-full bg-white text-black text-sm font-medium hover:bg-[#1f3049] transition-colors duration-200"
          >
            UPDATE
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
