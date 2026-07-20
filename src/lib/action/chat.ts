"use server";

import { getTokenServer } from "../getTokenServer";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

interface ChatHistoryResponse {
  success: boolean;
  messages: ChatMessage[];
}

export const getChatHistory = async (): Promise<ChatHistoryResponse> => {
  const token = await getTokenServer();

  if (!token) {
    return { success: false, messages: [] };
  }

  const res = await fetch(`${API_URL}/chat/history`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return res.json();
};