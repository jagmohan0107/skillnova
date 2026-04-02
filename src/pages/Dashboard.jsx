import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import { 
  Trophy, Target, Zap, Clock, TrendingUp, 
  Rocket, BarChart3, Activity, ShieldCheck, Globe,
  ArrowRight, Brain, CheckCircle2, Lock, Swords,
  User, BookOpen, AlertCircle, RefreshCw, Map
} from "lucide-react";
import { Link } from "react-router-dom";
import NeuralTwinVisualizer from "../components/visualizers/NeuralTwinVisualizer";

const Dashboard = () => {
  const [profile, setProfile]     = useState({});
  const [analysis, setAnalysis]   = useState(null);
  const [roadmapAI, setRoadmapAI] = useState([]);
  const [battleScore, setBattleScore] = useState(null);

  useEffect(() => {
    // Load profile
    const p = JSON.parse(localStorage.getItem('skillnova_profile') || '{}');
    const u = JSON.parse(localStorage.getItem('skillnova_user') || '{}');
    setProfile({ 
      ...p, 
      name: u.name || p.name, 
      email: u.email || p.email, 
      careerInterest: u.domain || p.careerInterest || "AI Software Engineer",
      degree: u.college || p.degree,
      branch: u.domain || p.branch,
      currentYear: u.year ? `Year ${u.year}` : p.currentYear
    });

    // Load analysis
    const a = JSON.parse(localStorage.getItem('skillnova_analysis') || 'null');
    setAnalysis(a);

    // Load AI Sync roadmap progression
    const r = JSON.parse(localStorage.getItem('roadmap_progression_AI Sync') || 'null');
    setRoadmapAI(r || []);

    // Load last battle score
    const b = JSON.parse(localStorage.getItem('skillnova_last_battle') || 'null');
    setBattleScore(b);
  }, []);

  const completedNodes  = roadmapAI.filter(s => s.status === 'Completed').length;
  const totalNodes      = roadmapAI.length || 3;
  const roadmapPercent  = Math.round((completedNodes / totalNodes) * 100);
  const experienceScore = analysis?.experience_score || 0;
  const activeSkills    = analysis?.active_skills || [];
  const missingSkills   = analysis?.missing_skills || [];
  const placement       = analysis?.placement_probability || "—";

  const stats = [
    { label: "Placement Readiness", value: analysis ? `${experienceScore}%` : "—", icon: Rocket, color: "text-emerald-400" },
    { label: "Active Skills", value: analysis ? activeSkills.length : "—", icon: Trophy, color: "text-amber-400" },
    { label: "Roadmap Progress", value: roadmapAI.length ? `${roadmapPercent}%` : "—", icon: Map, color: "text-blue-400" },
    { label: "Skill Gaps", value: analysis ? missingSkills.length : "—", icon: AlertCircle, color: "text-red-400" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
            SYSTEM <span className="neon-text">DASHBOARD</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/30">
              {profile.name ? `Operative: ${profile.name}` : "Node Status: Operational"}
            </span>
          </div>
        </motion.div>
        <Link to="/analysis">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/40 text-brand-primary text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-brand-primary hover:text-black transition-all">
            {analysis ? "Re-Scan Resume" : "Initiate Deep Scan"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard className="p-6 group hover:border-brand-primary/40 transition-all duration-500" glow>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-brand-primary/10 transition-colors ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400/30" />
              </div>
              <div className="text-3xl font-black mb-1 tracking-tight group-hover:neon-text transition-all">{s.value}</div>
              <div className="text-[9px] uppercase font-black tracking-[0.3em] text-white/20">{s.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Profile + Placement Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <GlassCard className="p-8 flex flex-col gap-5" glow>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
              <User className="w-7 h-7 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tighter">{profile.name || "Unknown Operative"}</h3>
              <p className="text-[10px] text-brand-primary/60 font-black uppercase tracking-widest">{profile.careerInterest || "No domain set"}</p>
            </div>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-4">
            {[
              { label: "Email", value: profile.email || "—" },
              { label: "Institution", value: profile.degree || "—" },
              { label: "Domain", value: profile.branch || "—" },
              { label: "Current Year", value: profile.currentYear || "—" },
            ].map((r, i) => (
              <div key={i} className="flex justify-between text-[10px]">
                <span className="text-white/30 font-black uppercase tracking-widest">{r.label}</span>
                <span className="text-white/70 font-black">{r.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Placement Probability */}
        <GlassCard className="p-8 flex flex-col justify-between" glow>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/60 mb-2">Placement Matrix</p>
            <h3 className="text-2xl font-black uppercase tracking-tighter">AI Evaluation</h3>
          </div>
          <div className="text-center my-6">
            <div className={`text-5xl font-black tracking-tighter ${experienceScore >= 80 ? 'text-brand-primary' : experienceScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {experienceScore ? `${experienceScore}%` : "—"}
            </div>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-2">{placement}</p>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <motion.div 
              className="h-2 rounded-full bg-gradient-to-r from-brand-primary/60 to-brand-primary"
              initial={{ width: 0 }}
              animate={{ width: `${experienceScore}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </GlassCard>

        {/* Battle Score */}
        <GlassCard className="p-8 flex flex-col justify-between" glow>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/60 mb-2">Combat Archive</p>
            <h3 className="text-2xl font-black uppercase tracking-tighter">Last Battle</h3>
          </div>
          {battleScore ? (
            <div className="my-4 space-y-3">
              <div className="text-4xl font-black text-brand-primary">{battleScore.accuracy}%</div>
              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Accuracy</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest rounded-lg">{battleScore.subject}</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest rounded-lg">{battleScore.difficulty}</span>
              </div>
            </div>
          ) : (
            <div className="my-6 text-center">
              <Swords className="w-10 h-10 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">No battle recorded yet</p>
            </div>
          )}
          <Link to="/battle">
            <button className="w-full py-3 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-black transition-all flex items-center justify-center gap-2">
              <Swords className="w-4 h-4" /> Enter Combat Arena
            </button>
          </Link>
        </GlassCard>
      </div>

      {/* Digital Twin Visualizer */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <GlassCard className="p-8 lg:p-12 overflow-hidden relative" glow>
          <div className="absolute top-0 right-0 p-6 text-right hidden md:block">
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-primary/40 mb-2">Live Mapping</div>
            <div className="text-xl font-black text-white">SYNC STATUS: {experienceScore ? `${experienceScore}%` : "AWAITING SCAN"}</div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-2/3">
              <NeuralTwinVisualizer />
            </div>
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Your Digital Twin</h3>
                <p className="text-white/30 text-xs leading-relaxed">This is the living representation of your skill clusters, architectural potential, and professional evolution.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Active Skills</div>
                  <div className="text-lg font-bold text-brand-primary">{activeSkills.length || "—"}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Gaps Found</div>
                  <div className="text-lg font-bold text-red-400">{missingSkills.length || "—"}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Roadmap</div>
                  <div className="text-lg font-bold text-amber-400">{roadmapAI.length ? `${roadmapPercent}%` : "—"}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Placement</div>
                  <div className="text-lg font-bold text-emerald-400">{experienceScore ? `${experienceScore}%` : "—"}</div>
                </div>
              </div>
              <Link to="/analysis">
                <button className="w-full py-4 bg-brand-primary/10 border border-brand-primary/40 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-brand-primary hover:text-black transition-all">
                  {analysis ? "Re-Initiate Deep Scan" : "Initiate Deep Scan"}
                </button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Skills + Roadmap Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Active Skills */}
        <GlassCard className="p-8" glow>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-primary" /> Active Skills
          </h3>
          {activeSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {activeSkills.map((skill, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[9px] font-black uppercase tracking-widest rounded-lg">
                  {skill}
                </motion.span>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Brain className="w-10 h-10 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Run analysis to detect active skills</p>
              <Link to="/analysis"><button className="mt-4 px-6 py-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-black transition-all">Scan Now</button></Link>
            </div>
          )}
        </GlassCard>

        {/* Skill Gaps */}
        <GlassCard className="p-8" glow>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" /> Skill Gaps Detected
          </h3>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                  {skill}
                </motion.span>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-10 h-10 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">No gaps detected yet</p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* AI Sync Roadmap Progress */}
      <GlassCard className="p-8" glow>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Map className="w-5 h-5 text-brand-primary" /> AI Sync Roadmap Progress
          </h3>
          <Link to="/roadmap">
            <button className="px-5 py-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-black transition-all flex items-center gap-2">
              View Full Roadmap <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>

        {roadmapAI.length > 0 ? (
          <div className="space-y-4">
            {roadmapAI.map((step, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className={`w-9 h-9 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  step.status === 'Completed' ? 'bg-brand-primary border-brand-primary text-black'
                  : step.status === 'In Progress' ? 'border-brand-primary text-brand-primary animate-pulse'
                  : 'border-white/10 text-white/20'
                }`}>
                  {step.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : step.status === 'Locked' ? <Lock className="w-3 h-3" /> : <Activity className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-black uppercase tracking-tight ${step.status === 'Locked' ? 'text-white/20' : 'text-white'}`}>{step.title}</p>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      step.status === 'Completed' ? 'bg-brand-primary/20 text-brand-primary'
                      : step.status === 'In Progress' ? 'bg-amber-400/20 text-amber-400'
                      : 'bg-white/5 text-white/20'
                    }`}>{step.status}</span>
                  </div>
                  <div className="mt-1.5 w-full bg-white/5 rounded-full h-1">
                    <div className={`h-1 rounded-full transition-all duration-700 ${
                      step.status === 'Completed' ? 'w-full bg-brand-primary'
                      : step.status === 'In Progress' ? 'w-1/2 bg-amber-400'
                      : 'w-0'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Map className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Visit Roadmap to activate AI Sync nodes</p>
            <Link to="/roadmap"><button className="mt-4 px-6 py-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-black transition-all">Open Roadmap</button></Link>
          </div>
        )}
      </GlassCard>

    </div>
  );
};

export default Dashboard;
