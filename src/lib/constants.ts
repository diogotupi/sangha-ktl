export const siteConfig = {
  name: "Kagyu Ngedön Tcho Ling",
  shortName: "KTL",
  tagline: "O JARDIM DO DHARMA DA TRADIÇÃO VIVA",
  description:
    "Centro de prática budista da tradição Kagyu — meditação, estudo e convivência no caminho do despertar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt-BR",
  instagram: "https://instagram.com/ktl_rj",
  instagramHandle: "@ktl_rj",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/encontros", label: "Atividades" },
  { href: "/materiais", label: "Material" },
  { href: "/ingresso", label: "Cadastro" },
] as const;

export const meditationLabels = {
  NONE: "Nunca pratiquei",
  BEGINNER: "Iniciante (menos de 1 ano)",
  INTERMEDIATE: "Intermediário (1–3 anos)",
  ADVANCED: "Avançado (mais de 3 anos)",
} as const;

export const buddhismLabels = {
  NEW: "Estou conhecendo agora",
  SOME_KNOWLEDGE: "Tenho algum conhecimento",
  PRACTITIONER: "Pratico há algum tempo",
  LONG_TERM: "Praticante de longa data",
} as const;

export const statusLabels = {
  PENDING: "Pendente",
  REVIEWED: "Revisado",
  CONTACTED: "Contatado",
  ACCEPTED: "Aceito",
  DECLINED: "Declinado",
} as const;

export const preferredContactLabels = {
  EMAIL: "E-mail",
  PHONE: "Telefone",
  WHATSAPP: "WhatsApp",
} as const;

export const studyMaterials = [
  {
    title: "Introdução à Meditação Sentada",
    type: "PDF",
    description: "Orientações gentis para começar a prática diária em casa.",
    href: "#",
  },
  {
    title: "Os Quatro Nobres Verdades",
    type: "Texto",
    description: "Um guia acessível sobre o ensinamento central do Buda.",
    href: "#",
  },
  {
    title: "Áudio — Meditação Guiada (20 min)",
    type: "Áudio",
    description: "Prática guiada para cultivar presença e estabilidade.",
    href: "#",
  },
  {
    title: "Ética no Caminho Budista",
    type: "PDF",
    description: "Reflexões sobre sila e convivência harmoniosa.",
    href: "#",
  },
] as const;

export const upcomingEvents = [
  {
    title: "Meditação Matinal",
    date: "2026-06-22",
    time: "07:00",
    location: "Centro de Prática",
    description: "Sessão aberta de meditação sentada e caminhada consciente.",
  },
  {
    title: "Estudo do Dhamma",
    date: "2026-06-28",
    time: "19:30",
    location: "Online",
    description: "Leitura e diálogo sobre o Sutra do Coração.",
  },
  {
    title: "Retiro de Fim de Semana",
    date: "2026-07-12",
    time: "09:00",
    location: "Sítio da Sangha",
    description: "Dois dias de silêncio, meditação e convivência.",
  },
] as const;
