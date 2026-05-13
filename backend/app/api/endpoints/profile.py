from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User, Analysis
from app.core.auth_firebase import get_current_user

router = APIRouter()

@router.get("/history")
def get_user_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    analyses = db.query(Analysis).filter(Analysis.user_id == current_user.id).order_by(Analysis.created_at.desc()).all()
    return analyses

@router.delete("")
def delete_user_account(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        # Delete all analyses
        db.query(Analysis).filter(Analysis.user_id == current_user.id).delete()
        # Note: Projects could also be deleted here if we strictly tie them
        
        # Delete user
        db.delete(current_user)
        db.commit()
        return {"status": "success", "message": "Account and all history deleted"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
