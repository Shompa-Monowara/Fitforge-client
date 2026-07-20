import { getTokenServer } from "../getTokenServer";
import { Plan } from "./plans";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

interface MyPlansResponse {
  success: boolean;
  plans: Plan[];
}

export const getMyPlans = async (): Promise<MyPlansResponse> => {
  const token = await getTokenServer();

  if (!token) {
    return { success: false, plans: [] };
  }

  const res = await fetch(`${API_URL}/plans/mine/list`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.json();
};