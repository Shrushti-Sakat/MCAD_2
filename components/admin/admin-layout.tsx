"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, LayoutGrid, Package, ShoppingBag } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AdminLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/courses", label: "Courses", icon: BookIcon },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export function AdminLayout({ title, description, children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-foreground">
      <div className="grid min-h-screen gap-0 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-border/70 bg-white/95 px-4 py-6 shadow-sm backdrop-blur">
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-border/70 bg-brand-soft/60 px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">M CAD Solutions</p>
              <p className="text-sm font-semibold text-foreground">Admin Panel</p>
            </div>
          </div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-muted transition hover:bg-brand-soft/70 hover:text-foreground",
                    active && "bg-brand-soft/80 text-foreground shadow-sm border border-brand/20",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="px-5 pb-10 pt-6 sm:px-8">
          <div className="flex flex-col gap-2 pb-6">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">Dashboard</p>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
            {description ? <p className="text-sm text-muted">{description}</p> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function BookIcon(props: any) {
  return <Boxes {...props} />;
}
