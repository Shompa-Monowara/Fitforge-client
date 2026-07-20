import Link from "next/link";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FiHome, FiCompass } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#F8FAFC] flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#22C55E] mb-6">
                    <GiWeightLiftingUp className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-6xl sm:text-7xl font-black text-[#0F172A] tracking-tight mb-2">
                    404
                </h1>
                <h2 className="text-xl font-bold text-[#0F172A] mb-3">
                    This page skipped leg day
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed mb-8">
                    The page you&apos;re looking for doesn&apos;t exist, was moved, or
                    maybe never got published. Let&apos;s get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-[#22C55E] hover:text-[#0F172A] transition-colors"
                    >
                        <FiHome className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <Link
                        href="/plans"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#475569] text-sm font-bold hover:bg-[#F1F5F9] transition-colors"
                    >
                        <FiCompass className="w-4 h-4" />
                        Explore Plans
                    </Link>
                </div>
            </div>
        </div>
    );
}