import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  centered = false,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-4 px-6 pb-12 pt-16 md:pt-24",
        centered && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="font-accent text-sm tracking-[0.15em] text-brand uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-4xl leading-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
