import { getItemById } from "@/lib/api/items";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiClock, FiTrendingUp, FiTarget, FiArrowLeft } from "react-icons/fi";
import { GiWeightLiftingUp } from "react-icons/gi";

export default async function ItemPreviewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const data = await getItemById(id);

    if (!data?.success || !data.item) {
        notFound();
    }

    const { item } = data;
    const statusColors: Record<string, string> = {
        approved: "text-[#16833E] bg-[#DCFCE7]",
        pending: "text-[#B45309] bg-[#FEF3C7]",
        rejected: "text-[#DC2626] bg-[#FEF2F2]",
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
            <Link
                href="/items/manage"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#475569] hover:text-[#22C55E] transition-colors mb-6"
            >
                <FiArrowLeft className="w-4 h-4" /> Back to Manage Plans
            </Link>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                <div className="relative w-full h-56 bg-[#F0FDF4]">
                    {item.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <GiWeightLiftingUp className="w-10 h-10 text-[#22C55E]" />
                        </div>
                    )}
                    <span
                        className={`absolute top-4 right-4 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[(item as any).status || "pending"]
                            }`}
                    >
                        {(item as any).status || "pending"}
                    </span>
                </div>

                <div className="p-6 sm:p-8">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#16833E] text-[11px] font-semibold uppercase tracking-wide mb-3">
                        {item.goal}
                    </span>
                    <h1 className="text-2xl font-black text-[#0F172A] tracking-tight mb-2">
                        {item.title}
                    </h1>
                    <p className="text-sm text-[#64748B] mb-6">{item.shortDescription}</p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                            <FiClock className="text-[#22C55E] w-4 h-4 mx-auto mb-1" />
                            <p className="text-xs font-bold text-[#0F172A]">{item.durationWeeks}w</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                            <FiTrendingUp className="text-[#F59E0B] w-4 h-4 mx-auto mb-1" />
                            <p className="text-xs font-bold text-[#0F172A]">{item.difficulty}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                            <FiTarget className="text-[#0F172A] w-4 h-4 mx-auto mb-1" />
                            <p className="text-xs font-bold text-[#0F172A]">{item.goal}</p>
                        </div>
                    </div>

                    <h2 className="text-base font-bold text-[#0F172A] mb-2">Full Description</h2>
                    <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                        {item.fullDescription}
                    </p>

                    {(item as any).status === "pending" && (
                        <div className="mt-6 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#B45309]">
                            This plan is awaiting admin approval and is not yet visible to other users.
                        </div>
                    )}
                    {(item as any).status === "rejected" && (
                        <div className="mt-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#DC2626]">
                            This plan was rejected by an admin. Edit and resubmit it for review.
                        </div>
                    )}

                    <div className="flex gap-3 mt-6">
                        <Link
                            href={`/items/edit/${item._id}`}
                            className="flex-1 text-center bg-[#0F172A] text-white text-sm font-bold py-3 rounded-xl hover:bg-[#22C55E] transition-colors"
                        >
                            Edit Plan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}