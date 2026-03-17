const API_URL = "http://localhost:8080/api/dashboard-config";

export async function getDashboardConfig() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to load dashboard configuration");
  }

  return response.json();
}

export async function saveDashboardConfig(widgets) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      widgetsJson: JSON.stringify(widgets ?? []),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save dashboard configuration");
  }

  return response.json();
}
