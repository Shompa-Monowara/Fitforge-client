"use client";

import React, { useState } from "react";
import { submitContactForm, ContactPayload } from "@/lib/api/contact";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiSend, FiLoader } from "react-icons/fi";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactPage() {
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClassName =
    "bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all h-12 px-4 rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] text-[15px] w-full";

  const labelClassName = "text-[10px] font-black text-[#22C55E] tracking-widest uppercase";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    const res = await submitContactForm(form);
    setIsSubmitting(false);

    if (!res.success) {
      toast.error(res.message || "Failed to send message.");
      return;
    }

    toast.success(res.message || "Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Get In Touch
        </h1>
        <p className="text-[#94A3B8] text-sm mt-2 max-w-md mx-auto">
          Questions about a plan, feedback, or partnership ideas — we&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
        {/* LEFT — Contact Info */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <FiMail className="text-[#22C55E] text-lg" />
            </div>
            <div>
              <p className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-bold text-[#0F172A]">support@fitforge.app</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <FiPhone className="text-[#22C55E] text-lg" />
            </div>
            <div>
              <p className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-1">Phone</p>
              <p className="text-sm font-bold text-[#0F172A]">+880 1XXX-XXXXXX</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <FiMapPin className="text-[#22C55E] text-lg" />
            </div>
            <div>
              <p className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-1">Location</p>
              <p className="text-sm font-bold text-[#0F172A]">Rajshahi, Bangladesh</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <p className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-white transition-colors"
              >
                <FaFacebook className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-white transition-colors"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-white transition-colors"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className={labelClassName}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className={inputClassName}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClassName}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                rows={6}
                className="bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all p-4 rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] text-[15px] w-full resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#22C55E] font-bold text-white h-12 rounded-xl shadow-md shadow-[#22C55E]/20 hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin text-base" /> Sending...
                </>
              ) : (
                <>
                  <FiSend className="text-base" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}