from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Analysis
from app.schemas.advisory import AdvisoryRequest, AdvisoryResponse
from app.services.chat_service import ChatService

router = APIRouter()

@router.post("/ask", response_model=AdvisoryResponse)
def ask_advisor(request: AdvisoryRequest, db: Session = Depends(get_db)):
    # 1. Verify Analysis exists
    analysis = db.query(Analysis).filter(Analysis.id == request.analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found. Cannot provide context-aware advisory.")

    # 2. Extract context data
    analysis_data = {
        "environmental_data": analysis.environmental_data,
        "market_data": analysis.market_data,
        "recommendations": analysis.recommendations
    }

    # 3. Trigger OpenAI service
    # Convert ChatMessage objects to dicts for the service
    history_dicts = [{"role": msg.role, "content": msg.content} for msg in request.history] if request.history else []
    reply = ChatService.generate_advisory_reply(analysis_data, request.question, history_dicts)

    return AdvisoryResponse(reply=reply)
