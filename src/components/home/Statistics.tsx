"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, Dumbbell, MessageCircleHeart, TrendingUp, LucideIcon } from "lucide-react";


interface CountUpNumberProps {
  value: number;
  suffix?: string;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ value, suffix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};


interface StatsData {
  totalUsers: number;
  totalPlans: number;
  totalChats: number;
  avgRating: number;
}


interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

const Statistics: React.FC = () => {
 
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/stats`);
        const data = await res.json();
        setStats(data.stats);
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const items: StatItem[] = [
    {
      icon: Users,
      value: stats?.totalUsers ?? 0,
      suffix: "+",
      label: "Active members",
    },
    {
      icon: Dumbbell,
      value: stats?.totalPlans ?? 0,
      suffix: "+",
      label: "Plans published",
    },
    {
      icon: MessageCircleHeart,
      value: stats?.totalChats ?? 0,
      suffix: "+",
      label: "AI coach conversations",
    },
    {
      icon: TrendingUp,
      value: stats?.avgRating ?? 0,
      suffix: "/5",
      label: "Average plan rating",
    },
  ];

  return (
    <section className="relative w-full bg-[#0F172A] py-20 sm:py-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#22C55E]/10 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#22C55E] text-xs font-semibold tracking-wide uppercase mb-4">
            By The Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Real people, real consistency
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-11 h-11 rounded-xl bg-[#22C55E]/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#22C55E]" />
                </div>

                <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                  {loading ? (
                    <span className="inline-block w-16 h-9 bg-white/10 rounded animate-pulse" />
                  ) : (
                    <CountUpNumber value={item.value} suffix={item.suffix} />
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;