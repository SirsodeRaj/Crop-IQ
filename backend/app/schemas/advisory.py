from pydantic import BaseModel
from uuid import UUID

class AdvisoryRequest(BaseModel):
    analysis_id: UUID
    question: str

class AdvisoryResponse(BaseModel):
    reply: str
