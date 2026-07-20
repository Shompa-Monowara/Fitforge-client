"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Testimonial অবজেক্টের টাইপ ইন্টারফেস
interface TestimonialItem {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Rasel Karim",
    role: "Lost 18kg in 8 months",
    avatar: "https://i.pravatar.cc/150?img=51",
    quote:
      "The AI didn't force me to give up rice. It just adjusted my portions and workouts around what I actually eat. That's the only reason I stuck with it.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    role: "Couch to 10K in 6 months",
    avatar: "https://i.pravatar.cc/150?img=47",
    quote:
      "I told the chat coach a session felt too easy, and my next week's plan actually changed. No other app I've tried does that.",
    rating: 5,
  },
  {
    name: "Tanvir Hossain",
    role: "Rebuilt consistency after a break",
    avatar: "https://i.pravatar.cc/150?img=45",
    quote:
      "Coming back after a year off was intimidating. The plan started light and scaled up on its own as I logged more sessions.",
    rating: 4,
  },
];

// Variants টাইপ এক্সপ্লিসিটলি ডিফাইন করা হলো
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Testimonials: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#B45309] text-xs font-semibold tracking-wide uppercase mb-4">
            Member Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            People who kept showing up
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Not polished before-and-afters — just people whose plans actually
            changed as they did.
          </p>
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#22C55E]/40 transition-colors shadow-sm hover:shadow-md flex flex-col"
            >
              <Quote className="w-7 h-7 text-[#22C55E]/25 mb-3" />

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < t.rating
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>

           
              <p className="text-sm text-slate-700 leading-relaxed flex-1">
                {`"${t.quote}"`}
              </p>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-200">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;