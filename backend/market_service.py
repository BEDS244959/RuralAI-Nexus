from typing import Optional


# -------------------------------------------------------------------
# REFERENCE MARKET DATA
# -------------------------------------------------------------------
# IMPORTANT:
# These are demonstration/reference values only.
# They are NOT live mandi prices.
#
# The market location is explicitly stored here so that the system
# never incorrectly treats the farmer's detected district as the
# location of this reference dataset.
# -------------------------------------------------------------------

REFERENCE_MARKET_DATA = {
    "Groundnut": {
        "minPrice": 55,
        "modalPrice": 60,
        "maxPrice": 68,
        "referenceMarket": "Bengaluru Urban",
    },
    "Millets": {
        "minPrice": 30,
        "modalPrice": 35,
        "maxPrice": 42,
        "referenceMarket": "Bengaluru Urban",
    },
    "Maize": {
        "minPrice": 20,
        "modalPrice": 22,
        "maxPrice": 26,
        "referenceMarket": "Bengaluru Urban",
    },
    "Vegetables": {
        "minPrice": 20,
        "modalPrice": 25,
        "maxPrice": 32,
        "referenceMarket": "Bengaluru Urban",
    },
}


def get_reference_market_price(
    crop_name: str,
    district: Optional[str] = None,
):
    """
    Return reference/demo market data.

    The detected farmer district is treated as the REQUESTED
    FARM DISTRICT only. It is never renamed as the reference market.

    This prevents a misleading situation such as:

        Farm District: Paschim Bardhaman
        Reference Market: Paschim Bardhaman

    when the underlying reference dataset actually represents
    Bengaluru Urban.
    """

    data = REFERENCE_MARKET_DATA.get(crop_name)

    requested_district = (
        district.strip()
        if isinstance(district, str) and district.strip()
        else ""
    )

    if not data:
        return {
            "available": False,
            "live": False,
            "crop": crop_name,

            "requestedDistrict": requested_district,

            "referenceMarket": None,
            "marketLocationMatch": False,

            "minPrice": None,
            "modalPrice": None,
            "maxPrice": None,

            "unit": "₹/kg",

            "source": "RuralAI Nexus reference dataset",

            "dataStatus": "NO_REFERENCE_DATA",

            "message": (
                "No reference market data is available for this crop."
            ),
        }

    reference_market = data["referenceMarket"]

    # The reference dataset is only considered location-matched
    # if the requested district is explicitly the same market
    # represented by the dataset.
    location_match = (
        requested_district.lower()
        == reference_market.lower()
        if requested_district
        else False
    )

    return {
        "available": True,
        "live": False,
        "crop": crop_name,

        # The farmer's detected location.
        "requestedDistrict": requested_district,

        # The actual location represented by the reference dataset.
        "referenceMarket": reference_market,

        # Explicitly communicate whether the two locations match.
        "marketLocationMatch": location_match,

        "minPrice": data["minPrice"],
        "modalPrice": data["modalPrice"],
        "maxPrice": data["maxPrice"],

        "unit": "₹/kg",

        "source": "RuralAI Nexus reference dataset",

        "dataStatus": "DEMO_REFERENCE",

        "message": (
            "Reference/demo market data. "
            "Not connected to live mandi prices and "
            "not verified for the detected farm location."
        ),
    }


async def get_market_price(
    crop_name: str,
    district: Optional[str] = None,
):
    """
    Main market service entry point.

    Currently returns clearly labelled reference data.
    A live mandi/API integration can replace this implementation
    later without changing the frontend contract.
    """

    return get_reference_market_price(
        crop_name=crop_name,
        district=district,
    )