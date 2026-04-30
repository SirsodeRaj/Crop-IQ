const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchRecommendations(data: {
  project_id: string;
  location_data: { lat: number; lon: number };
  constraints: { budget: number; risk_tolerance: string };
}) {
  const response = await fetch(`${API_BASE_URL}/analysis/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}

export async function askAdvisory(data: { analysis_id: string; question: string }) {
  const response = await fetch(`${API_BASE_URL}/advisory/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to get advisory reply");
  }

  return response.json();
}
