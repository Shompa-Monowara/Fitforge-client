"use client";

import React, { useState } from "react";
import { generateContent, regenerateContent } from "@/lib/action/content";
import { ContentType, ContentLength, GenerateContentPayload } from "@/types";
import { toast } from "react-toastify";
import { FiLoader, FiRefreshCw, FiCopy, FiCheck } from "react-icons/fi";
import { PiSparkleFill } from "react-icons/pi";

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: "blog", label: "Blog / Article" },
  { value: "product_description", label: "Plan Description" },
  { value: "social_post", label: "Social Media Post" },
  { value: "documentation", label: "Documentation" },
];

const LENGTHS: { value: ContentLength; label: string }[] = [
  { value: "short", label: "Short (~100-150 words)" },
  { value: "medium", label: "Medium (~300-400 words)" },
  { value: "long", label: "Long (~600-800 words)" },
];

interface GeneratedResult {
  title: string;
  content: string;
}

export default function ContentGeneratorPage() {
  const [contentType, setContentType] = useState<ContentType>("blog");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly and motivating");
  const [length, setLength] = useState<ContentLength>("medium");
  const [keywords, setKeywords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [copied, setCopied] = useState(false);

  const inputClassName =
    "bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all h-12 px-4 rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] text-[15px] w-full";

  const labelClassName = "text-[10px] font-black text-[#22C55E] tracking-widest uppercase";

  const buildPayload = (): GenerateContentPayload => ({
    contentType,
    topic,
    tone,
    length,
    keywords: keywords || undefined,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim().length < 3) {
      toast.error("Please enter a topic (at least 3 characters).");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    const res = await generateContent(buildPayload());
    setIsGenerating(false);

    if (!res.success || !res.content) {
      toast.error(res.message || "Failed to generate content.");
      return;
    }

    setResult({ title: res.content.title, content: res.content.content });
    toast.success("Content generated successfully!");
  };

  const handleRegenerate = async () => {
    if (!result) return;
    setIsRegenerating(true);

    const res = await regenerateContent(buildPayload());
    setIsRegenerating(false);

    if (!res.success || !res.content) {
      toast.error(res.message || "Failed to regenerate content.");
      return;
    }

    setResult({ title: res.content.title, content: res.content.content });
    toast.success("Regenerated a new version!");
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.content}`);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#22C55E] shadow-md shadow-[#22C55E]/25 mb-4">
          <PiSparkleFill className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
          AI Content Generator
        </h1>
        <p className="text-[#94A3B8] text-sm mt-2 max-w-md mx-auto">
          Generate blog posts, plan descriptions, and social content in seconds using AI.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* LEFT — Prompt Template Form */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm h-fit">
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Content Type — Custom Prompt Template selector */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className={inputClassName}
              >
                {CONTENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Benefits of morning cardio"
                className={inputClassName}
              />
            </div>

            {/* Tone */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={inputClassName}
              >
                <option value="friendly and motivating">Friendly & Motivating</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="scientific and informative">Scientific & Informative</option>
              </select>
            </div>

            {/* Adjustable Output Length */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Output Length</label>
              <div className="flex flex-col sm:flex-row gap-2">
                {LENGTHS.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLength(l.value)}
                    className={`flex-1 text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors ${
                      length === l.value
                        ? "bg-[#0F172A] text-white border-[#0F172A]"
                        : "bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Keywords (Optional)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. protein, recovery, consistency"
                className={inputClassName}
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-[#22C55E] font-bold text-white h-12 rounded-xl shadow-md shadow-[#22C55E]/20 hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <FiLoader className="animate-spin text-base" /> Generating...
                </>
              ) : (
                <>
                  <PiSparkleFill className="text-base" /> Generate Content
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT — Result */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col">
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
              <div className="w-8 h-8 border-2 border-[#22C55E] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#94A3B8]">Writing your content...</p>
            </div>
          ) : result ? (
            <>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F1F5F9]">
                <span className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                  Generated Content
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] transition-colors"
                  >
                    {copied ? <FiCheck className="text-[#22C55E]" /> : <FiCopy />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] text-[#16833E] hover:bg-[#DCFCE7] transition-colors disabled:opacity-60"
                  >
                    <FiRefreshCw className={isRegenerating ? "animate-spin" : ""} />
                    {isRegenerating ? "Regenerating..." : "Regenerate"}
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-black text-[#0F172A] mb-4">{result.title}</h2>

              <div className="flex-1 overflow-y-auto space-y-4">
                {result.content.split("\n\n").filter(Boolean).map((para, i) => (
                  <p key={i} className="text-sm text-[#334155] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] flex items-center justify-center mb-4">
                <PiSparkleFill className="text-[#22C55E] w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#0F172A] mb-1">
                No content generated yet
              </p>
              <p className="text-xs text-[#94A3B8] max-w-xs">
                Fill in the form and click &quot;Generate Content&quot; to see AI-written content appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}