import { useMemo, useState } from "react";
import {
  Building2,
  Calculator,
  CheckCircle2,
  IndianRupee,
  Lightbulb,
  Package,
  Store,
  Users,
  Wallet,
  AlertCircle,
} from "lucide-react";

const enterpriseOptions = {
  "Small Processing Unit": {
    description:
      "A small local processing setup for converting farm produce into higher-value products.",
    equipment: [
      "Basic processing equipment",
      "Weighing scale",
      "Packaging equipment",
      "Storage containers",
    ],
    minInvestment: 75000,
    maxInvestment: 250000,
    monthlyOperatingCost: 25000,
    revenuePotential: 50000,
    customers: [
      "Local households",
      "Retail shops",
      "Farmer markets",
      "Institutional buyers",
    ],
  },

  "Farmer Group": {
    description:
      "A collective model where farmers pool produce, processing capacity and market access.",
    equipment: [
      "Shared processing equipment",
      "Collection centre",
      "Storage facility",
      "Packaging setup",
    ],
    minInvestment: 150000,
    maxInvestment: 500000,
    monthlyOperatingCost: 60000,
    revenuePotential: 120000,
    customers: [
      "Wholesale buyers",
      "Retail chains",
      "Local institutions",
      "Food businesses",
    ],
  },

  "Local Brand": {
    description:
      "A value-added rural brand focused on packaged products and direct customer sales.",
    equipment: [
      "Processing setup",
      "Packaging equipment",
      "Storage",
      "Branding and labelling",
    ],
    minInvestment: 100000,
    maxInvestment: 400000,
    monthlyOperatingCost: 45000,
    revenuePotential: 100000,
    customers: [
      "Local stores",
      "Online customers",
      "Restaurants",
      "Direct consumers",
    ],
  },
};

const productOptions = {
  Groundnut: [
    "Roasted Groundnut",
    "Groundnut Oil",
    "Peanut Butter",
  ],
  Millets: [
    "Millet Flour",
    "Millet Breakfast Mix",
    "Millet Snacks",
  ],
  Maize: [
    "Maize Flour",
    "Corn Snack",
    "Animal Feed",
  ],
  Vegetables: [
    "Dehydrated Vegetables",
    "Vegetable Pickle",
    "Vegetable Sauce",
  ],
};

export default function RuralEnterprise() {
  const [enterpriseType, setEnterpriseType] = useState(
    "Small Processing Unit"
  );

  const [crop, setCrop] = useState("Groundnut");
  const [product, setProduct] = useState("Roasted Groundnut");

  const [availableCapital, setAvailableCapital] = useState(100000);
  const [monthlySales, setMonthlySales] = useState(50000);

  const enterprise =
    enterpriseOptions[enterpriseType];

  const analysis = useMemo(() => {
    const capital = Number(availableCapital) || 0;
    const sales = Number(monthlySales) || 0;

    const investmentGap = Math.max(
      0,
      enterprise.minInvestment - capital
    );

    const estimatedOperatingCost =
      enterprise.monthlyOperatingCost;

    const estimatedMonthlyNet =
      sales - estimatedOperatingCost;

    const annualNet =
      estimatedMonthlyNet * 12;

    const capitalCoverage =
      enterprise.minInvestment > 0
        ? (capital / enterprise.minInvestment) * 100
        : 0;

    const paybackMonths =
      estimatedMonthlyNet > 0
        ? enterprise.minInvestment /
          estimatedMonthlyNet
        : null;

    return {
      investmentGap,
      estimatedOperatingCost,
      estimatedMonthlyNet,
      annualNet,
      capitalCoverage,
      paybackMonths,
    };
  }, [
    availableCapital,
    monthlySales,
    enterprise,
  ]);

  const handleCropChange = (value) => {
    setCrop(value);

    const firstProduct =
      productOptions[value]?.[0];

    if (firstProduct) {
      setProduct(firstProduct);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
              <Building2
                className="text-emerald-700"
                size={25}
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Rural Enterprise
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Turn farm produce into sustainable rural
                business opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Configuration */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-6 flex items-center gap-2">
              <Calculator
                size={20}
                className="text-emerald-700"
              />

              <h2 className="text-lg font-semibold text-gray-900">
                Enterprise Planner
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Enterprise */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Enterprise model
                </label>

                <select
                  value={enterpriseType}
                  onChange={(e) =>
                    setEnterpriseType(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                >
                  {Object.keys(enterpriseOptions).map(
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

              {/* Crop */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Primary crop
                </label>

                <select
                  value={crop}
                  onChange={(e) =>
                    handleCropChange(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                >
                  {Object.keys(productOptions).map(
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

              {/* Product */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Value-added product
                </label>

                <select
                  value={product}
                  onChange={(e) =>
                    setProduct(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                >
                  {productOptions[crop].map(
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

              {/* Capital */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Available capital
                </label>

                <div className="relative mt-2">
                  <IndianRupee
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    min="0"
                    value={availableCapital}
                    onChange={(e) =>
                      setAvailableCapital(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Monthly sales */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Expected monthly sales
                </label>

                <div className="relative mt-2">
                  <IndianRupee
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    min="0"
                    value={monthlySales}
                    onChange={(e) =>
                      setMonthlySales(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 rounded-xl bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <Lightbulb
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-700"
                />

                <div>
                  <h3 className="font-semibold text-emerald-900">
                    Enterprise opportunity
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-emerald-800">
                    {enterprise.description}
                  </p>

                  <p className="mt-2 text-sm font-medium text-emerald-800">
                    Selected product: {product}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Capital Status */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <Wallet
                  size={21}
                  className="text-amber-700"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Minimum reference investment
                </p>

                <p className="text-xl font-bold text-gray-900">
                  ₹
                  {enterprise.minInvestment.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-gray-500">
                <span>Capital coverage</span>
                <span>
                  {Math.min(
                    100,
                    Math.round(
                      analysis.capitalCoverage
                    )
                  )}
                  %
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        analysis.capitalCoverage
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>

            {analysis.investmentGap > 0 ? (
              <div className="mt-6 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-semibold">
                    Reference funding gap
                  </p>

                  <p className="mt-1">
                    Approximately ₹
                    {Math.round(
                      analysis.investmentGap
                    ).toLocaleString("en-IN")}{" "}
                    more capital would be needed to
                    reach the minimum reference
                    investment level.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-semibold">
                    Reference investment covered
                  </p>

                  <p className="mt-1">
                    The entered capital is at or above
                    the minimum reference investment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Scenario */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <IndianRupee
                size={21}
                className="text-blue-700"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Monthly Enterprise Scenario
              </h2>

              <p className="text-sm text-gray-500">
                Illustrative planning scenario based on
                your entered sales estimate.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Metric
              label="Expected sales"
              value={`₹${Number(
                monthlySales || 0
              ).toLocaleString("en-IN")}`}
            />

            <Metric
              label="Reference operating cost"
              value={`₹${enterprise.monthlyOperatingCost.toLocaleString(
                "en-IN"
              )}`}
            />

            <Metric
              label="Scenario monthly net"
              value={`₹${Math.round(
                analysis.estimatedMonthlyNet
              ).toLocaleString("en-IN")}`}
            />

            <Metric
              label="Scenario annual net"
              value={`₹${Math.round(
                analysis.annualNet
              ).toLocaleString("en-IN")}`}
            />
          </div>

          {analysis.paybackMonths ? (
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-gray-700">
              <span className="font-semibold">
                Illustrative payback period:
              </span>{" "}
              approximately{" "}
              {analysis.paybackMonths.toFixed(1)} months
              based on the minimum reference investment
              and the current monthly net scenario.
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              The current sales scenario does not cover
              the reference monthly operating cost.
            </div>
          )}
        </div>

        {/* Business Structure */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          <EnterpriseCard
            icon={Package}
            title="Equipment"
            items={enterprise.equipment}
          />

          <EnterpriseCard
            icon={Users}
            title="Potential Customers"
            items={enterprise.customers}
          />

          <EnterpriseCard
            icon={Store}
            title="Investment Range"
            items={[
              `₹${enterprise.minInvestment.toLocaleString(
                "en-IN"
              )} minimum reference`,
              `₹${enterprise.maxInvestment.toLocaleString(
                "en-IN"
              )} upper reference`,
              "Actual costs require local quotations",
              "Validate demand before investment",
            ]}
          />
        </div>

        {/* Planning Checklist */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <CheckCircle2
              size={21}
              className="text-emerald-700"
            />

            <h2 className="text-lg font-semibold text-gray-900">
              Rural Enterprise Validation Checklist
            </h2>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">

            {[
              "Validate local demand before purchasing equipment.",
              "Obtain quotations from multiple equipment suppliers.",
              "Calculate raw material, labour, packaging and transport costs.",
              "Identify at least two potential buyer channels.",
              "Check food safety, labelling and registration requirements.",
              "Test a small production batch before scaling.",
              "Maintain records of production, sales and wastage.",
              "Review working-capital requirements separately from equipment investment.",
            ].map((item) => (
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
              RuralAI Nexus uses illustrative enterprise
              assumptions to support early-stage planning.
              Investment ranges, operating costs, sales,
              margins and payback periods are not guaranteed
              outcomes. Actual feasibility depends on local
              equipment prices, raw-material availability,
              labour, regulations, buyer demand, financing
              and operating conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function EnterpriseCard({
  icon: Icon,
  title,
  items,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
          <Icon
            size={20}
            className="text-emerald-700"
          />
        </div>

        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2 text-sm text-gray-600"
          >
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}