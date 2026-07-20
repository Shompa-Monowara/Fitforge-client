"use client";

import { useState } from "react";
import { rejectItem } from "@/lib/action/items";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiXCircle, FiLoader } from "react-icons/fi";

export default function RejectItemButton({ itemId }: { itemId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleReject = async () => {
        setLoading(true);
        const result = await rejectItem(itemId);
        setLoading(false);

        if (!result.success) {
            toast.error(result.message || "Failed to reject item.");
            return;
        }
        toast.success("Item rejected.");
        router.refresh();
    };

    return (
        <button
            onClick={handleReject}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] px-3 py-1.5 rounded-lg border border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FECACA] disabled:opacity-50 transition-colors"
        >
            {loading ? (
                <FiLoader className="w-3.5 h-3.5 animate-spin" />
            ) : (
                <FiXCircle className="w-3.5 h-3.5" />
            )}
            Reject
        </button>
    );
}