from pydantic import BaseModel
from typing import Optional


class FarmProfileCreate(BaseModel):
    farmer_name: str
    farm_name: Optional[str] = None
    land_area: Optional[float] = None
    primary_crop: Optional[str] = None
    soil_type: Optional[str] = None
    water_source: Optional[str] = None
    village: Optional[str] = None
    taluk: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class FarmProfileResponse(FarmProfileCreate):
    id: int

    class Config:
        from_attributes = True