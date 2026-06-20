const API_URL = "https://fakestoreapi.com";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }
  );

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export const api = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, data?: unknown) =>
    request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(url: string, data?: unknown) =>
    request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: 'DELETE',
    }),
};