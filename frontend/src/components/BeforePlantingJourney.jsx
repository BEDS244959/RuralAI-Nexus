import {
  MapPin,
  CloudRain,
  Sprout,
  Wallet,
  BarChart3,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Farm Location",
    text: "GPS + local context",
    target: "location",
  },
  {
    number: "02",
    icon: CloudRain,
    title: "Weather",
    text: "Local conditions",
    target: "weather",
  },
  {
    number: "03",
    icon: Sprout,
    title: "Farm Fit",
    text: "Soil + water",
    target: "farm-inputs",
  },
  {
    number: "04",
    icon: Wallet,
    title: "Budget",
    text: "Available resources",
    target: "farm-inputs",
  },
  {
    number: "05",
    icon: Sprout,
    title: "Crop Options",
    text: "Compare alternatives",
    action: "cropOptions",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Scenarios",
    text: "Cost + yield",
    action: "scenarios",
  },
  {
    number: "07",
    icon: IndianRupee,
    title: "Financial View",
    text: "Revenue + ROI",
    action: "scenarios",
  },
];

function scrollToSection(target) {
  const element = document.getElementById(target);

  if (!element) {
    console.warn(`Before I Grow section not found: #${target}`);
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function JourneyCard({
  step,
  onCropOptions,
  onScenarios,
}) {
  const Icon = step.icon;

  const handleClick = () => {
    // React/state-aware actions
    if (step.action === "cropOptions") {
      if (onCropOptions) {
        onCropOptions();
      }

      return;
    }

    if (step.action === "scenarios") {
      if (onScenarios) {
        onScenarios();
      }

      return;
    }

    // Normal section navigation
    if (step.target) {
      scrollToSection(step.target);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        group
        w-full
        rounded-2xl
        bg-white/10
        p-4
        text-left
        ring-1
        ring-white/10
        transition-all
        duration-200
        hover:-translate-y-1
        hover:bg-white/20
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-white/60
        active:scale-[0.98]
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-200">
          {step.number}
        </span>

        <Icon
          size={19}
          strokeWidth={2}
          className="text-emerald-200"
        />
      </div>

      <p className="mt-3 text-sm font-bold text-white">
        {step.title}
      </p>

      <p className="mt-1 text-xs leading-5 text-emerald-100">
        {step.text}
      </p>

      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-200">
        Open section

        <ArrowRight
          size={12}
          className="
            transition-transform
            duration-200
            group-hover:translate-x-1
          "
        />
      </div>
    </button>
  );
}

export default function BeforePlantingJourney({
  onCropOptions,
  onScenarios,
}) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-emerald-100
        bg-gradient-to-br
        from-emerald-950
        via-emerald-900
        to-green-800
        p-5
        text-white
        shadow-sm
        sm:p-7
      "
    >
      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
            Farmer decision journey
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Before You Plant
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-100">
            RuralAI Nexus connects farm context, weather, resources,
            crop suitability and financial scenarios before the farmer
            commits resources.
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
          <p className="text-xs font-semibold text-emerald-200">
            Decision approach
          </p>

          <p className="mt-1 text-sm font-bold text-white">
            Explain → Compare → Simulate
          </p>
        </div>
      </div>

      {/* FIRST FOUR STAGES */}

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.slice(0, 4).map((step) => (
          <JourneyCard
            key={step.number}
            step={step}
            onCropOptions={onCropOptions}
            onScenarios={onScenarios}
          />
        ))}
      </div>

      {/* DIVIDER */}

      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />

        <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
          Farm decision flow
        </span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* FINAL THREE STAGES */}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.slice(4).map((step) => (
          <JourneyCard
            key={step.number}
            step={step}
            onCropOptions={onCropOptions}
            onScenarios={onScenarios}
          />
        ))}
      </div>

      {/* FARMER VALUE */}

      <div className="mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
        <p className="text-sm font-bold text-white">
          What this means for the farmer
        </p>

        <p className="mt-1 text-xs leading-5 text-emerald-100">
          Each stage connects to the relevant part of the Before I
          Grow workflow. The farmer can move from local farm context
          to farm inputs, crop comparison and financial scenarios.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl bg-black/10 px-3 py-3">
            <p className="text-xs font-bold text-white">
              Compare
            </p>

            <p className="mt-1 text-[11px] leading-4 text-emerald-100">
              Compare crop alternatives using farm conditions.
            </p>
          </div>

          <div className="rounded-xl bg-black/10 px-3 py-3">
            <p className="text-xs font-bold text-white">
              Understand
            </p>

            <p className="mt-1 text-[11px] leading-5 text-emerald-100">
              See the factors, assumptions and risks behind results.
            </p>
          </div>

          <div className="rounded-xl bg-black/10 px-3 py-3">
            <p className="text-xs font-bold text-white">
              Simulate
            </p>

            <p className="mt-1 text-[11px] leading-5 text-emerald-100">
              Explore cost, yield and financial scenarios.
            </p>
          </div>
        </div>
      </div>

      {/* RESPONSIBLE AI */}

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[10px] font-bold text-emerald-200">
          AI
        </div>

        <div>
          <p className="text-xs font-bold text-white">
            Responsible decision support
          </p>

          <p className="mt-1 text-[11px] leading-5 text-emerald-100">
            RuralAI Nexus provides estimates and decision-support
            signals based on available inputs and assumptions.
            Results are not guarantees of yield, price or profit.
          </p>
        </div>
      </div>
    </section>
  );
}