"use server";

import { revalidatePath } from "next/cache";
import { getTokenServer } from "../getTokenServer";
import { AddLogPayload } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface ActionResult {
  success: boolean;
  message: string;
  insertedId?: string;
}

export const addLog = async (payload: AddLogPayload): Promise<ActionResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to log an activity." };

    const res = await fetch(`${API_URL}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to add log." };

    revalidatePath("/dashboard");
    return { success: true, message: data.message, insertedId: data.insertedId };
  } catch (error) {
    console.error("addLog error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};