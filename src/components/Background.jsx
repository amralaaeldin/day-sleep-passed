import { motion,AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const dayImages = Object.values(
  import.meta.glob("./../assets/imgs/*.jpg", { eager: true, import: "default" })
);

export default function Background({ isDay }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Choose correct image list based on time
  const images = dayImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 30000); // change every 30s
    return () => clearInterval(interval);
  }, [images]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex} // triggers fade on change
        className="background"
        style={{
          backgroundImage: `url(${images[currentIndex]})`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      />
    </AnimatePresence>
  );
}
