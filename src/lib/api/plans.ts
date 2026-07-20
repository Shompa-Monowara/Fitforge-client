

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export interface Review {
  _id?: string;
  userEmail: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Plan {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  goal: string;
  difficulty: string;
  durationWeeks: number;
  images?: string[];
  createdBy: string;
  rating: number;
  reviews: Review[];
  createdAt: string;
   status?: "pending" | "approved";
}

interface PlansListResponse {
  success: boolean;
  plans: Plan[];
  total: number;
  page: number;
  totalPages: number;
}

interface PlanDetailsResponse {
  success: boolean;
  plan: Plan;
  related: Plan[];
}

export const getAllPlans = async (params?: {
  search?: string;
  goal?: string;
  difficulty?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}): Promise<PlansListResponse> => {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.goal) query.set("goal", params.goal);
  if (params?.difficulty) query.set("difficulty", params.difficulty);
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${API_URL}/plans?${query.toString()}`, { cache: "no-store" });
  return res.json();
};

export const getPlanById = async (id: string): Promise<PlanDetailsResponse> => {
  const res = await fetch(`${API_URL}/plans/${id}`, { cache: "no-store" });
  return res.json();
};