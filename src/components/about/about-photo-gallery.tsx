import Image from "next/image";
import { communityPhotos } from "@/lib/community-photos";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export function AboutPhotoGallery() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {communityPhotos.map((photo, index) => (
        <ScrollReveal
          key={photo.src}
          delay={index * 90}
          variant="scale"
          className={cn(
            index === 0 && "sm:col-span-2 lg:col-span-3",
            index === 1 && "sm:col-span-2 lg:col-span-3",
            index === 2 && "lg:col-span-2",
            index === 3 && "lg:col-span-2",
            index === 4 && "sm:col-span-2 lg:col-span-2",
          )}
        >
          <figure
            className={cn(
              "group h-full overflow-hidden rounded-2xl border border-border/50 bg-card/40 shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-md",
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden",
                index < 2 ? "aspect-[16/10]" : "aspect-[4/3]",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={cn(
                  "object-cover transition-transform duration-700 group-hover:scale-[1.03]",
                  photo.objectClass,
                )}
              />
            </div>
          </figure>
        </ScrollReveal>
      ))}
    </div>
  );
}
