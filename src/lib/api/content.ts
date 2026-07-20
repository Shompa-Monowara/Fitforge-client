import { getTokenServer } from "../getTokenServer";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export interface GeneratedContent {
  _id: string;
  userEmail: string;
  contentType: string;
  topic: string;
  tone: string;
  length: string;
  keywords: string;
  title: string;
  content: string;
  createdAt: string;
}

interface MyContentResponse {
  success: boolean;
  content: GeneratedContent[];
}

export const getMyContent = async (): Promise<MyContentResponse> => {
  const token = await getTokenServer();
  const res = await fetch(`${API_URL}/content/mine`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.json();
};