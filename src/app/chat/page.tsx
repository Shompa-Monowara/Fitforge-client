"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { getChatHistory } from "@/lib/action/chat";
import { FiSend, FiUser } from "react-icons/fi";
import { PiSparkleFill } from "react-icons/pi";
import { useChatStream } from "@/hooks/useChatStream";

const SUGGESTED_PROMPTS = [
  "Suggest a quick 20-minute home workout",
  "How much protein should I eat daily?",
  "I missed my workout today, what should I do?",
  "Explain proper squat form",
];

const renderMessageWithLinks = (text: string) => {
  const routeRegex = /(\/plans|\/items\/add|\/items\/manage|\/dashboard|\/content|\/blog)(?![a-zA-Z])/g;
  const parts = text.split(routeRegex);

  return parts.map((part, i) =>
    routeRegex.test(part) ? (
      <Link
        key={i}
        href={part}
        className="text-[#22C55E] font-semibold underline underline-offset-2 hover:text-[#16A34A]"
      >
        {part}
      </Link>
    ) : (
      part
    )
  );
};

export default function ChatPage() {
  const { messages, setMessages, sendMessage, isStreaming, error } = useChatStream();
  const [input, setInput] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getChatHistory();
        if (res.success && res.messages?.length > 0) {
          setMessages(
            res.messages.map((m) => ({ role: m.role, content: m.content }))
          );
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    loadHistory();
  }, [setMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const message = text ?? input;
    if (!message.trim() || isStreaming) return;
    sendMessage(message);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const lastMessage = messages[messages.length - 1];
  const showSuggestions =
    !isStreaming &&
    !isLoadingHistory &&
    lastMessage?.role === "model" &&
    lastMessage.content.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#F8FAFC]">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] bg-white px-4 sm:px-6 mt-10">
  <div className="mx-auto max-w-7xl flex items-center justify-center py-4">
    <div className="text-center">
      <h1 className="text-base font-bold text-[#0F172A]">AI Coach</h1>
      <p className="text-xs text-[#94A3B8]">
        {isStreaming ? "Typing..." : "Always here to help"}
      </p>
    </div>
  </div>
</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-5">
          {isLoadingHistory ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-[#22C55E] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#22C55E] flex items-center justify-center mx-auto mb-4">
                <PiSparkleFill className="text-white w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-1">
                Hi, I&apos;m your FitForge AI Coach
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                Ask me about workouts, nutrition, or your training plan — I remember your recent activity.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isUser = msg.role === "user";
              const isLastAI =
                msg.role === "model" && i === messages.length - 1 && isStreaming;

              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isUser ? "bg-[#0F172A]" : "bg-gradient-to-br from-[#0F172A] to-[#22C55E]"
                    }`}
                  >
                    {isUser ? (
                      <FiUser className="text-white w-3.5 h-3.5" />
                    ) : (
                      <PiSparkleFill className="text-white w-3.5 h-3.5" />
                    )}
                  </div>

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      isUser
                        ? "bg-[#0F172A] text-white rounded-tr-sm"
                        : "bg-white border border-[#E2E8F0] text-[#334155] rounded-tl-sm"
                    }`}
                  >
                    {msg.content ? (
                      renderMessageWithLinks(msg.content)
                    ) : (
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" />
                      </span>
                    )}
                    {isLastAI && msg.content && (
                      <span className="inline-block w-1.5 h-4 bg-[#22C55E] ml-0.5 align-middle animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })
          )}

          {error && (
            <p className="text-center text-xs text-[#DC2626] font-medium">{error}</p>
          )}

          {showSuggestions && (
            <div className="flex flex-wrap gap-2 pt-2 pl-11">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-xs font-semibold px-3 py-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] text-[#16833E] hover:bg-[#DCFCE7] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#E2E8F0] bg-white px-4 sm:px-6 py-4  mb-10">
        <div className="max-w-7xl mx-auto flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI coach anything..."
            rows={1}
            disabled={isStreaming}
            className="flex-1 resize-none max-h-32 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] disabled:opacity-60"
          />
          <button
            onClick={() => handleSend()}
            disabled={isStreaming || !input.trim()}
            className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#22C55E] text-white hover:bg-[#16A34A] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <FiSend className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}