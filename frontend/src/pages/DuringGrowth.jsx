import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  CloudRain,
  Droplets,
  Info,
  Loader2,
  MapPin,
  Sprout,
  Thermometer,
  TrendingUp,
  Bug,
  CloudSun,
} from "lucide-react";

import LocationDetector from "../components/LocationDetector";
import { cropData } from "../data/cropData";
import { getWeather } from "../services/weatherService";
import { generateGrowthAdvice } from "../services/growthAdvisor";

export default function DuringGrowth() {
  const [crop, setCrop] = useState("Groundnut");
  const [growthStage, setGrowthStage] = useState("Seedling");
  const [irrigation, setIrrigation] = useState("Normal");
  const [pestObservation, setPestObservation] = useState("No");
  const [rainfall, setRainfall] = useState("Normal");

  const [location, setLocation] = useState(null);

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const selectedCrop = cropData.find(
    (item) => item.name === crop
  );

  // --------------------------------
  // LOAD WEATHER
  // --------------------------------

  const loadWeather = async (detectedLocation) => {
    if (
      detectedLocation?.latitude === undefined ||
      detectedLocation?.longitude === undefined
    ) {
      return;
    }

    setWeatherLoading(true);
    setWeatherError("");
    setAnalysis(null);

    try {
      const data = await getWeather(
        detectedLocation.latitude,
        detectedLocation.longitude
      );

      setWeather(data);
    } catch (error) {
      console.error("During Growth weather error:", error);

      setWeather(null);

      setWeatherError(
        "Weather information could not be loaded. Please try again."
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  // --------------------------------
  // LOCATION DETECTED
  // --------------------------------

  const handleLocationDetected = (detectedLocation) => {
    setLocation(detectedLocation);

    loadWeather(detectedLocation);
  };

  // --------------------------------
  // CROP CHANGE
  // --------------------------------

  const handleCropChange = (value) => {
    setCrop(value);

    const newCrop = cropData.find(
      (item) => item.name === value
    );

    if (newCrop?.growthStages?.length) {
      setGrowthStage(newCrop.growthStages[0]);
    }

    setAnalysis(null);
  };

  // --------------------------------
  // ANALYZE FIELD
  // --------------------------------
  //
  // IMPORTANT:
  // The weather service returns:
  //
  // weather.current.temperature
  // weather.current.humidity
  // weather.current.rain
  // weather.current.precipitation
  //
  // We explicitly pass those values to the
  // advisory engine so Weather Context Used
  // cannot lose the data.
  //

  const analyzeField = () => {
    if (!weather) {
      setAnalysis({
        status: "Weather Data Not Available",

        risks: [],

        actions: [
          "Please detect your location and wait for weather data before analyzing the crop condition.",
        ],

        weatherContext: {
          temperature: null,
          humidity: null,
          rain: null,
          precipitation: null,
        },

        generatedAt: new Date().toISOString(),
      });

      return;
    }

    const normalizedWeather = {
      current: {
        temperature:
          weather.current?.temperature ?? null,

        humidity:
          weather.current?.humidity ?? null,

        rain:
          weather.current?.rain ?? null,

        precipitation:
          weather.current?.precipitation ?? null,
      },

      daily: weather.daily || {},

      timezone: weather.timezone || null,
    };

    const result = generateGrowthAdvice({
      crop,
      growthStage,
      irrigation,
      pestObservation,
      rainfall,
      weather: normalizedWeather,
    });

    setAnalysis(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="border-b border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Sprout
                    size={26}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    During Growth
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Monitor crop conditions and identify
                    explainable field-level risk signals.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-green-700">
                Decision Support
              </p>

              <p className="mt-1 text-sm font-semibold text-green-900">
                Crop Health Monitoring
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* LOCATION */}
        <section>
          <LocationDetector
            onLocationDetected={handleLocationDetected}
          />
        </section>

        {/* LOCATION + WEATHER STATUS */}
        {location && (
          <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin
                size={21}
                className="text-green-700"
              />

              <div>
                <h2 className="font-bold text-gray-900">
                  Hyper-Local Farm Context
                </h2>

                <p className="text-sm text-gray-500">
                  Weather information is linked to the detected
                  coordinates.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ContextCard
                label="Village / Town"
                value={
                  location.village ||
                  "Not available"
                }
              />

              <ContextCard
                label="Taluk"
                value={
                  location.taluk ||
                  "Not available"
                }
              />

              <ContextCard
                label="District"
                value={
                  location.district ||
                  "Not available"
                }
              />

              <ContextCard
                label="State"
                value={
                  location.state ||
                  "Not available"
                }
              />
            </div>
          </section>
        )}

        {/* WEATHER */}
        {location && (
          <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CloudSun
                  size={23}
                  className="text-blue-600"
                />

                <div>
                  <h2 className="font-bold text-gray-900">
                    Current Weather
                  </h2>

                  <p className="text-sm text-gray-500">
                    Weather context used by the crop advisory.
                  </p>
                </div>
              </div>

              {weatherLoading && (
                <Loader2
                  size={20}
                  className="animate-spin text-blue-600"
                />
              )}
            </div>

            {weatherError && (
              <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {weatherError}
              </div>
            )}

            {weather && !weatherLoading && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <WeatherCard
                  icon={
                    <Thermometer size={20} />
                  }
                  label="Temperature"
                  value={
                    weather.current?.temperature !==
                      null &&
                    weather.current?.temperature !==
                      undefined
                      ? `${weather.current.temperature} °C`
                      : "N/A"
                  }
                />

                <WeatherCard
                  icon={
                    <Droplets size={20} />
                  }
                  label="Humidity"
                  value={
                    weather.current?.humidity !==
                      null &&
                    weather.current?.humidity !==
                      undefined
                      ? `${weather.current.humidity}%`
                      : "N/A"
                  }
                />

                <WeatherCard
                  icon={
                    <CloudRain size={20} />
                  }
                  label="Rain"
                  value={
                    weather.current?.rain !== null &&
                    weather.current?.rain !==
                      undefined
                      ? `${weather.current.rain} mm`
                      : "N/A"
                  }
                />

                <WeatherCard
                  icon={
                    <CloudRain size={20} />
                  }
                  label="Precipitation"
                  value={
                    weather.current
                      ?.precipitation !== null &&
                    weather.current
                      ?.precipitation !== undefined
                      ? `${weather.current.precipitation} mm`
                      : "N/A"
                  }
                />
              </div>
            )}
          </section>
        )}

        {/* FIELD INPUTS */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Field Condition
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the current condition of your crop. These
              observations are combined with weather context to
              generate risk signals.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* CROP */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Crop
              </label>

              <select
                value={crop}
                onChange={(event) =>
                  handleCropChange(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                {cropData.map((item) => (
                  <option
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GROWTH STAGE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Growth Stage
              </label>

              <select
                value={growthStage}
                onChange={(event) => {
                  setGrowthStage(
                    event.target.value
                  );

                  setAnalysis(null);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                {selectedCrop?.growthStages?.map(
                  (stage) => (
                    <option
                      key={stage}
                      value={stage}
                    >
                      {stage}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* IRRIGATION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Irrigation Condition
              </label>

              <select
                value={irrigation}
                onChange={(event) => {
                  setIrrigation(
                    event.target.value
                  );

                  setAnalysis(null);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="Low">
                  Low
                </option>

                <option value="Normal">
                  Normal
                </option>

                <option value="High">
                  High
                </option>
              </select>
            </div>

            {/* PEST */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Pest / Disease Observation
              </label>

              <select
                value={pestObservation}
                onChange={(event) => {
                  setPestObservation(
                    event.target.value
                  );

                  setAnalysis(null);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="No">
                  No
                </option>

                <option value="Yes">
                  Yes
                </option>
              </select>
            </div>

            {/* RAINFALL */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Recent Rainfall Condition
              </label>

              <select
                value={rainfall}
                onChange={(event) => {
                  setRainfall(
                    event.target.value
                  );

                  setAnalysis(null);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="Low">
                  Low
                </option>

                <option value="Normal">
                  Normal
                </option>

                <option value="Heavy">
                  Heavy
                </option>
              </select>
            </div>
          </div>

          {/* SELECTED CROP SUMMARY */}
          {selectedCrop && (
            <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
              <div className="flex items-start gap-3">
                <Sprout
                  size={22}
                  className="mt-0.5 shrink-0 text-green-700"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {selectedCrop.name}
                  </h3>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <SmallInfo
                      label="Category"
                      value={
                        selectedCrop.category
                      }
                    />

                    <SmallInfo
                      label="Water Requirement"
                      value={
                        selectedCrop.waterRequirement
                      }
                    />

                    <SmallInfo
                      label="Risk"
                      value={
                        selectedCrop.risk
                      }
                    />

                    <SmallInfo
                      label="Duration"
                      value={
                        selectedCrop.duration
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ANALYZE BUTTON */}
          <button
            onClick={analyzeField}
            disabled={weatherLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {weatherLoading ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />
                Loading Weather...
              </>
            ) : (
              <>
                <TrendingUp size={19} />
                Analyze Crop Condition
              </>
            )}
          </button>
        </section>

        {/* AI ADVISORY */}
        {analysis && (
          <section className="space-y-6">
            {/* HEADER */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white">
                  <Sprout size={24} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    AI Crop Health & Risk Advisory
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {analysis.status}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    The advisory combines farmer-entered
                    field observations, crop reference data
                    and available hyper-local weather signals
                    to generate explainable decision-support
                    alerts.
                  </p>
                </div>
              </div>
            </div>

            {/* RISK FLAGS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertCircle
                  size={22}
                  className="text-orange-600"
                />

                <h2 className="text-lg font-bold text-gray-900">
                  Detected Risk Signals
                </h2>
              </div>

              {analysis.risks.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {analysis.risks.map(
                    (risk, index) => (
                      <RiskCard
                        key={`${risk.title}-${index}`}
                        risk={risk}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <div>
                      <h3 className="font-semibold text-green-900">
                        No immediate risk signal detected
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-green-800">
                        No configured risk condition was
                        triggered from the current field
                        observations and available weather
                        information.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SUGGESTED ACTIONS */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <div className="flex items-center gap-3">
                <TrendingUp
                  size={22}
                  className="text-blue-700"
                />

                <h2 className="text-lg font-bold text-gray-900">
                  Suggested Monitoring Actions
                </h2>
              </div>

              {analysis.actions.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {analysis.actions.map(
                    (action, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl bg-white p-4"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <p className="text-sm leading-6 text-gray-700">
                          {action}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-600">
                  Continue regular field monitoring.
                </p>
              )}
            </div>

            {/* WEATHER CONTEXT */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <CloudRain
                  size={22}
                  className="text-green-700"
                />

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Weather Context Used
                  </h2>

                  <p className="text-sm text-gray-500">
                    Environmental signals considered by the
                    advisory engine.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <WeatherContextCard
                  label="Temperature"
                  value={
                    analysis.weatherContext
                      ?.temperature !== null &&
                    analysis.weatherContext
                      ?.temperature !== undefined
                      ? `${analysis.weatherContext.temperature} °C`
                      : "N/A"
                  }
                />

                <WeatherContextCard
                  label="Humidity"
                  value={
                    analysis.weatherContext
                      ?.humidity !== null &&
                    analysis.weatherContext
                      ?.humidity !== undefined
                      ? `${analysis.weatherContext.humidity}%`
                      : "N/A"
                  }
                />

                <WeatherContextCard
                  label="Rain"
                  value={
                    analysis.weatherContext
                      ?.rain !== null &&
                    analysis.weatherContext
                      ?.rain !== undefined
                      ? `${analysis.weatherContext.rain} mm`
                      : "N/A"
                  }
                />

                <WeatherContextCard
                  label="Precipitation"
                  value={
                    analysis.weatherContext
                      ?.precipitation !== null &&
                    analysis.weatherContext
                      ?.precipitation !== undefined
                      ? `${analysis.weatherContext.precipitation} mm`
                      : "N/A"
                  }
                />
              </div>
            </div>

            {/* EXPLAINABILITY */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-start gap-3">
                <Info
                  size={21}
                  className="mt-0.5 shrink-0 text-gray-600"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    How this advisory works
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    RuralAI Nexus uses farmer-entered
                    observations, crop-specific reference
                    conditions and available weather signals
                    to generate explainable monitoring alerts.
                    These signals support field-level decisions
                    and are not a guaranteed diagnosis of crop
                    disease.
                  </p>
                </div>
              </div>
            </div>

            {/* DISCLAIMER */}
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <div className="flex items-start gap-3">
                <Info
                  size={20}
                  className="mt-0.5 shrink-0 text-yellow-700"
                />

                <div>
                  <h3 className="font-semibold text-yellow-900">
                    Decision-support notice
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-yellow-800">
                    RuralAI Nexus provides informational
                    risk signals using farmer-entered
                    observations, crop reference data and
                    hyper-local weather information. These
                    signals are intended to support field-level
                    decision-making and do not replace advice
                    from qualified agricultural professionals.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* --------------------------------
   SMALL COMPONENTS
--------------------------------- */

function ContextCard({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

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

      <p className="mt-2 text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function SmallInfo({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value || "Not available"}
      </p>
    </div>
  );
}

function WeatherContextCard({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function RiskCard({ risk }) {
  const isHigh = risk.level === "high";

  return (
    <div
      className={`rounded-2xl border p-5 ${
        isHigh
          ? "border-red-200 bg-red-50"
          : "border-yellow-200 bg-yellow-50"
      }`}
    >
      <div className="flex items-start gap-3">
        {risk.title
          .toLowerCase()
          .includes("pest") ? (
          <Bug
            size={22}
            className={`mt-0.5 shrink-0 ${
              isHigh
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          />
        ) : (
          <AlertCircle
            size={22}
            className={`mt-0.5 shrink-0 ${
              isHigh
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          />
        )}

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-gray-900">
              {risk.title}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${
                isHigh
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {risk.level}
            </span>
          </div>

          <div className="mt-3 rounded-xl bg-white/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Why this flag appeared
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-700">
              {risk.reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}