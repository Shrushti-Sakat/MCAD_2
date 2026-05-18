import Image from "next/image";
import Link from "next/link";

export function SiteLogo() {
  return (
    <Link className="inline-flex items-center gap-3" href="/">
      <div className="overflow-hidden rounded-2xl border border-white/70 bg-white px-2 py-1 shadow-soft">
        <Image
          alt="M CAD Solutions logo"
          className="h-auto w-auto"
          height={48}
          priority
          src="/webs_logo.png"
          width={132}
        />
      </div>
      <div className="hidden lg:flex lg:flex-col">
        <div className="inline-flex w-fit items-center rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-dark">
          College Robotics Labs
        </div>
        <p className="mt-2 text-xs font-medium text-muted">
          M CAD Solutions | Robots, lab setup, and Digital Twin training for colleges
        </p>
      </div>
    </Link>
  );
}
