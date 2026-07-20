"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPlans, Plan } from "@/lib/api/plans";
import PlanCard from "@/components/plans/PlanCard";
import PlanCardSkeleton from "@/components/plans/PlanCardSkeleton";
import { FiSearch } from "react-icons/fi";

const LIMIT = 8;

export default function PlansPage() {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [goal, setGoal] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["plans", search, goal, difficulty, sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      return getAllPlans({
        search: search || undefined,
        goal: goal || undefined,
        difficulty: difficulty || undefined,
        sortBy: sortBy || undefined,
        page: pageParam,
        limit: LIMIT,
      });
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  const plans: Plan[] = data?.pages.flatMap((p) => p.plans) || [];
  const total = data?.pages[0]?.total ?? 0;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setGoal("");
    setDifficulty("");
    setSortBy("");
  };

  const selectClassName =
    "bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all h-11 px-3 rounded-xl text-[#0F172A] text-sm w-full sm:w-auto";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Explore Plans
        </h1>
        <p className="text-[#94A3B8] text-sm mt-2">
          Browse workout and nutrition plans built by the FitForge community.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 mb-8 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search plans by title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all text-sm text-[#0F172A] placeholder:text-[#94A3B8]"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className={selectClassName}>
            <option value="">All Goals</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Endurance">Endurance</option>
          </select>

          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={selectClassName}>
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClassName}>
            <option value="">Sort: Newest</option>
            <option value="popularity">Sort: Popularity</option>
            <option value="rating">Sort: Rating</option>
            <option value="duration">Sort: Duration</option>
          </select>

          {(search || goal || difficulty || sortBy) && (
            <button
              onClick={resetFilters}
              className="h-11 px-4 rounded-xl border border-[#FECACA] text-[#DC2626] text-sm font-semibold hover:bg-[#FEF2F2] transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {!isLoading && (
        <p className="text-sm text-[#94A3B8] mb-4">
          {total} plan{total !== 1 ? "s" : ""} found
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <PlanCardSkeleton key={i} />
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E2E8F0] rounded-2xl">
          <p className="text-[#0F172A] font-bold text-lg mb-1">No plans found</p>
          <p className="text-[#94A3B8] text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, index) => {
              const isLast = index === plans.length - 1;
              return (
                <div key={plan._id} ref={isLast ? lastElementRef : undefined}>
                  <PlanCard plan={plan} />
                </div>
              );
            })}
          </div>

          {isFetchingNextPage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlanCardSkeleton key={`loading-more-${i}`} />
              ))}
            </div>
          )}

          {!hasNextPage && plans.length > 0 && (
            <p className="text-center text-[#94A3B8] text-sm mt-8">
              You&apos;ve reached the end of the list.
            </p>
          )}
        </>
      )}
    </div>
  );
}