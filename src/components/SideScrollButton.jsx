import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SideScrollButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsNearBottom(progress > 85);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = () => {
    if (isNearBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll down by 80% of window height or jump to next section
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-3 sm:right-5 bottom-8 z-40 flex flex-col items-center gap-2 select-none">
      {/* Side Floating Action Button */}
      <motion.button
        onClick={handleScrollClick}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        title={isNearBottom ? "Kembali ke Atas" : "Scroll ke Bawah"}
        aria-label={isNearBottom ? "Scroll ke Atas" : "Scroll ke Bawah"}
        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#151030]/90 hover:bg-[#915EFF] border border-[#915EFF]/50 hover:border-white/40 shadow-[0_4px_20px_rgba(145,94,255,0.4)] backdrop-blur-md flex items-center justify-center text-white transition-all duration-300"
      >
        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            className="stroke-white/10 fill-none"
            strokeWidth="2.5"
          />
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            className="stroke-[#915EFF] group-hover:stroke-white fill-none transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray="100"
            strokeDashoffset={100 - scrollProgress}
          />
        </svg>

        {/* Dynamic Arrow Icon */}
        <AnimatePresence mode="wait">
          {isNearBottom ? (
            <motion.span
              key="up"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-lg font-black"
            >
              ↑
            </motion.span>
          ) : (
            <motion.span
              key="down"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="text-lg font-black animate-bounce"
            >
              ↓
            </motion.span>
          )}
        </AnimatePresence>

        {/* Tooltip hint on hover (desktop) */}
        <span className="hidden sm:group-hover:block absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-black-200/90 text-white text-[11px] font-medium rounded-lg shadow-lg whitespace-nowrap border border-white/10 pointer-events-none">
          {isNearBottom ? "Ke Atas ↑" : "Ke Bawah ↓"}
        </span>
      </motion.button>
    </div>
  );
};

export default SideScrollButton;
