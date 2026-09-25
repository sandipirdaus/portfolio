import React, { useState, useEffect } from "react";
import { fetchProjects, createProject, deleteProject } from "../../lib/supabase";

const AVAILABLE_TAGS = [
  { name: "nextjs", color: "blue-text-gradient" },
  { name: "react", color: "blue-text-gradient" },
  { name: "typescript", color: "green-text-gradient" },
  { name: "javascript", color: "orange-text-gradient" },
  { name: "tailwind", color: "pink-text-gradient" },
  { name: "prisma", color: "orange-text-gradient" },
  { name: "python", color: "blue-text-gradient" },
  { name: "docker", color: "pink-text-gradient" },
  { name: "flask", color: "green-text-gradient" },
  { name: "framer-motion", color: "orange-text-gradient" }
];

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState(["nextjs", "tailwind"]);
  const [customTag, setCustomTag] = useState("");
  const [liveDemoLink, setLiveDemoLink] = useState("");
  const [sourceCodeLink, setSourceCodeLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: null, text: "" });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Gagal memuat proyek:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tagName) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim().toLowerCase())) {
      setSelectedTags([...selectedTags, customTag.trim().toLowerCase()]);
      setCustomTag("");
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setStatusMsg({ type: "error", text: "Nama dan deskripsi proyek wajib diisi." });
      return;
    }
    if (!imageFile) {
      setStatusMsg({ type: "error", text: "Silakan pilih foto screenshot proyek." });
      return;
    }

    setSubmitting(true);
    setStatusMsg({ type: null, text: "" });

    try {
      const formattedTags = selectedTags.map((t) => {
        const found = AVAILABLE_TAGS.find((at) => at.name === t);
        return found || { name: t, color: "blue-text-gradient" };
      });

      await createProject({
        name,
        description,
        tags: formattedTags,
        imageFile,
        source_code_link: sourceCodeLink,
        live_demo_link: liveDemoLink
      });

      setSubmitting(false);
      setStatusMsg({ type: "success", text: "Proyek baru berhasil dipublikasikan!" });
      setShowAddModal(false);
      setName("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setLiveDemoLink("");
      setSourceCodeLink("");
      loadProjects();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setStatusMsg({ type: "error", text: "Gagal menyimpan proyek. Periksa koneksi atau file." });
    }
  };

  const handleDelete = async (id, isDynamic) => {
    if (!isDynamic) {
      alert("Proyek bawaan (built-in) dilindungi dari penghapusan.");
      return;
    }

    if (window.confirm("Yakin ingin menghapus proyek ini dari portofolio?")) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (err) {
        alert("Gagal menghapus proyek: " + err.message);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-white">Manajemen Proyek Portofolio</h2>
          <p className="text-secondary text-xs mt-1">
            Tambah proyek yang baru diselesaikan tanpa perlu membuka kode atau deploy ulang
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#915EFF] hover:bg-[#804dee] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 w-fit"
        >
          <span className="text-base font-black">+</span> Tambah Proyek Baru
        </button>
      </div>

      {statusMsg.text && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs font-semibold ${
            statusMsg.type === "success"
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Grid Proyek yang Ada */}
      {loading ? (
        <div className="py-12 text-center text-secondary text-sm">Memuat data proyek...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="bg-primary/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between shadow-card"
            >
              <div>
                <div className="relative h-44 w-full bg-black-200">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60";
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    {proj.isDynamic ? (
                      <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Dinamis
                      </span>
                    ) : (
                      <span className="bg-blue-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Bawaan
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-bold text-base">{proj.name}</h3>
                  <p className="text-secondary text-xs mt-1.5 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(proj.tags || []).map((t) => (
                      <span
                        key={t.name || t}
                        className="text-[10px] font-medium px-2 py-0.5 bg-tertiary rounded-md text-secondary"
                      >
                        #{t.name || t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex gap-2">
                  {proj.live_demo_link && (
                    <a
                      href={proj.live_demo_link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#915EFF] hover:underline"
                    >
                      Demo &rarr;
                    </a>
                  )}
                  {proj.source_code_link && (
                    <a
                      href={proj.source_code_link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondary hover:text-white"
                    >
                      GitHub
                    </a>
                  )}
                </div>

                {proj.isDynamic ? (
                  <button
                    onClick={() => handleDelete(proj.id, proj.isDynamic)}
                    className="text-rose-400 hover:text-rose-300 font-semibold text-xs"
                  >
                    Hapus
                  </button>
                ) : (
                  <span className="text-white/30 text-[11px] italic">Bawaan</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tambah Proyek */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-tertiary border border-white/10 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Unggah Proyek Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-secondary hover:text-white text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Nama Proyek <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Sistem Kasir & Inventaris Toko B"
                  className="w-full bg-primary py-2.5 px-3.5 rounded-lg border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Deskripsi Proyek <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan fitur utama, masalah yang dipecahkan, dan teknologi yang digunakan..."
                  className="w-full bg-primary py-2.5 px-3.5 rounded-lg border border-white/10 text-white text-sm focus:border-[#915EFF] outline-none resize-none"
                />
              </div>

              {/* Tags / Teknologi */}
              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  Teknologi (Tags)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {AVAILABLE_TAGS.map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => toggleTag(t.name)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                        selectedTags.includes(t.name)
                          ? "bg-[#915EFF] text-white font-bold"
                          : "bg-primary text-secondary hover:text-white border border-white/5"
                      }`}
                    >
                      #{t.name}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    placeholder="Tambah tag khusus..."
                    className="flex-1 bg-primary py-1.5 px-3 rounded-md border border-white/10 text-white text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTag}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md"
                  >
                    + Tag
                  </button>
                </div>
              </div>

              {/* Tautan Proyek */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">
                    Link Live Demo
                  </label>
                  <input
                    type="url"
                    value={liveDemoLink}
                    onChange={(e) => setLiveDemoLink(e.target.value)}
                    placeholder="https://aplikasi-saya.vercel.app"
                    className="w-full bg-primary py-2 px-3 rounded-lg border border-white/10 text-white text-xs focus:border-[#915EFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">
                    Link Repositori GitHub
                  </label>
                  <input
                    type="url"
                    value={sourceCodeLink}
                    onChange={(e) => setSourceCodeLink(e.target.value)}
                    placeholder="https://github.com/sandipirdaus/nama-proyek"
                    className="w-full bg-primary py-2 px-3 rounded-lg border border-white/10 text-white text-xs focus:border-[#915EFF] outline-none"
                  />
                </div>
              </div>

              {/* Upload Gambar */}
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Foto Screenshot Proyek <span className="text-rose-400">*</span>
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center bg-primary/40 hover:border-[#915EFF] transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="max-h-48 mx-auto rounded-lg object-contain shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="mt-2 text-xs text-rose-400 hover:underline"
                      >
                        Ganti Foto
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="project-img-input"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="project-img-input"
                        className="cursor-pointer flex flex-col items-center justify-center gap-1.5 py-4"
                      >
                        <span className="text-3xl text-secondary">🖼️</span>
                        <span className="text-xs font-semibold text-white">
                          Pilih berkas foto tangkapan layar
                        </span>
                        <span className="text-[10px] text-secondary">
                          PNG, JPG, atau WebP (Rekomendasi rasio 16:9 atau 16:10)
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-secondary hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#915EFF] hover:bg-[#804dee] text-white text-xs font-bold rounded-lg shadow-md transition-all disabled:opacity-50"
                >
                  {submitting ? "Mengunggah..." : "Simpan & Publikasikan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
