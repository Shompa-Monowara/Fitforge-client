"use server";

import { revalidatePath } from "next/cache";
import { getTokenServer } from "../getTokenServer";
import { UpdateProfilePayload } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface ActionResult {
  success: boolean;
  message: string;
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<ActionResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to update your profile." };

    const res = await fetch(`${API_URL}/user/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to update profile." };

    revalidatePath("/dashboard");
    return { success: true, message: data.message };
  } catch (error) {
    console.error("updateProfile error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};