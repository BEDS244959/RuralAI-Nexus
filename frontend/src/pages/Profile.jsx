import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Crosshair,
  Droplets,
  Leaf,
  MapPin,
  Save,
  ShieldCheck,
  Sparkles,
  User,
  Wheat,
} from "lucide-react";

import LocationDetector from "../components/LocationDetector";

import {
  getFarmProfile,
  saveFarmProfile,
} from "../utils/farmStorage";

import { createFarmProfile } from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState({
    farmerName: "",
    farmName: "",
    landArea: "",
    soilType: "Red soil",
    waterSource: "Rainfed",
    primaryCrop: "Groundnut",
    location: null,
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const existingProfile = getFarmProfile();

    if (existingProfile) {
      setProfile((current) => ({
        ...current,
        ...existingProfile,
      }));
    }
  }, []);

  const updateField = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleLocation = (location) => {
    setProfile((current) => ({
      ...current,
      location,
    }));

    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const location = profile.location || {};

      const backendProfile = {
        farmer_name: profile.farmerName,
        farm_name: profile.farmName || null,
        land_area: profile.landArea
          ? Number(profile.landArea)
          : null,
        primary_crop: profile.primaryCrop,
        soil_type: profile.soilType,
        water_source: profile.waterSource,

        village: location.village || null,
        taluk: location.taluk || null,
        district: location.district || null,
        state: location.state || null,

        latitude: location.latitude || null,
        longitude: location.longitude || null,
      };

      const savedProfile =
        await createFarmProfile(backendProfile);

      saveFarmProfile(profile);

      console.log(
        "Profile saved successfully:",
        savedProfile
      );

      setSaved(true);
    } catch (error) {
      console.error(
        "Backend save failed:",
        error
      );

      saveFarmProfile(profile);

      alert(
        "Backend could not be reached. Your profile was saved locally."
      );
    } finally {
      setSaving(false);
    }
  };

  const location = profile.location;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800 p-7 text-white shadow-xl sm:p-10">

          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-emerald-400/10" />

          <div className="relative">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <Wheat size={28} />
                </div>

                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100">
                    <Sparkles size={13} />
                    Hyper-local farm intelligence
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Farm Profile
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-100 sm:text-base">
                    Build your farm context once. RuralAI Nexus uses it
                    across planning, crop analysis, growth monitoring,
                    post-harvest and financial scenarios.
                  </p>
                </div>
              </div>

              <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-4 sm:block">
                <p className="text-xs text-emerald-200">
                  Decision context
                </p>
                <p className="mt-1 text-lg font-semibold">
                  Farm → Crop → Location
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence strip */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">

          <InfoCard
            icon={<Crosshair size={18} />}
            title="Hyper-local"
            text="Uses your detected coordinates and local administrative context."
          />

          <InfoCard
            icon={<Leaf size={18} />}
            title="Farm-aware"
            text="Crop, soil, land and water details shape decision-support scenarios."
          />

          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="Responsible"
            text="Outputs are estimates and decision support, not guaranteed outcomes."
          />

        </div>

        {/* Farmer & Farm Details */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <SectionHeading
            icon={<User size={20} />}
            title="Farmer & Farm Details"
            description="These details provide the base context for your rural decision-support workflows."
          />

          <div className="mt-7 grid gap-5 md:grid-cols-2">

            <Field
              label="Farmer name"
              value={profile.farmerName}
              onChange={(value) =>
                updateField("farmerName", value)
              }
              placeholder="Enter your name"
            />

            <Field
              label="Farm name"
              value={profile.farmName}
              onChange={(value) =>
                updateField("farmName", value)
              }
              placeholder="Optional farm name"
            />

            <Field
              label="Land area"
              type="number"
              value={profile.landArea}
              onChange={(value) =>
                updateField("landArea", value)
              }
              placeholder="Example: 2"
              suffix="acres"
            />

            <SelectField
              label="Primary crop"
              value={profile.primaryCrop}
              onChange={(value) =>
                updateField("primaryCrop", value)
              }
              options={[
                "Groundnut",
                "Millets",
                "Maize",
                "Vegetables",
              ]}
            />

            <SelectField
              label="Soil type"
              value={profile.soilType}
              onChange={(value) =>
                updateField("soilType", value)
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
              label="Main water source"
              value={profile.waterSource}
              onChange={(value) =>
                updateField("waterSource", value)
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
        </section>

        {/* Location */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">

          <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm">
                  <MapPin size={22} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      Hyper-local Location
                    </h2>

                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      GPS enabled
                    </span>
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Detect the farm location from your browser GPS.
                    RuralAI Nexus then converts the coordinates into
                    a readable village, taluk, district and state context.
                  </p>
                </div>
              </div>

              {location && (
                <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                  <CheckCircle2 size={15} />
                  Location detected
                </div>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <LocationDetector
              onLocationDetected={handleLocation}
            />
          </div>

        </section>

        {/* Detected location */}
        {location && (
          <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                <MapPin size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-emerald-950">
                  Detected Farm Context
                </h2>

                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  This location can be used as context for future
                  weather, crop and rural-enterprise analysis.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              <LocationItem
                label="Village / Town"
                value={location.village}
              />

              <LocationItem
                label="Taluk"
                value={location.taluk}
              />

              <LocationItem
                label="District"
                value={location.district}
              />

              <LocationItem
                label="State"
                value={location.state}
              />

            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">

              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Latitude
                </p>

                <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                  {location.latitude?.toFixed?.(6) ||
                    "Not available"}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Longitude
                </p>

                <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                  {location.longitude?.toFixed?.(6) ||
                    "Not available"}
                </p>
              </div>

            </div>

            {location.accuracy && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  GPS accuracy
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Approximately {Math.round(location.accuracy)} metres
                </p>
              </div>
            )}

          </section>
        )}

        {/* How location is used */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <SectionHeading
            icon={<Sparkles size={20} />}
            title="How RuralAI Nexus uses this context"
            description="The detected location is one input into a broader decision-support workflow."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <WorkflowCard
              number="01"
              title="Local context"
              text="Coordinates are converted into readable geographic context such as village, taluk and district."
            />

            <WorkflowCard
              number="02"
              title="Farm analysis"
              text="Location can be combined with crop, soil, water and land information for scenario analysis."
            />

            <WorkflowCard
              number="03"
              title="Decision support"
              text="The resulting insights are presented as assumptions and estimates rather than guaranteed outcomes."
            />

          </div>
        </section>

        {/* Save */}
        <section className="mt-6 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">

          <div>
            <div className="flex items-center gap-2">
              <Save size={19} className="text-emerald-700" />

              <h2 className="font-bold text-slate-900">
                Save Farm Profile
              </h2>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Your profile is saved to the RuralAI Nexus backend
              database and retained locally in your browser as a fallback.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : saved ? (
              <>
                <CheckCircle2 size={18} />
                Profile Saved
              </>
            ) : (
              <>
                <Save size={18} />
                Save Farm Profile
              </>
            )}
          </button>

        </section>

        {/* Responsible AI */}
        <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950">

          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-blue-700" size={19} />

            <p>
              <strong>Responsible decision support:</strong>{" "}
              RuralAI Nexus uses location and farm information as inputs
              for analysis. Results are estimates based on available data
              and assumptions. They are not guarantees of yield, income,
              market price or profit.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}


/* -------------------------------- */
/* Section Heading                  */
/* -------------------------------- */

function SectionHeading({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}


/* -------------------------------- */
/* Info Card                        */
/* -------------------------------- */

function InfoCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          {icon}
        </div>

        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}


/* -------------------------------- */
/* Field                            */
/* -------------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  suffix,
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
            suffix ? "pr-20" : ""
          }`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-xs font-semibold text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}


/* -------------------------------- */
/* Select                           */
/* -------------------------------- */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


/* -------------------------------- */
/* Location Item                    */
/* -------------------------------- */

function LocationItem({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
}


/* -------------------------------- */
/* Workflow Card                    */
/* -------------------------------- */

function WorkflowCard({
  number,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:shadow-sm">

      <span className="text-xs font-bold tracking-widest text-emerald-600">
        {number}
      </span>

      <h3 className="mt-3 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}