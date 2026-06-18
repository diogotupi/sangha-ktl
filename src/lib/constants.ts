export const siteConfig = {
  name: "Kagyu Ngedön Tcho Ling",
  shortName: "KTL",
  tagline: "O JARDIM DO DHARMA DA TRADIÇÃO VIVA",
  description:
    "Centro de prática budista da tradição Kagyu, meditação, estudo e convivência no caminho do despertar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt-BR",
  instagram: "https://instagram.com/ktl_rj",
  instagramHandle: "@ktl_rj",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/quem-somos", label: "Sobre a Sangha" },
  { href: "/encontros", label: "Atividades" },
  { href: "/materiais", label: "Material" },
  { href: "/ingresso", label: "Cadastro" },
] as const;

export const meditationLabels = {
  NONE: "Nunca pratiquei",
  BEGINNER: "Iniciante (menos de 1 ano)",
  INTERMEDIATE: "Intermediário (1 a 3 anos)",
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
    title: "Áudio: Meditação Guiada (20 min)",
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
    title: "Estudo: 37 Práticas dos Bodhisattvas - Tokme Zangpo",
    date: "2026-06-27",
    time: "11:00",
    endTime: "13:00",
    location: "Híbrido, Rio de Janeiro",
    description:
      "Daremos continuidade aos estudos do livro, e faremos práticas meditativas. Fique à vontade para participar como quiser.",
    image: "/encontros/thokme-zangpo.png",
    imageAlt: "Tokme Zangpo, autor das 37 Práticas dos Bodhisattvas",
  },
] as const;
