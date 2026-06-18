import type { Metadata } from "next";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/layout/page-header";
import { upcomingEvents } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Próximos Encontros",
  description: "Meditações, estudos e retiros programados para os próximos meses.",
};

export default function EventsPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Agenda"
        title="Próximos encontros"
        description="Participe das nossas sessões abertas de meditação, estudo e retiros."
      />

      <div className="mx-auto max-w-3xl space-y-8 px-6 pb-24">
        {upcomingEvents.map((event) => {
          const date = parseISO(event.date);
          return (
            <article
              key={event.title}
              className="rounded-2xl border border-border/60 bg-card/50 p-6 md:p-8"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <span className="text-xs font-medium uppercase">
                    {format(date, "MMM", { locale: ptBR })}
                  </span>
                  <span className="font-heading text-3xl leading-none">
                    {format(date, "d")}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-heading text-2xl text-foreground">
                    {event.title}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4 text-sage" aria-hidden />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-sage" aria-hidden />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SiteShell>
  );
}
