import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useLanguage } from "../context";
import { fetchApprovedTestimonials, LOCAL_TESTIMONIALS_KEY } from "../lib/supabase";
import TestimonialModal from "./TestimonialModal";

const FeedbackCard = ({
  testimonial,
  name,
  designation,
  company,
  image,
  rating = 5,
  isDynamic
}) => (
  <div className="bg-black-200/95 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-card flex flex-col justify-between h-[210px] sm:h-[220px] transition-all duration-300 hover:border-[#915EFF]/50 hover:shadow-[0_8px_24px_-4px_rgba(145,94,255,0.25)] relative group">
    <div>
      {/* Top row: Quote & Rating */}
      <div className="flex items-center justify-between">
        <span className="text-[#915EFF] font-black text-2xl leading-none select-none">“</span>
        <div className="flex items-center gap-0.5 text-amber-400 text-xs sm:text-sm">
          {Array.from({ length: Math.min(5, Math.max(1, rating || 5)) }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>

      {/* Testimonial text: compact & uniform clamp */}
      <div className="mt-2.5">
        <p className="text-white/90 text-xs sm:text-[13px] leading-relaxed line-clamp-3 italic min-h-[52px]">
          "{testimonial}"
        </p>
      </div>
    </div>

    {/* Footer: User profile */}
    <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-white font-semibold text-xs sm:text-[13px] truncate">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          {isDynamic && (
            <span className="hidden xs:inline-block px-1.5 py-0.2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] font-bold rounded-full shrink-0">
              Verified
            </span>
          )}
        </div>
        <p className="text-secondary text-[10px] sm:text-[11px] truncate mt-0.5">
          {designation || "Klien"}{company ? ` · ${company}` : ""}
        </p>
      </div>

      <img
        src={image}
        alt={`feedback_by-${name}`}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/15 shrink-0"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=915EFF&color=fff`;
        }}
      />
    </div>
  </div>
);

const Feedbacks = () => {
  const { t, isID } = useLanguage();
  const [testimonials, setTestimonials] = useState(t.feedbacks.list || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Responsive visible count: Desktop = 4, Tablet = 2, Mobile = 1
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(4);
      } else if (width >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Keep currentIndex bounded when window size or list changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, testimonials.length, maxIndex, currentIndex]);

  // Load testimonials with deduplication & instant sync
  const loadData = async () => {
    try {
      const data = await fetchApprovedTestimonials(t.feedbacks.list);
      if (data && data.length > 0) {
        // Pastikan setiap review memiliki ID unik
        const mapped = data.map((item, idx) => ({
          ...item,
          id: item.id || `default_testi_${idx}`
        }));

        // Deduplikasi hanya jika ID persis sama
        const seen = new Set();
        const unique = [];
        for (const item of mapped) {
          if (!seen.has(item.id)) {
            seen.add(item.id);
            unique.push(item);
          }
        }
        setTestimonials(unique);
      }
    } catch (err) {
      console.warn("Using default testimonials:", err);
      setTestimonials(t.feedbacks.list || []);
    }
  };

  // Real-time listener: window custom event, storage event, tab visibility, focus & BroadcastChannel
  useEffect(() => {
    loadData();

    // 1. Same-window custom event (fired immediately by admin or modal submit)
    const handleCustomUpdate = () => loadData();
    window.addEventListener("portfolio_testimonials_updated", handleCustomUpdate);

    // 2. Storage event (fired across tabs when localStorage is updated)
    const handleStorage = (e) => {
      if (!e.key || e.key === LOCAL_TESTIMONIALS_KEY) {
        loadData();
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Tab visibility change & focus (when user switches back from admin tab to portfolio)
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        loadData();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);
    window.addEventListener("pageshow", handleVisibilityOrFocus);

    // 4. Modern cross-tab BroadcastChannel
    let channel;
    try {
      if (typeof BroadcastChannel !== "undefined") {
        channel = new BroadcastChannel("portfolio_sync_channel");
        channel.onmessage = (event) => {
          if (event.data?.type === "testimonials") {
            loadData();
          }
        };
      }
    } catch (e) {
      // BroadcastChannel optional
    }

    return () => {
      window.removeEventListener("portfolio_testimonials_updated", handleCustomUpdate);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("pageshow", handleVisibilityOrFocus);
      if (channel) channel.close();
    };
  }, [t]);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="mt-12 bg-black-100 rounded-[20px] border border-white/5 relative overflow-hidden shadow-2xl">
      {/* Header Container */}
      <div className="bg-tertiary rounded-2xl sm:px-10 px-5 pt-8 pb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>{t.feedbacks.subText}</p>
            <h2 className={styles.sectionHeadText}>{t.feedbacks.headText}</h2>
          </motion.div>

          {/* Action Bar: Prev, Next & Leave Review Buttons */}
          <div className="flex items-center gap-2.5 self-start sm:self-end shrink-0">
            {/* Slider Nav Buttons */}
            {testimonials.length > visibleCount && (
              <div className="flex items-center gap-1.5 bg-black-200/60 p-1 rounded-xl border border-white/10">
                <button
                  onClick={handlePrev}
                  title="Sebelumnya"
                  className="w-8 h-8 rounded-lg bg-black-100/80 hover:bg-[#915EFF] border border-white/5 flex items-center justify-center text-white text-base font-bold transition-all duration-200 active:scale-90"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  title="Berikutnya"
                  className="w-8 h-8 rounded-lg bg-black-100/80 hover:bg-[#915EFF] border border-white/5 flex items-center justify-center text-white text-base font-bold transition-all duration-200 active:scale-90"
                >
                  ›
                </button>
              </div>
            )}

            {/* Leave Review Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#915EFF] hover:bg-[#804dee] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <span className="text-base font-black">+</span>
              {isID ? "Beri Testimoni" : "Leave Review"}
            </button>
          </div>
        </div>
      </div>

      {/* Slider Viewport Container */}
      <div
        className="-mt-8 sm:-mt-7 pb-6 px-3 sm:px-8 w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
          }}
        >
          {testimonials.map((item, index) => (
            <div
              key={item.id || `${item.name}-${index}`}
              className="px-2 shrink-0 select-none"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <FeedbackCard {...item} />
            </div>
          ))}
        </div>

        {/* Pagination Indicator Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center items-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-6 bg-[#915EFF] shadow-[0_0_8px_#915EFF]"
                    : "w-2 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
