"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, MapPin } from "lucide-react";
import { INDIA_LOCATIONS } from "@/lib/locations";
import { MapModal } from "./MapModal";
import { useTranslation } from "react-i18next";

export function AnalysisForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [selectedStateIndex, setSelectedStateIndex] = useState<number>(0);
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState<number>(0);
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);

  const [lat, setLat] = useState("18.5204");
  const [lon, setLon] = useState("73.8567");
  const [locationName, setLocationName] = useState("Pune City, Maharashtra");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { t } = useTranslation();

  const [budget, setBudget] = useState("50000");
  const [risk, setRisk] = useState("MEDIUM");

  useEffect(() => {
    const st = INDIA_LOCATIONS[selectedStateIndex];
    if (st) {
      const dist = st.districts[selectedDistrictIndex];
      if (dist) {
        const c = dist.cities[selectedCityIndex];
        if (c) {
          setLat(c.lat.toString());
          setLon(c.lon.toString());
          setLocationName(`${c.name}, ${st.name}`);
        }
      }
    }
  }, [selectedStateIndex, selectedDistrictIndex, selectedCityIndex]);

  const handleMapSelect = (newLat: number, newLng: number, newName: string) => {
    setLat(newLat.toString());
    setLon(newLng.toString());
    setLocationName(newName);
    // Setting state indices to -1 will unselect the dropdowns to indicate a custom location
    setSelectedStateIndex(-1);
    setSelectedDistrictIndex(-1);
    setSelectedCityIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      project_id: "00000000-0000-0000-0000-000000000000",
      location_data: { lat: parseFloat(lat), lon: parseFloat(lon), name: locationName },
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
      <h2 className="text-xl font-semibold mb-2 text-slate-800">{t("New Crop Analysis")}</h2>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-600">{t("Location")}</label>
          <button 
            type="button" 
            onClick={() => setIsMapOpen(true)}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" /> {t("Choose from Map")}
          </button>
        </div>

        {selectedStateIndex === -1 ? (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex flex-col gap-1">
            <span className="text-xs text-primary font-bold uppercase tracking-wider">{t("Custom Location")}</span>
            <span className="text-sm font-medium text-slate-700">{locationName}</span>
            <span className="text-xs text-slate-500">{parseFloat(lat).toFixed(4)}, {parseFloat(lon).toFixed(4)}</span>
            <button 
              type="button" 
              onClick={() => { setSelectedStateIndex(0); setSelectedDistrictIndex(0); setSelectedCityIndex(0); }}
              className="mt-2 text-xs text-slate-500 hover:text-slate-700 underline text-left"
            >
              {t("Reset to predefined locations")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select 
              value={selectedStateIndex} 
              onChange={(e) => {
                setSelectedStateIndex(Number(e.target.value));
                setSelectedDistrictIndex(0);
                setSelectedCityIndex(0);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
            >
              {INDIA_LOCATIONS.map((state, i) => (
                <option key={state.name} value={i}>{state.name}</option>
              ))}
            </select>
            
            <select 
              value={selectedDistrictIndex} 
              onChange={(e) => {
                setSelectedDistrictIndex(Number(e.target.value));
                setSelectedCityIndex(0);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
            >
              {INDIA_LOCATIONS[selectedStateIndex]?.districts.map((dist, i) => (
                <option key={dist.name} value={i}>{dist.name}</option>
              ))}
            </select>

            <select 
              value={selectedCityIndex} 
              onChange={(e) => setSelectedCityIndex(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
            >
              {INDIA_LOCATIONS[selectedStateIndex]?.districts[selectedDistrictIndex]?.cities.map((city, i) => (
                <option key={city.name} value={i}>{city.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <MapModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onLocationSelect={handleMapSelect} 
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-600">{t("Budget")}</label>
        <input 
          type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-600">{t("Risk Tolerance")}</label>
        <select 
          value={risk} onChange={(e) => setRisk(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none text-slate-800"
        >
          <option value="LOW">{t("Low")}</option>
          <option value="MEDIUM">{t("Medium")}</option>
          <option value="HIGH">{t("High")}</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-4 flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white shadow-md font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {isLoading ? t("Analyzing") : t("Generate Insights")}
      </button>
    </motion.form>
  );
}
