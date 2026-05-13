import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Github } from "lucide-react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crop Intelligence",
  description: "AI-Powered Crop Decision Intelligence System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-primary/30")}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            {/* Subtle background gradient */}
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))]" />
            
            <Navbar />
            
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>

            <footer className="w-full border-t border-slate-200 py-8 mt-12 bg-white/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2">
                <p className="text-sm text-slate-500">Developed by</p>
                <a 
                  href="https://github.com/SirsodeRaj/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all hover:scale-105"
                >
                  <Github className="w-4 h-4 group-hover:text-slate-900 transition-colors" />
                  <span className="font-medium text-sm">Raj Sirsode</span>
                </a>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
