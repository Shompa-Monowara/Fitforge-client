"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Do I need any prior fitness experience to join FitForge?",
    answer:
      "Not at all. FitForge plans are organized by difficulty level — Beginner, Intermediate, and Advanced — so you can start exactly where you are. Many of our most active members started with zero training experience and gradually progressed using our structured plans.",
  },
  {
    question: "How do I choose the right plan for my goal?",
    answer:
      "On the Explore Plans page, you can filter by goal (Weight Loss, Muscle Gain, Endurance) and difficulty level. Each plan also shows duration and community rating, so you can compare options before committing. If you're still unsure, our AI Coach Chat can recommend a plan based on your goals.",
  },
  {
    question: "Can I publish my own workout or nutrition plan?",
    answer:
      "Yes. Once logged in, any member can create and publish a plan through the Add Plan page. You can manage, edit visibility, or delete your published plans anytime from the Manage Plans dashboard.",
  },
  {
    question: "What does the AI Coach Chat actually do?",
    answer:
      "The AI Coach Chat remembers your recent workout and meal logs, so it gives advice tailored to your actual activity — not generic tips. It can also guide you to the right page in the app, like where to log a workout or find a new plan, and it remembers the context of your ongoing conversation.",
  },
  {
    question: "Is the AI Content Generator only for trainers?",
    answer:
      "No, any logged-in member can use it. It's designed to help you generate blog-style articles, plan descriptions, or social media posts around fitness topics — useful whether you're publishing a plan or just want AI-assisted writing on a fitness topic you care about.",
  },
  {
    question: "How is my plan rating calculated?",
    answer:
      "Each plan's rating is the average of all reviews submitted by members who've tried it. Ratings update automatically every time someone submits a new review, so it always reflects the most current community feedback.",
  },
  {
    question: "Can I delete my account or published data?",
    answer:
      "Yes. You can delete any plan you've published from the Manage Plans page at any time. For full account deletion or data removal requests, reach out to us through the Contact page and our team will assist you.",
  },
  {
    question: "Is FitForge free to use?",
    answer:
      "Yes, browsing plans, publishing your own plans, and using the AI Coach Chat and Content Generator are all free for registered members. We may introduce optional premium features in the future, but core functionality stays free.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full bg-[#F8FAFC] py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-xs font-semibold tracking-wide uppercase mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#94A3B8] text-sm mt-3 max-w-md mx-auto">
            Everything you need to know before you get started with FitForge.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? "border-[#86EFAC]" : "border-[#E2E8F0]"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-[15px] font-bold text-[#0F172A]">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-[#22C55E] text-white"
                        : "bg-[#F1F5F9] text-[#475569]"
                    }`}
                  >
                    {isOpen ? <FiMinus className="text-sm" /> : <FiPlus className="text-sm" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm text-[#64748B] leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;