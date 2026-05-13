"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { askAdvisory } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Message {
  role: "user" | "advisor";
  content: string;
}

export function AdvisoryChat({ analysisId }: { analysisId: string }) {
  const { getToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: "advisor", content: "Hi! I'm your AI Agricultural Advisor. What 'what-if' scenarios or questions do you have about this analysis?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Exclude the initial greeting from history and format for backend
      const currentHistory = messages.filter(m => !(m.role === "advisor" && m.content.startsWith("Hi! I'm your AI"))).map(m => ({
        role: m.role === "advisor" ? "assistant" : "user",
        content: m.content
      }));

      const token = await getToken();
      const response = await askAdvisory({
        analysis_id: analysisId,
        question: userMessage,
        history: currentHistory
      }, token);
      setMessages(prev => [...prev, { role: "advisor", content: response.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "advisor", content: "Sorry, I encountered an error while analyzing your question." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass flex flex-col h-[500px] rounded-[2rem] overflow-hidden mt-8">
      <div className="bg-[#f0fdf4] border-b border-slate-100 p-4 font-semibold flex items-center gap-2 text-[#16a34a]">
        <Bot className="w-5 h-5" />
        AI Advisory Chat
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-slate-200 text-slate-500" : "bg-[#10b981] text-white"}`}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-3 rounded-xl max-w-[80%] text-sm ${msg.role === "user" ? "bg-slate-100 text-slate-800 rounded-tr-sm" : "bg-[#f0fdf4] text-slate-800 border border-[#dcfce7] rounded-tl-sm"}`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#10b981] text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#dcfce7] flex gap-1 items-center h-10">
              <span className="w-2 h-2 rounded-full bg-[#10b981]/50 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#10b981]/50 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-2 h-2 rounded-full bg-[#10b981]/50 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-slate-100 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a what-if scenario... (e.g. 'What if rainfall is 20% lower?')"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-slate-800"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-[#10b981] hover:bg-[#059669] text-white p-2 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center w-11 h-11 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
