import React from "react";

export default function PlanCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-[#E2E8F0]" />
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="h-4 bg-[#E2E8F0] rounded w-3/4" />
        <div className="h-3 bg-[#E2E8F0] rounded w-full" />
        <div className="h-3 bg-[#E2E8F0] rounded w-2/3" />
        <div className="flex gap-3 pt-1">
          <div className="h-3 bg-[#E2E8F0] rounded w-10" />
          <div className="h-3 bg-[#E2E8F0] rounded w-14" />
          <div className="h-3 bg-[#E2E8F0] rounded w-10" />
        </div>
        <div className="h-10 bg-[#E2E8F0] rounded-xl w-full mt-2" />
      </div>
    </div>
  );
}