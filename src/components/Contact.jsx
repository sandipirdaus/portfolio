import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useLanguage } from "../context";

const TARGET_EMAIL = "sandipirdauspd@gmail.com";

const Contact = () => {
  const formRef = useRef();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value
    });

    if (status.type) {
      setStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: t.contact.requiredFields
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      // 1. Try sending via FormSubmit endpoint to sandipirdauspd@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Pesan Portofolio Baru dari ${form.name}`,
          _replyto: form.email,
          _template: "table"
        })
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setLoading(false);
        setStatus({
          type: "success",
          message: t.contact.successAlert
        });
        setForm({
          name: "",
          email: "",
          message: ""
        });
      } else if (data.message && data.message.toLowerCase().includes("activation")) {
        setLoading(false);
        setStatus({
          type: "activation",
          message: t.contact.activationNotice
        });
        setForm({
          name: "",
          email: "",
          message: ""
        });
      } else {
        throw new Error(data.message || "FormSubmit failed");
      }
    } catch (err) {
      console.warn("FormSubmit notice, attempting EmailJS fallback...", err);

      // 2. Fallback to EmailJS if credentials are configured in .env
      const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: form.name,
              to_name: "Sandi Pirdaus",
              from_email: form.email,
              to_email: TARGET_EMAIL,
              message: form.message
            },
            publicKey
          );

          setLoading(false);
          setStatus({
            type: "success",
            message: t.contact.successAlert
          });
          setForm({
            name: "",
            email: "",
            message: ""
          });
          return;
        } catch (emailJsErr) {
          console.error("EmailJS fallback error:", emailJsErr);
        }
      }

      setLoading(false);
      setStatus({
        type: "error",
        message: t.contact.errorAlert
      });
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl border border-white/5 shadow-card"
      >
        <p className={styles.sectionSubText}>{t.contact.subText}</p>
        <h3 className={styles.sectionHeadText}>{t.contact.headText}</h3>

        {/* Feedback Alert Banner */}
        <AnimatePresence>
          {status.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-xl text-sm font-medium flex items-start justify-between gap-3 ${
                status.type === "success"
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                  : status.type === "activation"
                  ? "bg-amber-500/15 border border-amber-500/30 text-amber-200"
                  : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">
                  {status.type === "success" ? "✓" : status.type === "activation" ? "ℹ" : "⚠"}
                </span>
                <div>
                  <p>{status.message}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStatus({ type: null, message: "" })}
                className="opacity-70 hover:opacity-100 text-lg leading-none"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3">{t.contact.nameLabel}</span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder={t.contact.namePlaceholder}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium transition-colors focus:border-[#915EFF]"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3">{t.contact.emailLabel}</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder={t.contact.emailPlaceholder}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium transition-colors focus:border-[#915EFF]"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3">{t.contact.messageLabel}</span>
            <textarea
              rows={6}
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder={t.contact.messagePlaceholder}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium transition-colors focus:border-[#915EFF]"
            />
          </label>

          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {loading ? t.contact.sendingBtn : t.contact.sendBtn}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
