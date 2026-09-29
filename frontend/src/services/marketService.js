const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

export async function getMarketPrice({
  cropName,
  district = "",
}) {
  try {
    const params = new URLSearchParams();

    params.set("crop", cropName);

    if (district) {
      params.set("district", district);
    }

    const url =
      `${API_BASE_URL}/api/market-prices?${params.toString()}`;

    console.log(
      "RuralAI Nexus market request:",
      url
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Market API returned HTTP ${response.status}`
      );
    }

    const data = await response.json();

    console.log(
      "RuralAI Nexus market response:",
      data
    );

    return {
      available: data.available ?? false,
      live: data.live ?? false,
      crop: data.crop ?? cropName,

      market:
        data.market ||
        district ||
        "Local market",

      district:
        data.district ||
        district ||
        "",

      minPrice:
        data.minPrice ?? null,

      modalPrice:
        data.modalPrice ?? null,

      maxPrice:
        data.maxPrice ?? null,

      unit:
        data.unit || "₹/kg",

      source:
        data.source ||
        "RuralAI Nexus reference dataset",

      dataStatus:
        data.dataStatus ||
        "UNKNOWN",

      message:
        data.message || "",
    };
  } catch (error) {
    console.error(
      "RuralAI Nexus market service error:",
      error
    );

    return {
      available: false,
      live: false,
      crop: cropName,

      market:
        district ||
        "Local market",

      district:
        district || "",

      minPrice: null,
      modalPrice: null,
      maxPrice: null,

      unit: "₹/kg",

      source: "Market service",

      dataStatus: "UNAVAILABLE",

      message:
        error?.message ||
        "Market data is currently unavailable.",
    };
  }
}