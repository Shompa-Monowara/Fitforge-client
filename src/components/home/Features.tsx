"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Brain,
  MessageCircleHeart,
  LineChart,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  LucideIcon,
} from "lucide-react";

// Feature অবজেক্টের টাইপ ইন্টারফেস
interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: "Core AI" | "Insights" | "Personalization";
}

const features: FeatureItem[] = [
  {
    icon: Brain,
    title: "AI Recommendation Engine",
    description:
      "Get a workout and meal plan built specifically for your goal, equipment, and dietary needs — generated in seconds, not templated.",
    tag: "Core AI",
  },
  {
    icon: MessageCircleHeart,
    title: "AI Chat Coach",
    description:
      "Ask anything, mid-workout or at midnight. Your coach remembers your last conversation and knows what you've logged.",
    tag: "Core AI",
  },
  {
    icon: RefreshCcw,
    title: "Adaptive Plans",
    description:
      "Tell it a session felt too easy or you missed a day — the AI adjusts next week's plan automatically, no manual editing.",
    tag: "Core AI",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Visual charts of weight, workouts completed, and streaks, so you can actually see the trend instead of guessing.",
    tag: "Insights",
  },
  {
    icon: Sparkles,
    title: "AI Content Library",
    description:
      "Every plan comes with AI-generated guidance — form cues, meal notes, and explanations written for your exact plan.",
    tag: "Insights",
  },
  {
    icon: ShieldCheck,
    title: "Built Around Your Life",
    description:
      "Dietary restrictions, limited equipment, busy weeks — the plan works around your constraints, not the other way around.",
    tag: "Personalization",
  },
];


const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
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

const Features: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F8FAFC] pt-4 pb-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#16833E] text-xs font-semibold tracking-wide uppercase mb-4">
            Why FitForge
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Coaching that keeps up with you
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Most fitness apps hand you a plan once and forget you exist.
            FitForge pays attention to what you actually do, and changes
            course with you.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#22C55E]/40 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#0F172A] flex items-center justify-center group-hover:bg-[#22C55E] transition-colors">
                    <Icon className="w-5 h-5 text-white group-hover:text-[#0F172A]" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;