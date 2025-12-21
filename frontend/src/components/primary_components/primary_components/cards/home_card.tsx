import { motion } from "framer-motion";
interface DataCardProps {
  image: string;
  title: string;
  id?: string;
}

export default function HomeCard({
  image,
  title,
}: DataCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="transition-transform group-hover:scale-110 relative h-full flex flex-col sm:flex-row gap-3 bg-transparent shadow-xl overflow-visible"
    >
      <img
        alt={title}
        src={image}
        className={` object-cover  h-full w-full rounded-xl shadow-xl z-10 mx-auto`}
      />
      <h1 className="absolute tracking-widest top-5 left-5 z-20 text-xl font-thin md:text-3xl line-clamp-3 text-wrap font-semibold">
        {title}
      </h1>
    </motion.div>
  );
}
