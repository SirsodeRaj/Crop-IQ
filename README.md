# 🌾 Crop-IQ

## Smart Crop Decision Intelligence System

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?logo=vercel)](https://crop-iq-bravo.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Crop-IQ** is an AI-powered crop decision intelligence platform that helps users make data-driven agricultural decisions using location, environmental conditions, budget, risk tolerance, and AI-powered agricultural insights.

---

## 🌱 Overview

Agricultural decisions often depend on multiple factors such as climate, soil conditions, water availability, location, investment, and expected profitability.

**Crop-IQ** brings these factors together into an intelligent decision-support platform that provides crop recommendations and AI-generated agricultural insights.

The platform is designed to help users understand **which crops may be suitable for their selected location and conditions**, while also providing supporting information for better decision-making.

---

## ✨ Features

### 🌾 Intelligent Crop Recommendations

Analyze agricultural conditions and generate suitable crop recommendations with match scores.

### 🌦️ Environmental Analysis

Use environmental and location-based information to evaluate crop suitability.

### 📍 Location Intelligence

Analyze farming locations using geographical information and location-based data.

### 💰 Budget & Risk Analysis

Consider available investment and risk tolerance while generating recommendations.

### 📊 Crop Comparison

Compare recommended crops using factors such as:

- Climate Match
- Soil Match
- Water Feasibility
- Profitability
- Trend
- Overall Match Score

### 🤖 AI Agricultural Advisor

Interact with an AI-powered agricultural advisor and ask **"what-if" scenarios** related to your crop analysis.

Example:

> "Based on my latitude, what is the optimal planting window for these Soybeans?"

### 🔐 Authentication

Firebase Authentication provides secure user authentication and account management.

### 📚 Recommendation History

Logged-in users can save and access previously generated crop analyses and recommendations.

### 🌐 Multilingual Support

The platform is designed to support:

- English
- Hindi
- Marathi

### 🗺️ Map-Based Location Selection

Users can select their farming location using an interactive map, allowing the system to work with geographical coordinates.

---

# 🧠 How Crop-IQ Works

```text
                    User
                     │
                     ▼
          Location & Farm Parameters
                     │
                     ▼
            Environmental Analysis
                     │
                     ▼
             Crop Recommendation
                     │
                     ▼
              Crop Comparison
                     │
                     ▼
             AI Agricultural
                  Advisor
                     │
                     ▼
          Insights & Recommendations
                     │
                     ▼
             Saved History
```

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────┐
│              User                    │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│         Next.js Frontend             │
│      React + TypeScript + Tailwind   │
└──────────────────┬───────────────────┘
                   │
          ┌────────┼────────┐
          │        │        │
          ▼        ▼        ▼
      Firebase   Google   Weather
       Auth       Maps      API
          │        │        │
          └────────┼────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│          FastAPI Backend             │
│              Python                  │
└──────────────────┬───────────────────┘
                   │
          ┌────────┼────────┐
          │        │        │
          ▼        ▼        ▼
      Database    ML       AI Service
          │       Logic
          └────────┼────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│       Crop Recommendations &         │
│        AI Agricultural Insights      │
└──────────────────────────────────────┘
```

---

# 📸 Screenshots

## 🏠 Landing Page

The Crop-IQ landing page introduces the platform and its AI-powered agricultural capabilities.

<img width="1918" height="1065" alt="Screenshot 2026-05-01 154102" src="https://github.com/user-attachments/assets/34d78c8a-3419-409c-b95a-7ea7d820b3b8" />

---

## 🌾 New Crop Analysis

Users can provide their farming location, budget, and risk tolerance to begin a crop analysis.

<img width="1919" height="1064" alt="Screenshot 2026-05-01 154052" src="https://github.com/user-attachments/assets/af71cefd-3e8b-4146-8184-48c999ce17ae" />


---

## ⚙️ Analysis in Progress

The system displays the analysis progress while performing the required geospatial and crop analysis.

<img width="1917" height="1017" alt="Screenshot 2026-05-02 230212" src="https://github.com/user-attachments/assets/a992365b-24fa-4540-9014-4ef29f6db738" />


---

## 📊 Analysis Results

Crop-IQ presents the generated recommendations along with an estimated ROI comparison.

<img width="433" height="207" alt="Screenshot 2026-05-02 231451" src="https://github.com/user-attachments/assets/db58cb07-681a-4892-87f9-5a219025ee5f" />


---

## 🌱 Crop Recommendation Cards

Each recommended crop includes detailed matching information such as climate, soil, water feasibility, profitability, and trend.

<img width="656" height="919" alt="Screenshot 2026-05-02 231509" src="https://github.com/user-attachments/assets/9a5017c5-82a3-482f-84a3-b81442a5bcfa" />

---

## 🤖 AI Agricultural Advisor

Users can ask follow-up questions and explore what-if scenarios using the AI Agricultural Advisor.

<img width="1198" height="773" alt="Screenshot 2026-05-02 231728" src="https://github.com/user-attachments/assets/dfa67e89-1176-4a67-9b7b-ad0390b6a1da" />


---

# 🛠️ Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

## Machine Learning & Data

- Python
- Scikit-learn
- Pandas
- NumPy

## AI

- AI-powered agricultural advisory
- Natural-language what-if analysis
- AI-generated crop insights

## Authentication

- Firebase Authentication
- Google Sign-In

## APIs

- Google Maps API
- OpenWeather API

## Deployment

- Vercel — Frontend
- Render — Backend
- GitHub — Version Control

---

# 📁 Project Structure

```text
Crop-IQ/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── runtime.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   └── lib/
│   │
│   ├── package.json
│   └── ...
│
├── crop-images/
│
├── screenshots/
│   ├── home.png
│   ├── crop-analysis.png
│   ├── analysis-loading.png
│   ├── analysis-results.png
│   ├── crop-recommendations.png
│   └── ai-advisor.png
│
├── .gitignore
└── README.md
```

---

# ⚙️ Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/SirsodeRaj/Crop-IQ.git
cd Crop-IQ
```

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run locally on:

```text
http://localhost:3000
```

## 3. Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn app.main:app --reload
```

---

# 🔐 Environment Variables

## Frontend

Create:

```text
frontend/.env.local
```

Configure the required Firebase, Google Maps, and backend API variables.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_API_URL=
```

## Backend

Configure the required backend environment variables:

```env
OPENWEATHER_API_KEY=
OPENAI_API_KEY=
FIREBASE_SERVICE_ACCOUNT_JSON=
DATABASE_URL=
```

> ⚠️ Never commit API keys, Firebase service-account credentials, passwords, or other secrets to GitHub.

---

# ☁️ Deployment

### Frontend

```text
GitHub → Vercel → Next.js Application
```

### Backend

```text
GitHub → Render → FastAPI Application
```

### Live Application

🌐 **[Launch Crop-IQ](https://crop-iq-bravo.vercel.app/)**

---

# 🎯 Use Cases

Crop-IQ can be used for:

- 🌾 Smart agriculture decision support
- 👨‍🌾 Crop selection assistance
- 📊 Agricultural data analysis
- 🌱 Precision agriculture
- 🎓 Academic and educational projects
- 🏆 Hackathons and innovation competitions
- 🤖 AI-powered agricultural advisory

---

# 🔮 Future Enhancements

- 🦠 AI-based crop disease detection
- 🛰️ Satellite-based crop monitoring
- 📈 Crop price prediction
- 🌧️ Advanced weather forecasting
- 🔔 Smart farming notifications
- 📄 PDF agricultural reports
- 🗣️ Voice-based agricultural assistant
- 📊 Advanced agricultural analytics
- 🌱 Personalized farming recommendations

---

# 👥 Team

- **Ankita Solankar**
- **Bhagyashree Kathar**
- **Raj Sirsode**
- **Vanshika Sawalikar**

---

# 👨‍💻 Developed By

### Raj Sirsode

🔗 **[Ankita Solankar Profile](https://github.com/Ankitasolankar/)**
🔗 **[Bhagyashree Kathar Profile](https://github.com/bhagyashreekathar-214018/)**
🔗 **[Raj Sirsode Profile](https://github.com/SirsodeRaj/)**
🔗 **[Vanshika Sawalikar Profile](https://github.com/vanshikasawalikar-droid)**

---

# 📜 License

This project is licensed under the **MIT License**.

---

⭐ **If you find Crop-IQ useful, consider giving the repository a star!**
```
