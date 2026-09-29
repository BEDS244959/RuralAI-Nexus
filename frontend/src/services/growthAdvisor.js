export function generateGrowthAdvice({
  crop,
  growthStage,
  irrigation,
  pestObservation,
  rainfall,
  weather,
}) {
  const risks = [];
  const actions = [];

  // --------------------------------
  // WEATHER DATA
  // --------------------------------
  //
  // Primary source:
  // weather.current
  //
  // Fallback:
  // weather itself
  //
  // This makes the advisor tolerant of either
  // the current weatherService structure or a
  // directly supplied weather object.
  //

  const currentWeather =
    weather?.current || weather || {};

  const temperature = toNumber(
    currentWeather.temperature
  );

  const humidity = toNumber(
    currentWeather.humidity
  );

  const rain = toNumber(
    currentWeather.rain
  );

  const precipitation = toNumber(
    currentWeather.precipitation
  );

  // --------------------------------
  // IRRIGATION
  // --------------------------------

  if (irrigation === "Low") {
    risks.push({
      level: "warning",
      title: "Possible water stress",
      reason:
        "Farmer-reported irrigation is low for the current field condition.",
    });

    actions.push(
      "Check soil moisture before making the next irrigation decision."
    );
  }

  if (irrigation === "High") {
    risks.push({
      level: "warning",
      title: "Possible over-irrigation",
      reason:
        "High irrigation may increase excess-moisture risk depending on soil and rainfall.",
    });

    actions.push(
      "Check field drainage and soil moisture before adding more water."
    );
  }

  // --------------------------------
  // PEST / DISEASE OBSERVATION
  // --------------------------------

  if (pestObservation === "Yes") {
    risks.push({
      level: "high",
      title: "Pest or disease observation",
      reason:
        "The farmer reported visible pest or disease symptoms.",
    });

    actions.push(
      "Inspect affected plants and record the location and severity of symptoms."
    );

    actions.push(
      "Consult a qualified agricultural professional before applying pesticides."
    );
  }

  // --------------------------------
  // FARMER REPORTED RAINFALL
  // --------------------------------

  if (rainfall === "Heavy") {
    risks.push({
      level: "warning",
      title: "Heavy rainfall condition",
      reason:
        "The farmer reported heavy rainfall around the field.",
    });

    actions.push(
      "Check drainage, standing water and possible root-zone saturation."
    );
  }

  if (rainfall === "Low") {
    risks.push({
      level: "warning",
      title: "Low rainfall condition",
      reason:
        "The farmer reported low rainfall during the current growth period.",
    });

    actions.push(
      "Monitor soil moisture and crop wilting before making irrigation decisions."
    );
  }

  // --------------------------------
  // TEMPERATURE
  // --------------------------------

  if (temperature !== null) {
    if (temperature >= 35) {
      risks.push({
        level: "warning",
        title: "High temperature stress",
        reason:
          `Detected temperature is ${temperature} °C.`,
      });

      actions.push(
        "Monitor crop wilting and soil moisture during hotter periods."
      );
    }

    if (temperature <= 10) {
      risks.push({
        level: "warning",
        title: "Low temperature condition",
        reason:
          `Detected temperature is ${temperature} °C.`,
      });

      actions.push(
        "Monitor sensitive crop growth and unusual leaf or stem symptoms."
      );
    }
  }

  // --------------------------------
  // HUMIDITY
  // --------------------------------

  if (
    humidity !== null &&
    humidity >= 85
  ) {
    risks.push({
      level: "warning",
      title: "High humidity condition",
      reason:
        `Detected humidity is ${humidity}%.`,
    });

    actions.push(
      "Monitor leaves and crop canopy for fungal or disease symptoms."
    );
  }

  // --------------------------------
  // LIVE WEATHER RAINFALL
  // --------------------------------

  if (
    (rain !== null && rain > 10) ||
    (precipitation !== null &&
      precipitation > 10)
  ) {
    risks.push({
      level: "warning",
      title: "High recent rainfall detected",
      reason:
        "The weather service reports significant rainfall.",
    });

    actions.push(
      "Inspect drainage and standing water after rainfall."
    );
  }

  // --------------------------------
  // WEATHER + FIELD INTERACTION
  // --------------------------------

  if (
    irrigation === "Low" &&
    rainfall === "Low"
  ) {
    risks.push({
      level: "high",
      title: "Water availability concern",
      reason:
        "Both farmer-reported irrigation and rainfall are low.",
    });

    actions.push(
      "Check soil moisture before deciding whether irrigation is required."
    );
  }

  if (
    pestObservation === "Yes" &&
    humidity !== null &&
    humidity >= 80
  ) {
    risks.push({
      level: "high",
      title: "Pest observation with high humidity",
      reason:
        "Visible pest or disease symptoms were reported while humidity is elevated.",
    });

    actions.push(
      "Increase crop scouting frequency and document symptom progression."
    );
  }

  // --------------------------------
  // CROP-SPECIFIC CONTEXT
  // --------------------------------

  const selectedCrop =
    String(crop || "").toLowerCase();

  if (
    selectedCrop.includes("groundnut") &&
    humidity !== null &&
    humidity >= 80
  ) {
    risks.push({
      level: "warning",
      title: "Groundnut disease-monitoring context",
      reason:
        "Groundnut is being monitored under elevated humidity conditions.",
    });

    actions.push(
      "Monitor Groundnut leaves and canopy for developing disease symptoms."
    );
  }

  if (
    selectedCrop.includes("maize") &&
    pestObservation === "Yes"
  ) {
    risks.push({
      level: "high",
      title: "Maize pest observation",
      reason:
        "A pest observation has been reported for maize.",
    });

    actions.push(
      "Inspect leaves and growing points for visible pest damage."
    );
  }

  if (
    selectedCrop.includes("vegetable") &&
    rainfall === "Heavy"
  ) {
    risks.push({
      level: "warning",
      title: "Vegetable excess-moisture monitoring",
      reason:
        "Heavy rainfall was reported for a horticultural crop.",
    });

    actions.push(
      "Check drainage and inspect plants for disease symptoms after rainfall."
    );
  }

  // --------------------------------
  // GROWTH STAGE
  // --------------------------------

  if (growthStage) {
    actions.push(
      `Continue monitoring the crop during the ${growthStage} stage.`
    );
  }

  // --------------------------------
  // COMMON CROP RISKS
  // --------------------------------

  const cropReference =
    getCropReference(crop);

  if (cropReference?.commonRisks?.length) {
    actions.push(
      `Monitor common ${crop} risks including ${cropReference.commonRisks
        .slice(0, 3)
        .join(", ")}.`
    );
  }

  // --------------------------------
  // REMOVE DUPLICATE ACTIONS
  // --------------------------------

  const uniqueActions = [
    ...new Set(actions),
  ];

  // --------------------------------
  // STATUS
  // --------------------------------

  let status = "No Immediate Risk Flagged";

  if (risks.length === 1) {
    status = "1 Risk Flag Detected";
  }

  if (risks.length > 1) {
    status = `${risks.length} Risk Flags Detected`;
  }

  return {
    status,

    risks,

    actions: uniqueActions,

    weatherContext: {
      temperature,
      humidity,
      rain,
      precipitation,
    },

    generatedAt:
      new Date().toISOString(),
  };
}


// --------------------------------
// NUMBER NORMALIZER
// --------------------------------

function toNumber(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : null;
}


// --------------------------------
// CROP REFERENCE DATA
// --------------------------------

function getCropReference(cropName) {
  const references = {
    Groundnut: {
      commonRisks: [
        "Water stress",
        "Leaf spot",
        "Pest infestation",
        "Excess rainfall",
      ],
    },

    Millets: {
      commonRisks: [
        "Moisture stress",
        "Bird damage",
        "Weed competition",
        "Pest infestation",
      ],
    },

    Maize: {
      commonRisks: [
        "Fall armyworm",
        "Water stress",
        "Waterlogging",
        "Nutrient deficiency",
      ],
    },

    Vegetables: {
      commonRisks: [
        "Pest infestation",
        "Fungal disease",
        "Price volatility",
        "Water stress",
        "Excess rainfall",
      ],
    },
  };

  return references[cropName] || null;
}