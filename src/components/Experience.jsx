import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useLanguage, useTheme } from "../context";

const ExperienceCard = ({ experience, isLight }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: isLight ? "#ffffff" : "#1d1836",
        color: isLight ? "#0f172a" : "#ffffff",
        boxShadow: isLight
          ? "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px #e2e8f0"
          : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        borderRadius: "16px"
      }}
      contentArrowStyle={{
        borderRight: isLight ? "7px solid #e2e8f0" : "7px solid #232631"
      }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[22px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[15px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const { isLight } = useTheme();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          {t.experience.subText}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {t.experience.headText}
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor={isLight ? "#cbd5e1" : "#232631"}>
          {t.experience.list.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              isLight={isLight}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
