import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const controls = useAnimation();

  // Auto-slide with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && sliderRef.current) {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        controls.start({
          x: `-${newIndex * 100}%`,
          transition: { type: "tween", duration: 0.8, ease: "easeInOut" },
        });
      }
    }, 5000); // Slower interval for better UX

    return () => clearInterval(interval);
  }, [currentIndex, controls, isDragging, images.length]);

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = () => {
    setIsDragging(false);
    const x = dragX.get();
    const threshold = 100; // Minimum drag distance to trigger slide change

    if (Math.abs(x) > threshold) {
      const direction = x > 0 ? -1 : 1;
      const newIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        images.length - 1
      );
      setCurrentIndex(newIndex);
      controls.start({
        x: `-${newIndex * 100}%`,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    } else {
      // Snap back to current slide
      controls.start({
        x: `-${currentIndex * 100}%`,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  return (
  <div className="relative w-full h-full overflow-hidden rounded-xl group">
    {/* Main slider container */}
    <motion.div
      ref={sliderRef}
      className="flex h-full w-full"
      animate={controls}
      drag="x"
      dragConstraints={{ left: -((images.length - 1) * 100), right: 0 }}
      dragElastic={0.1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ x: dragX }}
    >
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="min-w-full h-full relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        </motion.div>
      ))}
    </motion.div>

    {/* Navigation dots */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentIndex(index);
            controls.start({
              x: `-${index * 100}%`,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            });
          }}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentIndex === index
              ? "bg-white w-4"
              : "bg-white/50 hover:bg-white/80"
          }`}
        />
      ))}
    </div>

    {/* Navigation arrows */}
    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={() => {
          const newIndex = Math.max(currentIndex - 1, 0);
          setCurrentIndex(newIndex);
          controls.start({
            x: `-${newIndex * 100}%`,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          });
        }}
        className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300"
        disabled={currentIndex === 0}
      >
        ←
      </button>
      <button
        onClick={() => {
          const newIndex = Math.min(currentIndex + 1, images.length - 1);
          setCurrentIndex(newIndex);
          controls.start({
            x: `-${newIndex * 100}%`,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          });
        }}
        className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300"
        disabled={currentIndex === images.length - 1}
      >
        →
      </button>
    </div>
  </div>
);
}