"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { askAdvisory } from "@/lib/api";

interface Message {
  role: "user" | "advisor";
  content: string;
}

export function AdvisoryChat({ analysisId }: { analysisId: string }) {
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
      const response = await askAdvisory({
        analysis_id: analysisId,
        question: userMessage
      });
      setMessages(prev => [...prev, { role: "advisor", content: response.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "advisor", content: "Sorry, I encountered an error while analyzing your question." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass flex flex-col h-[500px] rounded-2xl border border-border/50 shadow-xl overflow-hidden mt-8">
      <div className="bg-primary/10 border-b border-border/40 p-4 font-semibold flex items-center gap-2 text-primary">
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-slate-700 text-white" : "bg-primary text-primary-foreground"}`}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-3 rounded-xl max-w-[80%] text-sm ${msg.role === "user" ? "bg-slate-800 text-slate-200 rounded-tr-sm" : "bg-black/20 text-slate-300 border border-white/5 rounded-tl-sm"}`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex gap-1 items-center h-10">
              <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-border/40 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a what-if scenario... (e.g. 'What if rainfall is 20% lower?')"
          className="flex-1 bg-black/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center w-10 h-10"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
