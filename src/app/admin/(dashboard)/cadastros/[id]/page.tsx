import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSubmissionById } from "@/actions/admin";
import { SubmissionDetail } from "@/components/admin/submission-detail";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const submission = await getSubmissionById(id);
  return {
    title: submission ? submission.fullName : "Cadastro",
  };
}

export default async function CadastroDetailPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await getSubmissionById(id);

  if (!submission) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/admin/cadastros"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
      >
        <ArrowLeft className="mr-2 size-4" />
        Voltar
      </Link>

      <SubmissionDetail submission={submission} />
    </div>
  );
}
