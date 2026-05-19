"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { AnalysisForm } from "@/components/AnalysisForm";
import { RecommendationCard } from "@/components/RecommendationCard";
import { RoiChart } from "@/components/charts/RoiChart";
import { AdvisoryChat } from "@/components/AdvisoryChat";
import { fetchRecommendations } from "@/lib/api";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, getToken } = useAuth();
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      let token = null;
      if (user) {
        try {
          token = await getToken();
        } catch (tokenErr) {
          console.warn("Could not retrieve auth token. Proceeding as guest.", tokenErr);
        }
      }
      
      let result = null;
      try {
        result = await fetchRecommendations(data, token);
      } catch (err: any) {
        // If 401, force refresh the token and retry once
        if (err.message?.includes("Authentication error") && user) {
          console.log("Token rejected. Attempting to force refresh...");
          token = await getToken(true);
          result = await fetchRecommendations(data, token);
        } else {
          throw err;
        }
      }
      
      setRecommendations(result.recommendations);
      setAnalysisId(result.analysis_id);
    } catch (err: any) {
      if (err.message?.includes("Authentication error")) {
        setError("Your session has expired. Please log out and log back in to save your analysis.");
      } else {
        setError(err.message || "An error occurred during analysis.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      {/* Left Sidebar Form */}
      <div className="w-full md:w-1/3 shrink-0 sticky top-24">
        <AnalysisForm onSubmit={handleAnalysisSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-full flex-1 flex flex-col gap-8">
        {!recommendations && !isLoading && (
          <div className="glass p-12 rounded-[2rem] text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Awaiting Data</h3>
            <p className="text-slate-500 max-w-sm">Enter your location and budget parameters on the left to generate AI-driven crop recommendations.</p>
          </div>
        )}

        {isLoading && (
          <div className="glass p-12 rounded-[2rem] flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-8 h-8 border-4 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin"></div>
            <p className="text-slate-500 animate-pulse font-medium">Running geospatial analysis...</p>
          </div>
        )}

        {recommendations && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800">Analysis Results</h2>
              <span className="text-sm px-3 py-1 bg-[#dcfce7] text-[#16a34a] rounded-full font-bold">
                {recommendations.length} Crops Analyzed
              </span>
            </div>

            <RoiChart data={recommendations} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((rec: any, idx: number) => (
                <RecommendationCard key={rec.crop} rec={{ ...rec, index: idx }} />
              ))}
            </div>

            {analysisId && <AdvisoryChat analysisId={analysisId} />}
          </motion.div>
        )}
      </div>
    </div>
  );
}
