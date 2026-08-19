"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { quickContactSchema } from "@/lib/validations";
import { toast } from "sonner";
import {
  Send,
  ArrowUpRight,
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    telegramOrEmail: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const validation = quickContactSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      toast.error("Please verify form fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success("Message sent! Ulugbek will contact you shortly.");
      } else {
        setIsSubmitting(false);
        toast.error(data.message || "Failed to send message. Please try again.");
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "Network error";
      toast.error(`Error sending message: ${msg}`);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-0 right-10 w-[600px] h-[400px] bg-brand-blue/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-purple/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="07"
          badge="Direct Inquiries"
          title={
            <>
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-purple">
                SOMETHING GREAT.
              </span>
            </>
          }
          subtitle="Have a project in mind, need technical advisory, or want to discuss a custom build? Send a note or reach out directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* Left Column: Direct Agency Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Telegram Direct Priority Card */}
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl bg-gradient-to-br from-surface-100/90 to-surface-200/90 border border-brand-blue/30 hover:border-brand-blue/70 transition-all duration-300 group shadow-[0_10px_30px_rgba(56,189,248,0.1)] block relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/15 blur-[50px] pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Fastest Response
                </span>
              </div>

              <h4 className="font-display text-xl font-bold text-white mb-1">
                Direct Telegram Channel
              </h4>
              <p className="text-zinc-400 text-xs font-light mb-4">
                Chat directly with founder & lead engineer {siteConfig.founder}.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-sm font-bold text-brand-blue">
                <span>{siteConfig.telegramUsername}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-surface-100/50 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-200 text-zinc-300 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Email Inquiries</div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white text-sm font-semibold hover:text-brand-blue transition-colors font-mono"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Availability */}
            <div className="p-6 rounded-2xl bg-surface-100/50 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-200 text-zinc-300 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">HQ & Operations</div>
                  <div className="text-white text-sm font-medium">{siteConfig.contact.location}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Quick Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-glass border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  Send a Direct Note
                </h3>
                <p className="text-zinc-400 text-xs font-light">
                  We reply within 1–3 business hours.
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-brand-purple" />
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display text-2xl font-bold text-white mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-zinc-400 text-xs max-w-sm mb-6 font-light">
                  Your inquiry has been relayed to our Telegram bot. We will get back to you promptly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ fullName: "", telegramOrEmail: "", phone: "", message: "" });
                  }}
                  className="text-xs font-mono text-brand-blue hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      placeholder="Ulugbek"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-surface-200/90 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors",
                        formErrors.fullName ? "border-red-500/60" : "border-white/10"
                      )}
                    />
                    {formErrors.fullName && (
                      <p className="text-red-400 text-xs font-mono mt-1">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Telegram or Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.telegramOrEmail}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, telegramOrEmail: e.target.value }))
                      }
                      placeholder="@username or you@email.com"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-surface-200/90 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors",
                        formErrors.telegramOrEmail ? "border-red-500/60" : "border-white/10"
                      )}
                    />
                    {formErrors.telegramOrEmail && (
                      <p className="text-red-400 text-xs font-mono mt-1">
                        {formErrors.telegramOrEmail}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="+998 90 000 00 00"
                    className="w-full px-4 py-3 rounded-xl bg-surface-200/90 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Briefly describe your project or inquiry..."
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-surface-200/90 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors resize-y",
                      formErrors.message ? "border-red-500/60" : "border-white/10"
                    )}
                  />
                  {formErrors.message && (
                    <p className="text-red-400 text-xs font-mono mt-1">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-3 flex items-center justify-end">
                  <Button
                    type="submit"
                    size="md"
                    variant="primary"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
