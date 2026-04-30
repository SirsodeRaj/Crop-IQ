"use client";

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
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Optimize Your Yield with Data Intelligence
        </h1>
        <p className="text-xl text-slate-400">
          Make data-driven decisions on crop selection, planting schedules, and risk management using our advanced advisory engine.
        </p>
        
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/dashboard" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
          <button className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-8 text-sm font-medium transition-colors hover:bg-slate-800">
            View Demo
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {features.map((feature, i) => (
          <div key={i} className="glass rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <feature.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
            <p className="text-sm text-slate-400">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
