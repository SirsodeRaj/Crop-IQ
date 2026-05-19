"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex gap-2 items-center font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
          <Leaf className="w-6 h-6 text-primary" />
          <span><span className="text-primary">Crop</span>Intelligence</span>
        </Link>
        
        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link 
            href="/" 
            className="text-slate-600 hover:text-primary transition-colors relative group"
          >
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-1.5 pl-3.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm hover:scale-105 hover:bg-primary/5 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 focus:outline-none"
            >
              <div className="relative w-[18px] h-[12px]">
                <span className={`absolute left-0 h-[2px] w-full bg-primary rounded-full transition-all duration-300 ${dropdownOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-primary rounded-full transition-all duration-300 ${dropdownOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`} />
                <span className={`absolute left-0 h-[2px] w-full bg-primary rounded-full transition-all duration-300 ${dropdownOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
              </div>
              
              {user ? (
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200/50">
                  <User className="w-4 h-4" />
                </div>
              )}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-xl overflow-hidden py-1"
                >
                  {loading ? (
                    <div className="px-4 py-3 text-sm text-slate-500">Loading...</div>
                  ) : user ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900 truncate">{user.displayName || "Farmer"}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link 
                        href="/profile" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <button 
                        onClick={() => {
                          setDropdownOpen(false);
                          setShowLogoutModal(true);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors font-medium"
                      >
                        Login
                      </Link>
                      <Link 
                        href="/signup" 
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm text-primary hover:bg-primary/5 transition-colors font-medium"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </header>
      
      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm glass rounded-3xl p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-slate-800 mb-2">Confirm Logout</h2>
              <p className="text-slate-500 mb-6">Are you sure you want to log out from Crop-IQ?</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
