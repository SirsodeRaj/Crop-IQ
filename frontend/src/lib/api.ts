const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://crop-iq-newbackend.onrender.com";

export async function fetchRecommendations(data: {
  project_id: string;
  location_data: { lat: number; lon: number };
  constraints: { budget: number; risk_tolerance: string };
}, token?: string | null) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/analysis/recommend`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    if (response.status === 401) {
      throw new Error("Authentication error: Your session may have expired. Please log in again.");
    }
    throw new Error(response.statusText || "Failed to fetch recommendations");
  }

  return response.json();
}

export async function askAdvisory(data: { analysis_id: string; question: string; history?: {role: string, content: string}[] }, token?: string | null) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/advisory/ask`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication error: Your session may have expired. Please log in again.");
    }
    throw new Error("Failed to get advisory reply");
  }

  return response.json();
}
