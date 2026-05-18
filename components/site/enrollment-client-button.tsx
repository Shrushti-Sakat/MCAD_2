"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { EnrollmentModal } from "./enrollment-modal";

type EnrollmentClientButtonProps = {
  trackId: string;
  trackName: string;
  isFree?: boolean;
  isContact?: boolean;
  buttonText?: string;
  className?: string;
};

export function EnrollmentClientButton({ trackId, trackName, isFree, isContact, buttonText, className }: EnrollmentClientButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={className || "inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"}
      >
        <Mail className="h-4 w-4" />
        {buttonText ? buttonText : isFree ? "Register for Free" : isContact ? "Enquire Now" : "Enroll Now"}
      </button>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trackId={trackId}
        trackName={trackName}
      />
    </>
  );
}
