import fs from "fs";
import path from "path";
import {
  findExternalVideo,
  EXTERNAL_VIDEOS,
  EXTERNAL_BOOKS,
  driveEmbedUrl,
  driveDownloadUrl,
} from "@/lib/materials-external";

const ASSETS_ROOT = path.join(process.cwd(), "assets");
const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".mp4",
  ".jpg",
  ".jpeg",
  ".png",
  ".docx",
]);

/** Arquivos acima deste limite não são servidos pelo site (use links externos). */
export const MAX_DOWNLOAD_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

export const MATERIAL_CATEGORIES = [
  { id: "livros", folder: "Livros-site", label: "Livros" },
  { id: "sadhanas", folder: "Sadhanas", label: "Sadhanas" },
  { id: "gravacoes", folder: "Gravações", label: "Gravações" },
  { id: "imagens", folder: "Imagens", label: "Imagens" },
] as const;

export type MaterialFile = {
  id: string;
  name: string;
  relativePath: string;
  sizeBytes: number;
  sizeLabel: string;
  downloadable: boolean;
  tooLarge: boolean;
  externalUrl?: string;
  embedUrl?: string;
  externalDownloadUrl?: string;
  isVideo?: boolean;
};

export type MaterialCategory = {
  id: string;
  label: string;
  files: MaterialFile[];
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function shouldSkipEntry(name: string): boolean {
  return (
    name.startsWith(".") ||
    name.endsWith(".pages") ||
    name === "Contents" ||
    name === "buildVersionHistory.plist" ||
    name === "PkgInfo"
  );
}

function collectFiles(dir: string, categoryFolder: string): MaterialFile[] {
  if (!fs.existsSync(dir)) return [];

  const files: MaterialFile[] = [];

  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (shouldSkipEntry(entry.name)) continue;

      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.endsWith(".pages")) continue;
        walk(fullPath);
        continue;
      }

      const ext = path.extname(entry.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) continue;

      const stat = fs.statSync(fullPath);
      const relativePath = path
        .relative(path.join(ASSETS_ROOT, categoryFolder), fullPath)
        .split(path.sep)
        .join("/");

      const tooLarge = stat.size > MAX_DOWNLOAD_SIZE_BYTES;
      const external = findExternalVideo(entry.name);

      files.push({
        id: Buffer.from(`${categoryFolder}/${relativePath}`).toString("base64url"),
        name: entry.name,
        relativePath,
        sizeBytes: stat.size,
        sizeLabel: formatSize(stat.size),
        downloadable: !tooLarge,
        tooLarge,
        externalUrl: external?.driveUrl,
        embedUrl: external?.embedUrl,
      });
    }
  }

  walk(dir);
  return files.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

function externalVideoEntries(
  gravacoes: MaterialCategory | undefined,
): MaterialFile[] {
  return EXTERNAL_VIDEOS.filter(
    (video) => !gravacoes?.files.some((file) => video.match.test(file.name)),
  ).map((video) => ({
    id: Buffer.from(`external-video/${video.fileId}`).toString("base64url"),
    name: `${video.title}.mp4`,
    relativePath: `${video.title}.mp4`,
    sizeBytes: 0,
    sizeLabel: "Google Drive",
    downloadable: false,
    tooLarge: true,
    externalUrl: video.driveUrl,
    embedUrl: driveEmbedUrl(video.fileId),
    isVideo: true,
  }));
}

function externalBookEntries(livros: MaterialCategory | undefined): MaterialFile[] {
  return EXTERNAL_BOOKS.filter(
    (book) => !livros?.files.some((file) => book.match.test(file.name)),
  ).map((book) => ({
    id: Buffer.from(`external-book/${book.fileId}`).toString("base64url"),
    name: `${book.title}.pdf`,
    relativePath: `${book.title}.pdf`,
    sizeBytes: 0,
    sizeLabel: "Google Drive",
    downloadable: false,
    tooLarge: true,
    externalUrl: book.driveUrl,
    embedUrl: driveEmbedUrl(book.fileId),
    externalDownloadUrl: driveDownloadUrl(book.fileId),
    isVideo: false,
  }));
}

export function getMaterialsCatalog(): MaterialCategory[] {
  const categories = MATERIAL_CATEGORIES.map(({ id, folder, label }) => ({
    id,
    label,
    files: collectFiles(path.join(ASSETS_ROOT, folder), folder),
  })).filter((cat) => cat.files.length > 0);

  const gravacoes = categories.find((cat) => cat.id === "gravacoes");
  const externalVideos = externalVideoEntries(gravacoes);
  if (externalVideos.length > 0) {
    if (gravacoes) {
      gravacoes.files.push(...externalVideos);
      gravacoes.files.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    } else {
      categories.push({ id: "gravacoes", label: "Gravações", files: externalVideos });
    }
  }

  const livros = categories.find((cat) => cat.id === "livros");
  const externalBooks = externalBookEntries(livros);
  if (externalBooks.length > 0) {
    if (livros) {
      livros.files.push(...externalBooks);
      livros.files.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    } else {
      categories.push({ id: "livros", label: "Livros", files: externalBooks });
    }
  }

  return categories;
}

export function resolveMaterialFile(
  categoryId: string,
  fileId: string,
): { absolutePath: string; fileName: string } | null {
  const category = MATERIAL_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

  const catalog = getMaterialsCatalog();
  const cat = catalog.find((c) => c.id === categoryId);
  const file = cat?.files.find((f) => f.id === fileId);
  if (!file || !file.downloadable) return null;

  const absolutePath = path.join(
    ASSETS_ROOT,
    category.folder,
    ...file.relativePath.split("/"),
  );

  const categoryRoot = path.join(ASSETS_ROOT, category.folder);
  if (!absolutePath.startsWith(categoryRoot)) return null;
  if (!fs.existsSync(absolutePath)) return null;

  return { absolutePath, fileName: file.name };
}

export const MATERIALS_COOKIE = "ktl_materials_access";
