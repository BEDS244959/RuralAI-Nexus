import { useMemo, useState } from "react";
import {
  AlertCircle,
  Boxes,
  Calculator,
  CheckCircle2,
  IndianRupee,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

const cropData = {
  Groundnut: {
    category: "Oilseed",
    shelfLife: "4–6 months",
    storage: [
      "Dry the produce properly before storage",
      "Use clean and dry storage containers",
      "Protect from excess moisture",
      "Monitor for insects and fungal growth",
    ],
    products: [
      "Raw Groundnut",
      "Roasted Groundnut",
      "Groundnut Oil",
      "Peanut Butter",
    ],
    referencePrice: 60,
    valueAddedPrice: 110,
    wastage: 5,
  },

  Millets: {
    category: "Cereal",
    shelfLife: "6–12 months",
    storage: [
      "Dry grain to a suitable storage moisture level",
      "Use clean airtight containers",
      "Protect from insects",
      "Keep storage area dry and ventilated",
    ],
    products: [
      "Whole Millet",
      "Millet Flour",
      "Millet Breakfast Mix",
      "Millet Snacks",
    ],
    referencePrice: 35,
    valueAddedPrice: 70,
    wastage: 4,
  },

  Maize: {
    category: "Cereal",
    shelfLife: "4–8 months",
    storage: [
      "Dry grain thoroughly before storage",
      "Protect from moisture",
      "Inspect regularly for insects",
      "Use appropriate food or feed-grade storage",
    ],
    products: [
      "Maize Grain",
      "Maize Flour",
      "Corn Snack",
      "Animal Feed",
    ],
    referencePrice: 22,
    valueAddedPrice: 45,
    wastage: 5,
  },

  Vegetables: {
    category: "Horticulture",
    shelfLife: "Short shelf life",
    storage: [
      "Sort damaged produce immediately",
      "Keep harvested produce shaded",
      "Use suitable crates for transport",
      "Minimize handling and transport delays",
    ],
    products: [
      "Fresh Vegetables",
      "Dehydrated Vegetables",
      "Pickle",
      "Vegetable Sauce",
    ],
    referencePrice: 25,
    valueAddedPrice: 55,
    wastage: 12,
  },
};

export default function PostHarvest() {
  const [crop, setCrop] = useState("Groundnut");
  const [quantity, setQuantity] = useState(1000);
  const [processingPercent, setProcessingPercent] =
    useState(30);

  const data = cropData[crop];

  const analysis = useMemo(() => {
    const qty = Number(quantity) || 0;
    const processing =
      Number(processingPercent) || 0;

    const estimatedLoss =
      qty * (data.wastage / 100);

    const usableQuantity =
      Math.max(0, qty - estimatedLoss);

    const processedQuantity =
      usableQuantity * (processing / 100);

    const rawQuantity =
      usableQuantity - processedQuantity;

    const rawRevenue =
      usableQuantity * data.referencePrice;

    const valueAddedRevenue =
      processedQuantity *
        data.valueAddedPrice +
      rawQuantity * data.referencePrice;

    const additionalValue =
      valueAddedRevenue - rawRevenue;

    return {
      estimatedLoss,
      usableQuantity,
      processedQuantity,
      rawQuantity,
      rawRevenue,
      valueAddedRevenue,
      additionalValue,
    };
  }, [
    crop,
    quantity,
    processingPercent,
    data,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
              <Package
                size={25}
                className="text-orange-700"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Post-Harvest
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Reduce post-harvest losses and explore
                storage, processing and value-addition
                options.
              </p>
            </div>

          </div>
        </div>

        {/* Inputs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <Calculator
              size={21}
              className="text-orange-700"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Harvest Planning
              </h2>

              <p className="text-sm text-gray-500">
                Enter the expected harvested quantity to
                estimate usable produce and value-addition
                scenarios.
              </p>
            </div>
          </div>

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
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
              >
                {Object.keys(cropData).map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Expected harvest quantity (kg)
              </label>

              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500"
              />
            </div>

            {/* Processing */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Quantity for value addition
              </label>

              <select
                value={processingPercent}
                onChange={(e) =>
                  setProcessingPercent(
                    Number(e.target.value)
                  )
                }
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
              >
                <option value={0}>
                  0% — Sell raw
                </option>
                <option value={25}>
                  25%
                </option>
                <option value={30}>
                  30%
                </option>
                <option value={50}>
                  50%
                </option>
                <option value={75}>
                  75%
                </option>
                <option value={100}>
                  100%
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* Crop Reference */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900">
            {crop} Post-Harvest Reference
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <ReferenceCard
              label="Category"
              value={data.category}
            />

            <ReferenceCard
              label="Reference shelf life"
              value={data.shelfLife}
            />

            <ReferenceCard
              label="Raw reference price"
              value={`₹${data.referencePrice}/kg`}
            />

            <ReferenceCard
              label="Value-added reference"
              value={`₹${data.valueAddedPrice}/kg`}
            />

          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          <ResultCard
            icon={Boxes}
            title="Estimated Harvest Loss"
            value={`${Math.round(
              analysis.estimatedLoss
            ).toLocaleString("en-IN")} kg`}
            description={`${data.wastage}% reference loss assumption.`}
          />

          <ResultCard
            icon={Package}
            title="Usable Produce"
            value={`${Math.round(
              analysis.usableQuantity
            ).toLocaleString("en-IN")} kg`}
            description="Estimated quantity remaining after the reference loss assumption."
          />

          <ResultCard
            icon={ShoppingBag}
            title="Processed Quantity"
            value={`${Math.round(
              analysis.processedQuantity
            ).toLocaleString("en-IN")} kg`}
            description={`${processingPercent}% of usable produce allocated to value addition.`}
          />

        </div>

        {/* Value Comparison */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
              <TrendingUp
                size={21}
                className="text-emerald-700"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Value-Addition Scenario
              </h2>

              <p className="text-sm text-gray-500">
                Compare an illustrative raw-sale scenario
                with partial value addition.
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <Metric
              label="Raw-sale scenario"
              value={`₹${Math.round(
                analysis.rawRevenue
              ).toLocaleString("en-IN")}`}
            />

            <Metric
              label="Value-added scenario"
              value={`₹${Math.round(
                analysis.valueAddedRevenue
              ).toLocaleString("en-IN")}`}
            />

            <Metric
              label="Illustrative additional value"
              value={`₹${Math.round(
                analysis.additionalValue
              ).toLocaleString("en-IN")}`}
            />

          </div>

          <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
            The value-added scenario is an illustrative
            calculation using reference prices. Processing
            costs, packaging, labour, transport, spoilage
            and market access are not deducted here.
          </div>
        </div>

        {/* Storage & Handling */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <Boxes
                size={21}
                className="text-orange-700"
              />

              <h2 className="text-lg font-semibold text-gray-900">
                Storage & Handling Actions
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {data.storage.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <span className="text-sm leading-6 text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <ShoppingBag
                size={21}
                className="text-orange-700"
              />

              <h2 className="text-lg font-semibold text-gray-900">
                Potential Value-Added Products
              </h2>
            </div>

            <div className="mt-5 grid gap-3">
              {data.products.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
                    <Package
                      size={17}
                      className="text-orange-700"
                    />
                  </div>

                  <span className="text-sm font-medium text-gray-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Workflow */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900">
            Recommended Post-Harvest Workflow
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-5">

            {[
              "Harvest",
              "Sort & Grade",
              "Dry / Clean",
              "Store or Process",
              "Market",
            ].map((step, index) => (
              <div
                key={step}
                className="relative rounded-xl bg-slate-50 p-4 text-center"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
                  {index + 1}
                </div>

                <p className="mt-3 text-sm font-medium text-gray-700">
                  {step}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Notice */}
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
              Post-harvest quantities, losses and value-added
              revenue shown here are illustrative reference
              calculations. Actual losses, processing recovery,
              product prices, storage life and profitability
              vary with crop variety, moisture, handling,
              equipment, labour, packaging, transport and
              market conditions. Verify requirements with
              appropriate agricultural and food-processing
              professionals before making investment or food
              safety decisions.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

function ReferenceCard({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function ResultCard({
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
          <Icon
            size={21}
            className="text-orange-700"
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

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-slate-50 p-5">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}