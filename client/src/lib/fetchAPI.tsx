export type FetchOptions = RequestInit;

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
    }

    const json = await res.json();

    // যদি API { data: [] } দেয়
    if (json && "data" in json) {
      return json.data as T;
    }

    // যদি সরাসরি array/object দেয়
    return json as T;
  } catch (error) {
    console.error(`[fetchAPI] ${endpoint}`, error);
    throw error;
  }
}
