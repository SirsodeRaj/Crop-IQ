import uuid
from app.db.database import SessionLocal, Base, engine
from app.db.models import CropRequirement

# Sample crop intelligence data
SEED_CROPS = [
    {
        "crop_name": "Wheat",
        "optimal_temp_range": {"min": 15, "max": 25},
        "optimal_rainfall_range": {"min": 450, "max": 650},
        "soil_types_supported": ["Loamy", "Clay Loam"],
        "expected_roi": 15.5
    },
    {
        "crop_name": "Corn (Maize)",
        "optimal_temp_range": {"min": 20, "max": 30},
        "optimal_rainfall_range": {"min": 500, "max": 800},
        "soil_types_supported": ["Well-drained Loam", "Silt Loam"],
        "expected_roi": 18.0
    },
    {
        "crop_name": "Rice",
        "optimal_temp_range": {"min": 22, "max": 32},
        "optimal_rainfall_range": {"min": 1000, "max": 2000},
        "soil_types_supported": ["Clay", "Clay Loam"],
        "expected_roi": 14.0
    },
    {
        "crop_name": "Soybeans",
        "optimal_temp_range": {"min": 20, "max": 30},
        "optimal_rainfall_range": {"min": 500, "max": 700},
        "soil_types_supported": ["Sandy Loam", "Loam"],
        "expected_roi": 16.5
    }
]

def run_seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        from app.db.models import Project, User
        # Create a dummy user and project for MVP testing
        dummy_user = db.query(User).filter(User.email == "demo@cropiq.com").first()
        if not dummy_user:
            dummy_user = User(email="demo@cropiq.com", password_hash="hashed_dummy")
            db.add(dummy_user)
            db.commit()
            db.refresh(dummy_user)
            
        dummy_project = db.query(Project).filter(Project.id == uuid.UUID("00000000-0000-0000-0000-000000000000")).first()
        if not dummy_project:
            dummy_project = Project(
                id=uuid.UUID("00000000-0000-0000-0000-000000000000"),
                user_id=dummy_user.id,
                name="Demo MVP Project",
                location="Global",
                land_area=100.0,
                budget=50000.0
            )
            db.add(dummy_project)

        for crop_data in SEED_CROPS:
            existing_crop = db.query(CropRequirement).filter(CropRequirement.crop_name == crop_data["crop_name"]).first()
            if not existing_crop:
                crop = CropRequirement(**crop_data)
                db.add(crop)
        db.commit()
        print("Successfully seeded Crop Requirements!")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
