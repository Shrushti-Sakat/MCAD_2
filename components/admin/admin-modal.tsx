"use client";

import { X } from "lucide-react";

type AdminModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function AdminModal({ title, open, onClose, children }: AdminModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border/80 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button
            className="rounded-full border border-border px-2 py-1 text-muted hover:text-foreground"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
