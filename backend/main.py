from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import FarmProfile
from schemas import FarmProfileCreate, FarmProfileResponse
from market_service import get_market_price


# ---------------------------------------------------------
# DATABASE INITIALIZATION
# ---------------------------------------------------------

Base.metadata.create_all(bind=engine)


# ---------------------------------------------------------
# FASTAPI APPLICATION
# ---------------------------------------------------------

app = FastAPI(
    title="RuralAI Nexus API",
    description=(
        "AI-driven rural agriculture, FoodTech and "
        "enterprise decision-support API"
    ),
    version="1.0.0",
)


# ---------------------------------------------------------
# CORS CONFIGURATION
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# ROOT
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "RuralAI Nexus API is running",
        "status": "ok",
    }


# ---------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "RuralAI Nexus Backend",
    }


# ---------------------------------------------------------
# FARM PROFILE - CREATE / UPDATE
# ---------------------------------------------------------

@app.post(
    "/api/farm-profiles",
    response_model=FarmProfileResponse,
)
def create_farm_profile(
    profile: FarmProfileCreate,
    db: Session = Depends(get_db),
):
    # Check whether this farmer already has a profile.
    existing_profile = (
        db.query(FarmProfile)
        .filter(
            FarmProfile.farmer_name
            == profile.farmer_name
        )
        .first()
    )

    # -----------------------------------------------------
    # UPDATE EXISTING PROFILE
    # -----------------------------------------------------

    if existing_profile:
        existing_profile.farm_name = profile.farm_name
        existing_profile.land_area = profile.land_area
        existing_profile.primary_crop = profile.primary_crop
        existing_profile.soil_type = profile.soil_type
        existing_profile.water_source = profile.water_source
        existing_profile.village = profile.village
        existing_profile.taluk = profile.taluk
        existing_profile.district = profile.district
        existing_profile.state = profile.state
        existing_profile.latitude = profile.latitude
        existing_profile.longitude = profile.longitude

        db.commit()
        db.refresh(existing_profile)

        return existing_profile

    # -----------------------------------------------------
    # CREATE NEW PROFILE
    # -----------------------------------------------------

    new_profile = FarmProfile(
        farmer_name=profile.farmer_name,
        farm_name=profile.farm_name,
        land_area=profile.land_area,
        primary_crop=profile.primary_crop,
        soil_type=profile.soil_type,
        water_source=profile.water_source,
        village=profile.village,
        taluk=profile.taluk,
        district=profile.district,
        state=profile.state,
        latitude=profile.latitude,
        longitude=profile.longitude,
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


# ---------------------------------------------------------
# FARM PROFILE - GET ALL
# ---------------------------------------------------------

@app.get(
    "/api/farm-profiles",
    response_model=list[FarmProfileResponse],
)
def get_farm_profiles(
    db: Session = Depends(get_db),
):
    return (
        db.query(FarmProfile)
        .order_by(FarmProfile.id.desc())
        .all()
    )


# ---------------------------------------------------------
# MARKET PRICE API
# ---------------------------------------------------------

@app.get("/api/market-prices")
async def market_prices(
    crop: str = Query(...),
    district: str | None = Query(None),
):
    return await get_market_price(
        crop_name=crop,
        district=district,
    )