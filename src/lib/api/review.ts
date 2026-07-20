"use server";

import { revalidatePath } from "next/cache";
import { getTokenServer } from "../getTokenServer";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface ActionResult {
  success: boolean;
  message: string;
}

// Approve a pending review (admin only)
export const approveReview = async (
  planId: string,
  reviewId: string
): Promise<ActionResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in." };

    const res = await fetch(`${API_URL}/plans/${planId}/reviews/${reviewId}/approve`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to approve review." };

    revalidatePath(`/plans/${planId}`);
    revalidatePath("/items/manage");
    return { success: true, message: data.message };
  } catch (error) {
    console.error("approveReview error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};

// Delete a review (admin only)
export const deleteReview = async (
  planId: string,
  reviewId: string
): Promise<ActionResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in." };

    const res = await fetch(`${API_URL}/plans/${planId}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to delete review." };

    revalidatePath(`/plans/${planId}`);
    revalidatePath("/items/manage");
    return { success: true, message: data.message };
  } catch (error) {
    console.error("deleteReview error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};