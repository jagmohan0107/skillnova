import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Target, TrendingUp, Cpu, CheckCircle2, 
  AlertCircle, Sparkles, BarChart3, ArrowRight,
  ShieldCheck, Zap, Activity, Globe, Info
} from "lucide-react";

const SkillGap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stage, setStage] = useState("loading"); // 'loading' | 'results'
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [realResults, setRealResults] = useState(null);

  const loadingMessages = [
    "Analyzing your profile",
    "Extracting ai patterns",
    "Comparing with global benchmarks",
    "Detecting mission-critical gaps"
  ];

  // Map AI analysis data to UI components
  useEffect(() => {
    const analysisData = location.state?.analysisResult;
    
    if (analysisData) {
      // Persist result so Roadmap (AI Sync) always reads the latest analysis
      localStorage.setItem('skillnova_analysis', JSON.stringify(analysisData));
      setRealResults({
        score: analysisData.experience_score || 0,
        existing: analysisData.active_skills || [],
        missing: analysisData.missing_skills || [],
        probability: analysisData.placement_probability || "Calculating...",
        recommendations: analysisData.recommendations || [],
        roadmap: analysisData.roadmap || [],
        industry: analysisData.industry_trends || [],
        graph: analysisData.comparison_graph || []
      });
    } else {
      // Try loading from localStorage if no state passed (e.g. direct nav or refresh)
      const cached = localStorage.getItem('skillnova_analysis');
      if (cached) {
        const analysisData = JSON.parse(cached);
        setRealResults({
          score: analysisData.experience_score || 0,
          existing: analysisData.active_skills || [],
          missing: analysisData.missing_skills || [],
          probability: analysisData.placement_probability || "Calculating...",
          recommendations: analysisData.recommendations || [],
          roadmap: analysisData.roadmap || [],
          industry: analysisData.industry_trends || [],
          graph: analysisData.comparison_graph || []
        });
      }
    }

    if (stage === "loading") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage("results"), 1000);
            return 100;
          }
          return prev + 8;
        });
      }, 30);

      const msgInterval = setInterval(() => {
        setMessageIndex(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(msgInterval);
      };
    }
  }, [stage, location.state]);

  // Fallback for demo if no real data is passed
  const displayData = realResults || {
    score: 74,
    existing: ["React", "Python", "Data Structures", "Tailwind CSS", "Git"],
    missing: ["System Design", "Microservices", "Docker", "Kubernetes"],
    industry: [ // Re-adding missing industry trends to fallback
      { name: "Cloud Computing", level: "Critical" },
      { name: "CI/CD Pipelines", level: "High" },
      { name: "Technical Leadership", level: "Medium" }
    ],
    probability: "Medium",
    recommendations: ["Shift focus from standard frontend to backend microservices.", "Learn Docker for containerization."],
    graph: [
      { domain: "Logic", user: 85, industry: 90 },
      { domain: "Architecture", user: 45, industry: 85 },
      { domain: "DevOps", user: 30, industry: 80 },
      { domain: "Frontend", user: 90, industry: 95 }
    ]
  };

  if (stage === "loading") {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-transparent overflow-hidden relative">
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[140px] rounded-full animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-12">
          {/* Rotating AI Icon */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-2 border-dashed border-brand-primary/40 flex items-center justify-center relative"
          >
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/30"
             >
                <Cpu className="w-10 h-10 text-brand-primary" />
             </motion.div>
             {/* Orbiting particles */}
             <div className="absolute inset-0">
                <div className="w-3 h-3 bg-brand-primary rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 animate-ping" />
             </div>
          </motion.div>

          {/* Loading Messages */}
          <div className="text-center space-y-4">
             <AnimatePresence mode="wait">
               <motion.h2 
                 key={messageIndex}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="text-2xl font-black uppercase tracking-[0.4em] text-white/60 min-h-[1.5em]"
               >
                 {loadingMessages[messageIndex]}
               </motion.h2>
             </AnimatePresence>
             <p className="text-brand-primary/40 font-mono text-xs uppercase tracking-[0.2em]">Matrix Sync: {progress}%</p>
          </div>

          {/* Progress Bar */}
          <div className="w-80 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="absolute inset-y-0 bg-brand-primary shadow-[0_0_25px_rgba(34,197,94,0.6)]" 
             />
             <motion.div 
               animate={{ left: ["-100%", "200%"] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="absolute inset-y-0 w-20 bg-white/10 skew-x-[-20deg]" 
             />
          </div>
        </div>
      </div>
    );
  }

  // RESULTS VIEW
  return (
    <div className="min-h-screen pt-32 pb-40 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Step 2: Score & Skills Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Skill Match Score (Circular) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="lg:col-span-4 flex items-center justify-center"
           >
              <div className="relative w-72 h-72 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="144" cy="144" r="130" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <motion.circle 
                       cx="144" cy="144" r="130" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={816.8}
                       initial={{ strokeDashoffset: 816.8 }}
                       animate={{ strokeDashoffset: 816.8 - (816.8 * displayData.score) / 100 }}
                       transition={{ duration: 2, ease: "easeOut" }}
                       className="text-brand-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                       strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-7xl font-black neon-text"
                    >
                      {displayData.score}%
                    </motion.span>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Match Accuracy</span>
                 </div>
                 {/* Decorative Particles */}
                 <div className="absolute -top-4 -right-4 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl">
                    <Activity className="w-5 h-5 text-brand-primary" />
                 </div>
              </div>
           </motion.div>

           {/* Skills Categorization */}
           <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Existing Skills */}
                 <GlassCard className="p-8 border-emerald-500/10 bg-emerald-500/5">
                    <h4 className="flex items-center gap-3 text-emerald-400 text-sm font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                       <CheckCircle2 className="w-5 h-5" /> Existing Skills
                    </h4>
                    <div className="flex flex-wrap gap-3">
                       {displayData.existing.map((skill, i) => (
                          <motion.div 
                            key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="px-4 py-2 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-bold shadow-[0_0_15px_rgba(52,211,153,0.1)] flex items-center gap-2"
                          >
                             <CheckCircle2 className="w-3 h-3" /> {skill}
                          </motion.div>
                       ))}
                    </div>
                 </GlassCard>

                 {/* Missing Skills */}
                 <GlassCard className="p-8 border-red-500/10 bg-red-500/5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <h4 className="flex items-center gap-3 text-red-500 text-sm font-black uppercase tracking-widest">
                           <AlertCircle className="w-5 h-5" /> Missing Skills
                        </h4>
                        <span className="text-[9px] uppercase tracking-widest text-red-500/40 font-black px-2 py-1 rounded-md bg-red-500/5 border border-red-500/10">Action Req</span>
                    </div>

                    <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                       {displayData.missing.length > 0 ? displayData.missing.map((skill, i) => (
                          <motion.div 
                            key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 flex items-start gap-4 group hover:border-red-500/40 transition-all"
                          >
                             <div className="mt-0.5 w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-all">
                                <AlertCircle className="w-4 h-4 text-red-500 animate-pulse opacity-80 group-hover:opacity-100" />
                             </div>
                             <div>
                                <h5 className="text-red-400 text-xs font-black tracking-widest uppercase">{skill}</h5>
                                <p className="text-white/40 text-[10px] mt-1.5 italic tracking-wider leading-relaxed group-hover:text-white/60 transition-colors">
                                   Critical competency gap detected. Industry data shows this skill is highly requested for advanced technical roles.
                                </p>
                             </div>
                          </motion.div>
                       )) : (
                          <div className="text-[10px] text-white/30 uppercase tracking-widest font-black italic p-4 text-center">No missing skills detected in matrix.</div>
                       )}
                    </div>
                 </GlassCard>
              </div>

              {/* Required Industry Skills */}
              <GlassCard className="p-8 border-purple-500/10 bg-purple-500/5">
                 <h4 className="flex items-center gap-3 text-purple-400 text-sm font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                    <Globe className="w-5 h-5" /> Required Industry Trends
                 </h4>
                 <div className="flex flex-wrap gap-4">
                    {displayData.industry?.map((skill, i) => (
                       <motion.div 
                         key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                         className="px-6 py-3 rounded-2xl bg-black/40 border border-purple-500/30 flex items-center gap-4 group hover:border-purple-400 transition-all cursor-default"
                       >
                          <div>
                            <p className="text-white font-bold text-xs">{skill.name}</p>
                            <span className={`text-[8px] font-black uppercase tracking-widest ${skill.level === 'Critical' ? 'text-red-400' : 'text-purple-400'}`}>Level: {skill.level}</span>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </GlassCard>
           </div>
        </div>

        {/* Step 3: Skill Comparison Graph */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <GlassCard className="p-10 space-y-10">
              <div className="flex items-center justify-between">
                 <h4 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-brand-primary" /> Skill Comparison
                 </h4>
                 <div className="flex gap-4 text-[10px] uppercase font-black tracking-widest">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary" /> User</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/10" /> Industry</div>
                 </div>
              </div>

              <div className="space-y-10">
                 {displayData.graph.map((item, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-end">
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{item.domain}</span>
                          <span className="text-[10px] font-mono text-brand-primary">{item.user}% vs {item.industry}%</span>
                       </div>
                       <div className="h-2 bg-white/5 rounded-full relative overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.industry}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="absolute inset-y-0 bg-white/10 rounded-full" 
                          />
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.user}%` }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                            className="absolute inset-y-0 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </GlassCard>

           {/* Step 4: AI Insight Card */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1 }}
             className="flex flex-col gap-8"
           >
              <GlassCard className="p-10 border-brand-primary/20 bg-brand-primary/5 flex-grow relative overflow-hidden group">
                 {/* Decorative background scanner element */}
                 <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-12 h-12 text-brand-primary" />
                 </div>
                 
                 <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4 text-brand-primary">
                       <ShieldCheck className="w-6 h-6" />
                       <h3 className="text-xl font-black uppercase tracking-tighter">Career Insights</h3>
                    </div>
                    
                    <p className="text-white/60 text-lg leading-relaxed font-medium italic">
                       “You have strong fundamentals in <span className="text-emerald-400 font-black tracking-tight">{displayData.existing.slice(0, 2).join(" and ")}</span>, but detect a mission-critical lack of industry mastery in <span className="text-red-400 font-black tracking-tight">{displayData.missing.slice(0, 2).join(" and ")}</span>. To achieve S-Tier placement, you must prioritize backend architectural synchronization.”
                    </p>

                    <div className="pt-8 border-t border-white/5 flex gap-10">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Priority Area</p>
                          <p className="text-xs font-black text-brand-primary uppercase">Cloud Infrastructure</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Learning Vector</p>
                          <p className="text-xs font-black text-white/80 uppercase">DevOps Mastery</p>
                       </div>
                    </div>
                 </div>
              </GlassCard>

              {/* Step 5: CTA Button */}
               <motion.button 
                  onClick={() => navigate('/roadmap', { state: { roadmap: displayData.roadmap } })}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02, letterSpacing: "0.4em", backgroundColor: "#34d399", color: "black" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-8 bg-black/60 border-y border-brand-primary/20 backdrop-blur-3xl text-brand-primary font-black uppercase tracking-[0.3em] text-sm rounded-[3rem] shadow-[0_0_60px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-6 group relative overflow-hidden"
               >
                  {/* Synchronized Laser Border Tracers */}
                  <div className="absolute inset-x-0 top-0 h-[1px] flex items-center justify-center">
                     <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                     />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[1px] flex items-center justify-center">
                     <motion.div 
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                     />
                  </div>

                  <motion.div 
                     animate={{ opacity: [0, 0.4, 0] }}
                     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                     className="absolute inset-0 bg-brand-primary opacity-5"
                  />

                  <span className="relative z-10 flex items-center gap-6 group-hover:text-black transition-colors duration-500">
                     GENERATE ROADMAP <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                  </span>
               </motion.button>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillGap;
