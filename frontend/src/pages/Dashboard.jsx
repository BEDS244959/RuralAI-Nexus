import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  CloudSun,
  Factory,
  Leaf,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Wallet,
  Wheat,
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
    number: "01",
  },
  {
    title: "During Growth",
    description:
      "Monitor crop conditions using farmer observations and hyper-local weather context.",
    path: "/during-growth",
    icon: Leaf,
    label: "CROP MONITORING",
    number: "02",
  },
  {
    title: "Post-Harvest",
    description:
      "Plan storage, reduce losses and explore value-addition opportunities.",
    path: "/post-harvest",
    icon: Package,
    label: "POST-HARVEST",
    number: "03",
  },
  {
    title: "FoodTech",
    description:
      "Explore processing options that can convert farm produce into higher-value products.",
    path: "/foodtech",
    icon: Factory,
    label: "FOOD PROCESSING",
    number: "04",
  },
  {
    title: "Rural Enterprise",
    description:
      "Model small processing units, farmer groups and local rural brands.",
    path: "/rural-enterprise",
    icon: Building2,
    label: "RURAL BUSINESS",
    number: "05",
  },
  {
    title: "Financial Intelligence",
    description:
      "Calculate costs, revenue scenarios, break-even price, ROI and funding gaps.",
    path: "/financial-intelligence",
    icon: Calculator,
    label: "FINANCIAL PLANNING",
    number: "06",
  },
];

const factors = [
  "Farm location",
  "Weather conditions",
  "Soil compatibility",
  "Water availability",
  "Cultivation cost",
  "Market assumptions",
  "Yield scenarios",
  "Post-harvest options",
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f8f4] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] px-6 py-8 text-white shadow-2xl shadow-emerald-950/10 sm:px-10 sm:py-10 lg:px-12 lg:py-12">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-32 right-20 h-80 w-80 rounded-full bg-emerald-300/10" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 rounded-full bg-lime-300/5 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">

            {/* Hero copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <Sparkles size={16} />
                AI-assisted rural decision support
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                RuralAI
                <span className="text-lime-300"> Nexus</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50 sm:text-lg sm:leading-8">
                A connected intelligence platform for farmers and rural
                entrepreneurs — from deciding what to grow to creating
                value from what they produce.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/before-i-grow"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-lime-50"
                >
                  Start Farm Planning
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/financial-intelligence"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Financial Planner
                  <Calculator size={17} />
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-emerald-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-lime-300" />
                  Explainable
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-lime-300" />
                  Scenario-based
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-lime-300" />
                  Farmer-first
                </span>
              </div>
            </div>

            {/* Intelligence cards */}
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

        {/* =====================================================
            QUICK INTELLIGENCE
        ====================================================== */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <QuickCard
            icon={MapPin}
            title="Hyper-local context"
            text="Use farm location as a contextual input."
            tone="emerald"
          />

          <QuickCard
            icon={BarChart3}
            title="Scenario planning"
            text="Test price, yield and cost assumptions."
            tone="blue"
          />

          <QuickCard
            icon={ShieldCheck}
            title="Responsible AI"
            text="Outputs are estimates, not guarantees."
            tone="amber"
          />
        </section>

        {/* =====================================================
            JOURNEY
        ====================================================== */}
        <section className="mt-10">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                End-to-end workflow
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                From Farm Decision to Rural Enterprise
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                One connected workflow linking cultivation, post-harvest,
                FoodTech and rural enterprise planning.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm sm:flex">
              <Wheat size={15} />
              Agriculture → FoodTech → Enterprise
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <ModuleCard
                key={module.path}
                {...module}
              />
            ))}
          </div>
        </section>

        {/* =====================================================
            VISUAL JOURNEY
        ====================================================== */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
              <Wheat size={21} className="text-emerald-700" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                The RuralAI journey
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                From land to value
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-5">
            <JourneyStep
              number="01"
              title="Plan"
              text="Before I Grow"
              icon={Sprout}
            />

            <JourneyConnector />

            <JourneyStep
              number="02"
              title="Grow"
              text="During Growth"
              icon={Leaf}
            />

            <JourneyConnector />

            <JourneyStep
              number="03"
              title="Harvest"
              text="Post-Harvest"
              icon={Package}
            />

            <JourneyConnector />

            <JourneyStep
              number="04"
              title="Process"
              text="FoodTech"
              icon={Factory}
            />

            <JourneyConnector />

            <JourneyStep
              number="05"
              title="Build"
              text="Rural Enterprise"
              icon={Building2}
            />
          </div>
        </section>

        {/* =====================================================
            DECISION ARCHITECTURE
        ====================================================== */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Factors */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <BarChart3 size={21} className="text-blue-700" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  What the system considers
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Multiple contextual factors are considered instead of
                  relying on a single recommendation.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {factors.map((item) => (
                <div
                  key={item}
                  className="group flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700 transition hover:border-emerald-100 hover:bg-emerald-50"
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-emerald-600"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                <Wallet size={21} className="text-amber-700" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Decision-support principle
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  The platform supports human decisions rather than making
                  guarantees.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
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

        {/* =====================================================
            IMPACT
        ====================================================== */}
        <section className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 to-lime-50 p-6 sm:p-8">

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-200/30" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Built for rural development
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-emerald-950">
              One platform. Three connected outcomes.
            </h2>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <Impact
                icon={Sprout}
                title="Agriculture"
                text="Support crop planning, field monitoring and financial preparation."
              />

              <Impact
                icon={Factory}
                title="FoodTech"
                text="Identify processing and value-addition pathways for farm produce."
              />

              <Impact
                icon={Building2}
                title="Rural Development"
                text="Connect farm output with local processing and enterprise opportunities."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            DISCLAIMER
        ====================================================== */}
        <div className="mt-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">

          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-amber-700"
          />

          <p>
            <strong>Decision-support notice:</strong>{" "}
            RuralAI Nexus provides informational analysis using farmer-entered
            information, reference datasets, weather context and scenario
            calculations. Outputs are estimates and should be validated with
            relevant agricultural, financial and food-processing professionals
            before major decisions.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 py-8 text-center text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>RuralAI Nexus • AI-assisted rural decision support</p>

          <p className="flex items-center justify-center gap-1">
            Built for Agriculture • FoodTech • Rural Development
            <ArrowUpRight size={13} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HERO STAT
============================================================ */

function HeroStat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15">
      <Icon size={20} />

      <p className="mt-3 font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-emerald-100">
        {label}
      </p>
    </div>
  );
}

/* ============================================================
   QUICK CARD
============================================================ */

function QuickCard({ icon: Icon, title, text, tone }) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${tones[tone]}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
          <Icon size={19} />
        </div>

        <div>
          <p className="font-bold text-slate-900">{title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MODULE CARD
============================================================ */

function ModuleCard({
  title,
  description,
  path,
  icon: Icon,
  label,
  number,
}) {
  return (
    <Link
      to={path}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
    >
      <div className="absolute right-4 top-4 text-xs font-bold text-slate-200 transition group-hover:text-emerald-100">
        {number}
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 transition group-hover:bg-emerald-100">
        <Icon
          size={22}
          className="text-emerald-700 transition group-hover:scale-110"
        />
      </div>

      <p className="mt-6 text-[11px] font-extrabold tracking-[0.16em] text-emerald-700">
        {label}
      </p>

      <h3 className="mt-1 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700">
        Open module
        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

/* ============================================================
   JOURNEY STEP
============================================================ */

function JourneyStep({
  number,
  title,
  text,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center transition hover:border-emerald-100 hover:bg-emerald-50">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
        <Icon size={20} className="text-emerald-700" />
      </div>

      <p className="mt-3 text-[10px] font-bold tracking-wider text-emerald-600">
        STEP {number}
      </p>

      <p className="mt-1 font-bold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   JOURNEY CONNECTOR
============================================================ */

function JourneyConnector() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <ArrowRight size={18} className="text-emerald-300" />
    </div>
  );
}

/* ============================================================
   PRINCIPLE
============================================================ */

function Principle({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-emerald-100 hover:bg-emerald-50">
      <p className="font-bold text-slate-800">
        {title}
      </p>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   IMPACT
============================================================ */

function Impact({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
        <Icon size={22} className="text-emerald-700" />
      </div>

      <div>
        <h3 className="font-bold text-emerald-950">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-emerald-800">
          {text}
        </p>
      </div>
    </div>
  );
}