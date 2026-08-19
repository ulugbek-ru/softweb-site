"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import {
  Send,
  MessageSquare,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { contactFormSchema } from "@/lib/validations";
import { toast } from "sonner";
import { Dictionary } from "@/lib/i18n";

interface ContactSectionProps {
  dict: Dictionary;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ dict }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
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
        setIsSuccess(true);
        setFormData({ name: "", contact: "", phone: "", message: "" });
        toast.success(dict.contact.successMsg);
      } else {
        setIsSubmitting(false);
        toast.error(data.message || "Error submitting contact form.");
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "Network failure";
      toast.error(`Error: ${msg}`);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-green/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="07"
          badge={dict.contact.badge}
          title={
            <>
              {dict.contact.title} <br />
              <span className="text-brand-green">
                {dict.contact.titleAccent}
              </span>
            </>
          }
          subtitle={dict.contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* Left Column: Direct Agency Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Telegram Channel Card */}
            <motion.a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-3xl dark:bg-surface-dark-100/90 bg-white border dark:border-white/10 border-slate-200 shadow-sm hover:border-brand-green transition-all group flex items-start justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-brand-green flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-bold dark:text-white text-slate-900 text-lg">
                      {dict.contact.tgCardTitle}
                    </h3>
                    <span className="text-[10px] font-mono uppercase bg-orange-500/10 text-brand-orange px-2 py-0.5 rounded font-bold">
                      {dict.contact.fastestTag}
                    </span>
                  </div>
                  <p className="dark:text-zinc-400 text-slate-600 text-xs mt-1 font-normal">
                    {dict.contact.tgCardSub}
                  </p>
                  <div className="text-xs font-mono text-brand-green mt-3 font-bold">
                    {siteConfig.telegramUsername}
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full dark:bg-white/5 bg-slate-100 flex items-center justify-center dark:text-zinc-400 text-slate-600 group-hover:text-white group-hover:bg-brand-green transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-3xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/10 border-slate-200 shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-brand-orange flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans font-bold dark:text-white text-slate-900 text-lg">
                  {dict.contact.emailTitle}
                </h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-xs font-mono dark:text-zinc-300 text-slate-700 hover:text-brand-green transition-colors mt-1 block font-bold"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </motion.div>

            {/* HQ Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-3xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/10 border-slate-200 shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-brand-green flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans font-bold dark:text-white text-slate-900 text-lg">
                  {dict.contact.locationTitle}
                </h3>
                <p className="text-xs font-mono dark:text-zinc-400 text-slate-600 mt-1 font-bold">
                  {siteConfig.contact.location}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl dark:bg-surface-dark-100/90 bg-white border dark:border-white/10 border-slate-200 shadow-xl relative overflow-hidden"
          >
            <div className="mb-6">
              <h3 className="font-sans text-2xl font-bold dark:text-white text-slate-900 mb-1">
                {dict.contact.formTitle}
              </h3>
              <p className="dark:text-zinc-400 text-slate-500 text-xs font-mono">
                {dict.contact.formSub}
              </p>
            </div>

            {isSuccess ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-brand-green flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-sans text-xl font-bold dark:text-white text-slate-900 mb-2">
                  {dict.contact.successMsg}
                </h4>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4"
                >
                  Send another note
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                      {dict.contact.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Jasur"
                      className="w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border dark:border-white/10 border-slate-300 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs font-mono mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                      {dict.contact.contactLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, contact: e.target.value }))
                      }
                      placeholder="@username or mail@domain.com"
                      className="w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border dark:border-white/10 border-slate-300 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors"
                    />
                    {formErrors.contact && (
                      <p className="text-red-500 text-xs font-mono mt-1">{formErrors.contact}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                    {dict.contact.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="+998 90 987 65 43"
                    className="w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border dark:border-white/10 border-slate-300 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                    {dict.contact.msgLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Your inquiry details..."
                    className="w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border dark:border-white/10 border-slate-300 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors resize-y"
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-xs font-mono mt-1">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    {dict.contact.sendBtn}
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
