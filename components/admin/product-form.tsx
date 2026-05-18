"use client";

import { useState } from "react";

import { SiteButton } from "@/components/site/button";

type ProductFormProps = {
  initial?: Partial<ProductFormState>;
  onSubmit: (data: ProductFormState) => void;
  onCancel: () => void;
};

export type ProductFormState = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  type: string;
  useCase: string;
  highlights: string;
};

const defaults: ProductFormState = {
  id: "",
  title: "",
  category: "",
  description: "",
  price: "",
  type: "",
  useCase: "",
  highlights: "",
};

export function ProductForm({ initial, onSubmit, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormState>({ ...defaults, ...initial });

  function handleChange(key: keyof ProductFormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="ID (slug)" value={form.id} onChange={(v) => handleChange("id", v)} />
        <Field label="Title" value={form.title} onChange={(v) => handleChange("title", v)} />
        <Field label="Category" value={form.category} onChange={(v) => handleChange("category", v)} />
        <Field label="Description" value={form.description} onChange={(v) => handleChange("description", v)} />
        <Field label="Price" value={form.price} onChange={(v) => handleChange("price", v)} />
        <Field label="Type" value={form.type} onChange={(v) => handleChange("type", v)} />
        <Field label="Use case" value={form.useCase} onChange={(v) => handleChange("useCase", v)} />
        <Field
          label="Highlights (comma separated)"
          value={form.highlights}
          onChange={(v) => handleChange("highlights", v)}
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <SiteButton variant="ghost" onClick={onCancel} type="button">
          Cancel
        </SiteButton>
        <SiteButton type="submit">Save</SiteButton>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="space-y-1 text-sm font-semibold text-foreground">
      <span className="block text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
      <input
        className="w-full rounded-xl border border-border/70 bg-white px-3 py-2 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </label>
  );
}
