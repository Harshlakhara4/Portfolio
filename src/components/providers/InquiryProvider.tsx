"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import dynamic from "next/dynamic";

// The modal (and the form inside it) are only loaded when first opened,
// keeping them out of the initial JS payload.
const InquiryModal = dynamic(
  () => import("@/components/contact/InquiryModal").then((m) => m.InquiryModal),
  { ssr: false },
);

export interface InquiryPrefill {
  /** Service id from data/services.ts */
  service?: string;
  /** Package id from data/pricing.ts */
  pkg?: string;
  /** Project title for context */
  project?: string;
  /** Optional heading override */
  title?: string;
}

interface InquiryContextValue {
  open: (prefill?: InquiryPrefill) => void;
  close: () => void;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<InquiryPrefill>({});

  const open = useCallback((next?: InquiryPrefill) => {
    setPrefill(next ?? {});
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <InquiryContext.Provider value={value}>
      {children}
      {isOpen && (
        <InquiryModal prefill={prefill} onClose={close} />
      )}
    </InquiryContext.Provider>
  );
}

export function useInquiry(): InquiryContextValue {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return ctx;
}
