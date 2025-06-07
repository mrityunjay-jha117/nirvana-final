import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TextMaskParallaxProps = {
  text: string;
  images: string[];
};

export default function TextRevealParallax({
  text,
  images,
}: TextMaskParallaxProps) {
  const totalDuration = 2500; // Increased for smoother animation
  const frameDuration = totalDuration / images.length;

  const [imageIndex, setImageIndex] = useState(0);
  const [animationFinished, setAnimationFinished] = useState(false);

  const navigate = useNavigate();

  // Smoother image cycling with easing
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex >= images.length) {
        clearInterval(interval);
        setAnimationFinished(true);
      } else {
        setImageIndex(currentIndex);
      }
    }, frameDuration);

    return () => clearInterval(interval);
  }, [images.length, frameDuration]);

  // Delayed navigation with smooth exit
  useEffect(() => {
    if (animationFinished) {
      const navTimeout = setTimeout(() => navigate("/home"), 600); // Reduced from 1000ms
      return () => clearTimeout(navTimeout);
    }
  }, [animationFinished, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }} // Slightly faster fade-in
      className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden z-50"
    >
      <AnimatePresence mode="wait">
        {!animationFinished ? (
          <motion.div
            key="textMask"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1, // Increased exit scale
              y: -100, // Increased exit distance
              transition: {
                duration: 0.7, // Reduced from 0.8
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
            className="absolute w-full h-full flex items-center justify-center px-4 sm:px-8"
          >
            <motion.h1
              className="font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight sm:tracking-normal md:tracking-wide break-words text-center max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.8], // Increased scale range
                opacity: 1,
              }}
              transition={{
                duration: totalDuration / 1000,
                ease: "easeOut",
                opacity: { duration: 0.4 },
              }}
              style={{
                backgroundImage: `url(${images[imageIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255,255,255,0.1)",
              }}
            >
              {text}
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="exit"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: 0,
              y: -150, // Increased exit distance
              transition: {
                duration: 0.5, // Reduced from 0.8
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
            className="w-full h-full"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
