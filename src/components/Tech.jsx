import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { useLanguage } from "../context";

const Tech = () => {
  const { isID } = useLanguage();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef}>
      <motion.div variants={textVariant()} className="mb-14 text-center">
        <p className={styles.sectionSubText}>
          {isID ? "Teknologi & Basis Data" : "Technologies & Databases"}
        </p>
        <h2 className={styles.sectionHeadText}>
          {isID ? "Keahlian Teknis." : "Tech Stack."}
        </h2>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            {isInView ? (
              <BallCanvas icon={technology.icon} />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-2">
                <img
                  src={technology.icon}
                  alt={technology.name}
                  className="w-16 h-16 object-contain drop-shadow-md opacity-80"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");

