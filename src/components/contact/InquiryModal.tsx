"use client";

import { ContactForm } from "./ContactForm";
import { Modal } from "@/components/ui/Modal";
import { services } from "@/data/services";
import { pricingPackages } from "@/data/pricing";
import type { InquiryPrefill } from "@/components/providers/InquiryProvider";

interface InquiryModalProps {
  prefill: InquiryPrefill;
  onClose: () => void;
}

export function InquiryModal({ prefill, onClose }: InquiryModalProps) {
  const heading =
    prefill.title ||
    (prefill.pkg
      ? `Start: ${pricingPackages.find((p) => p.id === prefill.pkg)?.name ?? "Project"}`
      : prefill.service
        ? `Discuss: ${services.find((s) => s.id === prefill.service)?.title ?? "Service"}`
        : prefill.project
          ? `Inquire about ${prefill.project}`
          : "Start a Project");

  return (
    <Modal onClose={onClose} label={heading} size="md">
      <div className="relative p-5 sm:p-8">
        <div
          className="ambient -top-16 right-0 h-40 w-40 bg-violet/30"
          aria-hidden
        />
        <div className="relative mb-6 max-w-[85%]">
          <p className="mono-label text-violet-soft">Project inquiry</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-cloud sm:text-2xl">
            {heading}
          </h2>
        </div>
        <div className="relative">
          <ContactForm prefill={prefill} compact onSuccess={() => {}} />
        </div>
      </div>
    </Modal>
  );
}
