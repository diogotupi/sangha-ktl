import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/api/materiais/download": ["./assets/**"],
    "/materiais": ["./assets/Livros/**", "./assets/Grava*/**"],
  },
};

export default nextConfig;
