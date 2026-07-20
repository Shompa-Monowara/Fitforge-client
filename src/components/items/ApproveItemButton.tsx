"use client";

import { useState } from "react";
import { approveItem } from "@/lib/action/items";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiCheckCircle, FiLoader } from "react-icons/fi";

export default function ApproveItemButton({ itemId }: { itemId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    const result = await approveItem(itemId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message || "Failed to approve item.");
      return;
    }
    toast.success("Item approved and is now live.");
    router.refresh();
  };

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="flex items-center gap-1.5 text-xs font-semibold text-[#16833E] px-3 py-1.5 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] hover:bg-[#DCFCE7] disabled:opacity-50 transition-colors"
    >
      {loading ? (
        <FiLoader className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <FiCheckCircle className="w-3.5 h-3.5" />
      )}
      Approve
    </button>
  );
}