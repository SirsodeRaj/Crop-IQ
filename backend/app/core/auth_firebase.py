import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User
import json
import os
from jose import jwt

# Initialize Firebase Admin
try:
    # Look for the env var with the JSON string
    firebase_cred_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT_JSON")
    if firebase_cred_json:
        cred_dict = json.loads(firebase_cred_json)
        cred = credentials.Certificate(cred_dict)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
except Exception as e:
    print(f"Warning: Failed to initialize Firebase Admin SDK: {e}")

security = HTTPBearer(auto_error=False)

def verify_firebase_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        return None
    
    token = credentials.credentials
    try:
        if not firebase_admin._apps:
            print("WARNING: Firebase Admin SDK not initialized! Skipping signature verification for local development.")
            return jwt.get_unverified_claims(token)

        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user_optional(decoded_token: dict = Depends(verify_firebase_token), db: Session = Depends(get_db)):
    if not decoded_token:
        return None
        
    uid = decoded_token.get("uid")
    email = decoded_token.get("email")
    phone_number = decoded_token.get("phone_number")
    name = decoded_token.get("name")
    picture = decoded_token.get("picture")

    # Find user by firebase_uid or email
    user = db.query(User).filter(User.firebase_uid == uid).first()
    
    if not user and email:
        user = db.query(User).filter(User.email == email).first()
        if user:
            # Link existing user
            user.firebase_uid = uid
            db.commit()

    if not user:
        # Create new user automatically
        user = User(
            firebase_uid=uid,
            email=email or f"{uid}@placeholder.com",
            phone_number=phone_number,
            full_name=name,
            avatar_url=picture
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
    return user

def get_current_user(user: User = Depends(get_current_user_optional)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    return user
