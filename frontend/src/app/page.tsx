"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { Sprout, CloudRain, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    name: "Environmental Analysis",
    description: "Real-time weather, soil data, and historical climate patterns.",
    icon: CloudRain,
  },
  {
    name: "Yield Prediction",
    description: "AI-driven models to forecast crop yield with high accuracy.",
    icon: Sprout,
  },
  {
    name: "Market Intelligence",
    description: "Live market prices and demand forecasting for better ROI.",
    icon: TrendingUp,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl space-y-6"
      >
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          AI-Powered Agriculture
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
          Optimize Your Yield with Data Intelligence
        </h1>
        <p className="text-xl text-slate-600">
          Make data-driven decisions on crop selection, planting schedules, and risk management using our advanced advisory engine.
        </p>

        <div className="flex justify-center gap-4 pt-8">
          <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#10b981] px-8 text-sm font-medium text-white transition-all hover:bg-[#059669] hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {features.map((feature, i) => (
          <div key={i} className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-[#10b981]/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <feature.icon className="h-10 w-10 text-[#10b981] mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-slate-800">{feature.name}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
