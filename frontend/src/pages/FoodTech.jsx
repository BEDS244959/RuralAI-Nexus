import { useMemo, useState } from "react";
import {
  Calculator,
  CheckCircle2,
  Factory,
  IndianRupee,
  Package,
  ShoppingBag,
  Sprout,
  TrendingUp,
} from "lucide-react";

const foodProducts = {
  Groundnut: [
    {
      name: "Roasted Groundnut",
      process: "Cleaning → Roasting → Cooling → Packing",
      conversion: 0.9,
      processingCost: 18,
      packagingCost: 6,
      sellingPrice: 110,
      unit: "kg",
      marketType: "Local retail / direct sales",
    },
    {
      name: "Groundnut Oil",
      process: "Cleaning → Crushing → Oil extraction → Filtering → Bottling",
      conversion: 0.32,
      processingCost: 35,
      packagingCost: 12,
      sellingPrice: 190,
      unit: "kg equivalent",
      marketType: "Local retail / institutional buyers",
    },
    {
      name: "Peanut Butter",
      process: "Roasting → Skin removal → Grinding → Mixing → Packing",
      conversion: 0.82,
      processingCost: 45,
      packagingCost: 18,
      sellingPrice: 220,
      unit: "kg",
      marketType: "Retail / online / local stores",
    },
  ],

  Millets: [
    {
      name: "Millet Flour",
      process: "Cleaning → Drying → Milling → Sieving → Packing",
      conversion: 0.88,
      processingCost: 20,
      packagingCost: 8,
      sellingPrice: 85,
      unit: "kg",
      marketType: "Local retail / direct sales",
    },
    {
      name: "Millet Breakfast Mix",
      process: "Cleaning → Processing → Blending → Packing",
      conversion: 0.8,
      processingCost: 35,
      packagingCost: 15,
      sellingPrice: 140,
      unit: "kg",
      marketType: "Retail / institutions",
    },
    {
      name: "Millet Snacks",
      process: "Milling → Mixing → Forming → Cooking → Packing",
      conversion: 0.72,
      processingCost: 55,
      packagingCost: 20,
      sellingPrice: 180,
      unit: "kg",
      marketType: "Retail / local food businesses",
    },
  ],

  Maize: [
    {
      name: "Maize Flour",
      process: "Cleaning → Drying → Milling → Sieving → Packing",
      conversion: 0.88,
      processingCost: 18,
      packagingCost: 7,
      sellingPrice: 55,
      unit: "kg",
      marketType: "Local retail / direct sales",
    },
    {
      name: "Corn Snack",
      process: "Cleaning → Processing → Cooking → Seasoning → Packing",
      conversion: 0.7,
      processingCost: 48,
      packagingCost: 18,
      sellingPrice: 150,
      unit: "kg",
      marketType: "Retail / local markets",
    },
    {
      name: "Animal Feed",
      process: "Cleaning → Grinding → Mixing → Packing",
      conversion: 0.92,
      processingCost: 12,
      packagingCost: 5,
      sellingPrice: 32,
      unit: "kg",
      marketType: "Livestock / poultry farms",
    },
  ],

  Vegetables: [
    {
      name: "Dehydrated Vegetables",
      process: "Sorting → Washing → Cutting → Drying → Packing",
      conversion: 0.15,
      processingCost: 70,
      packagingCost: 20,
      sellingPrice: 280,
      unit: "kg",
      marketType: "Retail / food businesses",
    },
    {
      name: "Vegetable Pickle",
      process: "Sorting → Washing → Cutting → Processing → Packing",
      conversion: 0.65,
      processingCost: 45,
      packagingCost: 22,
      sellingPrice: 180,
      unit: "kg",
      marketType: "Retail / local stores",
    },
    {
      name: "Vegetable Sauce",
      process: "Sorting → Washing → Processing → Cooking → Bottling",
      conversion: 0.55,
      processingCost: 55,
      packagingCost: 25,
      sellingPrice: 210,
      unit: "kg",
      marketType: "Retail / food service",
    },
  ],
};

const defaultQuantities = {
  Groundnut: 100,
  Millets: 100,
  Maize: 100,
  Vegetables: 100,
};

export default function FoodTech() {
  const [crop, setCrop] = useState("Groundnut");
  const [quantity, setQuantity] = useState(100);
  const [productIndex, setProductIndex] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);

  const products = foodProducts[crop] || [];
  const product = products[productIndex] || products[0];

  const analysis = useMemo(() => {
    if (!product) return null;

    const rawQuantity = Number(quantity) || 0;

    const outputQuantity =
      rawQuantity * product.conversion;

    const processingCost =
      outputQuantity * product.processingCost;

    const packagingCost =
      outputQuantity * product.packagingCost;

    const totalCost =
      processingCost + packagingCost;

    const estimatedRevenue =
      outputQuantity * product.sellingPrice;

    const estimatedMargin =
      estimatedRevenue - totalCost;

    const marginPercentage =
      estimatedRevenue > 0
        ? (estimatedMargin / estimatedRevenue) * 100
        : 0;

    return {
      rawQuantity,
      outputQuantity,
      processingCost,
      packagingCost,
      totalCost,
      estimatedRevenue,
      estimatedMargin,
      marginPercentage,
    };
  }, [quantity, product]);

  const handleCropChange = (value) => {
    setCrop(value);
    setQuantity(
      defaultQuantities[value] || 100
    );
    setProductIndex(0);
    setAnalyzed(false);
  };

  const handleProductChange = (value) => {
    setProductIndex(Number(value));
    setAnalyzed(false);
  };

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="border-b border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <Factory
                    size={26}
                    className="text-purple-700"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    FoodTech
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Convert agricultural produce into value-added
                    food products and rural processing opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                Agriculture → FoodTech
              </p>

              <p className="mt-1 text-sm font-semibold text-purple-900">
                Value Addition Planner
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* INPUTS */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Select Your Raw Material
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose a crop and processing product to explore a
              basic value-addition scenario.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* CROP */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Agricultural Produce
              </label>

              <select
                value={crop}
                onChange={(event) =>
                  handleCropChange(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                {Object.keys(foodProducts).map(
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

            {/* QUANTITY */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Raw Produce Quantity (kg)
              </label>

              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                  setAnalyzed(false);
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* PRODUCT */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Value-Added Product
              </label>

              <select
                value={productIndex}
                onChange={(event) =>
                  handleProductChange(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                {products.map(
                  (item, index) => (
                    <option
                      key={item.name}
                      value={index}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* PRODUCT PROCESS */}
          {product && (
            <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-5">
              <div className="flex items-start gap-3">
                <Package
                  size={22}
                  className="mt-0.5 shrink-0 text-purple-700"
                />

                <div>
                  <h3 className="font-bold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    <strong>Processing flow:</strong>{" "}
                    {product.process}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Potential market:</strong>{" "}
                    {product.marketType}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-800 sm:w-auto"
          >
            <Calculator size={19} />
            Analyze Value Addition
          </button>
        </section>

        {/* ANALYSIS */}
        {analyzed && analysis && product && (
          <>
            {/* SUMMARY */}
            <section className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-700 text-white">
                  <Sprout size={24} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                    FoodTech Decision Support
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {product.name} value-addition scenario
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    This scenario estimates output, processing
                    costs and potential revenue using reference
                    assumptions.
                  </p>
                </div>
              </div>
            </section>

            {/* METRICS */}
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                icon={<Sprout size={22} />}
                label="Raw Produce"
                value={`${formatNumber(
                  analysis.rawQuantity
                )} kg`}
              />

              <MetricCard
                icon={<Package size={22} />}
                label="Estimated Output"
                value={`${formatNumber(
                  analysis.outputQuantity
                )} kg`}
              />

              <MetricCard
                icon={<IndianRupee size={22} />}
                label="Estimated Cost"
                value={formatMoney(
                  analysis.totalCost
                )}
              />

              <MetricCard
                icon={<TrendingUp size={22} />}
                label="Scenario Margin"
                value={formatMoney(
                  analysis.estimatedMargin
                )}
                subtitle={`${analysis.marginPercentage.toFixed(
                  1
                )}% of estimated revenue`}
              />
            </section>

            {/* FINANCIAL BREAKDOWN */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <IndianRupee
                  size={23}
                  className="text-green-700"
                />

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Processing Economics
                  </h2>

                  <p className="text-sm text-gray-500">
                    Transparent calculation of the current
                    reference scenario.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <BreakdownCard
                  label="Processing Cost"
                  value={formatMoney(
                    analysis.processingCost
                  )}
                />

                <BreakdownCard
                  label="Packaging Cost"
                  value={formatMoney(
                    analysis.packagingCost
                  )}
                />

                <BreakdownCard
                  label="Estimated Revenue"
                  value={formatMoney(
                    analysis.estimatedRevenue
                  )}
                />

                <BreakdownCard
                  label="Estimated Margin"
                  value={formatMoney(
                    analysis.estimatedMargin
                  )}
                />
              </div>
            </section>

            {/* PROCESSING FLOW */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Factory
                  size={23}
                  className="text-purple-700"
                />

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Processing Flow
                  </h2>

                  <p className="text-sm text-gray-500">
                    Basic operational sequence for the selected
                    product.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-gray-50 p-5">
                <p className="text-sm font-medium leading-7 text-gray-800">
                  {product.process}
                </p>
              </div>
            </section>

            {/* RURAL ENTERPRISE CONNECTION */}
            <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white">
                  <ShoppingBag size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    Rural Enterprise Opportunity
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    From farmer to local food entrepreneur
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    Value addition can create opportunities for
                    farmer groups, self-help groups, rural youth,
                    small processing units and local food businesses.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <OpportunityCard
                  title="Small Processing Unit"
                  text="Explore whether basic processing equipment could support repeated local production."
                />

                <OpportunityCard
                  title="Farmer Group"
                  text="Aggregate produce from multiple farmers to improve processing scale."
                />

                <OpportunityCard
                  title="Local Brand"
                  text="Develop packaged products for nearby shops, institutions and direct consumers."
                />
              </div>
            </section>

            {/* NEXT STEPS */}
            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                FoodTech Planning Checklist
              </h2>

              <div className="mt-5 space-y-3">
                <ChecklistItem
                  text="Validate the raw material quality and quantity."
                />

                <ChecklistItem
                  text="Check availability and cost of processing equipment."
                />

                <ChecklistItem
                  text="Calculate packaging, transport and labour requirements."
                />

                <ChecklistItem
                  text="Identify buyers before investing heavily in processing."
                />

                <ChecklistItem
                  text="Check applicable food safety, labelling and registration requirements."
                />
              </div>
            </section>

            {/* DISCLAIMER */}
            <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm leading-6 text-yellow-800">
                <strong>Decision-support notice:</strong> The
                conversion ratios, processing costs, packaging
                costs and selling prices shown are illustrative
                reference assumptions for the prototype. They are
                not guaranteed production costs, market prices or
                profits. Actual economics depend on equipment,
                quality, labour, packaging, location, demand and
                applicable regulations.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

/* --------------------------------
   COMPONENTS
--------------------------------- */

function MetricCard({
  icon,
  label,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 text-green-700">
        {icon}

        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </p>
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-900">
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function BreakdownCard({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function OpportunityCard({
  title,
  text,
}) {
  return (
    <div className="rounded-xl border border-green-100 bg-white p-5">
      <CheckCircle2
        size={20}
        className="text-green-600"
      />

      <h3 className="mt-3 font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}

function ChecklistItem({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white p-4">
      <CheckCircle2
        size={19}
        className="mt-0.5 shrink-0 text-blue-600"
      />

      <p className="text-sm leading-6 text-gray-700">
        {text}
      </p>
    </div>
  );
}

/* --------------------------------
   HELPERS
--------------------------------- */

function formatNumber(value) {
  return Math.round(
    Number(value) || 0
  ).toLocaleString("en-IN");
}

function formatMoney(value) {
  return (
    "₹" +
    Math.round(
      Number(value) || 0
    ).toLocaleString("en-IN")
  );
}