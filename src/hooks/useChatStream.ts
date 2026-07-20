"use client";

import { useState, useCallback } from "react";

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp?: string;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const useChatStream = (initialMessages: ChatMessage[] = []) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isStreaming) return;
      setError(null);

      setMessages((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "model", content: "" },
      ]);
      setIsStreaming(true);

      try {
        // Get a valid JWT token via the server-side route
        const tokenRes = await fetch("/api/get-token");
        const { token } = await tokenRes.json();

        if (!token) {
          throw new Error("You must be logged in to chat with your coach.");
        }

        const res = await fetch(`${API_URL}/chat/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        });

        if (!res.ok || !res.body)
          throw new Error("Failed to reach the AI coach. Please try again.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.replace("data: ", "").trim();
            if (raw === "[DONE]") continue;

            try {
              const parsed = JSON.parse(raw);
              if (parsed.text) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIndex = updated.length - 1;
                  updated[lastIndex] = {
                    ...updated[lastIndex],
                    content: updated[lastIndex].content + parsed.text,
                  };
                  return updated;
                });
              }
            } catch {}
          }
        }
      } catch (err) {
        console.error("Chat stream error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong talking to your coach. Please try again."
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming]
  );

  return { messages, setMessages, sendMessage, isStreaming, error };
};