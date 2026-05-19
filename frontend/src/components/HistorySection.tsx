"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Clock, Trash2, ChevronRight, Loader2 } from "lucide-react";
import { format } from "date-fns";

export function HistorySection({ onViewAnalysis }: { onViewAnalysis: (data: any) => void }) {
  const { user, getToken } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (!user) return;
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:8000/api/v1/analysis/history", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    setDeleting(id);
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8000/api/v1/analysis/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setHistory(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    } finally {
      setDeleting(null);
    }
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" /> Saved Recommendations & History
      </h2>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : history.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
          No history found. Generate some insights to see them here!
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:shadow-md transition-shadow group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-slate-800">{item.location}</h3>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-medium">
                      {format(new Date(item.created_at), "MMM d, yyyy • h:mm a")}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 flex gap-4">
                    <span>Budget: <span className="font-semibold text-slate-700">₹{item.budget.toLocaleString('en-IN')}</span></span>
                    <span>Risk: <span className="font-semibold text-slate-700 capitalize">{item.risk_tolerance.toLowerCase()}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => onViewAnalysis({
                      recommendations: item.recommendations,
                      environmental_data_used: item.environmental_data,
                      market_data_used: item.market_data
                    })}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {deleting === item.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
