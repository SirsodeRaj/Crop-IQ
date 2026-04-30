import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Enum, JSON, Uuid
from sqlalchemy.orm import relationship
import enum

from app.db.database import Base

class RiskTolerance(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class User(Base):
    __tablename__ = "users"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    projects = relationship("Project", back_populates="user")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid(as_uuid=True), ForeignKey("users.id"))
    name = Column(String, nullable=False)
    location = Column(String) # Simple string for MVP
    land_area = Column(Float)
    risk_tolerance = Column(Enum(RiskTolerance), default=RiskTolerance.MEDIUM)
    budget = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="projects")
    analyses = relationship("Analysis", back_populates="project")

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(Uuid(as_uuid=True), ForeignKey("projects.id"))
    environmental_data = Column(JSON)
    market_data = Column(JSON)
    recommendations = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="analyses")

class CropRequirement(Base):
    __tablename__ = "crop_requirements"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    crop_name = Column(String, unique=True, index=True)
    optimal_temp_range = Column(JSON) # e.g. {"min": 15, "max": 30}
    optimal_rainfall_range = Column(JSON) # e.g. {"min": 400, "max": 800}
    soil_types_supported = Column(JSON) # Array of strings
    expected_roi = Column(Float)
