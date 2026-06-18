import { randomBytes } from "crypto";

export function generateProtocol(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const suffix = randomBytes(2).toString("hex").toUpperCase();
  return `SGH-${y}${m}${d}-${suffix}`;
}

export function formatProtocolDisplay(protocol: string): string {
  return protocol;
}
