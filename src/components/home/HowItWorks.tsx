"use client";

import { motion } from "framer-motion";
import { Target, Brain, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Set Your Goal",
    description:
      "Tell us your goal, current stats, equipment, and any dietary restrictions. Takes under two minutes.",
  },
  {
    icon: Brain,
    title: "AI Builds Your Plan",
    description:
      "The AI generates a personalized workout and meal plan on the spot — reasoned from your inputs, not a template.",
  },
  {
    icon: TrendingUp,
    title: "Log & Adapt Weekly",
    description:
      "Log your workouts and how they felt. The AI reads your history and adjusts next week's plan automatically.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative w-full bg-white pt-20 sm:pt-24 pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#B45309] text-xs font-semibold tracking-wide uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Three steps. Zero guesswork.
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            No onboarding maze, no generic PDF at the end. Just a plan that's
            actually yours, and stays that way.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid sm:grid-cols-3 gap-10 sm:gap-6">
          {/* Connecting line (desktop only) */}
          <div className="hidden sm:block absolute top-8 left-[16.6%] right-[16.6%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full bg-gradient-to-r from-[#22C55E]/40 via-[#22C55E]/60 to-[#F59E0B]/40"
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number badge */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0F172A] flex items-center justify-center mb-6 shadow-md">
                  <Icon className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#22C55E] text-[#0F172A] text-xs font-bold flex items-center justify-center border-2 border-white">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Mobile arrow between steps */}
                {index < steps.length - 1 && (
                  <ArrowRight className="sm:hidden w-5 h-5 text-slate-300 mt-6 rotate-90" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;