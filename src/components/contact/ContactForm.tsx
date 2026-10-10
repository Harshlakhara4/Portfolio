"use client";

import { useId, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/data/services";
import { pricingPackages } from "@/data/pricing";
import { buildWhatsAppLink, profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { InquiryPrefill } from "@/components/providers/InquiryProvider";

const budgetOptions = [
  "Under ₹10,000",
  "₹10,000–₹25,000",
  "₹25,000–₹50,000",
  "₹50,000+",
  "Not sure yet",
];

const contactMethods = ["Email", "WhatsApp", "Either"] as const;

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  preferredContact: (typeof contactMethods)[number];
}

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "success";

function initialState(prefill?: InquiryPrefill): FormState {
  const pkg = prefill?.pkg
    ? pricingPackages.find((p) => p.id === prefill.pkg)
    : undefined;
  const svc = prefill?.service
    ? services.find((s) => s.id === prefill.service)
    : undefined;
  const message = pkg
    ? `Hi Harsh, I'm interested in the ${pkg.name} package. Here's a bit about my project:\n\n`
    : svc
      ? `Hi Harsh, I'd like to discuss ${svc.title} for my business.\n\n`
      : prefill?.project
        ? `Hi Harsh, I'd like to discuss a project similar to ${prefill.project}.\n\n`
        : "";
  return {
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    service: prefill?.service ?? "",
    budget: "",
    message,
    preferredContact: "WhatsApp",
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormProps {
  prefill?: InquiryPrefill;
  /** Compact layout for the modal */
  compact?: boolean;
  onSuccess?: () => void;
}

export function ContactForm({ prefill, compact, onSuccess }: ContactFormProps) {
  const uid = useId();
  const [form, setForm] = useState<FormState>(() => initialState(prefill));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Everything goes straight to WhatsApp — no server, no storage.
  const whatsappLink = useMemo(() => {
    const serviceLabel =
      services.find((s) => s.id === form.service)?.title ?? form.service;
    const lines = [
      `Hi ${profile.name.split(" ")[0]}, I visited your portfolio and would like to discuss a project.`,
      form.name && `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.whatsapp && `WhatsApp: ${form.whatsapp}`,
      form.company && `Company: ${form.company}`,
      serviceLabel && `Service: ${serviceLabel}`,
      form.budget && `Budget: ${form.budget}`,
      `Preferred contact: ${form.preferredContact}`,
      form.message && `Details: ${form.message}`,
    ].filter(Boolean);
    return buildWhatsAppLink(lines.join("\n"));
  }, [form]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.service) next.service = "Please select a service.";
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = "Please describe your project (at least 10 characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Open WhatsApp with the inquiry prefilled. User gesture -> allowed.
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setStatus("success");
    onSuccess?.();
  }

  // --- Success state ---
  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-400" aria-hidden />
        <div>
          <h3 className="font-display text-xl font-semibold text-cloud">
            Opening WhatsApp…
          </h3>
          <p className="mt-2 text-sm text-cloud-muted">
            Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Your inquiry
            is ready in WhatsApp — just hit send. If it didn&apos;t open, use the
            button below.
          </p>
        </div>
        <Button as="a" href={whatsappLink} variant="whatsapp" target="_blank" rel="noopener noreferrer">
          <WhatsAppGlyph className="h-4 w-4" />
          Open WhatsApp
        </Button>
      </div>
    );
  }

  // 16px on mobile prevents iOS Safari from zooming when a field is focused.
  const fieldBase =
    "w-full rounded-xl border bg-ink-800/60 px-4 py-3 text-base sm:text-sm text-cloud placeholder:text-cloud-dim transition-colors focus:border-violet/60 focus:outline-none focus:ring-2 focus:ring-violet/30";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        {/* Name */}
        <Field
          id={`${uid}-name`}
          label="Name"
          required
          error={errors.name}
        >
          <input
            id={`${uid}-name`}
            className={cn(fieldBase, errors.name ? "border-red-400/60" : "border-white/10")}
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>

        {/* Email */}
        <Field id={`${uid}-email`} label="Email" required error={errors.email}>
          <input
            id={`${uid}-email`}
            type="email"
            className={cn(fieldBase, errors.email ? "border-red-400/60" : "border-white/10")}
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </Field>

        {/* WhatsApp (optional) */}
        <Field id={`${uid}-whatsapp`} label="WhatsApp" optional>
          <input
            id={`${uid}-whatsapp`}
            type="tel"
            className={cn(fieldBase, "border-white/10")}
            value={form.whatsapp}
            onChange={(e) => setField("whatsapp", e.target.value)}
            placeholder="Optional"
            autoComplete="tel"
          />
        </Field>

        {/* Company (optional) */}
        <Field id={`${uid}-company`} label="Business / Company" optional>
          <input
            id={`${uid}-company`}
            className={cn(fieldBase, "border-white/10")}
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            placeholder="Optional"
            autoComplete="organization"
          />
        </Field>

        {/* Service */}
        <Field id={`${uid}-service`} label="Service required" required error={errors.service}>
          <select
            id={`${uid}-service`}
            className={cn(fieldBase, errors.service ? "border-red-400/60" : "border-white/10")}
            value={form.service}
            onChange={(e) => setField("service", e.target.value)}
            aria-invalid={!!errors.service}
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </Field>

        {/* Budget */}
        <Field id={`${uid}-budget`} label="Estimated budget" optional>
          <select
            id={`${uid}-budget`}
            className={cn(fieldBase, "border-white/10")}
            value={form.budget}
            onChange={(e) => setField("budget", e.target.value)}
          >
            <option value="">Select a range…</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field id={`${uid}-message`} label="Project description" required error={errors.message}>
        <textarea
          id={`${uid}-message`}
          rows={compact ? 3 : 4}
          className={cn(fieldBase, "resize-none", errors.message ? "border-red-400/60" : "border-white/10")}
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder="Tell me what you're building, the problem you're solving, and any key requirements."
          aria-invalid={!!errors.message}
        />
      </Field>

      {/* Preferred contact */}
      <fieldset>
        <legend className="mb-2 block text-xs font-medium uppercase tracking-wider text-cloud-muted">
          Preferred contact method
        </legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((m) => (
            <label
              key={m}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                form.preferredContact === m
                  ? "border-violet/60 bg-violet/15 text-cloud"
                  : "border-white/10 text-cloud-muted hover:border-white/25",
              )}
            >
              <input
                type="radio"
                name={`${uid}-preferred`}
                value={m}
                checked={form.preferredContact === m}
                onChange={() => setField("preferredContact", m)}
                className="sr-only"
              />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" variant="whatsapp" size="lg">
          <WhatsAppGlyph className="h-4 w-4" />
          Send on WhatsApp
        </Button>
        <p className="text-xs text-cloud-dim">
          Opens WhatsApp with your details prefilled — nothing is stored.
        </p>
      </div>
    </form>
  );
}

/** Minimal inline WhatsApp glyph (no extra icon dependency). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, required, optional, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-cloud-muted"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-violet-soft">*</span>}
        </span>
        {optional && <span className="text-[0.65rem] text-cloud-dim">optional</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
