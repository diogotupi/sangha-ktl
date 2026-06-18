"use client";

import { useState } from "react";
import { Download, Play } from "lucide-react";
import type { MaterialCategory, MaterialFile } from "@/lib/materials";
import { VideoPlayerDialog } from "@/components/materiais/video-player-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MaterialsBrowserProps = {
  catalog: MaterialCategory[];
};

type ActiveVideo = {
  title: string;
  embedUrl: string;
  externalUrl: string;
};

export function MaterialsBrowser({ catalog }: MaterialsBrowserProps) {
  const [activeId, setActiveId] = useState(catalog[0]?.id ?? "");
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);

  const activeCategory =
    catalog.find((category) => category.id === activeId) ?? catalog[0];

  if (!activeCategory) return null;

  function openVideo(file: MaterialFile) {
    if (!file.embedUrl || !file.externalUrl) return;

    setActiveVideo({
      title: file.name.replace(/\.[^.]+$/, ""),
      embedUrl: file.embedUrl,
      externalUrl: file.externalUrl,
    });
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {catalog.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              className={cn(
                buttonVariants({
                  variant: category.id === activeId ? "default" : "outline",
                  size: "sm",
                }),
                category.id === activeId && "bg-brand hover:bg-brand/90",
              )}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-70">({category.files.length})</span>
            </button>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl text-foreground">{activeCategory.label}</h2>
          <ul className="divide-y divide-border/60 rounded-xl border border-border/60 bg-card/50">
            {activeCategory.files.map((file) => (
              <li
                key={file.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.sizeLabel}</p>
                  {file.embedUrl && (
                    <p className="text-xs text-muted-foreground">
                      Disponível para assistir online
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {file.embedUrl && file.externalUrl ? (
                    <button
                      type="button"
                      onClick={() => openVideo(file)}
                      className={cn(
                        buttonVariants({ variant: "default", size: "sm" }),
                        "bg-brand hover:bg-brand/90",
                      )}
                    >
                      <Play className="mr-2 size-4" />
                      Assistir
                    </button>
                  ) : null}
                  {file.downloadable ? (
                    <a
                      href={`/api/materiais/download?category=${activeCategory.id}&file=${file.id}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                      <Download className="mr-2 size-4" />
                      Baixar
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {activeVideo ? (
        <VideoPlayerDialog
          open={Boolean(activeVideo)}
          onOpenChange={(open) => {
            if (!open) setActiveVideo(null);
          }}
          title={activeVideo.title}
          embedUrl={activeVideo.embedUrl}
          externalUrl={activeVideo.externalUrl}
        />
      ) : null}
    </>
  );
}
