"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Mountain, LogOut } from "lucide-react";
import { logoutAction } from "@/actions/admin";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/cadastros", label: "Cadastros", icon: Users, exact: false },
  { href: "/admin/retiros", label: "Retiros", icon: Mountain, exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border/40 bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="text-base font-semibold text-brand">
            Admin · KTL
          </Link>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Admin">
            {adminLinks.map(({ href, label, icon: Icon, exact }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive(pathname, href, exact)
                    ? "bg-sage/10 text-sage"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <form action={logoutAction}>
          <Button variant="ghost" size="sm" type="submit">
            <LogOut className="mr-2 size-4" />
            Sair
          </Button>
        </form>
      </div>
    </header>
  );
}
