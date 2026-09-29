import { useEffect, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Save,
  User,
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

      // Keep local browser storage as a fallback/cache.
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

      // Fallback so the user does not lose their profile.
      saveFarmProfile(profile);

      alert(
        "Backend could not be reached. Your profile was saved locally."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
              <User
                size={25}
                className="text-emerald-700"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Farm Profile
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Save your basic farm information for
                decision-support workflows.
              </p>
            </div>

          </div>
        </div>

        {/* Farmer & Farm Details */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <User
              size={20}
              className="text-emerald-700"
            />

            <h2 className="text-lg font-semibold text-gray-900">
              Farmer & Farm Details
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <Field
              label="Farmer name"
              value={profile.farmerName}
              onChange={(value) =>
                updateField(
                  "farmerName",
                  value
                )
              }
              placeholder="Enter your name"
            />

            <Field
              label="Farm name"
              value={profile.farmName}
              onChange={(value) =>
                updateField(
                  "farmName",
                  value
                )
              }
              placeholder="Optional farm name"
            />

            <Field
              label="Land area (acres)"
              type="number"
              value={profile.landArea}
              onChange={(value) =>
                updateField(
                  "landArea",
                  value
                )
              }
              placeholder="Example: 2"
            />

            <SelectField
              label="Primary crop"
              value={profile.primaryCrop}
              onChange={(value) =>
                updateField(
                  "primaryCrop",
                  value
                )
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
                updateField(
                  "soilType",
                  value
                )
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
                updateField(
                  "waterSource",
                  value
                )
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
        </div>

        {/* Location Detection */}
        <div className="mt-6">
          <LocationDetector
            onLocationDetected={
              handleLocation
            }
          />
        </div>

        {/* Detected Location */}
        {profile.location && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                className="text-emerald-700"
              />

              <div>
                <h2 className="font-semibold text-emerald-900">
                  Profile Location
                </h2>

                <p className="text-sm text-emerald-700">
                  This location will be available to
                  future farm-analysis workflows.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <LocationItem
                label="Village / Town"
                value={
                  profile.location.village
                }
              />

              <LocationItem
                label="Taluk"
                value={
                  profile.location.taluk
                }
              />

              <LocationItem
                label="District"
                value={
                  profile.location.district
                }
              />

              <LocationItem
                label="State"
                value={
                  profile.location.state
                }
              />

            </div>

            <div className="mt-4 text-xs text-emerald-700">
              Coordinates:{" "}
              {profile.location.latitude?.toFixed?.(6) ||
                "Not available"}
              ,{" "}
              {profile.location.longitude?.toFixed?.(6) ||
                "Not available"}
            </div>

          </div>
        )}

        {/* Save Profile */}
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold text-gray-900">
              Save Farm Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your profile is saved to the RuralAI Nexus
              backend database and locally in your browser.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
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
                Save Profile
              </>
            )}
          </button>

        </div>

        {/* Technical Note */}
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-900">
          <strong>Technical note:</strong>{" "}
          RuralAI Nexus currently uses FastAPI, SQLAlchemy
          and SQLite for backend persistence. Browser
          localStorage is also retained as a local fallback.
        </div>

      </div>
    </div>
  );
}


/* ----------------------------- */
/* Reusable Input Component      */
/* ----------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}


/* ----------------------------- */
/* Reusable Select Component     */
/* ----------------------------- */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


/* ----------------------------- */
/* Location Display Component    */
/* ----------------------------- */

function LocationItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value || "Not available"}
      </p>
    </div>
  );
}