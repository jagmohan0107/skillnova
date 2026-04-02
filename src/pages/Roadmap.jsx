import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  CheckCircle2, Circle, ArrowRight, Play, BookOpen, 
  Sparkles, Zap, Brain, Globe, Shield, Cloud, 
  Target, BarChart3, Database, Code, Activity, Rocket,
  Swords, Lightbulb, Clock, Lock, X, RefreshCw
} from "lucide-react";
import GlassCard from "../components/ui/GlassCard";

const Roadmap = () => {
  const location = useLocation();
  const [selectedDomain, setSelectedDomain] = useState("AI Sync");
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [expandedStep, setExpandedStep] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const domains = [
    { name: "AI Sync", icon: Sparkles, color: "text-brand-primary" },
    { name: "AI/ML", icon: Brain, color: "text-blue-400" },
    { name: "Web Development", icon: Globe, color: "text-purple-400" },
    { name: "Cloud", icon: Cloud, color: "text-amber-400" },
  ];

  const staticRoadmapData = {
    "AI Sync": [
      { id: 1, title: "Career Initialization", desc: "Syncing your unique profile with industry benchmarks.", duration: "1 Week", status: "Completed", youtubeId: "bMknfKXIFA8" },
      { id: 2, title: "Skill Gap Bridging", desc: "Targeting identified technical voids with project labs.", duration: "3 Weeks", status: "In Progress", youtubeId: "Oe421EPjeBE" },
      { id: 3, title: "Portfolio Synthesis", desc: "Combining new skills into a high-visibility portfolio.", duration: "4 Weeks", status: "Locked", youtubeId: "pTFZFxd4hOI" },
    ],
    "AI/ML": [
      { id: 1, title: "Python Mastery", desc: "Core syntax, NumPy, and Pandas for data manipulation.", duration: "2 Weeks", status: "Completed", youtubeId: "rfscVS0vtbw" },
      { id: 2, title: "Advanced Statistics", desc: "Probability, distributions, and inferential analysis.", duration: "3 Weeks", status: "In Progress", youtubeId: "xxpc-HPKN28" },
      { id: 3, title: "Machine Learning", desc: "Supervised and unsupervised learning architectures.", duration: "5 Weeks", status: "Locked", youtubeId: "7eh4d6sabA0" },
    ],
    "Web Development": [
      { id: 1, title: "Frontend Foundations", desc: "Mastering React, Tailwind CSS, and Framer Motion for high-end UI.", duration: "4 Weeks", status: "Completed", youtubeId: "bMknfKXIFA8" },
      { id: 2, title: "Backend Architecture", desc: "Node.js, Express, and RESTful API design patterns with security.", duration: "6 Weeks", status: "In Progress", youtubeId: "Oe421EPjeBE" },
      { id: 3, title: "Full-Stack Deployment", desc: "Database integration with MongoDB and PostgreSQL at scale.", duration: "5 Weeks", status: "Locked", youtubeId: "pTFZFxd4hOI" },
    ],
    "Cloud": [
      { id: 1, title: "Cloud Foundations", desc: "IAAS, PAAS, and SAAS architecture overview and core services.", duration: "3 Weeks", status: "Completed", youtubeId: "k1RI5locZE4" },
      { id: 2, title: "AWS & Serverless", desc: "EC2, S3, and Lambda serverless execution for modern apps.", duration: "6 Weeks", status: "In Progress", youtubeId: "3hLmDS179YE" },
      { id: 3, title: "DevOps & Kubernetes", desc: "Container orchestration and CI/CD pipelines for automation.", duration: "8 Weeks", status: "Locked", youtubeId: "X48VuDVv0do" },
    ]
  };

  useEffect(() => {
    const analysis = JSON.parse(localStorage.getItem('skillnova_analysis') || '{}');
    const profile = JSON.parse(localStorage.getItem('skillnova_profile') || '{}');
    const domain = profile.careerInterest || "Software Engineering";
    const missing = analysis?.missing_skills || [];
    const hasMissing = missing.length > 0;
    console.log('[SkillNova Roadmap] Analysis found in localStorage:', analysis);
    console.log('[SkillNova Roadmap] Missing skills:', missing);
    const displayMissing = hasMissing ? missing : ["Cloud Architecture", "System Design", "Microservices"];

    const getYoutubeVideo = (skill) => {
      const s = String(skill).toLowerCase();
      if (s.includes("react") || s.includes("front")) return "bMknfKXIFA8"; 
      if (s.includes("node") || s.includes("back") || s.includes("api")) return "Oe421EPjeBE"; 
      if (s.includes("aws") || s.includes("cloud")) return "k1RI5locZE4"; 
      if (s.includes("docker") || s.includes("contain") || s.includes("kube")) return "pTFZFxd4hOI"; 
      if (s.includes("python") || s.includes("data")) return "rfscVS0vtbw"; 
      if (s.includes("java")) return "eIrMbAQSU34"; 
      if (s.includes("sql") || s.includes("base")) return "HXV3zeJZ1EQ";
      return "zOjov-2OZ0E"; 
    };

    let baseData = [];
    if (selectedDomain === "AI Sync") {
      baseData = [
        { 
          id: 1, 
          title: `Phase I: ${displayMissing[0] || "Foundational Sync"}`, 
          desc: `The AI Engine has targeted your gap in ${displayMissing[0] || "Architecture"}. You must study its core mechanics and fundamental syntax to construct a solid baseline for ${domain}.`, 
          duration: "2 Weeks", 
          status: "Completed",
          youtubeId: getYoutubeVideo(displayMissing[0])
        },
        { 
          id: 2, 
          title: `Phase II: ${displayMissing[1] || "Intermediate Bridging"}`, 
          desc: `To achieve enterprise-level scaling, you must immediately integrate ${displayMissing[1] || "Deployment"} into your active workflow. This phase relies heavily on project lab execution.`, 
          duration: "3 Weeks", 
          status: "In Progress",
          youtubeId: getYoutubeVideo(displayMissing[1])
        },
        { 
          id: 3, 
          title: `Phase III: ${displayMissing[2] || "Advanced Synthesis"}`, 
          desc: `Finalize your technical transformation by mastering full-stack ${displayMissing[2] || "DevOps"} principles. Complete a final capstone to demonstrate total dominance.`, 
          duration: "4 Weeks", 
          status: "Locked",
          youtubeId: getYoutubeVideo(displayMissing[2])
        }
      ];
    } else {
      baseData = staticRoadmapData[selectedDomain] || [];
    }

    const savedProgress = localStorage.getItem(`roadmap_progression_${selectedDomain}`);
    if (savedProgress && selectedDomain !== "AI Sync") {
        setRoadmapSteps(JSON.parse(savedProgress));
    } else if (savedProgress && selectedDomain === "AI Sync" && hasMissing) {
        // Merge fresh analysis phases with saved status/videoWatched flags only
        const savedSteps = JSON.parse(savedProgress);
        const merged = baseData.map(step => {
            const saved = savedSteps.find(s => s.id === step.id);
            return saved ? { ...step, status: saved.status, videoWatched: saved.videoWatched } : step;
        });
        setRoadmapSteps(merged);
    } else {
        setRoadmapSteps(baseData);
    }
  }, [selectedDomain, location.state]);

  const markProgress = (stepId, skipClose = false) => {
    setRoadmapSteps(prev => {
        const nextSteps = prev.map((s) => {
            if (s.id === stepId) return { ...s, videoWatched: true };
            return s;
        });
        localStorage.setItem(`roadmap_progression_${selectedDomain}`, JSON.stringify(nextSteps));
        return nextSteps;
    });
    if (!skipClose) setActiveVideo(null);
  };

  useEffect(() => {
    if (!activeVideo) return;
    setIsSyncing(true);

    const handleMessage = (e) => {
      if (e.origin !== "https://www.youtube.com") return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "infoDelivery" && data.info?.playerState === 0) {
           setIsSyncing(false);
           markProgress(activeVideo.id, true);
        }
      } catch (err) {}
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [activeVideo]);

  useEffect(() => {
     if (location.state?.roadmap) {
         setSelectedDomain("AI Sync");
     }
  }, [location.state]);

  const progressPercent = roadmapSteps.length > 0 
    ? Math.round((roadmapSteps.filter(s => s.status === 'Completed').length / roadmapSteps.length) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-20 pb-24 px-6 relative overflow-hidden bg-transparent">
      {/* Analysis Atmospheric Pulse */}
      <div className="absolute inset-0 z-0 text-brand-primary pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-brand-primary/5 blur-[200px] rounded-full animate-pulse opacity-40" />
         <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest"
           >
             <Sparkles className="w-3 h-3" /> Career Trajectory Matrix
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white"
           >
             AI <span className="neon-text">ROADMAP</span>
           </motion.h1>
           
           {/* AI Insight Insight Message */}
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="bg-brand-primary/5 border-l-2 border-brand-primary px-6 py-3 max-w-xl mx-auto backdrop-blur-md"
           >
              <p className="text-brand-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                 <Lightbulb className="w-3.5 h-3.5" /> ⚡ AI SYNTHESIS: "This roadmap is personalized based on your current skills and career goal."
              </p>
           </motion.div>
        </div>

        {/* Domain Selection Nodes */}
        <div className="flex flex-wrap justify-center gap-2.5">
           {domains.map((domain) => (
              <button
                key={domain.name}
                onClick={() => setSelectedDomain(domain.name)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border transition-all ${
                  selectedDomain === domain.name 
                  ? "bg-brand-primary border-brand-primary text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                }`}
              >
                <domain.icon className={`w-3.5 h-3.5 ${selectedDomain === domain.name ? "text-black" : domain.color}`} />
                <span className="text-[9px] font-black uppercase tracking-widest">{domain.name}</span>
              </button>
           ))}
        </div>

        {/* Progress Tracker Tracker */}
        <div className="max-w-2xl mx-auto space-y-2">
           <div className="flex justify-between items-end">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Roadmap Progress</span>
              <span className="text-xl font-black text-brand-primary">{progressPercent}%</span>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-brand-primary shadow-[0_0_10px_rgba(34,197,94,0.6)]"
              />
           </div>
        </div>

        {/* Roadmap Display Timeline (Vertical) */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Animated Progress Line */}
          <div className="absolute left-[1.95rem] top-0 bottom-0 w-0.5 bg-white/5 rounded-full" />
          <motion.div 
             initial={{ height: 0 }}
             animate={{ height: `${(progressPercent / 100) * 100}%` }}
             className="absolute left-[1.95rem] top-0 w-0.5 bg-brand-primary shadow-[0_0_15px_rgba(34,197,94,0.8)] rounded-full z-10"
          />

          <div className="space-y-8 relative z-20">
             <AnimatePresence mode="popLayout">
                {roadmapSteps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-10 group"
                  >
                    {/* Step Status Node */}
                    <div className="relative shrink-0 pt-2">
                       <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                         step.status === 'Completed' 
                         ? "bg-brand-primary border-brand-primary text-black" 
                         : step.status === 'In Progress'
                         ? "bg-black border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse"
                         : "bg-black/50 border-white/10 text-white/20"
                       }`}>
                         {step.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : (step.status === 'Locked' ? <Lock className="w-4 h-4" /> : <Activity className="w-4 h-4" />)}
                       </div>
                       {step.status === 'In Progress' && (
                          <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping" />
                       )}
                    </div>

                    {/* Step Card Glowing Card */}
                    <GlassCard 
                      className={`flex-1 p-6 cursor-pointer transition-all duration-500 hover:scale-[1.01] ${
                        step.status === 'In Progress' ? "border-brand-primary/30" : "border-white/5"
                      }`}
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                      glow={step.status === 'In Progress'}
                    >
                       <div className="flex justify-between items-start">
                          <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${step.status === 'Completed' ? "text-brand-primary/60" : "text-white/20"}`}>
                                   Node 0{step.id}
                                </span>
                                {step.status === 'In Progress' && (
                                   <span className="px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[7px] font-black rounded-full animate-pulse">ACTIVE OPEARTION</span>
                                )}
                             </div>
                             <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight ${step.status === 'Locked' ? "text-white/30" : "text-white"}`}>
                                {step.title}
                             </h3>
                             <p className={`text-[12px] font-black uppercase tracking-widest leading-relaxed max-w-2xl ${step.status === 'Locked' ? 'text-white/20' : 'text-white/50'}`}>
                                {step.desc}
                             </p>
                             
                             {step.youtubeId && (
                                <div className="mt-6 flex flex-wrap gap-3">
                                   <button 
                                      onClick={(e) => { e.stopPropagation(); setActiveVideo({ id: step.id, youtubeId: step.youtubeId, title: step.title }); }}
                                      className="flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all group"
                                   >
                                      <Play className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" /> Watch AI Video Sync
                                   </button>
                                   {(step.videoWatched || step.status === 'Completed') ? (
                                      <Link to="/battle" state={{ defaultSubject: step.title.replace(/Phase I: |Phase II: |Phase III: /g, '').trim(), stepId: step.id, domain: selectedDomain }}>
                                         <div className="flex items-center gap-3 px-5 py-3 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-brand-primary hover:text-black shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all group cursor-pointer">
                                            <Swords className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" /> Initiate Combat Test
                                         </div>
                                      </Link>
                                   ) : (
                                      <button className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 text-white/20 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl cursor-not-allowed group">
                                         <Lock className="w-3.5 h-3.5" /> Watch Video to Unlock Combat
                                      </button>
                                   )}
                                </div>
                             )}
                          </div>
                          <div className="text-right shrink-0 ml-6">
                             <div className="flex items-center gap-2 text-white/20 text-[9px] uppercase font-black tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                <Clock className="w-2.5 h-2.5" /> {step.duration}
                             </div>
                             <span className={`text-[8px] font-black uppercase tracking-widest mt-3 block ${
                                step.status === 'Completed' ? "text-brand-primary" : (step.status === 'In Progress' ? "text-brand-primary animate-pulse" : "text-white/10")
                             }`}>
                                {step.status}
                             </span>
                          </div>
                       </div>
                    </GlassCard>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>
        </div>

        {/* Final Action Buttons Footer Buttons */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 border-t border-white/5">
           <Link to="/courses" className="block">
              <button className="w-full py-6 bg-brand-primary text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-3 group">
                 Start Learning <Play className="w-4 h-4 group-hover:translate-x-1" />
              </button>
           </Link>
           <Link to="/battle" className="block">
              <button className="w-full py-6 bg-black border border-brand-primary/30 text-brand-primary font-black uppercase tracking-[0.3em] text-[9px] rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:bg-brand-primary/10 transition-all flex items-center justify-center gap-3">
                 Go to Battle <Swords className="w-4 h-4" />
              </button>
           </Link>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
           <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12"
           >
              <div className="w-full max-w-6xl flex flex-col gap-6">
                 <div className="flex justify-between items-center">
                    <div>
                       <span className="text-brand-primary text-[10px] uppercase font-black tracking-[0.3em]">Neural Link Established</span>
                       <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{activeVideo.title}</h2>
                    </div>
                    <button onClick={() => setActiveVideo(null)} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all">
                       <X className="w-6 h-6" />
                    </button>
                 </div>
                 
                 <div className="rounded-2xl overflow-hidden border border-brand-primary/30 shadow-[0_0_60px_rgba(16,185,129,0.1)] relative aspect-video">
                    <iframe 
                       id="skillnova-yt-player"
                       className="w-full h-full" 
                       src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?enablejsapi=1&autoplay=1`} 
                       title="Active Training Matrix" 
                       frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                       onLoad={(e) => {
                          e.target.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 'skillnova-yt-player' }), 'https://www.youtube.com');
                       }}
                    ></iframe>
                 </div>

                 <div className="flex justify-between items-center bg-brand-primary/10 border border-brand-primary/20 p-6 rounded-2xl md:flex-row flex-col gap-4 text-center md:text-left">
                    <div className="space-y-1">
                       <h4 className="text-brand-primary font-black uppercase tracking-widest text-sm">
                          {isSyncing ? "Neural Sync in Progress..." : "Neural Link Established"}
                       </h4>
                       <p className="text-brand-primary/60 text-[10px] font-black uppercase tracking-[0.2em]">
                          {isSyncing 
                             ? "Syncing video patterns into your neural profile..." 
                             : "Synchronization complete. Combat test is now unlocked."}
                       </p>
                    </div>
                    
                    {isSyncing ? (
                       <div className="flex items-center gap-3 px-8 py-4 bg-brand-primary/20 text-brand-primary font-black uppercase tracking-[0.2em] text-sm rounded-xl border border-brand-primary/30">
                          <RefreshCw className="w-5 h-5 animate-spin" /> Auto-Syncing...
                       </div>
                    ) : (
                       <button 
                          onClick={() => setActiveVideo(null)}
                          className="px-8 py-4 bg-brand-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-xl hover:bg-brand-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center gap-3"
                       >
                          <CheckCircle2 className="w-5 h-5" /> Done & Close
                       </button>
                    )}
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Roadmap;
