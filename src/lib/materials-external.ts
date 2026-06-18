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

export function driveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
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
