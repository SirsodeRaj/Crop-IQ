"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldAlert, CheckCircle2 } from "lucide-react";

interface RecommendationProps {
  crop: string;
  suitability_score: number;
  confidence: string;
  market_trend: string;
  estimated_roi_percentage: number;
  rationale: string;
  index: number;
}

export function RecommendationCard({ rec }: { rec: RecommendationProps }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rec.index * 0.1, duration: 0.5 }}
      className="glass p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <TrendingUp className="w-24 h-24" />
      </div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{rec.crop}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
            {rec.confidence === "High" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-amber-400" />}
            {rec.confidence} Confidence
          </div>
        </div>
        <div className={`text-3xl font-extrabold ${getScoreColor(rec.suitability_score)}`}>
          {rec.suitability_score}
          <span className="text-sm font-normal text-slate-500 ml-1">/100</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
        <div className="bg-black/20 rounded-lg p-3 border border-white/5">
          <div className="text-xs text-slate-400 mb-1">Estimated ROI</div>
          <div className="text-lg font-semibold text-emerald-400">+{rec.estimated_roi_percentage}%</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3 border border-white/5">
          <div className="text-xs text-slate-400 mb-1">Market Trend</div>
          <div className="text-lg font-semibold capitalize">{rec.market_trend}</div>
        </div>
      </div>

      <div className="text-sm text-slate-300 relative z-10 border-t border-border/40 pt-3">
        <span className="font-semibold text-white mr-2">Rationale:</span>
        {rec.rationale}
      </div>
    </motion.div>
  );
}
