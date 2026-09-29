export const cropData = [
  {
    name: "Groundnut",
    category: "Oilseed",

    soils: [
      "Red soil",
      "Sandy soil",
      "Loamy soil",
    ],

    water: [
      "Rainfed",
      "Borewell",
      "Open well",
      "Canal",
    ],

    minBudgetPerAcre: 14000,
    maxBudgetPerAcre: 22000,

    duration: "100–120 days",

    baseYieldPerAcre: {
      low: 700,
      high: 1100,
    },

    referencePrice: {
      value: 60,
      unit: "₹/kg",
      source: "Demo reference",
      market: "Not connected to live market data",
      lastUpdated: "2026-09-29",
    },

    risk: "Medium",

    reason:
      "Suitable for several red and sandy soil conditions and can work under rainfed or moderate irrigation.",

    growthStages: [
      "Seedling",
      "Vegetative",
      "Flowering",
      "Pod Development",
      "Maturity",
    ],

    waterRequirement: "Moderate",

    commonRisks: [
      "Water stress",
      "Leaf spot",
      "Pest infestation",
      "Excess rainfall",
    ],
  },

  {
    name: "Millets",
    category: "Cereal",

    soils: [
      "Red soil",
      "Black soil",
      "Sandy soil",
      "Loamy soil",
    ],

    water: [
      "Rainfed",
      "Borewell",
      "Open well",
    ],

    minBudgetPerAcre: 9000,
    maxBudgetPerAcre: 15000,

    duration: "90–120 days",

    baseYieldPerAcre: {
      low: 500,
      high: 900,
    },

    referencePrice: {
      value: 35,
      unit: "₹/kg",
      source: "Demo reference",
      market: "Not connected to live market data",
      lastUpdated: "2026-09-29",
    },

    risk: "Low–Medium",

    reason:
      "Generally requires less water than many conventional field crops and can be suitable for rainfed farming.",

    growthStages: [
      "Germination",
      "Vegetative",
      "Flowering",
      "Grain Filling",
      "Maturity",
    ],

    waterRequirement: "Low–Moderate",

    commonRisks: [
      "Moisture stress",
      "Bird damage",
      "Weed competition",
      "Pest infestation",
    ],
  },

  {
    name: "Maize",
    category: "Cereal",

    soils: [
      "Black soil",
      "Red soil",
      "Loamy soil",
      "Alluvial soil",
    ],

    water: [
      "Borewell",
      "Canal",
      "Drip irrigation",
    ],

    minBudgetPerAcre: 18000,
    maxBudgetPerAcre: 28000,

    duration: "90–120 days",

    baseYieldPerAcre: {
      low: 1800,
      high: 2800,
    },

    referencePrice: {
      value: 22,
      unit: "₹/kg",
      source: "Demo reference",
      market: "Not connected to live market data",
      lastUpdated: "2026-09-29",
    },

    risk: "Medium",

    reason:
      "Can perform well where adequate water and suitable soil conditions are available.",

    growthStages: [
      "Germination",
      "Vegetative",
      "Tasseling",
      "Silking",
      "Grain Filling",
      "Maturity",
    ],

    waterRequirement: "Moderate–High",

    commonRisks: [
      "Fall armyworm",
      "Water stress",
      "Waterlogging",
      "Nutrient deficiency",
    ],
  },

  {
    name: "Vegetables",
    category: "Horticulture",

    soils: [
      "Red soil",
      "Black soil",
      "Loamy soil",
      "Alluvial soil",
    ],

    water: [
      "Borewell",
      "Open well",
      "Canal",
      "Drip irrigation",
    ],

    minBudgetPerAcre: 25000,
    maxBudgetPerAcre: 40000,

    duration: "60–100 days",

    baseYieldPerAcre: {
      low: 4000,
      high: 8000,
    },

    referencePrice: {
      value: 25,
      unit: "₹/kg",
      source: "Demo reference",
      market: "Not connected to live market data",
      lastUpdated: "2026-09-29",
    },

    risk: "Medium–High",

    reason:
      "Potentially higher-value production but requires stronger water, input and market planning.",

    growthStages: [
      "Nursery / Establishment",
      "Vegetative",
      "Flowering",
      "Fruit Development",
      "Harvest",
    ],

    waterRequirement: "High",

    commonRisks: [
      "Pest infestation",
      "Fungal disease",
      "Price volatility",
      "Water stress",
      "Excess rainfall",
    ],
  },
];