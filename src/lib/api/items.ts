import { getTokenServer } from "../getTokenServer";
import { Plan } from "./plans";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface ManagedItemsResponse {
  success: boolean;
  items: Plan[];
  role?: string;
}

interface ItemDetailsResponse {
  success: boolean;
  item: Plan;
}

export const getManagedItems = async (): Promise<ManagedItemsResponse> => {
  const token = await getTokenServer();
  const res = await fetch(`${API_URL}/items/manage`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.json();
};

export const getItemById = async (id: string): Promise<ItemDetailsResponse> => {
  const res = await fetch(`${API_URL}/items/${id}`, { cache: "no-store" });
  return res.json();
};