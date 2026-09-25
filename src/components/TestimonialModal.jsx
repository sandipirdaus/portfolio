import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitTestimonial } from "../lib/supabase";

const TestimonialModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !testimonial.trim()) {
      setErrorMsg("Nama dan pesan testimoni wajib diisi.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await submitTestimonial({
        name,
        company,
        designation: designation || "Klien",
        testimonial,
        rating,
        imageFile
      });

      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setCompany("");
        setDesignation("");
        setTestimonial("");
        setRating(5);
        setImageFile(null);
        setImagePreview(null);
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Gagal mengirim testimoni:", err);
      setLoading(false);
      setErrorMsg("Gagal mengirim testimoni. Silakan coba kembali.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-tertiary border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold text-white">Berikan Testimoni / Ulasan</h3>
              <p className="text-xs text-secondary mt-1">
                Ulasan Anda sangat berharga bagi peningkatan layanan saya.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-secondary hover:text-white p-1 text-2xl leading-none transition-colors"
            >
              &times;
            </button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 border border-emerald-500/30">
                ✓
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Terima Kasih!</h4>
              <p className="text-secondary text-sm max-w-xs mx-auto">
                Testimoni Anda berhasil dikirim dan akan segera ditampilkan setelah melalui proses peninjauan.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Rating Bintang */}
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase mb-2">
                  Penilaian / Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span
                        className={
                          (hoverRating || rating) >= star
                            ? "text-amber-400"
                            : "text-white/20"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="text-xs text-secondary font-medium ml-2">
                    {rating} dari 5 Bintang
                  </span>
                </div>
              </div>

              {/* Nama & Perusahaan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">
                    Nama Lengkap <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-primary py-2.5 px-3.5 rounded-lg border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">
                    Perusahaan / Usaha
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Contoh: Planet Jaya Accu"
                    className="w-full bg-primary py-2.5 px-3.5 rounded-lg border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none"
                  />
                </div>
              </div>

              {/* Peran / Designation */}
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Jabatan / Peran
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Contoh: Store Manager / Founder / Klien"
                  className="w-full bg-primary py-2.5 px-3.5 rounded-lg border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none"
                />
              </div>

              {/* Pesan Testimoni */}
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Ulasan / Pengalaman Bekerja Sama <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Ceritakan kepuasan Anda terhadap website/sistem yang telah dikerjakan..."
                  className="w-full bg-primary py-2.5 px-3.5 rounded-lg border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none resize-none"
                />
              </div>

              {/* Upload Foto (Opsional) */}
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Foto Profil (Opsional)
                </label>
                <div className="flex items-center gap-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xs text-secondary border border-white/10">
                      Foto
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-xs text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#915EFF]/20 file:text-white hover:file:bg-[#915EFF]/30 cursor-pointer"
                  />
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-secondary hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#915EFF] hover:bg-[#804dee] text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Mengirim..." : "Kirim Testimoni"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TestimonialModal;
