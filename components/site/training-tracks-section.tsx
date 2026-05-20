import { ArrowRight, Clock3, GraduationCap, IndianRupee, Layers, Mail, Star, Zap } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";

const tracks = [
  {
    trackId: "00",
    badge: "1 Day Free Workshop",
    title: "Robotics & Digital Twin Introduction Showcase",
    subtitle: "Showcase / Demo",
    duration: "1 Day (~6 hrs)",
    level: "Open / College",
    hours: "~6 hrs",
    fee: "FREE",
    isFree: true,
    isContact: false,
    levelColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentColor: "from-emerald-50/60 to-white/80",
    borderColor: "border-emerald-200/60",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    trackId: "01",
    badge: "5 Days Foundation",
    title: "Digital Twin Foundation for Complete Beginners",
    subtitle: "Zero → Basics",
    duration: "5 Days",
    level: "Zero → Basics",
    hours: "~30 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: false,
    levelColor: "bg-brand-soft text-brand-dark border-brand/20",
    accentColor: "from-brand-soft/30 to-white/80",
    borderColor: "border-brand/15",
    badgeColor: "bg-brand-soft text-brand-dark",
  },
  {
    trackId: "02",
    badge: "10 Days Essentials",
    title: "Digital Twin Essentials With Simulation Intro",
    subtitle: "Basics → Intermediate",
    duration: "10 Days",
    level: "Basics → Intermediate",
    hours: "~60 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: false,
    levelColor: "bg-brand-soft text-brand-dark border-brand/20",
    accentColor: "from-brand-soft/40 to-white/80",
    borderColor: "border-brand/15",
    badgeColor: "bg-brand-soft text-brand-dark",
  },
  {
    trackId: "03",
    badge: "15 Days Core + AGV",
    title: "Digital Twin Core + Simulation + AGV Introduction",
    subtitle: "Intermediate",
    duration: "15 Days",
    level: "Intermediate",
    hours: "~90 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: true,
    levelColor: "bg-amber-50 text-amber-800 border-amber-200",
    accentColor: "from-amber-50/40 to-white/80",
    borderColor: "border-amber-200/50",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    trackId: "04",
    badge: "30 Days Advanced",
    title: "Digital Twin + MoveIt 2 + Real Robot Integration",
    subtitle: "Advanced",
    duration: "30 Days",
    level: "Advanced",
    hours: "~180 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: true,
    levelColor: "bg-orange-50 text-orange-800 border-orange-200",
    accentColor: "from-orange-50/30 to-white/80",
    borderColor: "border-orange-200/50",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    trackId: "05",
    badge: "3 Months Professional",
    title: "Full Stack Robotics Professional Program",
    subtitle: "Professional",
    duration: "3 Months",
    level: "Professional",
    hours: "~300 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: true,
    levelColor: "bg-purple-50 text-purple-800 border-purple-200",
    accentColor: "from-purple-50/30 to-white/80",
    borderColor: "border-purple-200/50",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    trackId: "06",
    badge: "6 Months Expert",
    title: "Expert Certification — Design · Build · Deploy",
    subtitle: "Expert",
    duration: "6 Months",
    level: "Expert",
    hours: "500+ hrs",
    fee: "Contact for pricing",
    output: "Certification + Product",
    isFree: false,
    isContact: true,
    levelColor: "bg-rose-50 text-rose-800 border-rose-200",
    accentColor: "from-rose-50/30 to-white/80",
    borderColor: "border-rose-200/50",
    badgeColor: "bg-rose-100 text-rose-800",
  },
] as const;

export function TrainingTracksSection() {
  return (
    <section className="section-shell mt-10 sm:mt-14">
      {/* Section Heading */}
      <div className="mb-10 sm:mb-14">
        <SectionHeading
          eyebrow="Training Programs"
          title="Professional Robotics Training Programs"
          description={
            <p>
              From complete beginner to industry expert — choose the track that fits your level.
            </p>
          }
        />
      </div>

      {/* Progression label */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark shadow-sm">
          <Zap className="h-3.5 w-3.5" />
          Free → Beginner → Expert Progression
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-brand/20 to-transparent" />
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {tracks.map((track) => (
          <article
            key={track.trackId}
            className={`group relative flex flex-col rounded-[2rem] border bg-white bg-gradient-to-br ${track.accentColor} ${track.borderColor} p-6 shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 transform-gpu`}
          >
            {/* Track ID + Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/90 text-xs font-bold text-brand-dark shadow-sm border border-white/80">
                  {track.trackId}
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${track.levelColor}`}>
                  {track.level}
                </span>
              </div>
              {track.isFree && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  <Star className="h-3 w-3" />
                  FREE
                </span>
              )}
            </div>

            {/* Duration badge */}
            <div className="mt-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${track.badgeColor}`}>
                {track.badge}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
              {track.title}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {track.subtitle}
            </p>

            {/* Divider */}
            <div className="my-4 h-px bg-white/60" />

            {/* Meta info */}
            <div className="flex flex-col gap-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 shrink-0 text-brand-dark" />
                <span>
                  <span className="font-medium text-foreground">{track.duration}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 shrink-0 text-brand-dark" />
                <span>
                  <span className="font-medium text-foreground">{track.hours}</span> total
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 shrink-0 text-brand-dark" />
                <span>
                  <span className="font-medium text-foreground">{track.fee}</span>
                </span>
              </div>
              {"output" in track && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 shrink-0 text-brand-dark" />
                  <span>
                    Output:{" "}
                    <span className="font-medium text-foreground">{track.output}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Enquire + CTA */}
            <div className="mt-auto pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/60">
              <Link
                href={`/enquiry?type=course&id=${track.trackId}&name=${encodeURIComponent(track.title)}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-brand-dark shadow-sm w-full sm:w-auto"
              >
                Enquire Now
              </Link>
              <Link
                href={`/courses/tracks/${track.trackId}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-4 py-2.5 text-xs font-semibold text-brand-dark transition-all hover:border-brand/50 hover:bg-brand-soft/60 hover:shadow-sm w-full sm:w-auto"
              >
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="mt-10 sm:mt-12 rounded-[1.75rem] border border-brand/15 bg-gradient-to-r from-brand-soft/60 to-white/70 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
            Not sure which track to pick?
          </p>
          <p className="mt-2 text-sm leading-6 text-muted max-w-xl">
            Reach out and our team will help you find the right program based on your college's current setup and goals.
          </p>
        </div>
        <Link
          href="/enquiry?type=course&id=general-recommendation&name=General+Recommendation"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
        >
          Get a Recommendation
        </Link>
      </div>
    </section>
  );
}
