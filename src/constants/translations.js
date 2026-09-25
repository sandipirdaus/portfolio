import {
  fullstackIcon,
  uiuxIcon,
  aiIcon,
  systemsIcon,
  noorlink,
  planetjaya,
  vetskin,
  undangan,
  web,
  mobile,
  backend,
  creator
} from "../assets";

export const translations = {
  id: {
    nav: {
      about: "Tentang",
      work: "Pengalaman",
      contact: "Kontak",
      role: "| Full-Stack Web Developer"
    },
    hero: {
      greeting: "Halo, Saya",
      name: "Sandi Pirdaus",
      sub: "Full-Stack Web Developer yang siap membantu membangun",
      sub2: "website dan aplikasi modern, responsif, serta mudah digunakan."
    },
    about: {
      subText: "Pengenalan",
      headText: "Ringkasan.",
      description:
        "Saya adalah seorang Full-Stack Web Developer yang berfokus menciptakan website dan aplikasi yang rapi, responsif, dan mudah digunakan. Menguasai ekosistem Next.js, React, TypeScript, Node.js, hingga Python dan basis data, saya siap membantu Anda mewujudkan kebutuhan digital yang praktis dan fungsional. Mari berkolaborasi!"
    },
    services: [
      {
        title: "Web Developer",
        icon: web
      },
      {
        title: "React Native Developer",
        icon: mobile
      },
      {
        title: "Backend Developer",
        icon: backend
      },
      {
        title: "Content Creator",
        icon: creator
      }
    ],
    experience: {
      subText: "Rekam Jejak & Pengalaman",
      headText: "Pengalaman Kerja.",
      list: [
        {
          title: "Full-Stack Web Developer",
          company_name: "Freelance & Client Solutions",
          icon: fullstackIcon,
          iconBg: "#1E1B4B",
          date: "Jan 2023 - Sekarang",
          points: [
            "Merancang dan membangun aplikasi web modern, performan, dan responsif menggunakan Next.js (App Router), React, TypeScript, dan Tailwind CSS.",
            "Mengembangkan platform operasional bisnis komprehensif termasuk Noorlink Invoice System dengan penomoran otomatis, kalkulasi dinamis, dan render PDF beresolusi tinggi (Puppeteer).",
            "Mendesain arsitektur database relasional menggunakan Prisma ORM dengan MySQL dan PostgreSQL untuk integritas transaksi yang handal.",
            "Mengimplementasikan sistem autentikasi aman (JWT, Bcrypt) dan integrasi RESTful API terstandarisasi untuk alur kerja klien yang mulus."
          ]
        },
        {
          title: "Frontend Developer & UI/UX Specialist",
          company_name: "Creative Web Projects",
          icon: uiuxIcon,
          iconBg: "#383E56",
          date: "Agu 2022 - Des 2023",
          points: [
            "Membuat prototipe dan wireframe antarmuka UI/UX interaktif di Figma, menerjemahkan kebutuhan klien menjadi pengalaman digital yang ramah pengguna.",
            "Membangun aplikasi web interaktif seperti platform undangan pernikahan digital dengan animasi halus (Framer Motion), pemutar musik latar, dan RSVP real-time.",
            "Mengoptimalkan performa front-end, layout multi-device responsif, dan aksesibilitas lintas peramban dengan skor Lighthouse optimal.",
            "Bekerja sama erat dengan klien untuk menangkap identitas brand dan merealisasikan kebutuhan visual yang estetis dan fungsional."
          ]
        },
        {
          title: "AI & Machine Learning Developer",
          company_name: "Applied HealthTech & AI",
          icon: aiIcon,
          iconBg: "#042F2E",
          date: "Jan 2022 - Agu 2022",
          points: [
            "Mengembangkan VetSkin AI, sistem diagnosis penyakit kulit hewan peliharaan (kucing & anjing) berbasis Deep Learning dan CNN (Transfer Learning MobileNetV2).",
            "Membangun alur inferensi model lengkap dengan Python, Flask, dan REST API untuk klasifikasi lesi kulit yang cepat dan akurat melalui foto unggahan.",
            "Melakukan kontainerisasi model dan dependensi backend dengan Docker untuk kemudahan deployment cloud di HuggingFace Spaces.",
            "Melakukan validasi metrik akurasi dan benchmarking performa untuk memberikan bantuan diagnostik yang dapat diandalkan bagi dokter hewan dan pemilik peliharaan."
          ]
        },
        {
          title: "Web & IT Systems Developer",
          company_name: "SME & Retail Digitization",
          icon: systemsIcon,
          iconBg: "#451A03",
          date: "Mei 2021 - Des 2021",
          points: [
            "Mengembangkan sistem kasir (Point of Sale / POS) dan manajemen inventaris stok untuk toko ritel seperti Planet Jaya Accu.",
            "Mengimplementasikan pencatatan mutasi stok barang secara real-time, buku kas masuk/keluar, dan rekapitulasi laporan penjualan otomatis.",
            "Mengonfigurasi lingkungan server lokal (Apache, MySQL/MAMP), manajemen backup database berkala, dan memberikan pelatihan operasional kepada staf."
          ]
        }
      ]
    },
    works: {
      subText: "Karya & Portofolio",
      headText: "Proyek Pilihan.",
      description:
        "Proyek-proyek berikut menampilkan keahlian dan pengalaman saya melalui contoh karya nyata. Setiap proyek dilengkapi dengan deskripsi singkat, teknologi yang digunakan, serta tautan repositori kode dan demo langsung.",
      list: [
        {
          name: "Noorlink Invoice System",
          description:
            "Sistem web internal manajemen invoice dan billing operasional sewa audio umroh. Dilengkapi otomatisasi penomoran invoice, kalkulasi item sewa dinamis, verifikasi bukti pembayaran, dan cetak PDF resolusi tinggi (Puppeteer).",
          tags: [
            { name: "nextjs", color: "blue-text-gradient" },
            { name: "typescript", color: "green-text-gradient" },
            { name: "prisma", color: "pink-text-gradient" },
            { name: "tailwind", color: "orange-text-gradient" }
          ],
          image: noorlink,
          source_code_link: "https://github.com/sandipirdaus/invoice-noorlink",
          live_demo_link: "https://github.com/sandipirdaus/invoice-noorlink"
        },
        {
          name: "Planet Jaya Accu POS",
          description:
            "Aplikasi Point of Sale (POS) dan manajemen inventaris toko aki Planet Jaya Accu. Mengelola katalog produk aki mobil & motor, pemantauan stok real-time, pencatatan transaksi kasir, serta laporan performa penjualan.",
          tags: [
            { name: "nextjs", color: "blue-text-gradient" },
            { name: "typescript", color: "green-text-gradient" },
            { name: "tailwind", color: "pink-text-gradient" },
            { name: "prisma", color: "orange-text-gradient" }
          ],
          image: planetjaya,
          source_code_link: "https://github.com/sandipirdaus",
          live_demo_link: "https://github.com/sandipirdaus"
        },
        {
          name: "VetSkin AI",
          description:
            "Sistem deteksi dan diagnosis penyakit kulit hewan peliharaan (kucing & anjing) berbasis Deep Learning Computer Vision. Memanfaatkan transfer learning MobileNetV2 dan kontainerisasi Docker untuk diagnosis akurat via upload foto.",
          tags: [
            { name: "python", color: "blue-text-gradient" },
            { name: "deep-learning", color: "green-text-gradient" },
            { name: "docker", color: "pink-text-gradient" },
            { name: "flask", color: "orange-text-gradient" }
          ],
          image: vetskin,
          source_code_link: "https://github.com/sandipirdaus/vetskin-ai",
          live_demo_link: "https://huggingface.co/spaces/sandipirdauspd/vetskin-ai"
        },
        {
          name: "Undangan Digital Interaktif",
          description:
            "Website undangan pernikahan digital interaktif dan responsif dengan fitur audio background player, galeri foto interaktif, hitung mundur (countdown), buku ucapan & RSVP real-time, serta navigasi lokasi terintegrasi Google Maps.",
          tags: [
            { name: "nextjs", color: "blue-text-gradient" },
            { name: "typescript", color: "green-text-gradient" },
            { name: "tailwind", color: "pink-text-gradient" },
            { name: "framer-motion", color: "orange-text-gradient" }
          ],
          image: undangan,
          source_code_link: "https://github.com/sandipirdaus/undangan-digital",
          live_demo_link: "https://undangan-digital-sawebs.vercel.app"
        }
      ]
    },
    feedbacks: {
      subText: "Apa Kata Mereka",
      headText: "Testimoni Klien.",
      list: [
        {
          testimonial:
            "Sandi mengubah seluruh alur operasional penagihan kami menjadi jauh lebih cepat dan rapi. Generator PDF dan pelacakan status pembayaran sangat menghemat waktu setiap harinya!",
          name: "Ahmad Fauzi",
          designation: "Operations Lead",
          company: "Noorlink",
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          testimonial:
            "Website undangan kami sangat mengesankan! Semua tamu memuji keindahan desain, fitur pemutar lagu, dan sistem RSVP yang sangat interaktif. Terima kasih banyak Sandi!",
          name: "Diana & Aris",
          designation: "Klien",
          company: "Wedding Invitation",
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          testimonial:
            "Aplikasi inventaris dan kasir yang dibuatkan oleh Sandi untuk Planet Jaya Accu membuat pengelolaan ratusan tipe aki menjadi sangat mudah, akurat, dan terorganisir.",
          name: "Budi Santoso",
          designation: "Store Manager",
          company: "Planet Jaya Accu",
          image: "https://randomuser.me/api/portraits/men/46.jpg"
        }
      ]
    },
    contact: {
      subText: "Mari Terhubung",
      headText: "Hubungi Saya.",
      nameLabel: "Nama Anda",
      namePlaceholder: "Masukkan nama lengkap Anda",
      emailLabel: "Email Anda",
      emailPlaceholder: "nama@domain.com",
      messageLabel: "Pesan Anda",
      messagePlaceholder: "Tuliskan pesan atau kebutuhan proyek Anda...",
      sendBtn: "Kirim Pesan",
      sendingBtn: "Mengirim...",
      directEmail: "Atau hubungi langsung melalui email:",
      copyEmail: "Salin",
      copied: "Tersalin!",
      requiredFields: "Harap isi nama, email, dan pesan terlebih dahulu.",
      activationNotice: "Tautan aktivasi telah dikirim ke email tujuan. Silakan buka inbox dan klik 'Activate Form' sekali saja untuk mulai menerima pesan langsung.",
      successAlert: "Terima kasih! Pesan Anda telah berhasil terkirim. Saya akan segera merespons.",
      errorAlert: "Maaf, terjadi kendala saat mengirim pesan formulir. Silakan coba beberapa saat lagi."
    },
    theme: {
      lightMode: "Mode Siang",
      darkMode: "Mode Malam"
    }
  },

  en: {
    nav: {
      about: "About",
      work: "Experience",
      contact: "Contact",
      role: "| Full-Stack Web Developer"
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Sandi Pirdaus",
      sub: "Full-Stack Web Developer ready to build",
      sub2: "modern, responsive, and user-friendly web applications."
    },
    about: {
      subText: "Introduction",
      headText: "Overview.",
      description:
        "I am a Full-Stack Web Developer focused on building clean, responsive, and easy-to-use web applications. Proficient in Next.js, React, TypeScript, Node.js, Python, and databases, I help turn your ideas into practical and functional digital solutions. Let's collaborate!"
    },
    services: [
      {
        title: "Web Developer",
        icon: web
      },
      {
        title: "React Native Developer",
        icon: mobile
      },
      {
        title: "Backend Developer",
        icon: backend
      },
      {
        title: "Content Creator",
        icon: creator
      }
    ],
    experience: {
      subText: "What I have done so far",
      headText: "Work Experience.",
      list: [
        {
          title: "Full-Stack Web Developer",
          company_name: "Freelance & Client Solutions",
          icon: fullstackIcon,
          iconBg: "#1E1B4B",
          date: "Jan 2023 - Present",
          points: [
            "Architecting and developing modern, responsive web applications using Next.js (App Router), React, TypeScript, and Tailwind CSS.",
            "Engineered comprehensive operational platforms including Noorlink Invoice System with automated numbering, real-time calculation, and high-resolution Puppeteer PDF rendering.",
            "Designed and deployed scalable databases using Prisma ORM with MySQL and PostgreSQL, ensuring robust transaction integrity.",
            "Implementing secure authentication architectures (JWT, Bcrypt) and clean RESTful API integration for smooth client workflows."
          ]
        },
        {
          title: "Frontend Developer & UI/UX Specialist",
          company_name: "Creative Web Projects",
          icon: uiuxIcon,
          iconBg: "#383E56",
          date: "Aug 2022 - Dec 2023",
          points: [
            "Crafting intuitive UI/UX prototypes and wireframes in Figma, translating complex requirements into polished, user-friendly digital experiences.",
            "Building highly interactive web applications like digital wedding platforms featuring fluid animations with Framer Motion, background audio, and live RSVP.",
            "Optimizing front-end performance, responsive multi-device layouts, and cross-browser accessibility with top Lighthouse scores.",
            "Working closely with clients to capture brand identity and translate business objectives into aesthetic, functional web interfaces."
          ]
        },
        {
          title: "AI & Machine Learning Developer",
          company_name: "Applied HealthTech & AI",
          icon: aiIcon,
          iconBg: "#042F2E",
          date: "Jan 2022 - Aug 2022",
          points: [
            "Developed VetSkin AI, a pet dermatology diagnostics system using Deep Learning and Convolutional Neural Networks (MobileNetV2 Transfer Learning).",
            "Built complete inference pipelines using Python, Flask, and REST endpoints for fast, accurate skin lesion classification from uploaded images.",
            "Containerized models and backend services with Docker, enabling reliable cloud deployments across HuggingFace Spaces.",
            "Conducted model validation and confidence metric benchmarking to ensure dependable diagnostic assistance for veterinarians and pet owners."
          ]
        },
        {
          title: "Web & IT Systems Developer",
          company_name: "SME & Retail Digitization",
          icon: systemsIcon,
          iconBg: "#451A03",
          date: "May 2021 - Dec 2021",
          points: [
            "Developed custom Point of Sale (POS) and inventory management systems for retail businesses like Planet Jaya Accu.",
            "Implemented real-time stock tracking, incoming/outgoing goods ledger, and automated sales reporting to eliminate manual errors.",
            "Configured local web server stacks (Apache, MySQL/MAMP), managed scheduled database backups, and provided technical support."
          ]
        }
      ]
    },
    works: {
      subText: "My Work",
      headText: "Projects.",
      description:
        "The following projects showcase my skills and experience through real-world applications. Each project is described with relevant tech stacks, links to code repositories, and live interactive demos.",
      list: [
        {
          name: "Noorlink Invoice System",
          description:
            "Internal web-based billing & invoice management platform for umrah audio rental operations. Features automated invoice numbering, dynamic rental calculations, proof of payment verification, and high-fidelity Puppeteer PDF generation.",
          tags: [
            { name: "nextjs", color: "blue-text-gradient" },
            { name: "typescript", color: "green-text-gradient" },
            { name: "prisma", color: "pink-text-gradient" },
            { name: "tailwind", color: "orange-text-gradient" }
          ],
          image: noorlink,
          source_code_link: "https://github.com/sandipirdaus/invoice-noorlink",
          live_demo_link: "https://github.com/sandipirdaus/invoice-noorlink"
        },
        {
          name: "Planet Jaya Accu POS",
          description:
            "Point of Sale (POS) and inventory management system for Planet Jaya Accu battery retailer. Features real-time stock tracking across car & motorcycle battery catalogs, cashier checkout recording, and sales performance analytics.",
          tags: [
            { name: "nextjs", color: "blue-text-gradient" },
            { name: "typescript", color: "green-text-gradient" },
            { name: "tailwind", color: "pink-text-gradient" },
            { name: "prisma", color: "orange-text-gradient" }
          ],
          image: planetjaya,
          source_code_link: "https://github.com/sandipirdaus",
          live_demo_link: "https://github.com/sandipirdaus"
        },
        {
          name: "VetSkin AI",
          description:
            "Pet skin disease detection and diagnostic system (cats & dogs) powered by Deep Learning Computer Vision. Utilizes MobileNetV2 transfer learning and Docker containerization for accurate diagnostics via user photo uploads.",
          tags: [
            { name: "python", color: "blue-text-gradient" },
            { name: "deep-learning", color: "green-text-gradient" },
            { name: "docker", color: "pink-text-gradient" },
            { name: "flask", color: "orange-text-gradient" }
          ],
          image: vetskin,
          source_code_link: "https://github.com/sandipirdaus/vetskin-ai",
          live_demo_link: "https://huggingface.co/spaces/sandipirdauspd/vetskin-ai"
        },
        {
          name: "Undangan Digital Interaktif",
          description:
            "Interactive and responsive digital wedding invitation web app featuring background music player, dynamic photo gallery, live countdown timer, interactive RSVP & guestbook, and integrated Google Maps navigation.",
          tags: [
            { name: "nextjs", color: "blue-text-gradient" },
            { name: "typescript", color: "green-text-gradient" },
            { name: "tailwind", color: "pink-text-gradient" },
            { name: "framer-motion", color: "orange-text-gradient" }
          ],
          image: undangan,
          source_code_link: "https://github.com/sandipirdaus/undangan-digital",
          live_demo_link: "https://undangan-digital-sawebs.vercel.app"
        }
      ]
    },
    feedbacks: {
      subText: "What Others Say",
      headText: "Client Testimonials.",
      list: [
        {
          testimonial:
            "Sandi transformed our entire billing workflow with the Noorlink invoice system. The PDF generator and payment tracking saved us hours every single day!",
          name: "Ahmad Fauzi",
          designation: "Operations Lead",
          company: "Noorlink",
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          testimonial:
            "Our wedding website was absolutely stunning! All our guests were amazed by the design, music player, and smooth interactive RSVP. Thank you Sandi!",
          name: "Diana & Aris",
          designation: "Client",
          company: "Wedding Invitation",
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          testimonial:
            "The inventory and POS system built by Sandi for Planet Jaya Accu made managing hundreds of battery models effortless and accurate.",
          name: "Budi Santoso",
          designation: "Store Manager",
          company: "Planet Jaya Accu",
          image: "https://randomuser.me/api/portraits/men/46.jpg"
        }
      ]
    },
    contact: {
      subText: "Get in touch",
      headText: "Contact.",
      nameLabel: "Your Name",
      namePlaceholder: "What's your good name?",
      emailLabel: "Your Email",
      emailPlaceholder: "What's your web address?",
      messageLabel: "Your Message",
      messagePlaceholder: "What would you like to say?",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      directEmail: "Or reach out directly via email:",
      copyEmail: "Copy",
      copied: "Copied!",
      requiredFields: "Please fill in your name, email, and message before sending.",
      activationNotice: "An activation link has been sent to the destination email. Please check your inbox and click 'Activate Form' once to activate message delivery.",
      successAlert: "Thank you! Your message has been sent successfully. I will get back to you soon.",
      errorAlert: "Sorry, something went wrong while sending your message. Please try again in a moment."
    },
    theme: {
      lightMode: "Light Mode",
      darkMode: "Dark Mode"
    }
  }
};
