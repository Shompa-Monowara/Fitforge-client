// src/components/items/ReviewModerationRow.tsx
"use client";

import { useState } from "react";
import { approveReview, deleteReview } from "@/lib/api/review";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiCheck, FiTrash2, FiStar, FiLoader } from "react-icons/fi";
import { Review } from "@/lib/api/plans";

export default function ReviewModerationRow({
  planId,
  review,
}: {
  planId: string;
  review: Review & { status?: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "delete" | null>(null);

  const isPending = review.status !== "approved";

  const handleApprove = async () => {
    setLoading("approve");
    const result = await approveReview(planId, review._id!);
    setLoading(null);

    if (!result.success) {
      toast.error(result.message || "Failed to approve review.");
      return;
    }
    toast.success("Review approved.");
    router.refresh();
  };

  const handleDelete = async () => {
    setLoading("delete");
    const result = await deleteReview(planId, review._id!);
    setLoading(null);

    if (!result.success) {
      toast.error(result.message || "Failed to delete review.");
      return;
    }
    toast.success("Review deleted.");
    router.refresh();
  };

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#0F172A]">{review.userName}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${
                  i < review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#E2E8F0]"
                }`}
              />
            ))}
          </div>
          {isPending && (
            <span className="text-[10px] font-bold uppercase text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
              Pending
            </span>
          )}
        </div>
        <p className="text-xs text-[#64748B] line-clamp-2">{review.comment}</p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {isPending && (
          <button
            onClick={handleApprove}
            disabled={loading !== null}
            aria-label="Approve review"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#DCFCE7] text-[#16833E] hover:bg-[#BBF7D0] disabled:opacity-50 transition-colors"
          >
            {loading === "approve" ? (
              <FiLoader className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FiCheck className="w-3.5 h-3.5" />
            )}
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading !== null}
          aria-label="Delete review"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FECACA] disabled:opacity-50 transition-colors"
        >
          {loading === "delete" ? (
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <FiTrash2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}