"use client";

import { useState } from "react";
import { addReview } from "@/lib/action/plans";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiStar } from "react-icons/fi";

export default function ReviewForm({ planId }: { planId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (comment.trim().length < 5) {
      toast.error("Comment must be at least 5 characters.");
      return;
    }

    setIsSubmitting(true);
    const result = await addReview(planId, { rating, comment: comment.trim() });
    setIsSubmitting(false);

    if (!result.success) {
      // Not logged in (or session expired) — redirect to login
      if (result.message?.toLowerCase().includes("logged in")) {
        toast.error("Please log in to leave a review.");
        router.push(`/auth/login?redirect=/plans/${planId}`);
        return;
      }
      toast.error(result.message || "Failed to submit review.");
      return;
    }

    toast.success("Review submitted. Thanks for sharing!");
    setRating(0);
    setComment("");
    router.refresh();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-5 rounded-xl bg-white border border-[#E2E8F0] mb-6"
    >
      <h3 className="text-sm font-bold text-[#0F172A] mb-3">
        Leave a Review
      </h3>

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
              aria-label={`Rate ${starValue} star`}
            >
              <FiStar
                className={`w-6 h-6 transition-colors ${
                  starValue <= (hoverRating || rating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "text-[#E2E8F0]"
                }`}
              />
            </button>
          );
        })}
        {rating > 0 && (
          <span className="text-xs text-[#94A3B8] ml-2">{rating}/5</span>
        )}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        maxLength={500}
        placeholder="How did this plan work for you?"
        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all text-sm text-[#0F172A] placeholder:text-[#94A3B8] resize-none mb-3"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-[#22C55E] hover:text-[#0F172A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}