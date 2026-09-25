import React, { useState } from "react";
import { motion } from "framer-motion";
import { adminLogin, isSupabaseConfigured } from "../../lib/supabase";

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const isCloud = isSupabaseConfigured();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await adminLogin(email, password);
      setLoading(false);
      if (onLoginSuccess) onLoginSuccess(data);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || "Gagal masuk. Periksa kembali email dan password.");
    }
  };

  const handleQuickDemoFill = () => {
    setEmail("admin@sandipirdaus.com");
    setPassword("admin123456");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-tertiary border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-[#915EFF]/20 border border-[#915EFF]/30 text-[#915EFF] mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-secondary text-xs mt-1">
            Masuk untuk mengelola proyek dan memoderasi ulasan klien
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-1">
              Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sandipirdaus.com"
              className="w-full bg-primary py-3 px-4 rounded-xl border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-primary py-3 px-4 rounded-xl border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#915EFF] hover:bg-[#804dee] text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>

        {!isCloud && (
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-secondary mb-2">
              Mode Uji Coba Lokal / Dev Demo:
            </p>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-xs font-semibold text-[#915EFF] hover:underline"
            >
              Isi Otomatis Kredensial Demo (Klik di sini)
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-secondary hover:text-white transition-colors"
          >
            &larr; Kembali ke Portofolio Utama
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
