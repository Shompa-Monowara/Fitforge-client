"use server";

import { revalidatePath } from "next/cache";
import { getTokenServer } from "../getTokenServer";
import { GenerateContentPayload } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface GeneratedContentResult {
  success: boolean;
  message?: string;
  content?: {
    _id?: string;
    title: string;
    content: string;
    contentType: string;
    topic: string;
    tone: string;
    length: string;
  };
}

export const generateContent = async (payload: GenerateContentPayload): Promise<GeneratedContentResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to generate content." };

    const res = await fetch(`${API_URL}/content/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to generate content." };

    revalidatePath("/content");
    return { success: true, content: data.content };
  } catch (error) {
    console.error("generateContent error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};

export const regenerateContent = async (payload: GenerateContentPayload): Promise<GeneratedContentResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to regenerate content." };

    const res = await fetch(`${API_URL}/content/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to regenerate content." };

    return { success: true, content: data.content };
  } catch (error) {
    console.error("regenerateContent error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};

export const deleteContent = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to delete content." };

    const res = await fetch(`${API_URL}/content/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to delete content." };

    revalidatePath("/content");
    return { success: true, message: data.message };
  } catch (error) {
    console.error("deleteContent error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};