import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  threejs,
  nextjs,
  mamp,
  prisma,
  python,
  fullstackIcon,
  uiuxIcon,
  aiIcon,
  systemsIcon,
  noorlink,
  planetjaya,
  vetskin,
  undangan
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About"
  },
  {
    id: "work",
    title: "Work"
  },
  {
    id: "contact",
    title: "Contact"
  }
];

const services = [
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
];

const technologies = [
  {
    name: "HTML 5",
    icon: html
  },
  {
    name: "CSS 3",
    icon: css
  },
  {
    name: "JavaScript",
    icon: javascript
  },
  {
    name: "TypeScript",
    icon: typescript
  },
  {
    name: "React JS",
    icon: reactjs
  },
  {
    name: "Next.js",
    icon: nextjs
  },
  {
    name: "Tailwind CSS",
    icon: tailwind
  },
  {
    name: "Node JS",
    icon: nodejs
  },
  {
    name: "MAMP",
    icon: mamp
  },
  {
    name: "Prisma ORM",
    icon: prisma
  },
  {
    name: "Python",
    icon: python
  },
  {
    name: "Three JS",
    icon: threejs
  },
  {
    name: "Git",
    icon: git
  },
  {
    name: "Figma",
    icon: figma
  },
  {
    name: "Docker",
    icon: docker
  }
];

const experiences = [
  {
    title: "Full-Stack Web Developer",
    company_name: "Freelance & Client Solutions",
    icon: fullstackIcon,
    iconBg: "#1E1B4B",
    date: "Jan 2023 - Present",
    points: [
      "Architecting and developing modern, responsive web applications using Next.js (App Router), React, TypeScript, and Tailwind CSS.",
      "Engineered comprehensive operational platforms including Noorlink Invoice System with automated numbering, real-time calculation, and Puppeteer PDF rendering.",
      "Designed and deployed scalable databases using Prisma ORM with MySQL and PostgreSQL, ensuring robust transaction safety.",
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
      "Optimizing front-end performance, responsive multi-device layouts, and cross-browser accessibility with high Lighthouse scores.",
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
      "Containerized models and backend services with Docker, enabling reliable cloud deployments across HuggingFace Spaces and Vercel.",
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
      "Configured local web server stacks (Apache, MySQL/MAMP), managed database backups, and provided end-to-end technical support."
    ]
  }
];

const testimonials = [
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
];

const projects = [
  {
    name: "Noorlink Invoice System",
    description:
      "Sistem web internal manajemen invoice dan billing operasional sewa audio umroh. Dilengkapi otomatisasi penomoran invoice, kalkulasi item sewa dinamis, verifikasi bukti pembayaran, dan cetak PDF resolusi tinggi (Puppeteer).",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient"
      },
      {
        name: "typescript",
        color: "green-text-gradient"
      },
      {
        name: "prisma",
        color: "pink-text-gradient"
      },
      {
        name: "tailwind",
        color: "orange-text-gradient"
      }
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
      {
        name: "nextjs",
        color: "blue-text-gradient"
      },
      {
        name: "typescript",
        color: "green-text-gradient"
      },
      {
        name: "tailwind",
        color: "pink-text-gradient"
      },
      {
        name: "prisma",
        color: "orange-text-gradient"
      }
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
      {
        name: "python",
        color: "blue-text-gradient"
      },
      {
        name: "deep-learning",
        color: "green-text-gradient"
      },
      {
        name: "docker",
        color: "pink-text-gradient"
      },
      {
        name: "flask",
        color: "orange-text-gradient"
      }
    ],
    image: vetskin,
    source_code_link: "https://github.com/sandipirdaus/vetskin-ai",
    live_demo_link: "https://sandipirdauspd-vetskin-ai.hf.space/"
  },
  {
    name: "Undangan Digital Interaktif",
    description:
      "Website undangan pernikahan digital interaktif dan responsif dengan fitur audio background player, galeri foto interaktif, hitung mundur (countdown), buku ucapan & RSVP real-time, serta navigasi lokasi terintegrasi Google Maps.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient"
      },
      {
        name: "typescript",
        color: "green-text-gradient"
      },
      {
        name: "tailwind",
        color: "pink-text-gradient"
      },
      {
        name: "framer-motion",
        color: "orange-text-gradient"
      }
    ],
    image: undangan,
    source_code_link: "https://github.com/sandipirdaus/undangan-digital",
    live_demo_link: "https://undangan-digital-sawebs.vercel.app"
  }
];

export { services, technologies, experiences, testimonials, projects };
