import os
from openai import OpenAI
from app.core.config import settings

# In a real environment, we'd use the settings.OPENAI_API_KEY
# For MVP/testing without exposing keys, we'll implement a fallback if it's missing or a mock key.

class ChatService:
    @staticmethod
    def generate_advisory_reply(analysis_data: dict, question: str, history: list = None) -> str:
        api_key = settings.OPENAI_API_KEY
        
        # Mock response if using a dummy key
        if not api_key or api_key.startswith("sk-mock"):
            return f"Based on the analysis where {analysis_data.get('environmental_data', {}).get('temperature_celsius')}°C was detected: To answer '{question}', consider shifting your planting schedule or introducing heat-tolerant crop varieties."

        try:
            client = OpenAI(api_key=api_key)
            
            system_prompt = f"""You are an expert Agricultural AI Advisor. 
            You are assisting a farmer based on the following specific analysis data:
            Environmental Context: {analysis_data.get('environmental_data')}
            Market Context: {analysis_data.get('market_data')}
            Your task is to answer their 'what-if' scenarios and provide actionable, data-driven agricultural advice."""
            
            messages = [{"role": "system", "content": system_prompt}]
            
            if history:
                for msg in history:
                    if msg.get("role") in ["user", "assistant"]:
                        messages.append({"role": msg["role"], "content": msg["content"]})
                        
            messages.append({"role": "user", "content": question})
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content or "I am unable to provide an analysis at this time."
        except Exception as e:
            return f"Error connecting to AI Advisory service: {str(e)}"
