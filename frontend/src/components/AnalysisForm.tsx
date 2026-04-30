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
      project_id: "00000000-0000-0000-0000-000000000000", // Dummy ID for MVP
      location_data: { lat: parseFloat(lat), lon: parseFloat(lon) },
      constraints: { budget: parseFloat(budget), risk_tolerance: risk },
    });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-6 rounded-2xl shadow-xl flex flex-col gap-4 border border-border/50"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2">New Crop Analysis</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-400">Latitude</label>
          <input 
            type="number" step="0.01" value={lat} onChange={(e) => setLat(e.target.value)}
            className="bg-black/20 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-400">Longitude</label>
          <input 
            type="number" step="0.01" value={lon} onChange={(e) => setLon(e.target.value)}
            className="bg-black/20 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400">Budget (USD)</label>
        <input 
          type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
          className="bg-black/20 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400">Risk Tolerance</label>
        <select 
          value={risk} onChange={(e) => setRisk(e.target.value)}
          className="bg-black/20 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {isLoading ? "Analyzing..." : "Generate Insights"}
      </button>
    </motion.form>
  );
}
