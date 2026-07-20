import { getPlanById } from "@/lib/api/plans";
import PlanImageGallery from "@/components/plans/PlanImageGallery";
import PlanCard from "@/components/plans/PlanCard";
import ReviewForm from "@/components/plans/ReviewForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiClock,
  FiTrendingUp,
  FiStar,
  FiTarget,
  FiUser,
} from "react-icons/fi";

export default async function PlanDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPlanById(id);

  if (!data?.success || !data.plan) {
    notFound();
  }

  const { plan, related } = data;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-6">
        <Link href="/" className="hover:text-[#22C55E]">Home</Link>
        <span>/</span>
        <Link href="/plans" className="hover:text-[#22C55E]">Plans</Link>
        <span>/</span>
        <span className="text-[#0F172A] font-medium line-clamp-1">{plan.title}</span>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        {/* LEFT COLUMN */}
        <div>
          <PlanImageGallery images={plan.images} title={plan.title} />

          <div className="mt-8">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#16833E] text-[11px] font-semibold uppercase tracking-wide mb-3">
              {plan.goal}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              {plan.title}
            </h1>
            <p className="mt-2 text-[#64748B] text-sm">
              {plan.shortDescription}
            </p>
          </div>

          {/* Overview / Description */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">
              Overview
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">
              {plan.fullDescription}
            </p>
          </section>

          {/* Key Info */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">
              Key Information
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                <FiClock className="text-[#22C55E] w-4 h-4 mb-2" />
                <p className="text-xs text-[#94A3B8]">Duration</p>
                <p className="text-sm font-bold text-[#0F172A]">
                  {plan.durationWeeks} weeks
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                <FiTrendingUp className="text-[#F59E0B] w-4 h-4 mb-2" />
                <p className="text-xs text-[#94A3B8]">Difficulty</p>
                <p className="text-sm font-bold text-[#0F172A]">
                  {plan.difficulty}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                <FiTarget className="text-[#0F172A] w-4 h-4 mb-2" />
                <p className="text-xs text-[#94A3B8]">Goal</p>
                <p className="text-sm font-bold text-[#0F172A]">
                  {plan.goal}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                <FiStar className="text-[#F59E0B] w-4 h-4 mb-2" />
                <p className="text-xs text-[#94A3B8]">Rating</p>
                <p className="text-sm font-bold text-[#0F172A]">
                  {plan.rating?.toFixed(1) || "New"}
                </p>
              </div>
            </div>
          </section>

          {/* Reviews & Ratings */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">
              Reviews & Ratings
            </h2>

            <ReviewForm planId={plan._id} />

            {plan.reviews && plan.reviews.length > 0 ? (
              <div className="space-y-4">
                {plan.reviews.map((review, i) => (
                  <div
                    key={review._id || i}
                    className="p-4 rounded-xl bg-white border border-[#E2E8F0]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center">
                          <FiUser className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-[#0F172A]">
                          {review.userName}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <FiStar
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < review.rating
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-[#E2E8F0]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#64748B]">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] text-center">
                <p className="text-sm text-[#94A3B8]">
                  No reviews yet. Be the first to try this plan and share your experience.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN — sticky CTA card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-[#94A3B8] mb-1">Created by</p>
            <p className="text-sm font-semibold text-[#0F172A] mb-5">
              {plan.createdBy}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Duration</span>
                <span className="font-semibold text-[#0F172A]">
                  {plan.durationWeeks} weeks
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Difficulty</span>
                <span className="font-semibold text-[#0F172A]">
                  {plan.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Rating</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                  <FiStar className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  {plan.rating?.toFixed(1) || "New"}
                </span>
              </div>
            </div>

            <Link
              href="/chat"
              className="block w-full text-center bg-[#22C55E] text-white text-sm font-bold py-3 rounded-xl hover:bg-[#16A34A] transition-colors mb-3"
            >
              Ask AI Coach About This Plan
            </Link>
            <Link
              href="/plans"
              className="block w-full text-center border border-[#E2E8F0] text-[#475569] text-sm font-bold py-3 rounded-xl hover:bg-[#F8FAFC] transition-colors"
            >
              Back to All Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Related Plans */}
      {related && related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-black text-[#0F172A] mb-6">
            Related Plans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((relatedPlan) => (
              <PlanCard key={relatedPlan._id} plan={relatedPlan} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}