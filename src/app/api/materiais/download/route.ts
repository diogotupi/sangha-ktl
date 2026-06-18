import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isMaterialsAuthenticated } from "@/actions/materials-auth";
import { resolveMaterialFile } from "@/lib/materials";

const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(request: NextRequest) {
  const authenticated = await isMaterialsAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const category = request.nextUrl.searchParams.get("category");
  const fileId = request.nextUrl.searchParams.get("file");

  if (!category || !fileId) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const resolved = resolveMaterialFile(category, fileId);
  if (!resolved) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  const ext = path.extname(resolved.fileName).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";
  const buffer = fs.readFileSync(resolved.absolutePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(resolved.fileName)}`,
      "Content-Length": String(buffer.length),
    },
  });
}
