import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/layout/page-header";
import { upcomingEvents } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Próximos Encontros",
  description: "Fique por dentro das atividades da sangha.",
};

function formatHour(time: string) {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);
  return minutes === "00" ? `${h}h` : `${h}h${minutes}`;
}

export default function EventsPage() {
  const event = upcomingEvents[0];
  const date = parseISO(event.date);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Agenda"
        title="Próximos encontros"
        description="Fique por dentro das atividades da sangha."
      />

      <div className="mx-auto max-w-3xl px-6 pb-24">
        <Link
          href="/ingresso"
          className="group block rounded-2xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-brand/30 hover:bg-card md:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start md:gap-8">
            <div className="flex shrink-0 flex-col items-center gap-2 self-start">
              <div className="relative aspect-[3/4] w-24 overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-sm md:w-28">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  className="object-cover object-[center_18%]"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>
              <div className="flex flex-col items-center text-sage">
                <span className="text-[10px] font-medium uppercase tracking-wide">
                  {format(date, "MMM", { locale: ptBR })}
                </span>
                <span className="font-heading text-xl leading-none">
                  {format(date, "d")}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-sans text-lg font-semibold leading-snug text-foreground md:text-xl">
                {event.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {event.description}
              </p>
              <div className="flex flex-col gap-4 pt-1">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4 shrink-0 text-sage" aria-hidden />
                  {formatHour(event.time)} às {formatHour(event.endTime)}
                </p>
                <span className="inline-flex w-fit items-center gap-2 text-sm font-medium text-brand group-hover:underline">
                  Quero participar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </SiteShell>
  );
}
