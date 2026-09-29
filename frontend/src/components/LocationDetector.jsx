import { useState } from "react";
import {
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const MAX_ACCEPTABLE_ACCURACY_METERS = 5000;

export default function LocationDetector({
  onLocationDetected,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);

  const detectLocation = () => {
    setError("");
    setLocation(null);

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by this browser."
      );
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {
          latitude,
          longitude,
          accuracy,
        } = position.coords;

        console.log(
          "RuralAI Nexus GPS coordinates:",
          {
            latitude,
            longitude,
            accuracy,
          }
        );

        if (
          typeof accuracy === "number" &&
          accuracy > MAX_ACCEPTABLE_ACCURACY_METERS
        ) {
          setError(
            `Location accuracy is too low (${Math.round(
              accuracy
            )} meters). Please turn on GPS/location services and try again.`
          );

          setLoading(false);
          return;
        }

        try {
          const params = new URLSearchParams({
            lat: latitude.toString(),
            lon: longitude.toString(),
            format: "geocodejson",
            zoom: "18",
            addressdetails: "1",
            layer: "address",
          });

          const url =
            `https://nominatim.openstreetmap.org/reverse?${params.toString()}`;

          console.log(
            "RuralAI Nexus reverse geocoding request:",
            url
          );

          const response = await fetch(url, {
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(
              `Location service returned HTTP ${response.status}`
            );
          }

          const data = await response.json();

          console.log(
            "RuralAI Nexus reverse geocoding response:",
            data
          );

          const geocoding =
            data?.features?.[0]?.properties?.geocoding || {};

          const admin =
            geocoding.admin || {};

          const country =
            geocoding.country || "";

          const state =
            admin.level4 ||
            geocoding.state ||
            "";

          const district =
            admin.level6 ||
            geocoding.county ||
            "";

          const taluk =
            admin.level7 ||
            geocoding.town ||
            geocoding.city ||
            "";

          const village =
            geocoding.locality ||
            geocoding.village ||
            geocoding.city ||
            geocoding.town ||
            geocoding.suburb ||
            "";

          const postcode =
            geocoding.postcode ||
            "";

          const displayName =
            geocoding.label ||
            "";

          const detectedLocation = {
            latitude,
            longitude,
            accuracy:
              typeof accuracy === "number"
                ? accuracy
                : null,

            village,
            taluk,
            district,
            state,
            country,
            postcode,

            displayName,

            source:
              "Device GPS + OpenStreetMap Nominatim",

            locationSource:
              "GPS coordinates are primary; administrative names are reverse-geocoded.",

            detectedAt:
              new Date().toISOString(),

            rawGeocoding:
              geocoding,
          };

          console.log(
            "RuralAI Nexus final detected location:",
            detectedLocation
          );

          setLocation(detectedLocation);

          onLocationDetected?.(
            detectedLocation
          );
        } catch (err) {
          console.error(
            "RuralAI Nexus location error:",
            err
          );

          const fallbackLocation = {
            latitude,
            longitude,
            accuracy:
              typeof accuracy === "number"
                ? accuracy
                : null,

            village: "",
            taluk: "",
            district: "",
            state: "",
            country: "",
            postcode: "",

            displayName: "",

            source: "Device GPS",

            locationSource:
              "GPS coordinates detected; administrative names unavailable.",

            detectedAt:
              new Date().toISOString(),
          };

          setLocation(
            fallbackLocation
          );

          onLocationDetected?.(
            fallbackLocation
          );

          setError(
            "GPS coordinates were detected, but administrative location names could not be retrieved."
          );
        } finally {
          setLoading(false);
        }
      },

      (err) => {
        console.error(
          "RuralAI Nexus geolocation error:",
          err
        );

        setLoading(false);

        if (err.code === 1) {
          setError(
            "Location permission was denied. Please allow location access in your browser and try again."
          );
        } else if (err.code === 2) {
          setError(
            "Your device could not determine your location. Please turn on GPS/location services and try again."
          );
        } else if (err.code === 3) {
          setError(
            "Location detection timed out. Please make sure GPS/location services are enabled and try again."
          );
        } else {
          setError(
            "Unable to detect your current location. Please try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 30000,
      }
    );
  };

  return (
    <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
          <MapPin
            className="text-green-700"
            size={24}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Detect Farm Location
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Detect your farm location using your
            device GPS and identify the
            administrative area.
          </p>

          <button
            onClick={detectLocation}
            disabled={loading}
            className="mt-4 flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Detecting GPS location...
              </>
            ) : (
              <>
                <MapPin size={18} />
                Detect My Location
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
          <div className="flex items-start gap-2">
            <RefreshCw
              size={18}
              className="mt-0.5 animate-spin"
            />

            <div>
              <p className="font-semibold">
                Getting GPS location...
              </p>

              <p className="mt-1">
                Please keep location services
                enabled. This may take a few
                seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Location notice
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>
        </div>
      )}

      {location && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle size={18} />

            <span className="font-semibold">
              GPS location detected
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-green-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Primary location signal
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-800">
              GPS coordinates
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {location.latitude.toFixed(6)},{" "}
              {location.longitude.toFixed(6)}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {location.accuracy
                ? `Accuracy: approximately ±${Math.round(
                    location.accuracy
                  )} meters`
                : "GPS accuracy unavailable"}
            </p>
          </div>

          <div className="mt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Reverse-geocoded administrative area
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <LocationItem
                label="Village / Town"
                value={location.village}
              />

              <LocationItem
                label="Taluk / Local Area"
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

              {location.postcode && (
                <LocationItem
                  label="PIN Code"
                  value={location.postcode}
                />
              )}

              {location.country && (
                <LocationItem
                  label="Country"
                  value={location.country}
                />
              )}
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-white p-3">
            <p className="text-xs text-gray-500">
              GPS coordinates are used as the
              primary location signal. Village,
              taluk and district names are obtained
              through reverse geocoding and may vary
              with available map data.
            </p>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Source: {location.source}
          </div>

          {location.displayName && (
            <div className="mt-1 text-xs text-gray-500">
              Map result: {location.displayName}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LocationItem({
  label,
  value,
}) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value || "Not available"}
      </p>
    </div>
  );
}