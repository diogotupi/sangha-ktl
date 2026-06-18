import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand text-brand-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="font-heading text-lg">{siteConfig.name}</p>
            <p className="font-accent text-xs tracking-wide uppercase opacity-90">
              {siteConfig.tagline}
            </p>
            <p className="text-sm leading-relaxed opacity-80">
              Um refúgio para cultivar presença, sabedoria e compaixão — juntos,
              passo a passo.
            </p>
          </div>

          <div className="space-y-3 text-sm opacity-80">
            <p>Encontros quinzenais de meditação e estudo</p>
            <p>
              <Link
                href="/ingresso"
                className="underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
              >
                Quero participar
              </Link>
            </p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
            >
              <InstagramIcon className="size-4" />
              {siteConfig.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 text-center text-xs opacity-70">
          © {new Date().getFullYear()} {siteConfig.name}. Com gratidão a todos os
          que caminham conosco.
        </div>
      </div>
    </footer>
  );
}
