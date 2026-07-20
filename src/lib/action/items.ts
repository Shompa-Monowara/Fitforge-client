"use server";

import { revalidatePath } from "next/cache";
import { getTokenServer } from "../getTokenServer";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface ActionResult {
  success: boolean;
  message: string;
}

export const approveItem = async (itemId: string): Promise<ActionResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in." };

    const res = await fetch(`${API_URL}/items/${itemId}/approve`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to approve item." };

    revalidatePath("/items/manage");
    revalidatePath("/plans");
    return { success: true, message: data.message };
  } catch (error) {
    console.error("approveItem error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};