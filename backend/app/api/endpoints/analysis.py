from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Project, Analysis, CropRequirement, User
from app.schemas.analysis import AnalysisRequest, AnalysisResponse
from app.services.weather_service import WeatherService, SoilService
from app.services.market_service import MarketService
from app.services.scoring_engine import ScoringEngine
from app.core.auth_firebase import get_current_user_optional, get_current_user
import uuid

router = APIRouter()

@router.post("/recommend", response_model=AnalysisResponse)
def run_analysis(request: AnalysisRequest, db: Session = Depends(get_db), current_user: User | None = Depends(get_current_user_optional)):
    # 1. Handle project
    if current_user:
        project = Project(
            user_id=current_user.id,
            name=f"Analysis - {request.location_data.name}",
            location=request.location_data.name,
            budget=request.constraints.budget,
            risk_tolerance=request.constraints.risk_tolerance
        )
        db.add(project)
        db.commit()
        db.refresh(project)
    else:
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
        user_id=current_user.id if current_user else None,
        environmental_data=env_data,
        market_data=market_data,
        recommendations=recommendations,
        chat_history=[]
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

@router.get("/history")
def get_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    analyses = db.query(Analysis).filter(Analysis.user_id == current_user.id).order_by(Analysis.created_at.desc()).all()
    history = []
    for analysis in analyses:
        project = db.query(Project).filter(Project.id == analysis.project_id).first()
        history.append({
            "id": analysis.id,
            "created_at": analysis.created_at,
            "location": project.location if project else "Unknown",
            "budget": project.budget if project else 0,
            "risk_tolerance": project.risk_tolerance.value if project else "MEDIUM",
            "recommendations": analysis.recommendations,
            "environmental_data": analysis.environmental_data,
            "market_data": analysis.market_data
        })
    return {"history": history}

@router.delete("/{analysis_id}")
def delete_history(analysis_id: uuid.UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id, Analysis.user_id == current_user.id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    # Optional: Delete associated dynamically created project if it belongs to this analysis solely.
    # For now, we'll just delete the analysis to simplify and maintain referential integrity.
    db.delete(analysis)
    db.commit()
    return {"message": "Analysis deleted successfully"}
