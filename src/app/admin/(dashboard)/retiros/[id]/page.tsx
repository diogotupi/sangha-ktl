import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getMiniRetiroById } from "@/actions/admin";
import { MiniRetiroDetail } from "@/components/admin/mini-retiro-detail";
import { DeleteMiniRetiroButton } from "@/components/admin/delete-mini-retiro-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const submission = await getMiniRetiroById(id);
  return {
    title: submission ? submission.fullName : "Retiro",
  };
}

export default async function RetiroDetailPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await getMiniRetiroById(id);

  if (!submission) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/retiros"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Link>
        <DeleteMiniRetiroButton id={submission.id} fullName={submission.fullName} />
      </div>

      <MiniRetiroDetail submission={submission} />
    </div>
  );
}
