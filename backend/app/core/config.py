from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Crop Decision Intelligence API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "crop_iq"
    
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return "sqlite:///./crop_iq.db"
        
    # Security
    SECRET_KEY: str = "a_very_secret_key_please_change_in_production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # External APIs
    OPENAI_API_KEY: str = "sk-mock-key-for-mvp-replace-in-prod"
    
    class Config:
        case_sensitive = True

settings = Settings()
