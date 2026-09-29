const API_BASE_URL = "http://127.0.0.1:8000";

export async function createFarmProfile(profile) {
  const response = await fetch(
    `${API_BASE_URL}/api/farm-profiles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to save farm profile."
    );
  }

  return response.json();
}

export async function getFarmProfiles() {
  const response = await fetch(
    `${API_BASE_URL}/api/farm-profiles`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load farm profiles."
    );
  }

  return response.json();
}

export async function checkBackendHealth() {
  const response = await fetch(
    `${API_BASE_URL}/health`
  );

  if (!response.ok) {
    throw new Error(
      "Backend health check failed."
    );
  }

  return response.json();
}