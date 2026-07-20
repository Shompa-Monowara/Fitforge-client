import Link from "next/link";
import React from "react";
import { Plan } from "@/lib/api/plans";
import { FiClock, FiTrendingUp, FiStar } from "react-icons/fi";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80";

export default function PlanCard({ plan }: { plan: Plan }) {
  const image = plan.images?.[0] || DEFAULT_IMAGE;

  return (
    <div className="flex flex-col h-full bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#0F172A]/5 transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-full h-44 overflow-hidden bg-[#F0FDF4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={plan.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0F172A] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
          {plan.goal}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-[#0F172A] line-clamp-1 mb-1.5">
          {plan.title}
        </h3>
        <p className="text-sm text-[#64748B] line-clamp-2 mb-4 flex-1">
          {plan.shortDescription}
        </p>

        <div className="flex items-center gap-3 text-[11px] text-[#94A3B8] font-semibold mb-4">
          <span className="flex items-center gap-1">
            <FiClock className="text-[#22C55E]" /> {plan.durationWeeks}w
          </span>
          <span className="flex items-center gap-1">
            <FiTrendingUp className="text-[#F59E0B]" /> {plan.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <FiStar className="text-[#F59E0B]" /> {plan.rating?.toFixed(1) || "New"}
          </span>
        </div>

        <Link
          href={`/plans/${plan._id}`}
          className="w-full text-center bg-[#0F172A] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#22C55E] transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}