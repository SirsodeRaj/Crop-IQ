from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Project, Analysis, CropRequirement
from app.schemas.analysis import AnalysisRequest, AnalysisResponse
from app.services.weather_service import WeatherService, SoilService
from app.services.market_service import MarketService
from app.services.scoring_engine import ScoringEngine
import uuid

router = APIRouter()

@router.post("/recommend", response_model=AnalysisResponse)
def run_analysis(request: AnalysisRequest, db: Session = Depends(get_db)):
    # 1. Validate project
    project = db.query(Project).filter(Project.id == request.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # 2. Ingest Data
    lat = request.location_data.lat
    lon = request.location_data.lon
    
    weather = WeatherService.get_weather_data(lat, lon)
    soil = SoilService.get_soil_data(lat, lon)
    env_data = {**weather, **soil}

    # 3. Fetch Available Crops
    available_crops = db.query(CropRequirement).all()
    if not available_crops:
        raise HTTPException(status_code=500, detail="No crop reference data available. Please seed the database.")

    # 4. Run Scoring Engine
    recommendations = ScoringEngine.evaluate_crops(available_crops, env_data)

    # 5. Fetch overall market context for saved analysis
    market_data = {rec["crop"]: MarketService.get_market_outlook(rec["crop"]) for rec in recommendations}

    # 6. Save Analysis
    analysis = Analysis(
        project_id=project.id,
        environmental_data=env_data,
        market_data=market_data,
        recommendations=recommendations
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return AnalysisResponse(
        analysis_id=analysis.id,
        project_id=project.id,
        recommendations=recommendations,
        environmental_data_used=env_data,
        market_data_used=market_data
    )
