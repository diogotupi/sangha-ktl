"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

type VideoPlayerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  embedUrl: string;
  externalUrl: string;
};

export function VideoPlayerDialog({
  open,
  onOpenChange,
  title,
  embedUrl,
  externalUrl,
}: VideoPlayerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-4 p-0 sm:p-0">
        <DialogHeader className="space-y-1 px-6 pt-6">
          <DialogTitle className="font-heading text-xl">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Reprodução da gravação via Google Drive
          </DialogDescription>
        </DialogHeader>

        <div className="aspect-video w-full bg-black">
          {open ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="size-full border-0"
            />
          ) : null}
        </div>

        <div className="flex justify-end px-6 pb-6">
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <ExternalLink className="mr-2 size-4" />
            Abrir no Google Drive
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
