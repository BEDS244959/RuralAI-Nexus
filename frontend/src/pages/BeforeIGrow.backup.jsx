import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Sprout,
  TrendingUp,
  Droplets,
  Wallet,
  CloudRain,
  Thermometer,
  Loader2,
  ShieldAlert,
  Info,
} from "lucide-react";

import LocationDetector from "../components/LocationDetector";
import ScenarioSimulator from "../components/ScenarioSimulator";
import { cropData } from "../data/cropData";
import { getWeather } from "../services/weatherService";
import { getMarketPrice } from "../services/marketService";
import { generateFarmAdvice } from "../services/farmAdvisor";
import { calculateCropFinance } from "../utils/farmFinance";

export default function BeforeIGrow() {
  const [location, setLocation] = useState(null);

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const [landArea, setLandArea] = useState(1);
  const [soilType, setSoilType] = useState("Red soil");
  const [waterSource, setWaterSource] = useState("Rainfed");
  const [budget, setBudget] = useState(30000);

  const [selectedCrop, setSelectedCrop] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  const [marketPrices, setMarketPrices] = useState({});
  const [marketLoading, setMarketLoading] = useState(false);

  const detectLocationAndWeather = async (detectedLocation) => {
    setLocation(detectedLocation);
    setWeatherError("");

    if (
      detectedLocation?.latitude == null ||
      detectedLocation?.longitude == null
    ) {
      return;
    }

    try {
      setWeatherLoading(true);

      const weatherData = await getWeather(
        detectedLocation.latitude,
        detectedLocation.longitude
      );

      setWeather(weatherData);
    } catch (error) {
      console.error(error);

      setWeatherError(
        "Location was detected, but weather information could not be loaded."
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  const loadMarketPrices = async (district = "") => {
    try {
      setMarketLoading(true);

      const results = {};

      for (const crop of cropData) {
        try {
          const marketData = await getMarketPrice({
            cropName: crop.name,
            district,
          });

          results[crop.name] = marketData;
        } catch (error) {
          console.error(
            `Market data error for ${crop.name}:`,
            error
          );

          results[crop.name] = {
            available: false,
            live: false,
            crop: crop.name,
            district,
            minPrice: null,
            modalPrice: null,
            maxPrice: null,
            unit: "₹/kg",
            source: "Market service",
            dataStatus: "UNAVAILABLE",
            message: "Market data is currently unavailable.",
          };
        }
      }

      setMarketPrices(results);
    } finally {
      setMarketLoading(false);
    }
  };

  const analyzeFarm = async () => {
    setAnalyzed(true);

    await loadMarketPrices(
      location?.district || ""
    );
  };

  const recommendations = useMemo(() => {
    if (!analyzed) {
      return [];
    }

    return cropData.map((crop) => {
      let compatibilityScore = 0;

      if (crop.soils?.includes(soilType)) {
        compatibilityScore += 50;
      }

      if (crop.water?.includes(waterSource)) {
        compatibilityScore += 30;
      }

      const estimatedCost =
        (crop.minBudgetPerAcre || 0) *
        Number(landArea || 0);

      if (Number(budget) >= estimatedCost) {
        compatibilityScore += 20;
      }

      const marketData =
        marketPrices[crop.name];

      const price =
        Number(marketData?.modalPrice) ||
        Number(crop.referencePrice?.value) ||
        0;

      const finance = calculateCropFinance({
        area: Number(landArea) || 0,

        estimatedCost:
          (crop.minBudgetPerAcre || 0) *
          (Number(landArea) || 0),

        lowYield:
          (crop.baseYieldPerAcre?.low || 0) *
          (Number(landArea) || 0),

        highYield:
          (crop.baseYieldPerAcre?.high || 0) *
          (Number(landArea) || 0),

        pricePerKg: price,

        budget:
          Number(budget) || 0,
      });

      const farmAdvice =
        generateFarmAdvice({
          crop,
          landArea,
          waterSource,
          soilType,
          budget,
          location,
          weather,
          marketData,
        });

      return {
        ...crop,

        compatibilityScore,

        finance,

        marketData,

        farmAdvice,
      };
    });
  }, [
    analyzed,
    landArea,
    soilType,
    waterSource,
    budget,
    location,
    weather,
    marketPrices,
  ]);

  const sortedRecommendations =
    useMemo(() => {
      return [...recommendations].sort(
        (a, b) =>
          b.compatibilityScore -
          a.compatibilityScore
      );
    }, [recommendations]);

  return (
    <div className="min-h-screen bg-[#f4f7f4]">

      {/* HEADER */}

      <div className="border-b border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-sm">
                  <Sprout size={25} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Before I Grow
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    AI-assisted crop planning and farm financial
                    decision support
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">

              <p className="text-xs font-medium uppercase tracking-wide text-green-700">
                Decision Support
              </p>

              <p className="mt-1 text-sm font-semibold text-green-900">
                Plan before committing resources
              </p>

            </div>

          </div>

        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

        {/* LOCATION */}

        <section>
          <LocationDetector
            onLocationDetected={
              detectLocationAndWeather
            }
          />
        </section>

        {/* LOCATION SUMMARY */}

        {location && (
          <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                <MapPin
                  className="text-green-700"
                  size={22}
                />
              </div>

              <div className="flex-1">

                <h2 className="text-lg font-bold text-gray-900">
                  Hyper-local Farm Context
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your detected location is used as context
                  for weather and market-reference analysis.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  <ContextCard
                    label="Village / Town"
                    value={location.village}
                  />

                  <ContextCard
                    label="Taluk"
                    value={location.taluk}
                  />

                  <ContextCard
                    label="District"
                    value={location.district}
                  />

                  <ContextCard
                    label="State"
                    value={location.state}
                  />

                </div>

              </div>

            </div>

          </section>
        )}

        {/* WEATHER */}

        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <CloudRain
                  className="text-blue-600"
                  size={22}
                />
              </div>

              <div>

                <h2 className="text-lg font-bold text-gray-900">
                  Hyper-local Weather
                </h2>

                <p className="text-sm text-gray-500">
                  Weather context from the detected farm coordinates
                </p>

              </div>

            </div>

            {weatherLoading && (
              <Loader2
                size={22}
                className="animate-spin text-blue-600"
              />
            )}

          </div>

          {weatherError && (
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">

              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{weatherError}</span>

            </div>
          )}

          {!weather &&
            !weatherLoading &&
            !weatherError && (
              <div className="mt-5 rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
                Detect your farm location to load weather context.
              </div>
            )}

          {weather && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <WeatherCard
                icon={<Thermometer size={20} />}
                label="Temperature"
                value={`${weather.current?.temperature ?? "—"} °C`}
              />

              <WeatherCard
                icon={<Droplets size={20} />}
                label="Humidity"
                value={`${weather.current?.humidity ?? "—"}%`}
              />

              <WeatherCard
                icon={<CloudRain size={20} />}
                label="Rain"
                value={`${weather.current?.rain ?? "—"} mm`}
              />

              <WeatherCard
                icon={<CloudRain size={20} />}
                label="Precipitation"
                value={`${weather.current?.precipitation ?? "—"} mm`}
              />

            </div>
          )}

        </section>

        {/* FARM INPUTS */}

        <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <Sprout
                className="text-green-700"
                size={22}
              />
            </div>

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                Farm Inputs
              </h2>

              <p className="text-sm text-gray-500">
                Enter the conditions you know before making
                a crop decision.
              </p>

            </div>

          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <InputField
              label="Land Area (acres)"
              type="number"
              min="0.1"
              step="0.1"
              value={landArea}
              onChange={(e) =>
                setLandArea(e.target.value)
              }
            />

            <InputField
              label="Available Budget (₹)"
              type="number"
              min="0"
              step="1000"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            />

            <SelectField
              label="Soil Type"
              value={soilType}
              onChange={(e) =>
                setSoilType(e.target.value)
              }
              options={[
                "Red soil",
                "Black soil",
                "Sandy soil",
                "Loamy soil",
                "Alluvial soil",
              ]}
            />

            <SelectField
              label="Water Source"
              value={waterSource}
              onChange={(e) =>
                setWaterSource(e.target.value)
              }
              options={[
                "Rainfed",
                "Borewell",
                "Open well",
                "Canal",
                "Drip irrigation",
              ]}
            />

          </div>

          <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-4">

            <div className="flex items-start gap-3">

              <Info
                size={18}
                className="mt-0.5 shrink-0 text-green-700"
              />

              <div>

                <p className="text-sm font-semibold text-green-900">
                  What the system will analyse
                </p>

                <p className="mt-1 text-sm leading-6 text-green-800">
                  Crop compatibility, estimated cultivation cost,
                  budget coverage, yield scenarios, reference market
                  price, weather context and crop-specific risks.
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={analyzeFarm}
            disabled={marketLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >

            {marketLoading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Analysing Farm...
              </>
            ) : (
              <>
                <TrendingUp size={18} />

                Analyse My Farm
              </>
            )}

          </button>

        </section>

        {/* RESULTS */}

        {analyzed && (
          <section>

            <div className="mb-5">

              <h2 className="text-xl font-bold text-gray-900">
                Crop Decision Support
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                These are scenario-based reference calculations,
                not guaranteed outcomes.
              </p>

            </div>

            <div className="space-y-6">

              {sortedRecommendations.map(
                (crop) => (
                  <CropResult
                    key={crop.name}
                    crop={crop}
                    selectedCrop={selectedCrop}
                    setSelectedCrop={
                      setSelectedCrop
                    }
                  />
                )
              )}

            </div>

          </section>
        )}

        {/* DISCLAIMER */}

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

          <div className="flex items-start gap-3">

            <ShieldAlert
              size={20}
              className="mt-0.5 shrink-0 text-amber-700"
            />

            <div>

              <h3 className="text-sm font-bold text-amber-900">
                Decision-support notice
              </h3>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                RuralAI Nexus provides informational decision support
                using farmer-entered information, crop reference data,
                weather information and available market-reference
                data. Cost, yield, revenue and ROI figures are
                estimates based on stated assumptions and are not
                guarantees. Market values shown as demo/reference data
                should not be treated as live local mandi prices.
                Farmers should verify important decisions with local
                agricultural experts and current market information.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   CROP RESULT
========================================================= */

function CropResult({
  crop,
  selectedCrop,
  setSelectedCrop,
}) {
  const finance = crop.finance;
  const marketData = crop.marketData;
  const farmAdvice = crop.farmAdvice;

  const isSelected =
    selectedCrop === crop.name;

  const scoreTotal =
    farmAdvice?.score?.total ??
    0;

  const scoreMaximum =
    farmAdvice?.score?.maximum ??
    0;

  const scorePercentage =
    farmAdvice?.score?.percentage ??
    0;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* CROP HEADER */}

      <div className="border-b border-gray-100 p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Sprout
                className="text-green-700"
                size={24}
              />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h3 className="text-xl font-bold text-gray-900">
                  {crop.name}
                </h3>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {crop.category}
                </span>

              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                {crop.reason}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-center">

              <p className="text-xs text-green-700">
                Decision Support
              </p>

              <p className="mt-1 text-2xl font-bold text-green-800">
                {scorePercentage}%
              </p>

              <p className="mt-1 text-xs text-green-700">
                {scoreTotal}/{scoreMaximum}
              </p>

            </div>

            <button
              onClick={() =>
                setSelectedCrop(
                  isSelected
                    ? null
                    : crop.name
                )
              }
              className="rounded-xl border border-green-200 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              {isSelected
                ? "Hide Details"
                : "View Details"}
            </button>

          </div>

        </div>

      </div>


      {/* QUICK INFO */}

      <div className="grid border-b border-gray-100 sm:grid-cols-2 lg:grid-cols-4">

        <InfoItem
          label="Estimated Cost"
          value={money(finance.estimatedCost)}
          icon={<Wallet size={18} />}
        />

        <InfoItem
          label="Yield Range"
          value={`${number(
            finance.lowYield
          )}–${number(
            finance.highYield
          )} kg`}
          icon={<Sprout size={18} />}
        />

        <InfoItem
          label="Market Reference"
          value={`${money(
            marketData?.modalPrice ??
              crop.referencePrice?.value ??
              0
          )}/kg`}
          icon={<IndianRupee size={18} />}
        />

        <InfoItem
          label="Duration"
          value={crop.duration}
          icon={<TrendingUp size={18} />}
        />

      </div>


      {/* FINANCIAL SCENARIO */}

      <div className="p-6">

        <div className="flex items-center gap-2">

          <IndianRupee
            size={20}
            className="text-green-700"
          />

          <h4 className="text-base font-bold text-gray-900">
            Financial Scenario
          </h4>

        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <FinanceCard
            label="Low Revenue"
            value={money(
              finance.lowRevenue
            )}
          />

          <FinanceCard
            label="High Revenue"
            value={money(
              finance.highRevenue
            )}
          />

          <FinanceCard
            label="Low Net"
            value={money(
              finance.lowNet
            )}
          />

          <FinanceCard
            label="High Net"
            value={money(
              finance.highNet
            )}
          />

        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <FinanceCard
            label="Funding Gap"
            value={money(
              finance.fundingGap
            )}
            warning={
              finance.fundingGap > 0
            }
          />

          <FinanceCard
            label="Break-even Price"
            value={`${money(
              finance.breakEvenPrice
            )}/kg`}
          />

          <FinanceCard
            label="ROI Range"
            value={`${formatPercent(
              finance.roiLow
            )} – ${formatPercent(
              finance.roiHigh
            )}`}
          />

        </div>

      </div>


      {/* MARKET INTELLIGENCE */}

      <div className="border-t border-gray-100 bg-gray-50 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h4 className="text-base font-bold text-gray-900">
              Market Intelligence
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Market information used in the financial scenario.
            </p>

          </div>

          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              marketData?.live
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {marketData?.live
              ? "Live"
              : "Reference Data"}
          </div>

        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <ContextCard
            label="Reference Market"
            value={
              marketData?.referenceMarket ||
              marketData?.market ||
              "Not available"
            }
          />

          <ContextCard
            label="Requested District"
            value={
              marketData?.requestedDistrict ||
              marketData?.district ||
              "Not available"
            }
          />

          <ContextCard
            label="Price Range"
            value={
              marketData &&
              marketData.minPrice != null &&
              marketData.maxPrice != null
                ? `${money(
                    marketData.minPrice
                  )} – ${money(
                    marketData.maxPrice
                  )}/kg`
                : "Not available"
            }
          />

          <ContextCard
            label="Modal Reference"
            value={
              marketData?.modalPrice != null
                ? `${money(
                    marketData.modalPrice
                  )}/kg`
                : "Not available"
            }
          />

        </div>

        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">

          <div className="grid gap-3 sm:grid-cols-3">

            <div>

              <p className="text-xs uppercase tracking-wide text-gray-400">
                Source
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800">
                {marketData?.source ||
                  crop.referencePrice?.source ||
                  "Not available"}
              </p>

            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-gray-400">
                Location Match
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800">
                {marketData?.marketLocationMatch
                  ? "Reference market matches"
                  : "Not verified for farm location"}
              </p>

            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-gray-400">
                Data Status
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800">
                {marketData?.live
                  ? "Live market data"
                  : "Demo/reference data"}
              </p>

            </div>

          </div>

        </div>

        {!marketData?.live && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">

            <p className="text-sm font-semibold text-amber-900">
              Market data limitation
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              The displayed market value is reference/demo data.
              It is not a live mandi price and has not been
              verified for the detected farm location.
            </p>

          </div>
        )}

      </div>


      {/* AI FARM DECISION SUPPORT */}

      {farmAdvice && (
        <div className="border-t border-green-100 bg-green-50 p-6">

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white">
              <Sprout size={21} />
            </div>

            <div className="flex-1">

              <h4 className="text-lg font-bold text-green-900">
                AI Farm Decision Support
              </h4>

              <p className="mt-1 text-sm leading-6 text-green-800">
                {farmAdvice.overallMessage ||
                  "The system generated a decision-support profile using your farm inputs and available reference data."}
              </p>

            </div>

          </div>


          {/* SCORE */}

          <div className="mt-5 rounded-xl border border-green-200 bg-white p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-900">
                  Reference Score
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Internal decision-support indicator
                </p>

              </div>

              <div className="text-right">

                <p className="text-3xl font-bold text-green-700">
                  {scorePercentage}%
                </p>

                <p className="text-sm text-gray-500">
                  {scoreTotal}/{scoreMaximum}
                </p>

              </div>

            </div>

          </div>


          {/* SCORE BREAKDOWN */}

          {farmAdvice.scoreBreakdown && (
            <div className="mt-5">

              <h5 className="text-sm font-bold text-gray-900">
                Why this score?
              </h5>

              <p className="mt-1 text-sm text-gray-600">
                The score is an internal decision-support indicator
                based on the factors currently available to the system.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                <ScoreItem
                  label="Soil Compatibility"
                  value={
                    farmAdvice.scoreBreakdown
                      .soilCompatibility
                  }
                  maximum={50}
                />

                <ScoreItem
                  label="Water Compatibility"
                  value={
                    farmAdvice.scoreBreakdown
                      .waterCompatibility
                  }
                  maximum={30}
                />

                <ScoreItem
                  label="Budget Coverage"
                  value={
                    farmAdvice.scoreBreakdown
                      .budgetCoverage
                  }
                  maximum={20}
                />

                <ScoreItem
                  label="Weather Context"
                  value={
                    farmAdvice.scoreBreakdown
                      .weatherContext
                  }
                  maximum={10}
                />

                <ScoreItem
                  label="Risk Context"
                  value={
                    farmAdvice.scoreBreakdown
                      .riskContext
                  }
                  maximum={10}
                />

                <ScoreItem
                  label="Market Context"
                  value={
                    farmAdvice.scoreBreakdown
                      .marketContext
                  }
                  maximum={5}
                />

              </div>

            </div>
          )}


          {/* DECISION SIGNALS */}

          {Array.isArray(
            farmAdvice.decisionSignals
          ) &&
            farmAdvice.decisionSignals.length >
              0 && (
              <div className="mt-6">

                <h5 className="text-sm font-bold text-gray-900">
                  Key Decision Signals
                </h5>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">

                  {farmAdvice.decisionSignals.map(
                    (signal, index) => (
                      <div
                        key={`${signal}-${index}`}
                        className="rounded-xl border border-green-100 bg-white p-4"
                      >

                        <div className="flex items-start gap-3">

                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0 text-green-600"
                          />

                          <p className="text-sm leading-6 text-gray-700">
                            {typeof signal ===
                            "string"
                              ? signal
                              : signal?.message ||
                                signal?.text ||
                                JSON.stringify(
                                  signal
                                )}
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>
            )}


          {/* ADVISORY SIGNALS */}

          {Array.isArray(
            farmAdvice.advice
          ) &&
            farmAdvice.advice.length > 0 && (
              <div className="mt-6">

                <h5 className="text-sm font-bold text-gray-900">
                  Advisory Signals
                </h5>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">

                  {farmAdvice.advice.map(
                    (item, index) => (
                      <AdvisoryItem
                        key={`${item?.title || "advice"}-${index}`}
                        item={item}
                      />
                    )
                  )}

                </div>

              </div>
            )}


          {/* ASSUMPTIONS */}

          {Array.isArray(
            farmAdvice.assumptions
          ) &&
            farmAdvice.assumptions.length >
              0 && (
              <div className="mt-6 rounded-xl border border-green-200 bg-white p-5">

                <div className="flex items-start gap-3">

                  <Info
                    size={18}
                    className="mt-0.5 shrink-0 text-green-700"
                  />

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      Analysis Assumptions
                    </p>

                    <ul className="mt-2 space-y-2">

                      {farmAdvice.assumptions.map(
                        (assumption, index) => (
                          <li
                            key={index}
                            className="text-sm leading-6 text-gray-600"
                          >
                            •{" "}
                            {typeof assumption ===
                            "string"
                              ? assumption
                              : JSON.stringify(
                                  assumption
                                )}
                          </li>
                        )
                      )}

                    </ul>

                  </div>

                </div>

              </div>
            )}


          <div className="mt-5 rounded-xl border border-green-200 bg-white p-4">

            <div className="flex items-start gap-3">

              <Info
                size={18}
                className="mt-0.5 shrink-0 text-green-700"
              />

              <div>

                <p className="text-sm font-semibold text-gray-900">
                  How RuralAI Nexus generates this guidance
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  The system combines farmer-entered farm information,
                  crop reference rules, budget coverage, weather
                  context and available market-reference data.
                  Each factor is displayed separately so the farmer
                  can understand the basis of the decision-support
                  result.
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  This score is a decision-support indicator, not
                  a prediction or guarantee of crop success. It is
                  not a scientifically validated crop suitability
                  score.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* DETAILS */}

      {isSelected && (
        <div className="border-t border-gray-100 p-6">

          <div className="grid gap-6 lg:grid-cols-3">

            <DetailList
              title="Suitable Soils"
              items={crop.soils}
            />

            <DetailList
              title="Water Sources"
              items={crop.water}
            />

            <DetailList
              title="Common Risks"
              items={crop.commonRisks}
            />

          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

            <div className="flex items-start gap-3">

              <Droplets
                size={20}
                className="mt-0.5 shrink-0 text-blue-700"
              />

              <div>

                <p className="text-sm font-bold text-blue-900">
                  Water Requirement
                </p>

                <p className="mt-1 text-sm text-blue-800">
                  {crop.waterRequirement}
                </p>

              </div>

            </div>

          </div>

          <div className="mt-6">
            <ScenarioSimulator
              crop={crop}
            />
          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   ADVISORY ITEM
========================================================= */

function AdvisoryItem({ item }) {
  if (!item) {
    return null;
  }

  const dotClass =
    item.type === "warning"
      ? "bg-amber-500"
      : item.type === "positive"
      ? "bg-green-600"
      : item.type === "risk"
      ? "bg-red-500"
      : item.type === "market"
      ? "bg-purple-500"
      : "bg-blue-500";

  return (
    <div className="rounded-xl border border-green-100 bg-white p-4">

      <div className="flex items-start gap-3">

        <div
          className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`}
        />

        <div>

          <p className="text-sm font-semibold text-gray-900">
            {item.title || "Advisory"}
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            {item.message ||
              item.text ||
              ""}
          </p>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SCORE ITEM
========================================================= */

function ScoreItem({
  label,
  value,
  maximum,
}) {
  const safeValue =
    Number(value) || 0;

  const safeMaximum =
    Number(maximum) || 0;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-gray-900">
        {safeValue}/{safeMaximum}
      </p>

    </div>
  );
}


/* =========================================================
   CONTEXT CARD
========================================================= */

function ContextCard({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value || "Not available"}
      </p>

    </div>
  );
}


/* =========================================================
   WEATHER CARD
========================================================= */

function WeatherCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

      <div className="flex items-center gap-2 text-blue-700">

        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>

      </div>

      <p className="mt-3 text-xl font-bold text-gray-900">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  label,
  value,
  icon,
}) {
  return (
    <div className="border-b border-gray-100 p-5 lg:border-r">

      <div className="flex items-center gap-2 text-gray-500">

        {icon}

        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>

      </div>

      <p className="mt-2 text-base font-bold text-gray-900">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   FINANCE CARD
========================================================= */

function FinanceCard({
  label,
  value,
  warning = false,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        warning
          ? "border-amber-200 bg-amber-50"
          : "border-gray-100 bg-gray-50"
      }`}
    >

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-bold ${
          warning
            ? "text-amber-800"
            : "text-gray-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   DETAIL LIST
========================================================= */

function DetailList({
  title,
  items = [],
}) {
  return (
    <div>

      <h4 className="text-sm font-bold text-gray-900">
        {title}
      </h4>

      <div className="mt-3 space-y-2">

        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2"
          >

            <CheckCircle2
              size={15}
              className="shrink-0 text-green-600"
            />

            <span className="text-sm text-gray-700">
              {item}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}


/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  type,
  value,
  onChange,
  min,
  step,
}) {
  return (
    <div>

      <label className="text-sm font-semibold text-gray-800">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />

    </div>
  );
}


/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="text-sm font-semibold text-gray-800">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


/* =========================================================
   HELPERS
========================================================= */

function money(value) {
  return (
    "₹" +
    Math.round(
      Number(value) || 0
    ).toLocaleString("en-IN")
  );
}

function number(value) {
  return Math.round(
    Number(value) || 0
  ).toLocaleString("en-IN");
}

function formatPercent(value) {
  return `${Number(
    value || 0
  ).toFixed(1)}%`;
}