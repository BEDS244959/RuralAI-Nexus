import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  CloudSun,
  Factory,
  Leaf,
  MapPin,
  Package,
  Sprout,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "Before I Grow",
    description:
      "Compare crop, soil, water, weather and financial conditions before cultivation.",
    path: "/before-i-grow",
    icon: Sprout,
    label: "PRE-CULTIVATION",
  },
  {
    title: "During Growth",
    description:
      "Monitor crop conditions using farmer observations and hyper-local weather context.",
    path: "/during-growth",
    icon: Leaf,
    label: "CROP MONITORING",
  },
  {
    title: "Post-Harvest",
    description:
      "Plan storage, reduce losses and explore value-addition opportunities.",
    path: "/post-harvest",
    icon: Package,
    label: "POST-HARVEST",
  },
  {
    title: "FoodTech",
    description:
      "Explore processing options that can convert farm produce into higher-value products.",
    path: "/foodtech",
    icon: Factory,
    label: "FOOD PROCESSING",
  },
  {
    title: "Rural Enterprise",
    description:
      "Model small processing units, farmer groups and local rural brands.",
    path: "/rural-enterprise",
    icon: Building2,
    label: "RURAL BUSINESS",
  },
  {
    title: "Financial Intelligence",
    description:
      "Calculate costs, revenue scenarios, break-even price, ROI and funding gaps.",
    path: "/financial-intelligence",
    icon: Calculator,
    label: "FINANCIAL PLANNING",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-emerald-900 px-6 py-10 text-white shadow-lg sm:px-10 lg:px-12">

          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                <CheckCircle2 size={16} />
                AI-driven rural decision support
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                RuralAI Nexus
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-100">
                A connected decision-support platform for farmers
                and rural entrepreneurs — from planning what to grow
                to creating value from what they produce.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/before-i-grow"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
                >
                  Start Farm Planning
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/financial-intelligence"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Financial Planner
                  <Calculator size={17} />
                </Link>
              </div>
            </div>

            {/* Hero stats */}
            <div className="grid grid-cols-2 gap-3">

              <HeroStat
                icon={MapPin}
                value="Hyper-local"
                label="Location context"
              />

              <HeroStat
                icon={CloudSun}
                value="Weather"
                label="Field conditions"
              />

              <HeroStat
                icon={TrendingUp}
                value="Scenarios"
                label="Financial planning"
              />

              <HeroStat
                icon={Factory}
                value="FoodTech"
                label="Value addition"
              />

            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="mt-8">

          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              End-to-end workflow
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              From Farm Decision to Rural Enterprise
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
              RuralAI Nexus connects agricultural decisions with
              post-harvest management, food processing and rural
              enterprise planning.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <ModuleCard
                key={module.path}
                {...module}
              />
            ))}
          </div>
        </section>

        {/* Decision Architecture */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                <BarChart3
                  size={21}
                  className="text-blue-700"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  What the system considers
                </h2>

                <p className="text-sm text-gray-500">
                  Multiple factors are brought together instead
                  of relying on a single recommendation.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Farm location",
                "Weather conditions",
                "Soil compatibility",
                "Water availability",
                "Cultivation cost",
                "Market assumptions",
                "Yield scenarios",
                "Post-harvest options",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm text-gray-700"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-600"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <Wallet
                  size={21}
                  className="text-amber-700"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Decision-support principle
                </h2>

                <p className="text-sm text-gray-500">
                  The platform is designed to support human
                  decisions rather than make guarantees.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Principle
                title="Explainable"
                text="Show why a risk or financial signal appeared."
              />

              <Principle
                title="Scenario-based"
                text="Allow users to test changes in price, yield and cost."
              />

              <Principle
                title="Source-aware"
                text="Distinguish reference assumptions from live data."
              />

              <Principle
                title="Farmer-first"
                text="Present practical information in a simple workflow."
              />
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

          <div className="grid gap-6 lg:grid-cols-3">

            <Impact
              icon={Sprout}
              title="Agriculture"
              text="Support crop planning, field monitoring and financial preparation."
            />

            <Impact
              icon={Factory}
              title="FoodTech"
              text="Help identify processing and value-addition pathways for farm produce."
            />

            <Impact
              icon={Building2}
              title="Rural Development"
              text="Connect farm output with local processing and enterprise opportunities."
            />

          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          <strong>Decision-support notice:</strong>{" "}
          RuralAI Nexus provides informational analysis using
          farmer-entered information, reference datasets,
          weather context and scenario calculations. Outputs
          are estimates and should be validated with relevant
          agricultural, financial and food-processing
          professionals before major decisions.
        </div>

      </div>
    </div>
  );
}

function HeroStat({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <Icon size={20} />

      <p className="mt-3 font-semibold">
        {value}
      </p>

      <p className="mt-1 text-xs text-emerald-100">
        {label}
      </p>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  path,
  icon: Icon,
  label,
}) {
  return (
    <Link
      to={path}
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
          <Icon
            size={21}
            className="text-emerald-700"
          />
        </div>

        <ArrowRight
          size={18}
          className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
        />
      </div>

      <p className="mt-5 text-xs font-semibold tracking-wider text-emerald-700">
        {label}
      </p>

      <h3 className="mt-1 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </Link>
  );
}

function Principle({ title, text }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="font-semibold text-gray-800">
        {title}
      </p>

      <p className="mt-1 text-sm leading-6 text-gray-500">
        {text}
      </p>
    </div>
  );
}

function Impact({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
        <Icon
          size={21}
          className="text-emerald-700"
        />
      </div>

      <div>
        <h3 className="font-semibold text-emerald-950">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-emerald-800">
          {text}
        </p>
      </div>

    </div>
  );
}