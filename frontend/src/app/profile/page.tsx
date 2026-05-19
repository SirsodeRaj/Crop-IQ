"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, LogOut, Trash2, Calendar, ShieldAlert, Leaf } from "lucide-react";

export default function Profile() {
  const { user, loading, logout, getToken } = useAuth();
  const router = useRouter();

  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const token = await getToken();
        // TODO: Replace with real API call
        // const res = await fetch("/api/v1/profile/history", { headers: { Authorization: `Bearer ${token}` }});
        // const data = await res.json();
        // setHistory(data);
        setHistory([]); // mock for now
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoadingHistory(false);
      }
    };
    if (user) fetchHistory();
  }, [user, getToken]);

  const handleDeleteAccount = async () => {
    // In a real app, you might want to re-authenticate here
    try {
      const token = await getToken();
      // await fetch("/api/v1/profile", { method: "DELETE", headers: { Authorization: `Bearer ${token}` }});
      await user?.delete();
      router.push("/");
    } catch (err: any) {
      alert(err.message || "Failed to delete account. You may need to log in again.");
    }
  };

  if (loading || !user) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-8"
      >
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold shrink-0">
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800">{user.displayName || "Farmer Profile"}</h1>
          <p className="text-slate-500 mt-1 flex items-center justify-center md:justify-start gap-2">
            {user.email}
          </p>
          <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-1 mt-2">
            <Calendar className="w-4 h-4" />
            Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "recently"}
          </p>

          <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
            <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors text-sm">
              Edit Profile
            </button>
            <button
              onClick={() => logout()}
              className="px-6 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition-colors text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* History Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-8 rounded-3xl"
      >
        <h2 className="text-xl font-bold text-slate-800 mb-6">Saved Recommendations & History</h2>

        {loadingHistory ? (
          <div className="py-8 text-center text-slate-500 animate-pulse">Loading history...</div>
        ) : history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item, i) => (
              <div key={i} className="p-4 border border-slate-100 rounded-2xl bg-white/50 hover:bg-white transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800">Recommendation {i + 1}</h3>
                    <p className="text-sm text-slate-500">{new Date(item.created_at).toLocaleString()}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-slate-800">No history yet</h3>
            <p className="text-slate-500 mt-1 max-w-md">Generate some crop insights on the dashboard to see them saved here automatically.</p>
          </div>
        )}
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-red-100 bg-red-50/50 p-8 rounded-3xl"
      >
        <h2 className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" /> Danger Zone
        </h2>
        <p className="text-red-600/80 text-sm mb-6 max-w-xl">
          Permanently delete your account and all associated data, including generated insights and chatbot history. This action cannot be undone.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium transition-colors text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete My Account
          </button>
        ) : (
          <div className="p-4 bg-white border border-red-200 rounded-2xl max-w-md">
            <p className="font-medium text-slate-800 mb-4">Are you absolutely sure?</p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors text-sm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
