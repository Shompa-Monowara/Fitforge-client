// Items / Plans
export interface AddItemPayload {
  title: string;
  shortDescription: string;
  fullDescription: string;
  goal: string;
  difficulty: string;
  durationWeeks: number;
  images?: string[];
}

// Logs
export type LogType = "workout" | "meal" | "feedback";

export interface AddLogPayload {
  type: LogType;
  detail: string;
}

// Content Generator
export type ContentType = "blog" | "product_description" | "social_post" | "documentation";
export type ContentLength = "short" | "medium" | "long";

export interface GenerateContentPayload {
  contentType: ContentType;
  topic: string;
  tone?: string;
  length: ContentLength;
  keywords?: string;
}

// User Profile
export interface UpdateProfilePayload {
  name: string;
  image?: string;
}