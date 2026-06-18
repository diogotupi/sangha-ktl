import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/cadastros/export";
  return NextResponse.redirect(url);
}
