import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useLanguage } from "../context";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    const aboutElem = document.getElementById("about");
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <section className={`relative w-full min-h-[100dvh] h-[100dvh] mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[75px] xs:top-[85px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3.5 sm:gap-5 z-10 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-1.5 sm:mt-5">
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-[#915EFF] shadow-[0_0_12px_rgba(145,94,255,0.7)]" />
          <div className="w-1 sm:h-80 h-36 xs:h-44 violet-gradient rounded-b-full" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {t.hero.greeting}{" "}
            <span className="text-[#915EFF]">{t.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-2xl`}>
            {t.hero.sub} <br className="sm:block hidden" />
            {t.hero.sub2}
          </p>
        </div>
      </div>

      {/* Mobile Edge Quick-Scroll Button: Tombol di pinggir kanan layar untuk langsung meluncur ke bawah */}
      <div className="block sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <button
          onClick={scrollToAbout}
          aria-label="Scroll ke Bawah"
          className="bg-[#915EFF]/90 active:bg-[#7038e8] text-white px-2.5 py-4 rounded-l-2xl shadow-[0_4px_20px_rgba(145,94,255,0.5)] border-y border-l border-white/20 backdrop-blur-md flex flex-col items-center gap-1.5 transition-transform active:scale-95 select-none"
        >
          <span className="text-xs font-bold animate-bounce">↓</span>
          <span className="text-[10px] font-bold tracking-wider [writing-mode:vertical-rl] rotate-180 uppercase">
            Scroll
          </span>
          <span className="text-xs font-bold animate-bounce">↓</span>
        </button>
      </div>

      <ComputersCanvas />

      {/* Bottom Scroll Down Mouse Pill Indicator */}
      <div className="absolute xs:bottom-8 bottom-6 w-full flex flex-col justify-center items-center z-10 pointer-events-none">
        <a 
          href="#about" 
          className="pointer-events-auto flex flex-col items-center gap-1.5 group"
          aria-label="Scroll to About section"
        >
          <div className="w-[30px] h-[54px] sm:w-[35px] sm:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-1.5 sm:p-2 group-hover:border-[#915EFF] transition-colors shadow-md">
            <motion.div
              animate={{
                y: [0, 20, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary group-hover:bg-[#915EFF] transition-colors mb-1"
            />
          </div>
          <span className="text-[10px] text-secondary group-hover:text-white uppercase tracking-widest font-semibold block sm:hidden">
            Scroll ↓
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
