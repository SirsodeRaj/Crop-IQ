from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID

class ChatMessage(BaseModel):
    role: str
    content: str

class AdvisoryRequest(BaseModel):
    analysis_id: UUID
    question: str
    history: Optional[List[ChatMessage]] = []

class AdvisoryResponse(BaseModel):
    reply: str
