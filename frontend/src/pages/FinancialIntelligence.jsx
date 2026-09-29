import { useMemo, useState } from "react";
import {
  AlertCircle,
  Calculator,
  IndianRupee,
  TrendingDown,
  TrendingUp,
  Wallet,
  Scale,
  ShieldCheck,
} from "lucide-react";

const cropOptions = {
  Groundnut: {
    costPerAcre: 18000,
    yieldLow: 700,
    yieldHigh: 1100,
    referencePrice: 60,
  },

  Millets: {
    costPerAcre: 12000,
    yieldLow: 500,
    yieldHigh: 900,
    referencePrice: 35,
  },

  Maize: {
    costPerAcre: 23000,
    yieldLow: 1800,
    yieldHigh: 2800,
    referencePrice: 22,
  },

  Vegetables: {
    costPerAcre: 32000,
    yieldLow: 4000,
    yieldHigh: 8000,
    referencePrice: 25,
  },
};

export default function FinancialIntelligence() {
  const [crop, setCrop] = useState("Groundnut");
  const [landArea, setLandArea] = useState(2);
  const [budget, setBudget] = useState(40000);

  const [priceChange, setPriceChange] = useState(0);
  const [yieldChange, setYieldChange] = useState(0);
  const [costChange, setCostChange] = useState(0);

  const data = cropOptions[crop];

  const analysis = useMemo(() => {
    const area = Number(landArea) || 0;
    const availableBudget = Number(budget) || 0;

    const adjustedPrice =
      data.referencePrice *
      (1 + Number(priceChange) / 100);

    const adjustedLowYield =
      data.yieldLow *
      area *
      (1 + Number(yieldChange) / 100);

    const adjustedHighYield =
      data.yieldHigh *
      area *
      (1 + Number(yieldChange) / 100);

    const adjustedCost =
      data.costPerAcre *
      area *
      (1 + Number(costChange) / 100);

    const lowRevenue =
      adjustedLowYield * adjustedPrice;

    const highRevenue =
      adjustedHighYield * adjustedPrice;

    const lowNet =
      lowRevenue - adjustedCost;

    const highNet =
      highRevenue - adjustedCost;

    const fundingGap = Math.max(
      0,
      adjustedCost - availableBudget
    );

    const breakEvenPrice =
      adjustedLowYield > 0
        ? adjustedCost / adjustedLowYield
        : 0;

    const roiLow =
      adjustedCost > 0
        ? (lowNet / adjustedCost) * 100
        : 0;

    const roiHigh =
      adjustedCost > 0
        ? (highNet / adjustedCost) * 100
        : 0;

    return {
      adjustedPrice,
      adjustedLowYield,
      adjustedHighYield,
      adjustedCost,
      lowRevenue,
      highRevenue,
      lowNet,
      highNet,
      fundingGap,
      breakEvenPrice,
      roiLow,
      roiHigh,
    };
  }, [
    crop,
    landArea,
    budget,
    priceChange,
    yieldChange,
    costChange,
    data,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <Calculator
                size={25}
                className="text-blue-700"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Financial Intelligence
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Understand cultivation economics before
                committing your money.
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900">
            Farm Financial Planner
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Adjust the assumptions to explore different
            financial scenarios.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            {/* Crop */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Crop
              </label>

              <select
                value={crop}
                onChange={(e) =>
                  setCrop(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {Object.keys(cropOptions).map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Land area (acres)
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={landArea}
                onChange={(e) =>
                  setLandArea(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Available budget
              </label>

              <div className="relative mt-2">
                <IndianRupee
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(e) =>
                    setBudget(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Controls */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <Scale
              size={21}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                What-If Financial Scenarios
              </h2>

              <p className="text-sm text-gray-500">
                Explore how price, yield and cost changes
                affect the farm economics.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <ScenarioSlider
              label="Market price change"
              value={priceChange}
              setValue={setPriceChange}
              min={-30}
              max={30}
            />

            <ScenarioSlider
              label="Yield change"
              value={yieldChange}
              setValue={setYieldChange}
              min={-30}
              max={30}
            />

            <ScenarioSlider
              label="Cultivation cost change"
              value={costChange}
              setValue={setCostChange}
              min={-20}
              max={30}
            />
          </div>

          <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
            <strong>Scenario:</strong>{" "}
            {priceChange > 0 ? "+" : ""}
            {priceChange}% price,{" "}
            {yieldChange > 0 ? "+" : ""}
            {yieldChange}% yield,{" "}
            {costChange > 0 ? "+" : ""}
            {costChange}% cost.
          </div>
        </div>

        {/* Main Financial Results */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Cost */}
          <FinancialCard
            icon={Wallet}
            title="Cultivation Cost"
            value={money(analysis.adjustedCost)}
            description={`Reference cost for ${landArea || 0} acre(s) under the selected scenario.`}
          />

          {/* Price */}
          <FinancialCard
            icon={IndianRupee}
            title="Scenario Price"
            value={`${money(
              analysis.adjustedPrice
            )}/kg`}
            description="Illustrative reference price after the selected price adjustment."
          />

          {/* Revenue */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                <TrendingUp
                  size={21}
                  className="text-emerald-700"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Revenue range
                </p>

                <p className="text-xl font-bold text-gray-900">
                  {money(
                    analysis.lowRevenue
                  )}{" "}
                  –{" "}
                  {money(
                    analysis.highRevenue
                  )}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniMetric
                label="Low yield"
                value={`${number(
                  analysis.adjustedLowYield
                )} kg`}
              />

              <MiniMetric
                label="High yield"
                value={`${number(
                  analysis.adjustedHighYield
                )} kg`}
              />
            </div>
          </div>

          {/* Net */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                <TrendingUp
                  size={21}
                  className="text-purple-700"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Net scenario
                </p>

                <p className="text-xl font-bold text-gray-900">
                  {money(analysis.lowNet)}{" "}
                  –{" "}
                  {money(analysis.highNet)}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniMetric
                label="Low ROI"
                value={`${analysis.roiLow.toFixed(
                  1
                )}%`}
              />

              <MiniMetric
                label="High ROI"
                value={`${analysis.roiHigh.toFixed(
                  1
                )}%`}
              />
            </div>
          </div>
        </div>

        {/* Break Even + Funding */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <Scale
                  size={21}
                  className="text-amber-700"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Break-Even Reference
                </h2>

                <p className="text-sm text-gray-500">
                  Price required to recover the reference
                  cultivation cost under the low-yield
                  scenario.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-amber-50 p-5">
              <p className="text-sm text-amber-800">
                Break-even price
              </p>

              <p className="mt-1 text-3xl font-bold text-amber-900">
                {money(
                  analysis.breakEvenPrice
                )}
                /kg
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                <Wallet
                  size={21}
                  className="text-red-700"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Funding Requirement
                </h2>

                <p className="text-sm text-gray-500">
                  Difference between estimated cultivation
                  cost and available budget.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">

              {analysis.fundingGap > 0 ? (
                <>
                  <p className="text-sm text-gray-500">
                    Estimated funding gap
                  </p>

                  <p className="mt-1 text-3xl font-bold text-red-700">
                    {money(
                      analysis.fundingGap
                    )}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    Budget status
                  </p>

                  <p className="mt-1 text-2xl font-bold text-emerald-700">
                    Reference cost covered
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Decision Support */}
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">

          <div className="flex items-start gap-3">
            <ShieldCheck
              size={21}
              className="mt-0.5 shrink-0 text-blue-700"
            />

            <div>
              <h2 className="font-semibold text-blue-900">
                Financial Decision Support
              </h2>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-blue-900">
                <li>
                  • Compare the expected revenue range
                  against your available capital.
                </li>

                <li>
                  • Check the break-even price before
                  committing to cultivation.
                </li>

                <li>
                  • Test lower-price and lower-yield
                  scenarios rather than relying only on
                  optimistic assumptions.
                </li>

                <li>
                  • Keep a contingency reserve for
                  unexpected cultivation expenses.
                </li>

                <li>
                  • Validate actual local input costs and
                  market prices before making a financial
                  commitment.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">

          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Decision-support notice
            </p>

            <p className="mt-1 leading-6">
              Financial Intelligence uses illustrative
              reference assumptions for cultivation cost,
              yield and price. ROI, revenue, net income and
              break-even figures are scenario calculations,
              not guaranteed returns or investment advice.
              Actual outcomes depend on local prices,
              weather, input costs, yield, labour, transport,
              market access and other conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioSlider({
  label,
  value,
  setValue,
  min,
  max,
}) {
  return (
    <div>
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <span className="text-sm font-semibold text-blue-700">
          {value > 0 ? "+" : ""}
          {value}%
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          setValue(Number(e.target.value))
        }
        className="mt-4 w-full accent-blue-600"
      />

      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>
          {min > 0 ? "+" : ""}
          {min}%
        </span>

        <span>
          {max > 0 ? "+" : ""}
          {max}%
        </span>
      </div>
    </div>
  );
}

function FinancialCard({
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
          <Icon
            size={21}
            className="text-blue-700"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-gray-900">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function money(value) {
  return `₹${Math.round(
    Number(value) || 0
  ).toLocaleString("en-IN")}`;
}

function number(value) {
  return Math.round(
    Number(value) || 0
  ).toLocaleString("en-IN");
}