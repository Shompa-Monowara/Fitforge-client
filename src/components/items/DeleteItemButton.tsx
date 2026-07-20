"use client";

import { useState } from "react";
import { deleteItem } from "@/lib/action/plans";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiTrash2, FiLoader } from "react-icons/fi";

export default function DeleteItemButton({
  itemId,
  itemTitle,
}: {
  itemId: string;
  itemTitle: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteItem(itemId);
    setIsDeleting(false);
    setConfirmOpen(false);

    if (!result.success) {
      toast.error(result.message || "Failed to delete plan.");
      return;
    }

    toast.success("Plan deleted successfully.");
    router.refresh();
  };

  if (confirmOpen) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-xs font-bold text-white bg-[#DC2626] px-3 py-1.5 rounded-lg hover:bg-[#B91C1C] transition-colors disabled:opacity-60"
        >
          {isDeleting ? <FiLoader className="animate-spin w-3.5 h-3.5" /> : "Confirm"}
        </button>
        <button
          onClick={() => setConfirmOpen(false)}
          disabled={isDeleting}
          className="text-xs font-semibold text-[#64748B] px-3 py-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirmOpen(true)}
      aria-label={`Delete ${itemTitle}`}
      className="flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] px-3 py-1.5 rounded-lg border border-[#FECACA] hover:bg-[#FEF2F2] transition-colors"
    >
      <FiTrash2 className="w-3.5 h-3.5" />
      Delete
    </button>
  );
}