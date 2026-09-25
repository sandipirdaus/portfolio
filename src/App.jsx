import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, LanguageProvider } from "./context";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas
} from "./components";
import { AdminDashboard } from "./components/admin";

const PortfolioHome = () => (
  <div className="relative z-0 bg-primary min-h-screen selection:bg-[#915EFF] selection:text-white">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
    <About />
    <Experience />
    <Tech />
    <Works />
    <Feedbacks />
    <div className="relative z-10">
      <Contact />
      <StarsCanvas />
    </div>
    <footer className="py-6 text-center text-xs text-secondary border-t border-white/5 relative z-10 flex flex-wrap items-center justify-center gap-3 px-4">
      <span>© {new Date().getFullYear()} Sandi Pirdaus. All rights reserved.</span>
      <span className="hidden sm:inline">•</span>
      <a
        href="/admin"
        className="hover:text-[#915EFF] transition-colors font-medium opacity-70 hover:opacity-100"
      >
        🔐 Portal Admin
      </a>
    </footer>
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
