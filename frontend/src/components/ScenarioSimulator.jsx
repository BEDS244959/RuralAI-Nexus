import { useState } from "react";
import { SlidersHorizontal, TrendingUp, IndianRupee } from "lucide-react";

export default function ScenarioSimulator({ crop }) {
  const [priceChange, setPriceChange] = useState(0);
  const [yieldChange, setYieldChange] = useState(0);
  const [costChange, setCostChange] = useState(0);

  if (!crop?.finance) return null;

  const base = crop.finance;

  const adjustedPrice =
    base.pricePerKg * (1 + priceChange / 100);

  const adjustedLowYield =
    base.lowYield * (1 + yieldChange / 100);

  const adjustedHighYield =
    base.highYield * (1 + yieldChange / 100);

  const adjustedCost =
    base.estimatedCost * (1 + costChange / 100);

  const lowRevenue =
    adjustedLowYield * adjustedPrice;

  const highRevenue =
    adjustedHighYield * adjustedPrice;

  const lowNet =
    lowRevenue - adjustedCost;

  const highNet =
    highRevenue - adjustedCost;

  const roiLow =
    adjustedCost > 0
      ? (lowNet / adjustedCost) * 100
      : 0;

  const roiHigh =
    adjustedCost > 0
      ? (highNet / adjustedCost) * 100
      : 0;

  return (
    <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">

      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-200">
          <SlidersHorizontal
            size={22}
            className="text-green-800"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-green-900">
            What-If Scenario Simulator
          </h3>

          <p className="mt-1 text-sm text-green-700">
            Explore how price, yield and cultivation-cost
            changes could affect the financial outcome.
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="mt-6 space-y-6">

        <ScenarioSlider
          label="Market Price Change"
          value={priceChange}
          onChange={setPriceChange}
        />

        <ScenarioSlider
          label="Yield Change"
          value={yieldChange}
          onChange={setYieldChange}
        />

        <ScenarioSlider
          label="Cultivation Cost Change"
          value={costChange}
          onChange={setCostChange}
        />

      </div>

      {/* RESULTS */}
      <div className="mt-7 rounded-xl bg-white p-5">

        <h4 className="font-semibold text-gray-900">
          Scenario Result
        </h4>

        <div className="mt-4 grid gap-4 md:grid-cols-4">

          <ResultCard
            icon={<IndianRupee size={18} />}
            label="Adjusted Price"
            value={`₹${adjustedPrice.toFixed(2)}/kg`}
          />

          <ResultCard
            icon={<IndianRupee size={18} />}
            label="Adjusted Cost"
            value={`₹${Math.round(
              adjustedCost
            ).toLocaleString("en-IN")}`}
          />

          <ResultCard
            icon={<TrendingUp size={18} />}
            label="Estimated Net"
            value={`₹${Math.round(
              lowNet
            ).toLocaleString("en-IN")} – ₹${Math.round(
              highNet
            ).toLocaleString("en-IN")}`}
          />

          <ResultCard
            icon={<TrendingUp size={18} />}
            label="Estimated ROI"
            value={`${roiLow.toFixed(1)}% – ${roiHigh.toFixed(1)}%`}
          />

        </div>
      </div>

      <p className="mt-4 text-xs text-green-700">
        This simulator is a scenario analysis tool. It does
        not guarantee future prices, yields or profits.
      </p>
    </div>
  );
}

function ScenarioSlider({
  label,
  value,
  onChange,
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <label className="text-sm font-semibold text-gray-800">
          {label}
        </label>

        <span className="text-sm font-bold text-green-700">
          {value > 0 ? "+" : ""}
          {value}%
        </span>

      </div>

      <input
        type="range"
        min="-20"
        max="20"
        step="5"
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="w-full accent-green-700"
      />

      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>-20%</span>
        <span>Base</span>
        <span>+20%</span>
      </div>

    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">

      <div className="flex items-center gap-2 text-green-700">
        {icon}

        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 font-bold text-gray-900">
        {value}
      </p>

    </div>
  );
}