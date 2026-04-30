from typing import Dict, Any

class MarketService:
    """Mock service to simulate fetching market demand and pricing data."""
    
    @staticmethod
    def get_market_outlook(crop_name: str) -> Dict[str, Any]:
        # Simulated market trends
        trends = {
            "Wheat": {"demand": "High", "price_trend": "Stable", "current_price_per_ton": 250},
            "Corn (Maize)": {"demand": "Medium", "price_trend": "Upward", "current_price_per_ton": 210},
            "Rice": {"demand": "Very High", "price_trend": "Stable", "current_price_per_ton": 320},
            "Soybeans": {"demand": "High", "price_trend": "Upward", "current_price_per_ton": 450}
        }
        
        return trends.get(crop_name, {"demand": "Unknown", "price_trend": "Unknown", "current_price_per_ton": 0})
