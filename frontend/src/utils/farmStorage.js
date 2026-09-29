const FARM_PROFILE_KEY = "ruralai_farm_profile";

export function saveFarmProfile(profile) {
  try {
    localStorage.setItem(
      FARM_PROFILE_KEY,
      JSON.stringify(profile)
    );
  } catch (error) {
    console.error(
      "Could not save farm profile:",
      error
    );
  }
}

export function getFarmProfile() {
  try {
    const stored =
      localStorage.getItem(FARM_PROFILE_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Could not read farm profile:",
      error
    );

    return null;
  }
}

export function clearFarmProfile() {
  try {
    localStorage.removeItem(FARM_PROFILE_KEY);
  } catch (error) {
    console.error(
      "Could not clear farm profile:",
      error
    );
  }
}