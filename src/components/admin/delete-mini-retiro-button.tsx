"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteMiniRetiroSubmission } from "@/actions/admin";
import { Button } from "@/components/ui/button";

type DeleteMiniRetiroButtonProps = {
  id: string;
  fullName: string;
  variant?: "default" | "icon";
};

export function DeleteMiniRetiroButton({
  id,
  fullName,
  variant = "default",
}: DeleteMiniRetiroButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(
      `Apagar a resposta de ${fullName}? Esta ação não pode ser desfeita.`,
    );
    if (!confirmed) return;

    setError(null);
    startTransition(async () => {
      const result = await deleteMiniRetiroSubmission(id);
      if (result.success) {
        router.push("/admin/retiros");
        router.refresh();
        return;
      }
      setError(result.error);
    });
  }

  if (variant === "icon") {
    return (
      <div className="flex flex-col items-end gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleDelete}
          disabled={isPending}
          aria-label={`Apagar resposta de ${fullName}`}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
      >
        <Trash2 className="mr-2 size-4" />
        {isPending ? "Apagando..." : "Apagar resposta"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
