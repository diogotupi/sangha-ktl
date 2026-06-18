export const communityPhotos = [
  {
    src: "/hero/IMG_4904.JPG",
    alt: "Comunidade da sangha em encontro",
    objectClass: "object-[center_30%]",
  },
  {
    src: "/hero/IMG_2321.jpg",
    alt: "Prática e convivência da sangha",
    objectClass: "object-[center_30%]",
  },
  {
    src: "/hero/20230416_115444_exported_2952_1681682293052_Original.JPG",
    alt: "Encontro da comunidade KTL",
    objectClass: "object-center",
  },
  {
    src: "/hero/19413584-5CFA-4049-A517-17B58AB4BD07.jpg",
    alt: "Momento de prática com a sangha",
    objectClass: "object-[center_30%]",
  },
  {
    src: "/hero/ee97b497-34e7-4268-8815-c6bdfc0e70e8.jpg",
    alt: "Comunidade reunida no Rio de Janeiro",
    objectClass: "object-[center_40%]",
  },
] as const;

/** Subconjunto usado no slideshow da home (ordem: 5 → 4 → 2) */
export const heroSlides = [
  communityPhotos[0],
  communityPhotos[1],
  communityPhotos[2],
] as const;
