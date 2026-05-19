from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from uuid import UUID
from app.db.models import RiskTolerance

class LocationData(BaseModel):
    lat: float
    lon: float
    name: Optional[str] = "Unknown Location"

class AnalysisConstraints(BaseModel):
    budget: float
    risk_tolerance: RiskTolerance

class AnalysisRequest(BaseModel):
    project_id: UUID
    location_data: LocationData
    constraints: AnalysisConstraints

class CropRecommendation(BaseModel):
    crop: str
    suitability_score: int
    confidence: str
    market_trend: str
    estimated_roi_percentage: float
    rationale: str

class AnalysisResponse(BaseModel):
    analysis_id: UUID
    project_id: UUID
    recommendations: List[CropRecommendation]
    environmental_data_used: Dict[str, Any]
    market_data_used: Dict[str, Any]
