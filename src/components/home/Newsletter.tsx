"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Send } from "lucide-react";
// react-toastify ইম্পোর্ট করা হলো
import { toast } from "react-toastify";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

     
      toast.success("Successfully subscribed to the newsletter!");
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscribe error:", err);
     
      toast.error("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full bg-white py-20 sm:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-[#0F172A] px-6 sm:px-14 py-14 sm:py-16 overflow-hidden"
        >
          {/* Ambient glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#22C55E]/15 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/15 flex items-center justify-center mb-6">
              <Mail className="w-5 h-5 text-[#22C55E]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight max-w-md">
              Weekly training tips, straight to your inbox
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-sm">
              No spam. One short email a week — new articles, plan updates,
              and coaching notes from our team.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 w-full max-w-md flex flex-col sm:flex-row items-stretch gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={status === "loading" || status === "success"}
                  className="w-full h-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#22C55E] transition-colors disabled:opacity-60"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#22C55E] text-[#0F172A] font-semibold text-sm disabled:opacity-70 disabled:cursor-not-allowed shrink-0 transition-opacity"
              >
                {status === "loading" && (
                  <>
                    <span className="w-4 h-4 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
                    Subscribing
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Subscribed
                  </>
                )}
                {(status === "idle" || status === "error") && (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-5 text-xs text-slate-500">
              Join 2,400+ members already reading. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;