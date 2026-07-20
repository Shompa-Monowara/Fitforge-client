"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Dumbbell,
  Flame,
  HeartPulse,
  Sparkles,
  Star,
  LucideIcon,
} from "lucide-react";

// Goal 
interface Goal {
  key: "weight_loss" | "muscle_gain" | "endurance";
  label: string;
  icon: LucideIcon;
  blurb: string;
}

// Slide 
interface Slide {
  image: string;
  quote: string;
  name: string;
}

const goals: Goal[] = [
  {
    key: "weight_loss",
    label: "Lose Weight",
    icon: Flame,
    blurb: "Fat-loss plans that adapt weekly",
  },
  {
    key: "muscle_gain",
    label: "Build Muscle",
    icon: Dumbbell,
    blurb: "Progressive strength programming",
  },
  {
    key: "endurance",
    label: "Stay Fit",
    icon: HeartPulse,
    blurb: "Balanced training for everyday life",
  },
];

const slides: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
    quote: "Lost 18kg in 8 months without giving up rice.",
    name: "Rasel Karim",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
    quote: "The AI actually adjusted my plan when I said it felt too easy.",
    name: "Farhana Akter",
  },
  {
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80",
    quote: "First coach that remembers what I logged last week.",
    name: "Tanvir Hossain",
  },
];

const Hero: React.FC = () => {

  const [activeGoal, setActiveGoal] = useState<Goal["key"]>("weight_loss");
  const [slideIndex, setSlideIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[62vh] md:min-h-[68vh] max-h-[850px] overflow-hidden bg-[#0F172A] ">
      {/* Ambient animated glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#22C55E]/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 w-[380px] h-[380px] rounded-full bg-[#F59E0B]/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 h-full flex items-center py-16 md:py-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center w-full">
          {/* Left: copy + interactive goal selector */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-xs font-medium text-slate-300">
                Your plan adapts every week — not a static PDF
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] tracking-tight">
              A fitness coach that{" "}
              <span className="block text-[#22C55E]">actually remembers</span>{" "}
              your last workout.
            </h1>

            <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-lg leading-relaxed">
              Tell FitForge AI your goal. It builds a workout and meal plan,
              then adjusts it every week based on what you log — no
              spreadsheets, no guessing.
            </p>

            {/* Interactive goal selector */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                Pick your goal to start
              </p>
              <div className="flex flex-wrap gap-3">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  const active = activeGoal === goal.key;
                  return (
                    <motion.button
                      key={goal.key}
                      onClick={() => setActiveGoal(goal.key)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${active
                          ? "bg-[#22C55E] border-[#22C55E] text-[#0F172A]"
                          : "bg-white/5 border-white/10 text-slate-300 hover:border-white/25"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      {goal.label}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={activeGoal}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 text-sm text-slate-500"
                >
                  {goals.find((g) => g.key === activeGoal)?.blurb}
                </motion.p>
              </AnimatePresence>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link href={`/plans?goal=${activeGoal}`}>
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#22C55E] text-[#0F172A] font-semibold text-sm shadow-[0_0_0_0_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_0_rgba(34,197,94,0.35)] transition-shadow cursor-pointer"
                  >
                    Get My AI Plan
                  </motion.span>
                </Link>
                <Link
                  href="/chat"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
                >
                  Talk to the AI coach first →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: interactive testimonial/image slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slideIndex}
                  src={slides[slideIndex].image}
                  alt={slides[slideIndex].name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/10 to-transparent" />

              {/* Floating quote card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0F172A]/70 backdrop-blur-md border border-white/10"
                >
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>

                  <p className="text-sm text-white leading-snug">
                    {`"${slides[slideIndex].quote}"`}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-400">
                    — {slides[slideIndex].name}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider dots */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="p-1 cursor-pointer"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${i === slideIndex
                        ? "w-6 bg-[#22C55E]"
                        : "w-1.5 bg-white/20"
                      }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-500"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[11px] uppercase tracking-widest">Explore</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-[50px] sm:h-[70px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;