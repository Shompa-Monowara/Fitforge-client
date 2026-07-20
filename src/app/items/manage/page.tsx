import { getManagedItems } from "@/lib/api/items";
import DeleteItemButton from "@/components/items/DeleteItemButton";
import ApproveItemButton from "@/components/items/ApproveItemButton";
import ReviewModerationRow from "@/components/items/ReviewModerationRow";
import Link from "next/link";
import { FiEye, FiPlus, FiInbox, FiMessageSquare } from "react-icons/fi";
import { GiWeightLiftingUp } from "react-icons/gi";

export default async function ManageItemsPage() {
  const data = await getManagedItems();
  const items = data?.items || [];
  const isAdmin = data?.role === "admin";

  const statusBadge = (status?: string) => {
    if (status === "approved") {
      return (
        <span className="text-[10px] font-bold uppercase text-[#16833E] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
          Approved
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold uppercase text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
        Pending
      </span>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Manage Plans
          </h1>
          <p className="text-[#94A3B8] text-sm mt-1">
            {items.length} plan{items.length !== 1 ? "s" : ""} published
          </p>
        </div>
        <Link
          href="/items/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#22C55E] text-white text-sm font-bold hover:bg-[#16A34A] transition-colors shrink-0"
        >
          <FiPlus className="w-4 h-4" />
          Add New Plan
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-[#E2E8F0] rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] flex items-center justify-center mb-4">
            <FiInbox className="w-6 h-6 text-[#22C55E]" />
          </div>
          <p className="text-[#0F172A] font-bold text-lg mb-1">No plans yet</p>
          <p className="text-[#94A3B8] text-sm mb-6">
            Publish your first workout or nutrition plan to get started.
          </p>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-[#22C55E] hover:text-[#0F172A] transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add a Plan
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop: Table */}
          <div className="hidden md:block bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="px-5 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                    Goal
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-[#94A3B8] uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0 overflow-hidden">
                          {item.images?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <GiWeightLiftingUp className="w-4 h-4 text-[#22C55E]" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-[#0F172A] line-clamp-1 max-w-[220px]">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold text-[#0F172A] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                        {item.goal}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#64748B]">
                      {item.difficulty}
                    </td>
                    <td className="px-5 py-4">
                      {statusBadge((item as any).status)}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#64748B]">
                      {item.rating?.toFixed(1) || "New"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {(item as any).status === "approved" && (
                          <Link
                            href={`/plans/${item._id}`}
                            className="flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors"
                          >
                            <FiEye className="w-3.5 h-3.5" />
                            View
                          </Link>
                        )}
                        {isAdmin && (item as any).status !== "approved" && (
                          <ApproveItemButton itemId={item._id} />
                        )}
                        <DeleteItemButton itemId={item._id} itemTitle={item.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0 overflow-hidden">
                    {item.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <GiWeightLiftingUp className="w-5 h-5 text-[#22C55E]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#0F172A] line-clamp-1">
                        {item.title}
                      </p>
                      {statusBadge((item as any).status)}
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {item.goal} · {item.difficulty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#64748B] mb-4">
                  <span>{item.durationWeeks} weeks</span>
                  <span>★ {item.rating?.toFixed(1) || "New"}</span>
                </div>

                <div className="flex items-center gap-2">
                  {(item as any).status === "approved" && (
                    <Link
                      href={`/plans/${item._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0F172A] px-3 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors"
                    >
                      <FiEye className="w-3.5 h-3.5" />
                      View
                    </Link>
                  )}
                  {isAdmin && (item as any).status !== "approved" && (
                    <div className="flex-1">
                      <ApproveItemButton itemId={item._id} />
                    </div>
                  )}
                  <div className="flex-1">
                    <DeleteItemButton itemId={item._id} itemTitle={item.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Admin-only: Review Moderation */}
          {isAdmin && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-5">
                <FiMessageSquare className="w-5 h-5 text-[#0F172A]" />
                <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
                  Review Moderation
                </h2>
              </div>

              {(() => {
                const plansWithReviews = items.filter(
                  (item) => item.reviews && item.reviews.length > 0
                );

                if (plansWithReviews.length === 0) {
                  return (
                    <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-2xl">
                      <p className="text-sm text-[#94A3B8]">No reviews submitted yet.</p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-6">
                    {plansWithReviews.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white border border-[#E2E8F0] rounded-2xl p-5"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <Link
                            href={`/plans/${item._id}`}
                            className="text-sm font-bold text-[#0F172A] hover:text-[#22C55E] transition-colors"
                          >
                            {item.title}
                          </Link>
                          <span className="text-xs text-[#94A3B8]">
                            {item.reviews.length} review{item.reviews.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {item.reviews.map((review) => (
                            <ReviewModerationRow
                              key={review._id}
                              planId={item._id}
                              review={review}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </>
      )}
    </div>
  );
}