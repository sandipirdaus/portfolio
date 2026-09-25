import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, demoIcon } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../context";
import { fetchProjects } from "../lib/supabase";

const ProjectCard = ({
  index,
  name,
  description,
  tags = [],
  image,
  source_code_link,
  live_demo_link,
  isDynamic
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white/5 shadow-card transition-colors duration-300 relative flex flex-col justify-between"
      >
        <div>
          <div className="relative w-full h-[230px]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60";
              }}
            />

            {isDynamic && (
              <div className="absolute top-3 left-3 bg-[#915EFF]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                Baru
              </div>
            )}

            <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
              {live_demo_link && (
                <div
                  onClick={() => window.open(live_demo_link, "_blank")}
                  title="Live Demo"
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform shadow-md"
                >
                  <img
                    src={demoIcon}
                    alt="live demo"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              )}
              {source_code_link && (
                <div
                  onClick={() => window.open(source_code_link, "_blank")}
                  title="Source Code"
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform shadow-md"
                >
                  <img
                    src={github}
                    alt="source code"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px] leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name || tag}`}
              className={`text-[14px] ${tag.color || "blue-text-gradient"}`}
            >
              #{tag.name || tag}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { t } = useLanguage();
  const [projectsList, setProjectsList] = useState(t.works.list);

  useEffect(() => {
    let isMounted = true;
    const loadDynamic = async () => {
      try {
        const data = await fetchProjects();
        if (isMounted && data && data.length > 0) {
          // Dynamic items that are newly added
          const dynamicItems = data.filter((p) => p.isDynamic);
          if (dynamicItems.length > 0) {
            // Prepend new dynamic projects to localized base list
            setProjectsList([...dynamicItems, ...t.works.list]);
          } else {
            setProjectsList(t.works.list);
          }
        }
      } catch (err) {
        console.warn("Using localized projects fallback:", err);
      }
    };

    loadDynamic();

    // Real-time synchronization
    const handleUpdate = () => loadDynamic();
    window.addEventListener("portfolio_projects_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadDynamic();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);
    window.addEventListener("pageshow", handleVisibility);

    let channel;
    try {
      if (typeof BroadcastChannel !== "undefined") {
        channel = new BroadcastChannel("portfolio_sync_channel");
        channel.onmessage = (event) => {
          if (event.data?.type === "projects") {
            loadDynamic();
          }
        };
      }
    } catch (e) {}

    return () => {
      isMounted = false;
      window.removeEventListener("portfolio_projects_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
      window.removeEventListener("pageshow", handleVisibility);
      if (channel) channel.close();
    };
  }, [t]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>{t.works.subText}</p>
        <h2 className={`${styles.sectionHeadText}`}>{t.works.headText}</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {t.works.description}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projectsList.map((project, index) => (
          <ProjectCard
            key={project.id || `project-${index}`}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");

