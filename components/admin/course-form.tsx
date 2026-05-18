"use client";

import { useState } from "react";

import { SiteButton } from "@/components/site/button";

type CourseFormProps = {
  initial?: Partial<CourseFormState>;
  onSubmit: (data: CourseFormState) => void;
  onCancel: () => void;
};

export type CourseFormState = {
  slug: string;
  title: string;
  description: string;
  instructor: string;
  price: string;
  duration: string;
  level: string;
  category: string;
};

const defaults: CourseFormState = {
  slug: "",
  title: "",
  description: "",
  instructor: "",
  price: "",
  duration: "",
  level: "",
  category: "",
};

export function CourseForm({ initial, onSubmit, onCancel }: CourseFormProps) {
  const [form, setForm] = useState<CourseFormState>({ ...defaults, ...initial });

  function handleChange(key: keyof CourseFormState, value: string) {
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
        <Field label="Slug" value={form.slug} onChange={(v) => handleChange("slug", v)} />
        <Field label="Title" value={form.title} onChange={(v) => handleChange("title", v)} />
        <Field label="Description" value={form.description} onChange={(v) => handleChange("description", v)} />
        <Field label="Instructor" value={form.instructor} onChange={(v) => handleChange("instructor", v)} />
        <Field label="Price" value={form.price} onChange={(v) => handleChange("price", v)} />
        <Field label="Duration" value={form.duration} onChange={(v) => handleChange("duration", v)} />
        <Field label="Level" value={form.level} onChange={(v) => handleChange("level", v)} />
        <Field label="Category" value={form.category} onChange={(v) => handleChange("category", v)} />
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
