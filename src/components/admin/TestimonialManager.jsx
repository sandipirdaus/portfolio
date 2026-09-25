import React, { useState, useEffect } from "react";
import {
  fetchAllTestimonialsAdmin,
  updateTestimonialStatus,
  deleteTestimonial
} from "../../lib/supabase";

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'approved'
  const [actionLoading, setActionLoading] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllTestimonialsAdmin();
      setTestimonials(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id);
    try {
      await updateTestimonialStatus(id, newStatus);
      loadData();
    } catch (err) {
      alert("Gagal mengubah status: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus ulasan ini secara permanen?")) {
      setActionLoading(id);
      try {
        await deleteTestimonial(id);
        loadData();
      } catch (err) {
        alert("Gagal menghapus testimoni: " + err.message);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const filtered = testimonials.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const pendingCount = testimonials.filter((t) => t.status === "pending").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Moderasi Testimoni Klien</h2>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-full">
                {pendingCount} Menunggu Persetujuan
              </span>
            )}
          </div>
          <p className="text-secondary text-xs mt-1">
            Tinjau ulasan yang dikirim klien sebelum ditampilkan ke publik portofolio
          </p>
        </div>

        {/* Filter Tab */}
        <div className="flex bg-primary p-1 rounded-xl border border-white/10 w-fit text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filter === "all" ? "bg-[#915EFF] text-white" : "text-secondary hover:text-white"
            }`}
          >
            Semua ({testimonials.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filter === "pending" ? "bg-amber-500 text-black font-bold" : "text-secondary hover:text-white"
            }`}
          >
            Menunggu ({pendingCount})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filter === "approved" ? "bg-emerald-500 text-black font-bold" : "text-secondary hover:text-white"
            }`}
          >
            Disetujui ({testimonials.filter((t) => t.status === "approved").length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-secondary text-sm">Memuat data ulasan...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-primary/40 border border-white/5 rounded-2xl">
          <p className="text-secondary text-sm">
            {filter === "pending"
              ? "Tidak ada ulasan baru yang menunggu persetujuan."
              : "Belum ada testimoni dalam daftar ini."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-primary/70 border border-white/10 rounded-2xl p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={
                    item.image_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=915EFF&color=fff`
                  }
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10 shrink-0"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <span className="text-secondary text-xs">
                      ({item.designation || "Klien"}{item.company ? ` · ${item.company}` : ""})
                    </span>

                    {/* Badge Status */}
                    {item.status === "approved" ? (
                      <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold rounded-full">
                        Tayang di Publik
                      </span>
                    ) : item.status === "rejected" ? (
                      <span className="px-2 py-0.5 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-bold rounded-full">
                        Ditolak
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold rounded-full">
                        Menunggu Persetujuan
                      </span>
                    )}
                  </div>

                  {/* Rating Bintang */}
                  <div className="flex gap-0.5 text-amber-400 text-xs mb-2">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-white/90 text-xs leading-relaxed italic bg-black-200/50 p-3 rounded-xl border border-white/5">
                    "{item.testimonial}"
                  </p>

                  {item.created_at && (
                    <p className="text-[10px] text-secondary mt-1.5">
                      Diterima: {new Date(item.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                    </p>
                  )}
                </div>
              </div>

              {/* Tombol Aksi Moderasi */}
              <div className="flex items-center gap-2 md:self-center shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                {item.status !== "approved" && (
                  <button
                    onClick={() => handleStatusChange(item.id, "approved")}
                    disabled={actionLoading === item.id}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                  >
                    ✓ Setujui (Tayangkan)
                  </button>
                )}

                {item.status === "approved" && (
                  <button
                    onClick={() => handleStatusChange(item.id, "pending")}
                    disabled={actionLoading === item.id}
                    className="px-3 py-2 bg-amber-600/80 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Sembunyikan
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={actionLoading === item.id}
                  className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/30 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialManager;
