import { createClient } from "@supabase/supabase-js";
import { projects as defaultProjects, testimonials as defaultTestimonials } from "../constants";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return (
    typeof supabaseUrl === "string" &&
    supabaseUrl.startsWith("https://") &&
    typeof supabaseAnonKey === "string" &&
    supabaseAnonKey.length > 20
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// LOCAL STORAGE KEYS (Untuk Offline / Dev Fallback)
// ==========================================
export const LOCAL_PROJECTS_KEY = "portfolio_dynamic_projects";
export const LOCAL_TESTIMONIALS_KEY = "portfolio_dynamic_testimonials";

// Helper get Local
const getLocalData = (key, fallback = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn("Failed to read localStorage:", e);
    return fallback;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to write localStorage:", e);
  }
};

// ==========================================
// REAL-TIME INSTANT EVENT NOTIFIER
// ==========================================
export const notifyDataChanged = (type = "testimonials") => {
  if (typeof window === "undefined") return;

  try {
    // 1. Trigger custom event pada window saat ini
    window.dispatchEvent(new CustomEvent(`portfolio_${type}_updated`));
    window.dispatchEvent(new CustomEvent("portfolio_data_updated", { detail: { type } }));

    // 2. Trigger storage event buatan agar window saat ini juga merespons
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.warn("Event dispatch failed:", e);
  }

  // 3. BroadcastChannel untuk komunikasi kilat antar-tab / jendela browser
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("portfolio_sync_channel");
      channel.postMessage({ type, timestamp: Date.now() });
      channel.close();
    }
  } catch (e) {
    // ignore
  }
};

// ==========================================
// 1. MANAJEMEN PROYEK (PROJECTS)
// ==========================================

export const fetchProjects = async () => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        // Map data Supabase agar sesuai dengan format card
        const dynamicProjects = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          tags: Array.isArray(item.tags) ? item.tags : [],
          image: item.image_url,
          source_code_link: item.source_code_link || "",
          live_demo_link: item.live_demo_link || "",
          isDynamic: true,
          created_at: item.created_at
        }));

        // Gabungkan dengan default projects (menghindari duplikasi)
        return [...dynamicProjects, ...defaultProjects];
      }
    } catch (err) {
      console.warn("Supabase fetchProjects failed, falling back to local/static data:", err);
    }
  }

  // Fallback: Gabungkan data local storage (jika admin upload saat dev) dengan static projects
  const localProjects = getLocalData(LOCAL_PROJECTS_KEY, []);
  return [...localProjects, ...defaultProjects];
};

export const uploadProjectImage = async (file) => {
  if (!file) return null;

  if (isSupabaseConfigured() && supabase) {
    const fileExt = file.name.split(".").pop();
    const fileName = `project_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(filePath);
    return data.publicUrl;
  }

  // Fallback dev mode: Convert file to Base64 Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export const createProject = async ({
  name,
  description,
  tags,
  imageFile,
  imageUrl,
  source_code_link,
  live_demo_link
}) => {
  let finalImageUrl = imageUrl;
  if (imageFile) {
    finalImageUrl = await uploadProjectImage(imageFile);
  }

  const newProject = {
    name,
    description,
    tags: Array.isArray(tags) ? tags : [],
    image_url: finalImageUrl,
    source_code_link: source_code_link || "",
    live_demo_link: live_demo_link || ""
  };

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from("projects").insert([newProject]).select();
    if (error) throw error;
    notifyDataChanged("projects");
    return data[0];
  }

  // Fallback local storage
  const localProject = {
    ...newProject,
    id: `local_${Date.now()}`,
    image: finalImageUrl,
    isDynamic: true,
    created_at: new Date().toISOString()
  };
  const current = getLocalData(LOCAL_PROJECTS_KEY, []);
  setLocalData(LOCAL_PROJECTS_KEY, [localProject, ...current]);
  notifyDataChanged("projects");
  return localProject;
};

export const deleteProject = async (id) => {
  if (isSupabaseConfigured() && supabase && !id.startsWith("local_")) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    notifyDataChanged("projects");
    return true;
  }

  // Remove from local storage
  const current = getLocalData(LOCAL_PROJECTS_KEY, []);
  setLocalData(
    LOCAL_PROJECTS_KEY,
    current.filter((p) => p.id !== id)
  );
  notifyDataChanged("projects");
  return true;
};

// ==========================================
// 2. MANAJEMEN TESTIMONI (TESTIMONIALS)
// ==========================================

export const fetchApprovedTestimonials = async (baseFallback = defaultTestimonials) => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const approved = data.map((t) => ({
          id: t.id,
          name: t.name,
          company: t.company,
          designation: t.designation || "Klien",
          testimonial: t.testimonial,
          rating: t.rating || 5,
          image: t.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=915EFF&color=fff`,
          isDynamic: true
        }));
        return [...approved, ...baseFallback];
      }
    } catch (err) {
      console.warn("Supabase fetchApprovedTestimonials failed, using fallback:", err);
    }
  }

  // Fallback local storage
  const localList = getLocalData(LOCAL_TESTIMONIALS_KEY, []);
  const localApproved = localList
    .filter((t) => t.status === "approved")
    .map((t) => ({
      ...t,
      image: t.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=915EFF&color=fff`,
      isDynamic: true
    }));

  return [...localApproved, ...baseFallback];
};

export const submitTestimonial = async ({
  name,
  company,
  designation,
  testimonial,
  rating = 5,
  imageFile
}) => {
  let image_url = "";
  if (imageFile) {
    image_url = await uploadProjectImage(imageFile);
  }

  const payload = {
    name,
    company: company || "",
    designation: designation || "Klien",
    testimonial,
    rating: Number(rating) || 5,
    image_url: image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=915EFF&color=fff`,
    status: "pending"
  };

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from("testimonials").insert([payload]).select();
    if (error) throw error;
    notifyDataChanged("testimonials");
    return data[0];
  }

  // Fallback local storage
  const localItem = {
    ...payload,
    id: `local_testi_${Date.now()}`,
    created_at: new Date().toISOString()
  };
  const current = getLocalData(LOCAL_TESTIMONIALS_KEY, []);
  setLocalData(LOCAL_TESTIMONIALS_KEY, [localItem, ...current]);
  notifyDataChanged("testimonials");
  return localItem;
};

export const fetchAllTestimonialsAdmin = async () => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) return data;
  }

  return getLocalData(LOCAL_TESTIMONIALS_KEY, []);
};

export const updateTestimonialStatus = async (id, newStatus) => {
  if (isSupabaseConfigured() && supabase && !id.startsWith("local_")) {
    const { data, error } = await supabase
      .from("testimonials")
      .update({ status: newStatus })
      .eq("id", id)
      .select();
    if (error) throw error;
    notifyDataChanged("testimonials");
    return data[0];
  }

  // Local storage update
  const current = getLocalData(LOCAL_TESTIMONIALS_KEY, []);
  const updated = current.map((item) =>
    item.id === id ? { ...item, status: newStatus } : item
  );
  setLocalData(LOCAL_TESTIMONIALS_KEY, updated);
  notifyDataChanged("testimonials");
  return updated.find((i) => i.id === id);
};

export const deleteTestimonial = async (id) => {
  if (isSupabaseConfigured() && supabase && !id.startsWith("local_")) {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;
    notifyDataChanged("testimonials");
    return true;
  }

  const current = getLocalData(LOCAL_TESTIMONIALS_KEY, []);
  setLocalData(
    LOCAL_TESTIMONIALS_KEY,
    current.filter((item) => item.id !== id)
  );
  notifyDataChanged("testimonials");
  return true;
};

// ==========================================
// 3. AUTENTIKASI ADMIN
// ==========================================

export const adminLogin = async (email, password) => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  }

  // Local dev password fallback jika belum memasukkan key Supabase
  if (email === "admin@sandipirdaus.com" && password === "admin123456") {
    const mockUser = {
      user: { email, id: "local_admin_sandi" },
      session: { access_token: "mock_session_token" }
    };
    localStorage.setItem("portfolio_admin_auth", JSON.stringify(mockUser));
    return mockUser;
  }

  throw new Error(
    "Kredensial belum sesuai. Gunakan akun Supabase Anda, atau gunakan demo dev: admin@sandipirdaus.com / admin123456"
  );
};

export const adminLogout = async () => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem("portfolio_admin_auth");
};

export const getAdminSession = async () => {
  if (isSupabaseConfigured() && supabase) {
    const { data } = await supabase.auth.getSession();
    if (data?.session) return data.session;
  }

  const local = localStorage.getItem("portfolio_admin_auth");
  if (local) {
    try {
      return JSON.parse(local).session;
    } catch {
      return null;
    }
  }
  return null;
};
