from typing import Dict, Any

class WeatherService:
    """Mock service to simulate fetching environmental data from APIs like OpenWeather."""
    
    @staticmethod
    def get_weather_data(lat: float, lon: float) -> Dict[str, Any]:
        # In a real scenario, this would make an HTTP request to an external API.
        # For MVP, we return a mock based somewhat deterministically on coordinates.
        base_temp = 20 + (abs(lat) % 15)
        base_rainfall = 500 + (abs(lon) % 1000)
        
        return {
            "temperature_celsius": round(base_temp, 1),
            "humidity_percent": 65,
            "annual_rainfall_mm": round(base_rainfall, 1),
            "forecast_notes": "Normal season expected."
        }

class SoilService:
    """Mock service to simulate fetching soil characteristics."""
    
    @staticmethod
    def get_soil_data(lat: float, lon: float) -> Dict[str, Any]:
        # Mock soil mapping logic
        soil_types = ["Loamy", "Clay", "Sandy Loam", "Silt Loam", "Clay Loam"]
        idx = int((abs(lat) + abs(lon)) % len(soil_types))
        
        return {
            "primary_soil_type": soil_types[idx],
            "ph_level": round(6.0 + (abs(lat) % 2.0), 1)
        }
