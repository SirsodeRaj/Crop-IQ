from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Analysis, User
from app.schemas.advisory import AdvisoryRequest, AdvisoryResponse
from app.services.chat_service import ChatService
from app.core.auth_firebase import get_current_user_optional

router = APIRouter()

@router.post("/ask", response_model=AdvisoryResponse)
def ask_advisor(request: AdvisoryRequest, db: Session = Depends(get_db), current_user: User | None = Depends(get_current_user_optional)):
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

    # 4. Store in history if user is authenticated and owns this analysis
    if current_user and analysis.user_id == current_user.id:
        chat_log = list(analysis.chat_history) if analysis.chat_history else []
        chat_log.append({"role": "user", "content": request.question})
        chat_log.append({"role": "advisor", "content": reply})
        # Need to assign new list object for SQLAlchemy JSON mutation detection, or use mutable dict
        analysis.chat_history = chat_log
        db.commit()

    return AdvisoryResponse(reply=reply)
