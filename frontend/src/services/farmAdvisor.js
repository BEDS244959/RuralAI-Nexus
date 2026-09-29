export function generateFarmAdvice({
  crop,
  landArea,
  waterSource,
  soilType,
  budget,
  location,
  weather,
  marketData,
}) {
  const advice = [];

  const area = Number(landArea) || 0;
  const availableBudget = Number(budget) || 0;

  const estimatedCost =
    (crop.minBudgetPerAcre || 0) * area;

  const scoreBreakdown = {
    soilCompatibility: 0,
    waterCompatibility: 0,
    budgetCoverage: 0,
    weatherContext: 0,
    riskContext: 0,
    marketContext: 0,
  };

  // -------------------------------------------------------
  // SOIL COMPATIBILITY
  // -------------------------------------------------------

  const soilCompatible =
    crop.soils?.includes(soilType);

  if (soilCompatible) {
    scoreBreakdown.soilCompatibility = 50;

    advice.push({
      type: "positive",
      title: "Soil compatibility",
      message:
        `${soilType} is included in the reference soil conditions for ${crop.name}.`,
    });
  } else {
    advice.push({
      type: "warning",
      title: "Soil requires review",
      message:
        `${soilType} is not included in the current reference soil conditions for ${crop.name}. Soil suitability should be verified locally before cultivation.`,
    });
  }

  // -------------------------------------------------------
  // WATER COMPATIBILITY
  // -------------------------------------------------------

  const waterCompatible =
    crop.water?.includes(waterSource);

  if (waterCompatible) {
    scoreBreakdown.waterCompatibility = 30;

    advice.push({
      type: "positive",
      title: "Water compatibility",
      message:
        `${waterSource} is included in the reference water sources for ${crop.name}.`,
    });
  } else {
    advice.push({
      type: "warning",
      title: "Water availability requires review",
      message:
        `${waterSource} is not included in the current reference water sources for ${crop.name}.`,
    });
  }

  // -------------------------------------------------------
  // BUDGET COVERAGE
  // -------------------------------------------------------

  if (availableBudget >= estimatedCost) {
    scoreBreakdown.budgetCoverage = 20;

    advice.push({
      type: "positive",
      title: "Budget coverage",
      message:
        `Your stated budget covers the estimated reference cultivation cost of ${formatMoney(
          estimatedCost
        )}.`,
    });
  } else {
    const fundingGap =
      estimatedCost - availableBudget;

    advice.push({
      type: "warning",
      title: "Funding gap",
      message:
        `The estimated reference cultivation cost is ${formatMoney(
          estimatedCost
        )}, which is ${formatMoney(
          fundingGap
        )} above the stated budget.`,
    });
  }

  // -------------------------------------------------------
  // LOCATION CONTEXT
  // -------------------------------------------------------

  if (location?.district) {
    advice.push({
      type: "location",
      title: "Location detected",
      message:
        `The analysis is associated with ${location.district}, ${location.state || ""}.`,
    });
  }

  if (location?.village) {
    advice.push({
      type: "location",
      title: "Farm-level location context",
      message:
        `The detected farm location is ${location.village}${
          location.district
            ? `, ${location.district}`
            : ""
        }.`,
    });
  }

  // -------------------------------------------------------
  // WEATHER CONTEXT
  // -------------------------------------------------------

  const temperature =
    Number(weather?.current?.temperature);

  const humidity =
    Number(weather?.current?.humidity);

  const rain =
    Number(weather?.current?.rain);

  const precipitation =
    Number(weather?.current?.precipitation);

  if (Number.isFinite(temperature)) {
    advice.push({
      type: "weather",
      title: "Temperature context",
      message:
        `The detected temperature is ${temperature} °C and is being included as environmental context.`,
    });

    scoreBreakdown.weatherContext += 5;
  }

  if (
    Number.isFinite(humidity) &&
    humidity >= 85
  ) {
    advice.push({
      type: "warning",
      title: "High humidity context",
      message:
        `Humidity is ${humidity}%. Disease monitoring may require additional attention.`,
    });

    scoreBreakdown.riskContext -= 3;
  } else if (
    Number.isFinite(humidity) &&
    humidity > 0
  ) {
    scoreBreakdown.weatherContext += 2;
  }

  if (
    Number.isFinite(rain) &&
    rain > 10
  ) {
    advice.push({
      type: "warning",
      title: "Recent rainfall context",
      message:
        `The weather service reports ${rain} mm of rain. Drainage and excess moisture should be monitored.`,
    });

    scoreBreakdown.riskContext -= 3;
  } else if (
    Number.isFinite(rain) &&
    rain >= 0
  ) {
    scoreBreakdown.weatherContext += 2;
  }

  if (
    Number.isFinite(precipitation) &&
    precipitation > 10
  ) {
    advice.push({
      type: "warning",
      title: "Precipitation context",
      message:
        `Current weather data reports ${precipitation} mm of precipitation. Field moisture conditions should be monitored.`,
    });
  }

  // -------------------------------------------------------
  // CROP RISK CONTEXT
  // -------------------------------------------------------

  if (crop.commonRisks?.length) {
    advice.push({
      type: "risk",
      title: "Crop-specific monitoring",
      message:
        `${crop.name} has reference risks including ${crop.commonRisks
          .slice(0, 3)
          .join(", ")}.`,
    });

    scoreBreakdown.riskContext += 5;
  }

  // -------------------------------------------------------
  // MARKET CONTEXT
  //
  // IMPORTANT:
  // Reference/demo prices are useful for financial
  // scenarios, but they are NOT treated as verified
  // live-market evidence.
  // -------------------------------------------------------

  const marketAvailable =
    marketData?.available === true;

  const marketIsLive =
    marketData?.live === true;

  const modalPrice =
    Number(marketData?.modalPrice);

  if (
    marketAvailable &&
    Number.isFinite(modalPrice) &&
    modalPrice > 0
  ) {
    advice.push({
      type: "market",
      title: "Market reference",
      message:
        `The financial scenario currently uses ${formatMoney(
          modalPrice
        )}/kg as the ${
          marketIsLive
            ? "live market"
            : "reference/demo market"
        } price.`,
    });

    if (marketIsLive) {
      scoreBreakdown.marketContext = 5;

      advice.push({
        type: "positive",
        title: "Market data status",
        message:
          "The displayed market value is marked as live market data.",
      });
    } else {
      // Reference data is shown and used financially,
      // but it does not receive a live-market score.
      scoreBreakdown.marketContext = 0;

      advice.push({
        type: "warning",
        title: "Market data status",
        message:
          "The displayed market value is reference/demo data and should not be treated as a live local mandi price.",
      });
    }
  } else {
    scoreBreakdown.marketContext = 0;

    advice.push({
      type: "warning",
      title: "Market data unavailable",
      message:
        "No verified market value was available for this analysis. Financial calculations should use clearly labelled reference assumptions only.",
    });
  }

  // -------------------------------------------------------
  // KEEP SCORE COMPONENTS WITHIN THEIR RANGES
  // -------------------------------------------------------

  scoreBreakdown.weatherContext =
    Math.max(
      0,
      Math.min(
        10,
        scoreBreakdown.weatherContext
      )
    );

  scoreBreakdown.riskContext =
    Math.max(
      0,
      Math.min(
        10,
        scoreBreakdown.riskContext
      )
    );

  // -------------------------------------------------------
  // TOTAL DECISION-SUPPORT SCORE
  // -------------------------------------------------------

  const totalScore =
    scoreBreakdown.soilCompatibility +
    scoreBreakdown.waterCompatibility +
    scoreBreakdown.budgetCoverage +
    scoreBreakdown.weatherContext +
    scoreBreakdown.riskContext +
    scoreBreakdown.marketContext;

  const maximumScore = 120;

  let overallMessage =
    `The system generated a decision-support profile for ${crop.name} using your farm inputs and available reference data.`;

  if (availableBudget < estimatedCost) {
    overallMessage +=
      " The current budget indicates a funding gap that should be addressed before committing to cultivation.";
  }

  if (!soilCompatible) {
    overallMessage +=
      " Soil suitability requires additional local verification.";
  }

  if (!waterCompatible) {
    overallMessage +=
      " Water availability requires additional review.";
  }

  if (!marketAvailable) {
    overallMessage +=
      " Verified market data was not available for this analysis.";
  } else if (!marketIsLive) {
    overallMessage +=
      " Market information is based on reference/demo data rather than live mandi data.";
  }

  // -------------------------------------------------------
  // DECISION SIGNALS
  // -------------------------------------------------------

  const decisionSignals = [];

  if (soilCompatible) {
    decisionSignals.push(
      "Soil condition matches the current crop reference."
    );
  } else {
    decisionSignals.push(
      "Soil condition needs verification."
    );
  }

  if (waterCompatible) {
    decisionSignals.push(
      "Water source is included in the crop reference."
    );
  } else {
    decisionSignals.push(
      "Water availability needs verification."
    );
  }

  if (availableBudget >= estimatedCost) {
    decisionSignals.push(
      "Available budget covers the reference cultivation cost."
    );
  } else {
    decisionSignals.push(
      "Available budget does not cover the reference cultivation cost."
    );
  }

  if (Number.isFinite(temperature)) {
    decisionSignals.push(
      "Current temperature has been included as weather context."
    );
  }

  if (
    Number.isFinite(humidity) &&
    humidity >= 85
  ) {
    decisionSignals.push(
      "High humidity requires additional monitoring."
    );
  }

  if (marketAvailable && !marketIsLive) {
    decisionSignals.push(
      "Market price is a reference assumption rather than verified live market data."
    );
  }

  if (!marketAvailable) {
    decisionSignals.push(
      "Market data was unavailable and should be verified separately."
    );
  }

  // -------------------------------------------------------
  // RETURN DECISION-SUPPORT RESULT
  // -------------------------------------------------------

  return {
    crop: crop.name,

    area,

    overallMessage,

    advice,

    score: {
      total: totalScore,
      maximum: maximumScore,
      percentage:
        (totalScore / maximumScore) * 100,
    },

    scoreBreakdown,

    decisionSignals,

    assumptions: {
      estimatedCost,
      landArea: area,
      budget: availableBudget,
      weatherAvailable: Boolean(weather),
      marketDataAvailable: marketAvailable,
      marketDataIsLive: marketIsLive,
    },

    generatedAt:
      new Date().toISOString(),
  };
}


// ---------------------------------------------------------
// MONEY FORMATTER
// ---------------------------------------------------------

function formatMoney(value) {
  return (
    "₹" +
    Math.round(
      Number(value) || 0
    ).toLocaleString("en-IN")
  );
}