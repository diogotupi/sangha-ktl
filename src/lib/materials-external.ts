export type ExternalVideo = {
  title: string;
  match: RegExp;
  driveUrl: string;
  fileId: string;
};

/** Gravações hospedadas no Google Drive (arquivos grandes demais para o site). */
export const EXTERNAL_VIDEOS: ExternalVideo[] = [
  {
    title: "Ensinamento Lama Tartchin 30 de Maio de 2020",
    match: /Ensinamento Lama Tart/i,
    fileId: "1Y3sNuCkKsFsIlNLv_xrtawtYz4dwVZdM",
    driveUrl:
      "https://drive.google.com/file/d/1Y3sNuCkKsFsIlNLv_xrtawtYz4dwVZdM/view?usp=drive_link",
  },
  {
    title: "Hangouts 10.04.2020",
    match: /Hangouts 10\.04/i,
    fileId: "1Gbum-bmGNd-AfaUUlCahdwUZ1NmqQXTj",
    driveUrl:
      "https://drive.google.com/file/d/1Gbum-bmGNd-AfaUUlCahdwUZ1NmqQXTj/view?usp=drive_link",
  },
  {
    title: "Hangouts 25.04.2020",
    match: /Hangouts 25\.04/i,
    fileId: "1WZAhYjE0Pq5Qg7FXnbIgC5bzvvlxpYLl",
    driveUrl:
      "https://drive.google.com/file/d/1WZAhYjE0Pq5Qg7FXnbIgC5bzvvlxpYLl/view?usp=drive_link",
  },
  {
    title: "Intro Budismo 30-05-2020",
    match: /Intro Budismo/i,
    fileId: "1MQVuaO4b_ACDQG2mFIiryDsxNuUE0aRb",
    driveUrl:
      "https://drive.google.com/file/d/1MQVuaO4b_ACDQG2mFIiryDsxNuUE0aRb/view?usp=drive_link",
  },
  {
    title: "Lama Wangdu — Parte 3",
    match: /Lama Wangdu/i,
    fileId: "1CLc33sHrnU3z3XUrGwp4GtSZQQO0_y5b",
    driveUrl:
      "https://drive.google.com/file/d/1CLc33sHrnU3z3XUrGwp4GtSZQQO0_y5b/view?usp=drive_link",
  },
];

export type ExternalBook = {
  title: string;
  match: RegExp;
  driveUrl: string;
  fileId: string;
};

/** Livros pesados hospedados no Google Drive. */
export const EXTERNAL_BOOKS: ExternalBook[] = [
  {
    title: "Bokar Rimpoche — Tchenrezi, O Senhor da Grande Compaixão",
    match: /Bokar Rimpoche.*Tchenrezi.*Grande Compaix/i,
    fileId: "1ITAyHRk7WVzXmSTz4VEdBCYQTKizINpZ",
    driveUrl:
      "https://drive.google.com/file/d/1ITAyHRk7WVzXmSTz4VEdBCYQTKizINpZ/view?usp=sharing",
  },
  {
    title: "Dalai Lama — A Arte de Lidar com a Raiva",
    match: /Dalai Lama.*Arte de Lidar com a Raiva/i,
    fileId: "1l7L_qL_U4wI9JRmeK8jOGBqlNLKvuA2J",
    driveUrl:
      "https://drive.google.com/file/d/1l7L_qL_U4wI9JRmeK8jOGBqlNLKvuA2J/view?usp=drive_link",
  },
  {
    title: "Dalai Lama — Como um Relâmpago Rasgando a Noite",
    match: /Dalai Lama.*Relâmpago/i,
    fileId: "1joh7x8RFSblVE9C7SSJQ1yFw-vXYdjz_",
    driveUrl:
      "https://drive.google.com/file/d/1joh7x8RFSblVE9C7SSJQ1yFw-vXYdjz_/view?usp=drive_link",
  },
  {
    title: "Guendün Rinpoche — Ensinamentos do Coração de um Mestre Mahamudra",
    match: /Guendün Rinpoche.*Ensinamentos do Coração/i,
    fileId: "1cfdbKIxOYJx0bTGaEpM1XKak082FeRSE",
    driveUrl:
      "https://drive.google.com/file/d/1cfdbKIxOYJx0bTGaEpM1XKak082FeRSE/view?usp=drive_link",
  },
  {
    title: "Dilgo Khyentsé — Os Cem Conselhos de Padampa Sangyé",
    match: /Dilgo Khyentsé.*Cem Conselhos/i,
    fileId: "1RsDMr90Usw8KHoKpvpbWnfUf8nZgJmj4",
    driveUrl:
      "https://drive.google.com/file/d/1RsDMr90Usw8KHoKpvpbWnfUf8nZgJmj4/view?usp=drive_link",
  },
  {
    title: "Jamgön Mipham — Chuva de Bênçãos",
    match: /Jamgön Mipham.*Chuva de Bênç/i,
    fileId: "1dL03OpR7a4jf7xW6RpuDVUAQyHooAhjb",
    driveUrl:
      "https://drive.google.com/file/d/1dL03OpR7a4jf7xW6RpuDVUAQyHooAhjb/view?usp=drive_link",
  },
  {
    title: "Traleg Kyabgon — A Essência do Budismo",
    match: /Traleg Kyabgon.*Essência do Budismo/i,
    fileId: "1b6FciItEDaaY0e3vwL-_JZP_2GMjuyFY",
    driveUrl:
      "https://drive.google.com/file/d/1b6FciItEDaaY0e3vwL-_JZP_2GMjuyFY/view?usp=drive_link",
  },
];

export function driveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function driveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function findExternalVideo(
  fileName: string,
): (ExternalVideo & { embedUrl: string }) | null {
  const match = EXTERNAL_VIDEOS.find((video) => video.match.test(fileName));
  if (!match) return null;

  return {
    ...match,
    embedUrl: driveEmbedUrl(match.fileId),
  };
}
