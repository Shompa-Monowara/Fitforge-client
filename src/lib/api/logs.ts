import { getTokenServer } from "../getTokenServer";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export interface UserLog {
  _id: string;
  userEmail: string;
  type: "workout" | "meal" | "feedback";
  detail: string;
  createdAt: string;
}

interface LogsResponse {
  success: boolean;
  logs: UserLog[];
  total: number;
  page: number;
  totalPages: number;
}

export const getLogs = async (params?: {
  type?: string;
  page?: number;
  limit?: number;
}): Promise<LogsResponse> => {
  const token = await getTokenServer();
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${API_URL}/logs?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.json();
};