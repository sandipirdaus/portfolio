import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useLanguage } from "../context";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
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

      <ComputersCanvas />

      <div className="absolute xs:bottom-8 bottom-6 w-full flex justify-center items-center z-10">
        <a href="#about" className="pointer-events-auto">
          <div className="w-[30px] h-[54px] sm:w-[35px] sm:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-1.5 sm:p-2">
            <motion.div
              animate={{
                y: [0, 20, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
