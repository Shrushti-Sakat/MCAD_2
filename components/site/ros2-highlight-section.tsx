import {
  Sparkles,
  BookOpen,
  Zap,
  GraduationCap,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

const highlights = [
  {
    title: "Why This Matters",
    description:
      "Students no longer just read textbooks about robotics. They design algorithms in simulation, test autonomous behaviors, and then command real hardware. This progression creates genuine expertise and professional confidence that employers actively seek.",
    icon: BookOpen,
  },
  {
    title: "For Your Institution",
    description:
      "Zero-risk training environment through digital twins reduces hardware damage costs. Complete curriculum from Python basics to advanced autonomous systems. Industry partnerships and career pathways create measurable ROI. Your lab becomes a competitive advantage for attracting and retaining top talent.",
    icon: Zap,
  },
  {
    title: "Digital Twin Native Architecture",
    description:
      "Built on Digital Twin Humble and Jazzy—the industry standard for production robotics. Your students graduate with skills immediately applicable in robotics companies, autonomous vehicle startups, and research labs. Not learning outdated frameworks. Real, current technology.",
    icon: GraduationCap,
  },
] as const;

export function DigitalTwinHighlightSection() {
  return (
    <section className="section-shell mt-16 sm:mt-24 mb-8 sm:mb-12">
      <div className="space-y-8 sm:space-y-12">
        {/* Main Heading Section */}
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-6 sm:p-8 md:p-12 shadow-soft">
          <div className="space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-brand mb-2 sm:mb-3">
                Our Approach
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Step Into A Serious Robotics Ecosystem
              </h2>
            </div>
            
            <p className="text-base sm:text-lg leading-8 sm:leading-9 text-muted/90">
              M CAD Solutions combines real robot hardware with digital twin simulation to create a professional-grade learning environment. This foundation delivers stronger student excitement, deeper institutional confidence, and a crystal-clear reason to purchase robots or launch Digital Twin training programs.
            </p>
          </div>
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 sm:p-7 shadow-soft hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-soft text-brand-dark">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    {highlight.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-6 sm:leading-7 text-muted/85">
                    {highlight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="rounded-[2rem] border border-brand/20 bg-gradient-to-br from-brand-soft/50 via-white/50 to-white p-6 sm:p-8 md:p-10 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                Ready To Transform Your Robotics Lab?
              </h3>
              <p className="text-sm sm:text-base text-muted/85">
                Join leading institutions using MCAD Solutions for professional-grade robotics education.
              </p>
            </div>
            <button className="whitespace-nowrap rounded-full bg-brand text-white px-6 sm:px-8 py-3 font-semibold text-sm sm:text-base transition hover:bg-brand-dark min-h-[44px] flex items-center gap-2 touch-manipulation">
              Explore Tracks
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
