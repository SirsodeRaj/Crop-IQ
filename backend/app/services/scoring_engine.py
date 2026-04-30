from typing import List, Dict, Any
from app.db.models import CropRequirement
from app.services.market_service import MarketService

class ScoringEngine:
    """Core engine to evaluate crop suitability based on environmental inputs."""

    @staticmethod
    def evaluate_crops(
        available_crops: List[CropRequirement],
        env_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        
        results = []
        temp = env_data.get("temperature_celsius", 25)
        rainfall = env_data.get("annual_rainfall_mm", 600)
        soil_type = env_data.get("primary_soil_type", "Unknown")

        for crop in available_crops:
            score = 100
            rationale = []

            # 1. Temperature Check (30% weight)
            t_min = crop.optimal_temp_range.get("min", 0)
            t_max = crop.optimal_temp_range.get("max", 50)
            if not (t_min <= temp <= t_max):
                penalty = min(30, abs(temp - t_min) if temp < t_min else abs(temp - t_max) * 2)
                score -= penalty
                rationale.append(f"Temperature ({temp}°C) is outside optimal range ({t_min}-{t_max}°C).")
            else:
                rationale.append("Temperature is optimal.")

            # 2. Rainfall Check (40% weight)
            r_min = crop.optimal_rainfall_range.get("min", 0)
            r_max = crop.optimal_rainfall_range.get("max", 5000)
            if not (r_min <= rainfall <= r_max):
                penalty = min(40, (abs(rainfall - r_min) / 100) * 5 if rainfall < r_min else (abs(rainfall - r_max) / 100) * 5)
                score -= penalty
                rationale.append(f"Rainfall ({rainfall}mm) is sub-optimal (Ideal: {r_min}-{r_max}mm).")
            else:
                rationale.append("Rainfall is optimal.")

            # 3. Soil Check (30% weight)
            if soil_type not in crop.soil_types_supported:
                score -= 30
                rationale.append(f"Soil type '{soil_type}' is not highly recommended for this crop.")
            else:
                rationale.append("Soil type is suitable.")

            # Ensure score doesn't drop below 0
            score = max(0, int(score))

            # Fetch Market Context
            market_data = MarketService.get_market_outlook(crop.crop_name)

            confidence = "High" if score >= 80 else "Medium" if score >= 50 else "Low"

            results.append({
                "crop": crop.crop_name,
                "suitability_score": score,
                "confidence": confidence,
                "market_trend": market_data.get("price_trend"),
                "estimated_roi_percentage": crop.expected_roi,
                "rationale": " ".join(rationale)
            })

        # Sort by score descending
        results.sort(key=lambda x: x["suitability_score"], reverse=True)
        return results
