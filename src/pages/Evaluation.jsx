import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, Star, TrendingUp, Info, 
  Brain, Award, Lightbulb, ChevronRight, LayoutDashboard, Route
} from "lucide-react";

const Evaluation = () => {
  const metrics = [
    { label: "Correctness", score: 85, icon: CheckCircle2, desc: "High precision across technical vectors." },
    { label: "AI Clarity", score: 72, icon: Brain, desc: "Stable logical resonance detected." },
    { label: "Concept Depth", score: 94, icon: Star, desc: "S-Tier architectural understanding." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 bg-transparent relative overflow-hidden">
      {/* Analysis Atmospheric Pulse */}
      <div className="absolute inset-0 z-0 text-brand-primary pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-brand-primary/5 blur-[200px] rounded-full animate-pulse opacity-40" />
         <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
          <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
            AI <span className="text-brand-primary">SYNC</span> REPORT
          </h2>
          <p className="text-brand-primary/40 text-[10px] uppercase font-black tracking-[1.5em]">AI Deployment Evaluation Matrix</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
          {/* Performance Telemetry */}
          <div className="lg:col-span-4 space-y-6">
             {metrics.map((m, i) => (
                <GlassCard key={i} className="p-10 border-brand-primary/20 bg-brand-primary/5 transition-all hover:bg-brand-primary/10 flex items-center gap-8" glow>
                   <div className="relative w-20 h-20 shrink-0">
                      <svg className="w-full h-full -rotate-90">
                         <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                         <motion.circle 
                            cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" 
                            strokeDasharray={213.6}
                            initial={{ strokeDashoffset: 213.6 }}
                            animate={{ strokeDashoffset: 213.6 - (213.6 * m.score) / 100 }}
                            transition={{ duration: 3, delay: i * 0.4 }}
                            className="text-brand-primary"
                            strokeLinecap="round"
                          />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-brand-primary">
                         {m.score}%
                      </div>
                   </div>
                   <div className="space-y-1">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                         <m.icon className="w-4 h-4 text-brand-primary" /> {m.label}
                      </h5>
                      <p className="text-[10px] text-white/60 leading-relaxed italic">{m.desc}</p>
                   </div>
                </GlassCard>
             ))}
          </div>

          {/* AI Synthesis Insights */}
          <div className="lg:col-span-8">
             <GlassCard className="p-12 h-full border-brand-primary/20 bg-black/80 flex flex-col justify-between overflow-hidden relative" glow>
                <div className="space-y-12 relative z-10">
                   <div className="flex items-center gap-6 text-brand-primary border-b border-white/5 pb-8">
                      <Lightbulb className="w-12 h-12" />
                      <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Intelligence Synthesis</h3>
                   </div>
                   
                   <p className="text-white/60 text-2xl font-medium leading-[1.3] italic">
                      "AI resonance across established vectors reveals an <span className="text-brand-primary font-black underline decoration-brand-primary/30 underline-offset-8">S-Tier logical trajectory</span>. Proficiency in high-availability architecture and predictive data modeling detected."
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary/60 flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4" /> Core Competencies
                         </h4>
                         <ul className="space-y-2">
                            {["React Optimization", "SQL Efficiency", "CI/CD Architecture"].map((s, idx) => (
                               <li key={idx} className="flex items-center gap-3 text-white/60 text-xs font-medium">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" /> {s}
                               </li>
                            ))}
                         </ul>
                      </div>
                      <div className="space-y-3">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 flex items-center gap-3">
                            <Info className="w-4 h-4" /> Optimization Vector
                         </h4>
                         <p className="text-[10px] text-white/40 leading-relaxed italic border-l border-brand-primary/20 pl-4">
                            "Minor temporal delta detected in Binary Search patterns. Recommend refining asymptotic complexity analysis for O(log n) sequences."
                         </p>
                      </div>
                   </div>
                </div>

                <div className="mt-16 relative z-10">
                   <Link to="/dashboard">
                      <button className="w-full py-8 bg-brand-primary text-black font-black uppercase tracking-widest text-[9px] rounded-[3.5rem] shadow-[0_0_60px_rgba(34,197,94,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-4">
                        Return to Matrix Dashboard <LayoutDashboard className="w-4 h-4" />
                      </button>
                   </Link>
                </div>
             </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
