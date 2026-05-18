type AdminCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export function AdminCard({ label, value, hint }: AdminCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-soft">
      <p className="text-xs uppercase tracking-[0.24em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
