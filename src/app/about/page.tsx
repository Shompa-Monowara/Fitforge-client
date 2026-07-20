// src/app/about/page.tsx
import Image from "next/image";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FiTarget, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function AboutPage() {
    return (
        <div className="w-full bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
            {/* Hero */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#22C55E] mb-6">
                    <GiWeightLiftingUp className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-4">
                    About FitForge AI
                </h1>
                <p className="text-[#64748B] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    FitForge AI was built on a simple observation: most fitness apps hand
                    you a plan once and forget you exist. We built a coach that pays
                    attention — one that reads your logged workouts, adjusts your plan
                    when something isn&apos;t working, and answers your questions the
                    moment you have them.
                </p>
            </section>

            {/* Mission */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                        <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-4">
                            <FiTarget className="w-5 h-5 text-[#22C55E]" />
                        </div>
                        <h3 className="text-base font-bold text-[#0F172A] mb-2">
                            Our Mission
                        </h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                            To make personalized coaching accessible to anyone with a phone
                            and a goal — not just people who can afford a personal trainer.
                        </p>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                        <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center mb-4">
                            <FiTrendingUp className="w-5 h-5 text-[#B45309]" />
                        </div>
                        <h3 className="text-base font-bold text-[#0F172A] mb-2">
                            How We&apos;re Different
                        </h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                            Our AI doesn&apos;t just generate a plan once. It remembers your
                            history and adapts week to week, based on what you actually log.
                        </p>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                        <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-4">
                            <FiUsers className="w-5 h-5 text-[#22C55E]" />
                        </div>
                        <h3 className="text-base font-bold text-[#0F172A] mb-2">
                            Built With Trainers
                        </h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                            Every plan on FitForge is either published by a certified
                            trainer or reviewed before it goes live — no auto-generated
                            spam plans.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">Our Story</h2>
                <div className="space-y-4 text-sm text-[#475569] leading-relaxed">
                    <p>
                        FitForge AI started as a class project focused on one question:
                        what would a fitness app look like if it actually used AI for
                        something more than writing marketing copy? Most apps treat AI as
                        an afterthought — a chatbot bolted onto a static plan generator.
                    </p>
                    <p>
                        We built FitForge around the opposite idea. The AI coach reads
                        your logged workouts and meals, remembers your conversation
                        history, and adjusts your plan based on real feedback — not just
                        a form you filled out once during onboarding.
                    </p>
                    <p>
                        Every plan on the platform goes through a review step before it&apos;s
                        visible to the community, and every review is moderated, so what
                        you see reflects real member experiences rather than unverified
                        noise.
                    </p>
                </div>
            </section>
        </div>
    );
}