import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { logo, menu, close } from "../assets";
import { useTheme, useLanguage } from "../context";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { isLight, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: "about", title: t.nav.about },
    { id: "work", title: t.nav.work },
    { id: "contact", title: t.nav.contact }
  ];

  return (
    <nav
      className={`${styles.paddingX} w-full flex fixed items-center py-4 top-0 z-20 bg-primary/80 backdrop-blur-md border-b border-white/5 transition-colors duration-300`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-10 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex items-center">
            Sandi &nbsp;
            <span className="sm:block hidden text-secondary text-[14px] font-medium">
              {t.nav.role}
            </span>
          </p>
        </Link>

        {/* START BAGIAN TAMPILAN DESKTOP/LAPTOP */}
        <div className="hidden sm:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-8">
            {navItems.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-[#915EFF] font-semibold" : "text-secondary"
                } hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-200`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              title={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-tertiary border border-white/10 hover:border-[#915EFF]/50 text-white transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <span className={language === "id" ? "text-[#915EFF] font-bold" : "text-secondary"}>
                🇮🇩 ID
              </span>
              <span className="text-secondary/40">|</span>
              <span className={language === "en" ? "text-[#915EFF] font-bold" : "text-secondary"}>
                🇬🇧 EN
              </span>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isLight ? t.theme.darkMode : t.theme.lightMode}
              className="p-2 rounded-full bg-tertiary border border-white/10 hover:border-[#915EFF]/50 text-white transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center w-9 h-9"
            >
              {isLight ? (
                // Sun Icon for Light mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-amber-500 animate-spin-slow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m0 16v2m10-10h-2M4 10H2m15.364 6.364l-1.414-1.414M7.05 8.05L5.636 6.636m12.728 0l-1.414 1.414M7.05 15.95l-1.414 1.414"
                  />
                </svg>
              ) : (
                // Moon Icon for Dark mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#915EFF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* END BAGIAN TAMPILAN DESKTOP/LAPTOP */}

        {/* START BAGIAN TAMPILAN SMALL (HP / MOBILE) */}
        <div className="sm:hidden flex flex-1 justify-end items-center gap-3">
          {/* Quick theme & lang buttons in mobile header */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary border border-white/10 text-white"
          >
            {language === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-tertiary border border-white/10 text-white"
          >
            {isLight ? "☀️" : "🌙"}
          </button>

          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[26px] h-[26px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-16 right-0 mx-4 my-2 min-w-[180px] z-30 rounded-2xl shadow-xl border border-white/10`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 w-full">
              {navItems.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-[#915EFF] font-bold" : "text-white"
                  } font-poppins font-medium cursor-pointer text-[16px] w-full pb-2 border-b border-white/5`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* END BAGIAN TAMPILAN SMALL */}
      </div>
    </nav>
  );
};

export default Navbar;

