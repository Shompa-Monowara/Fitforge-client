const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: { name: string; avatarUrl: string; bio: string };
  readTimeMinutes: number;
  publishedAt: string;
  createdAt: string;
}

interface BlogsListResponse {
  success: boolean;
  blogs: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}

interface BlogDetailsResponse {
  success: boolean;
  blog: BlogPost;
  related: BlogPost[];
}

export const getAllBlogs = async (params?: {
  category?: string;
  page?: number;
  limit?: number;
}): Promise<BlogsListResponse> => {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${API_URL}/blogs?${query.toString()}`, { cache: "no-store" });
  return res.json();
};

export const getBlogById = async (id: string): Promise<BlogDetailsResponse> => {
  const res = await fetch(`${API_URL}/blogs/${id}`, { cache: "no-store" });
  return res.json();
};