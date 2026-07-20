"use server";

import { revalidatePath } from "next/cache";
import { getTokenServer } from "../getTokenServer";
import { AddItemPayload } from "@/types";
import { Review } from "@/lib/api/plans";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface ActionResult {
  success: boolean;
  message: string;
  insertedId?: string;
}

export const addItem = async (payload: AddItemPayload): Promise<ActionResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to add a plan." };

    const res = await fetch(`${API_URL}/items/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to add plan." };

    revalidatePath("/items/manage");
    revalidatePath("/plans");

    return { success: true, message: data.message, insertedId: data.insertedId };
  } catch (error) {
    console.error("addItem error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};

export const deleteItem = async (id: string): Promise<ActionResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to delete a plan." };

    const res = await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to delete plan." };

    revalidatePath("/items/manage");
    revalidatePath("/plans");

    return { success: true, message: data.message };
  } catch (error) {
    console.error("deleteItem error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};

export interface AddReviewPayload {
  rating: number;
  comment: string;
}

interface AddReviewResult {
  success: boolean;
  message: string;
  review?: Review;
}

export const addReview = async (
  planId: string,
  payload: AddReviewPayload
): Promise<AddReviewResult> => {
  try {
    const token = await getTokenServer();
    if (!token) return { success: false, message: "You must be logged in to leave a review." };

    const res = await fetch(`${API_URL}/plans/${planId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message || "Failed to submit review." };

    revalidatePath(`/plans/${planId}`);
    return { success: true, message: data.message, review: data.review };
  } catch (error) {
    console.error("addReview error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};