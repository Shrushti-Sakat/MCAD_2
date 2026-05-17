"use client";

import { CheckCircle2, Puzzle, X, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

import { solutionTiers } from "@/components/site/constants";

type TierType = typeof solutionTiers[number];

export function TierPackagesSection() {
  const [selectedTier, setSelectedTier] = useState<TierType | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedTier) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedTier]);

  return (
    <section className="section-shell mt-16 sm:mt-24">
      <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,248,239,0.88))] p-6 sm:p-8 lg:p-10 shadow-soft">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-dark">
                <Puzzle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
                  Included Tier Flow
                </p>
                <p className="mt-1 text-sm leading-7 text-muted">
                  Each tier can be presented as a ready-made campus package on the
                  homepage or sales section.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {solutionTiers.map((tier) => (
                <button
                  key={`${tier.name}-summary`}
                  onClick={() => setSelectedTier(tier)}
                  className="w-full flex items-start gap-3 rounded-[1.25rem] border border-brand/10 px-4 py-4 transition-all hover:border-brand/30 hover:bg-brand-soft/10 cursor-pointer"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-dark" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      {tier.name}: {tier.title}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted">
                      {tier.items.length > 0
                        ? tier.items.join(" | ")
                        : "Advanced real-hardware + AI offering."}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#f0c419]/25 bg-[#231815] overflow-hidden shadow-[0_28px_60px_rgba(36,24,8,0.24)]">
            <div className="rounded-[1.75rem] overflow-hidden w-full h-full">
              <img
                src="/robot-ai.png"
                alt="Robot AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tier Details Modal */}
      {selectedTier && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setSelectedTier(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-[1.75rem] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden my-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button - Fixed at Top */}
            <div className="flex-shrink-0 bg-gradient-to-r from-brand-soft to-brand/10 px-8 pt-6 pb-6 flex items-start justify-between gap-6">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark">
                  {selectedTier.name}
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-2">{selectedTier.title}</h2>
              </div>
              <button
                onClick={() => setSelectedTier(null)}
                className="mt-1 flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-brand-dark hover:bg-brand-dark/90 text-white transition-colors shadow-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
              {/* Description */}
              <div>
                <p className="text-lg leading-relaxed text-foreground">
                  {selectedTier.description}
                </p>
              </div>

              {/* Details */}
              {'details' in selectedTier && selectedTier.details && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Details</h3>
                  <p className="text-muted leading-relaxed">
                    {selectedTier.details}
                  </p>
                </div>
              )}

              {/* Learning Outcomes */}
              {'learningOutcomes' in selectedTier && selectedTier.learningOutcomes && selectedTier.learningOutcomes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Learning Outcomes</h3>
                  <ul className="space-y-3">
                    {selectedTier.learningOutcomes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                        <span className="text-muted leading-7">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Use Cases */}
              {'useCases' in selectedTier && selectedTier.useCases && selectedTier.useCases.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Use Cases</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTier.useCases.map((useCase, index) => (
                      <span key={index} className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand-dark border border-brand/20">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Items */}
              {selectedTier.items.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-foreground mb-4">What's Included</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTier.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                        <span className="text-muted leading-7">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer with Close Button - Fixed at Bottom */}
            <div className="flex-shrink-0 bg-gray-50 px-8 py-5 flex justify-end">
              <button
                onClick={() => setSelectedTier(null)}
                className="rounded-full bg-brand-dark px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
