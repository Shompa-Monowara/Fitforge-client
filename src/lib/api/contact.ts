const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  insertedId?: string;
}

export const submitContactForm = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const res = await fetch(`${API_URL}/contact/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};