"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function AnalysisForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [lat, setLat] = useState("34.05");
  const [lon, setLon] = useState("-118.24");
  const [budget, setBudget] = useState("50000");
  const [risk, setRisk] = useState("MEDIUM");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      project_id: "00000000-0000-0000-0000-000000000000",
      location_data: { lat: parseFloat(lat), lon: parseFloat(lon) },
      constraints: { budget: parseFloat(budget), risk_tolerance: risk },
    });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-6 rounded-[2rem] flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2 text-slate-800">New Crop Analysis</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-600">Latitude</label>
          <input 
            type="number" step="0.01" value={lat} onChange={(e) => setLat(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-600">Longitude</label>
          <input 
            type="number" step="0.01" value={lon} onChange={(e) => setLon(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-600">Budget (USD)</label>
        <input 
          type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-600">Risk Tolerance</label>
        <select 
          value={risk} onChange={(e) => setRisk(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none text-slate-800"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-4 bg-[#10b981] hover:bg-[#059669] text-white shadow-md font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
      >
        {isLoading ? "Analyzing..." : "Generate Insights"}
      </button>
    </motion.form>
  );
}
