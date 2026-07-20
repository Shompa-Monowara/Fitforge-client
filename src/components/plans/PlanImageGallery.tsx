"use client";

import { useState } from "react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80";

export default function PlanImageGallery({
  images,
  title,
}: {
  images?: string[];
  title: string;
}) {
  const gallery = images && images.length > 0 ? images : [DEFAULT_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#F0FDF4] border border-[#E2E8F0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gallery[activeIndex]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {gallery.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? "border-[#22C55E]"
                  : "border-[#E2E8F0] hover:border-[#86EFAC]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${title} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}