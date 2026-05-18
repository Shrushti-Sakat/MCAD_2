import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, GraduationCap, IndianRupee, Layers, Mail, Star, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getTrackById, trainingTracks } from "@/lib/training-tracks";
import { EnrollmentClientButton } from "@/components/site/enrollment-client-button";

export function generateStaticParams() {
  return trainingTracks.map((t) => ({ id: t.trackId }));
}

const levelColors: Record<string, string> = {
  "Open / College": "bg-emerald-100 text-emerald-800",
  "Zero → Basics": "bg-brand-soft text-brand-dark",
  "Basics → Intermediate": "bg-brand-soft text-brand-dark",
  "Intermediate": "bg-amber-100 text-amber-800",
  "Advanced": "bg-orange-100 text-orange-800",
  "Professional": "bg-purple-100 text-purple-800",
  "Expert": "bg-rose-100 text-rose-800",
};

export default async function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const track = getTrackById(resolvedParams.id);
  if (!track) notFound();

  const levelColor = levelColors[track.level] ?? "bg-brand-soft text-brand-dark";

  return (
    <main className="section-shell py-10 sm:py-14">
      {/* Back */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand-dark transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to all courses
      </Link>

      {/* Hero card */}
      <div className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/92 to-brand-soft/30 p-6 sm:p-10 shadow-soft">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-white/80 shadow-sm text-sm font-bold text-brand-dark">
            {track.trackId}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${levelColor}`}>
            {track.level}
          </span>
          <span className="rounded-full border border-brand/15 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
            {track.badge}
          </span>
          {track.isFree && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
              <Star className="h-3 w-3" /> FREE
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-foreground">{track.title}</h1>
        <p className="mt-2 text-sm sm:text-base text-muted">{track.subtitle}</p>
        <p className="mt-4 text-base sm:text-lg leading-7 text-foreground font-medium">{track.tagline}</p>

        {/* Meta grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Clock3, label: "Duration", value: track.duration },
            { icon: Layers, label: "Total Hours", value: track.hours },
            { icon: GraduationCap, label: "Level", value: track.level },
            {
              icon: track.isFree ? Star : IndianRupee,
              label: "Fee",
              value: track.isFree ? "FREE" : track.isContact ? "Contact us" : track.fee,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-[1.25rem] border border-white/80 bg-white/80 p-4 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand-dark mb-2">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
              <p className={`mt-1 text-base font-bold ${track.isFree && label === "Fee" ? "text-emerald-600" : "text-foreground"}`}>{value}</p>
            </div>
          ))}
        </div>

        {track.output && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/60 px-4 py-2 text-sm font-semibold text-brand-dark">
            <GraduationCap className="h-4 w-4" />
            Output: {track.output}
          </div>
        )}
        {track.format && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            Format: {track.format}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.4fr]">
        {/* Left column */}
        <div className="space-y-6">
          {/* What You'll Learn */}
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand-dark" />
              What You Will Learn
            </h2>
            <ul className="space-y-3">
              {track.whatYouLearn.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-brand-soft flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-dark">✓</span>
                  </div>
                  <span className="text-sm leading-6 text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule / Sessions */}
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 sm:p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-5">
              {track.duration.includes("Month") ? "Month-by-Month Schedule" : "Day-by-Day Schedule"}
            </h2>
            <div className="space-y-5">
              {track.sessions.map((session, i) => (
                <div key={i} className="rounded-[1.25rem] border border-brand/10 bg-brand-soft/10 p-5">
                  <p className="font-semibold text-foreground mb-3">{session.title}</p>
                  <ul className="space-y-1.5">
                    {session.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Tools */}
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-soft">
            <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-brand-dark" />
              Tools Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {track.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-brand/15 bg-brand-soft/60 px-3 py-1 text-xs font-medium text-brand-dark">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Prerequisite */}
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-soft">
            <h2 className="text-base font-semibold text-foreground mb-2">Prerequisite</h2>
            <p className="text-sm leading-6 text-muted">{track.prerequisite}</p>
          </div>

          {/* Audience */}
          {track.audience && (
            <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-soft">
              <h2 className="text-base font-semibold text-foreground mb-3">Who Should Attend</h2>
              <ul className="space-y-2">
                {track.audience.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-[1.75rem] border border-brand/20 bg-gradient-to-br from-brand-soft/60 to-white/80 p-6 shadow-soft">
            <p className="text-sm font-semibold text-brand-dark mb-1">Next Step</p>
            <p className="text-sm text-muted mb-4">{track.nextStep}</p>
            <EnrollmentClientButton
              trackId={track.trackId}
              trackName={track.title}
              isFree={track.isFree}
              isContact={track.isContact}
            />
          </div>

          {/* Fee detail */}
          <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">Fee</p>
            <p className={`text-xl font-bold ${track.isFree ? "text-emerald-600" : "text-foreground"}`}>
              {track.fee}
            </p>
            {!track.isFree && !track.isContact && (
              <p className="mt-1 text-xs text-muted">Per candidate · {track.duration} program</p>
            )}
          </div>
        </div>
      </div>

      {/* Next track link */}
      {!track.trackId.startsWith("06") && (
        <div className="mt-8 flex justify-end">
          <Link
            href={`/courses/tracks/${String(Number(track.trackId) + 1).padStart(2, "0")}`}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:border-brand/40 hover:bg-brand-soft/40"
          >
            {track.nextStep}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </main>
  );
}
