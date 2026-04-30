import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased selection:bg-primary/30")}>
        <div className="relative flex min-h-screen flex-col">
          {/* Subtle background gradient */}
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
          
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4">
              <div className="flex gap-2 items-center font-bold text-xl tracking-tight">
                <span className="text-primary">Crop</span>Intelligence
              </div>
              <nav className="ml-auto flex gap-4 text-sm font-medium text-muted-foreground">
                <a href="#" className="transition-colors hover:text-foreground">Dashboard</a>
                <a href="#" className="transition-colors hover:text-foreground">Projects</a>
                <a href="#" className="transition-colors hover:text-foreground">Settings</a>
              </nav>
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
