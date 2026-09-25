import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import ProjectManager from "./ProjectManager";
import TestimonialManager from "./TestimonialManager";
import { getAdminSession, adminLogout, isSupabaseConfigured } from "../../lib/supabase";

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects"); // 'projects' or 'testimonials'
  const isCloud = isSupabaseConfigured();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const s = await getAdminSession();
        setSession(s);
      } catch (e) {
        console.warn("Auth check:", e);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await adminLogout();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-white text-sm">
        Memverifikasi sesi admin...
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={(authData) => setSession(authData.session || authData)} />;
  }

  return (
    <div className="min-h-screen bg-primary text-white selection:bg-[#915EFF] selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-black-100/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-wider text-white">
              Sandi<span className="text-[#915EFF]">.Admin</span>
            </span>

            {/* Cloud Status Pill */}
            {isCloud ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Supabase Terhubung
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Mode Lokal (Dev)
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-secondary hover:text-white font-medium flex items-center gap-1 transition-colors"
            >
              Lihat Website &rarr;
            </a>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 rounded-lg text-xs font-semibold transition-all"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Supabase Notice Banner if not configured yet */}
        {!isCloud && (
          <div className="mb-8 p-4 bg-tertiary border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">ℹ️</span>
              <div>
                <h4 className="text-sm font-bold text-white">Koneksikan Proyek Supabase Anda</h4>
                <p className="text-xs text-secondary mt-0.5 max-w-2xl">
                  Saat ini Anda sedang menggunakan penyimpanan lokal. Untuk menyimpan data dan gambar secara permanen di cloud, buat proyek di{" "}
                  <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#915EFF] underline">
                    supabase.com
                  </a>
                  , jalankan skrip <code className="text-amber-300 bg-black-200 px-1 py-0.5 rounded">supabase_schema.sql</code>, dan masukkan URL & Anon Key ke file <code className="text-amber-300 bg-black-200 px-1 py-0.5 rounded">.env</code>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 mb-8 gap-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-3 font-semibold text-sm transition-colors relative ${
              activeTab === "projects" ? "text-white" : "text-secondary hover:text-white"
            }`}
          >
            🚀 Kelola Proyek Portofolio
            {activeTab === "projects" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#915EFF]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`pb-3 font-semibold text-sm transition-colors relative ${
              activeTab === "testimonials" ? "text-white" : "text-secondary hover:text-white"
            }`}
          >
            ⭐ Moderasi Testimoni Klien
            {activeTab === "testimonials" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#915EFF]" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "projects" ? <ProjectManager /> : <TestimonialManager />}
      </main>
    </div>
  );
};

export default AdminDashboard;
