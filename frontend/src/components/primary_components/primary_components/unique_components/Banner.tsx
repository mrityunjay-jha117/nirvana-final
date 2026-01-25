import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const bgImages = [
  "/images/banner_images/0.png",
  "/images/banner_images/1.png",
  "/images/banner_images/2.png",
  "/images/banner_images/3.png",
  "/images/banner_images/4.png",
  "/images/banner_images/5.png",
  "/images/banner_images/6.png",
  "/images/banner_images/7.png",
  "/images/banner_images/8.png",
];

export default function Banner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  // Parallax effect for the title
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImages[0]})`,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{ scale: 1.1 }}
        transition={{
          scale: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />

      {/* Scrolling Images with Enhanced Parallax */}
      {bgImages.slice(1).map((src, index) => (
        <motion.div
          key={index}
          className="absolute left-0 bg-cover bg-center bottom-0 w-full h-full"
          initial={{ y: "100%" }}
          animate={{
            y: scrollY * ((index + 1) / 2),
            x: mousePosition.x * (index + 1) * 0.5,
          }}
          transition={{
            ease: "easeOut",
            duration: 1.5,
          }}
        >
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
            animate={
              index === bgImages.length - 2
                ? {}
                : {
                    y: [0, -2, 2, 0],
                    scale: [1, 1.02, 1],
                  }
            }
            transition={
              index === bgImages.length - 2
                ? {}
                : {
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    duration: 4 + index * 0.5,
                  }
            }
          />
        </motion.div>
      ))}

      {/* Dark Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[5]" />

      {/* Animated Title */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{
          y: titleY,
          scale: titleScale,
          opacity: titleOpacity,
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {Array.from("NIRVANA").map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                y: [0, -4, 0], // Much smaller movement
                // Remove textShadow animation for performance
              }}
              transition={{
                duration: 2.5,
                delay: index * 0.05, // Smaller delay
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                type: "tween",
              }}
              style={{
                willChange: "transform", // Hint for browser optimization
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </div>
  );
}
