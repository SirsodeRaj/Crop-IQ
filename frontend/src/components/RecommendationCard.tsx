"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Leaf, CloudRain, Sprout, Droplet } from "lucide-react";

interface RecommendationProps {
  crop: string;
  suitability_score: number;
  confidence: string;
  market_trend: string;
  estimated_roi_percentage: number;
  climate_match?: number;
  water_feasibility?: number;
  soil_match?: number;
  rationale: string;
  index: number;
}

const cropImages: Record<string, string> = {
  "Wheat": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop",
  "Rice": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
  "Maize": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
  "Corn": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
  "Corn (Maize)": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
  "Soybeans": "https://images.unsplash.com/photo-1596395819057-cb3738f4e2f9?q=80&w=600&auto=format&fit=crop",
  "Soybean": "https://images.unsplash.com/photo-1596395819057-cb3738f4e2f9?q=80&w=600&auto=format&fit=crop",
  "Soyabean": "https://images.unsplash.com/photo-1596395819057-cb3738f4e2f9?q=80&w=600&auto=format&fit=crop",
  "Cotton": "https://images.unsplash.com/photo-1585607344893-43a479234c9c?q=80&w=600&auto=format&fit=crop",
  "Jute": "https://images.unsplash.com/photo-1627306236940-5e8e3a246b14?q=80&w=600&auto=format&fit=crop",
  "Banana": "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?q=80&w=600&auto=format&fit=crop",
  "Mango": "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop",
  "Coffee": "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop"
};

const defaultImage = "https://images.unsplash.com/photo-1530836369250-ef71a3a5e4b8?q=80&w=600&auto=format&fit=crop";

const ProgressBar = ({ label, icon: Icon, value, color }: any) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between items-center text-sm text-slate-500">
      <div className="flex items-center gap-1.5">
        <Icon className="w-4 h-4 text-slate-400" />
        <span>{label}</span>
      </div>
      <span className="font-semibold text-slate-800">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${value}%` }} 
        transition={{ duration: 1, delay: 0.2 }}
        className={`h-full rounded-full ${color}`} 
      />
    </div>
  </div>
);

export function RecommendationCard({ rec }: { rec: RecommendationProps }) {
  const imageUrl = cropImages[rec.crop] || defaultImage;
  const isUpwardTrend = rec.market_trend.toLowerCase() !== "decreasing" && rec.market_trend.toLowerCase() !== "down";
  const profitability = rec.estimated_roi_percentage > 20 ? "High" : rec.estimated_roi_percentage > 10 ? "Medium" : "Low";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rec.index * 0.1, duration: 0.5 }}
      className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow"
    >
      {/* Top Image Section */}
      <div className="relative h-56 w-full shrink-0">
        <img src={imageUrl} alt={rec.crop} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {rec.index === 0 && (
          <div className="absolute top-4 right-4 bg-[#00c897] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
            Top Match
          </div>
        )}
        
        <h3 className="absolute bottom-5 left-5 text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
          {rec.crop}
        </h3>
      </div>

      {/* Body Section */}
      <div className="p-6 flex flex-col gap-6 bg-white text-slate-800 flex-1">
        
        {/* Recommendation Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-[15px] font-medium text-slate-600">Recommendation</span>
          </div>
          <div className="bg-[#dcfce7] text-[#16a34a] px-3 py-1.5 rounded-2xl flex flex-col items-center leading-tight">
            <span className="font-bold text-base">{rec.suitability_score}%</span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-80">Match</span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex flex-col gap-4 mt-2">
          <ProgressBar 
            label="Climate Match" 
            icon={CloudRain} 
            value={rec.climate_match ?? rec.suitability_score} 
            color="bg-blue-500" 
          />
          <ProgressBar 
            label="Soil Match" 
            icon={Sprout} 
            value={rec.soil_match ?? rec.suitability_score} 
            color="bg-orange-500" 
          />
          <ProgressBar 
            label="Water Feasibility" 
            icon={Droplet} 
            value={rec.water_feasibility ?? rec.suitability_score} 
            color="bg-[#00c897]" 
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-auto border-t border-slate-100">
          <div>
            <div className="text-[11px] uppercase text-slate-400 font-bold tracking-wider mb-1">Profitability</div>
            <div className="font-semibold text-slate-800">{profitability}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase text-slate-400 font-bold tracking-wider mb-1">Trend</div>
            <div className={`font-semibold flex items-center gap-1 ${isUpwardTrend ? "text-[#16a34a]" : "text-rose-500"}`}>
              {isUpwardTrend ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="capitalize">{rec.market_trend}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
