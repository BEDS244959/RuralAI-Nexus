from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database import Base


class FarmProfile(Base):
    __tablename__ = "farm_profiles"

    id = Column(Integer, primary_key=True, index=True)

    farmer_name = Column(String(150), nullable=False)

    farm_name = Column(String(150), nullable=True)

    land_area = Column(Float, nullable=True)

    primary_crop = Column(String(100), nullable=True)

    soil_type = Column(String(100), nullable=True)

    water_source = Column(String(100), nullable=True)

    village = Column(String(150), nullable=True)

    taluk = Column(String(150), nullable=True)

    district = Column(String(150), nullable=True)

    state = Column(String(150), nullable=True)

    latitude = Column(Float, nullable=True)

    longitude = Column(Float, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )