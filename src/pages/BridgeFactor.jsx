import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Brain, Target, Route, Swords, 
  ClipboardCheck, Lightbulb, BookOpen, GraduationCap,
  ArrowRight, Sparkles, MoveUpRight, Radio, Zap
} from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import GlassCard from "../components/ui/GlassCard";

const StarField = ({ count = 30, opacity = 0.4 }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ 
             opacity: Math.random() * opacity, 
             scale: Math.random() * 0.4 + 0.3,
             x: (Math.random() - 0.5) * 2000,
             y: (Math.random() - 0.5) * 2000
           }}
           animate={{ 
             opacity: [0.1, opacity, 0.1],
             scale: [1, 1.2, 1],
             y: [(Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000 - 100]
           }}
           transition={{
             duration: Math.random() * 10 + 10,
             repeat: Infinity,
             ease: "linear",
             delay: Math.random() * 5
           }}
           className="absolute left-1/2 top-1/2 w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        />
      ))}
    </div>
  );
};

const FactorCard = ({ feature, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, delay: index * 0.05 } }
  };

  return (
    <motion.div
      variants={item}
      className="h-full"
    >
      <Link to={feature.link}>
        <motion.div
           onMouseMove={handleMouseMove}
           whileTap={{ scale: 0.98 }}
           className="group relative h-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 overflow-hidden transition-all duration-500 hover:border-white/40 hover:bg-white/12 active:bg-white/20 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] focus:outline-none"
        >
          {/* Internal White Shimmer on Interaction */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Animated Glowing Pulse Aura */}
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
             <div className="absolute inset-0 bg-brand-primary/5 blur-[40px] animate-pulse" />
          </div>

          {/* Dynamic Glow Line Border Animation */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          >
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent animate-scan-h" />
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent animate-scan-h-reverse" />
          </motion.div>
          {/* Circular AI Ripple Effect */}
          <motion.div 
            className="absolute z-0 pointer-events-none opacity-0 group-hover:opacity-10 w-64 h-64 bg-brand-primary rounded-full blur-[60px]"
            style={{ 
              left: mouseX, 
              top: mouseY,
              x: "-50%",
              y: "-50%"
            }}
          />

          {/* Ghost Background Icon */}
          <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700 pointer-events-none">
             <feature.icon className="w-48 h-48 rotate-[-15deg]" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-8">
               {/* Icon Box */}
               <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-brand-primary/40 group-hover:bg-brand-primary/10 transition-all ${feature.color} shadow-inner`}>
                  <feature.icon className="w-6 h-6 group-hover:animate-glow-pulse" />
               </div>

               {/* Tactical Arrow */}
               <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:border-brand-primary/40 transition-all">
                  <MoveUpRight className="w-4 h-4 text-brand-primary" />
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-brand-primary group-hover:neon-text transition-all leading-none">
                  {feature.title}
               </h4>
               <p className="text-white/20 text-xs font-bold leading-relaxed group-hover:text-white/40 transition-colors">
                  {feature.desc}
               </p>
            </div>
          </div>

          {/* Precision Corner Accent */}
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
             <div className="absolute top-4 right-4 w-[2px] h-4 bg-brand-primary/0 group-hover:bg-brand-primary/20 transition-all" />
             <div className="absolute top-4 right-4 w-4 h-[2px] bg-brand-primary/0 group-hover:bg-brand-primary/20 transition-all" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const BridgeFactor = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const allFeatures = [
    { title: "AI Analysis", desc: "Start your profile scan for deep skill identification and professional mapping.", icon: Brain, link: "/analysis", color: "text-emerald-400" },
    { title: "Skill Gap Detection", desc: "Run a high-latency comparison between your profile and top-tier industry benchmarks.", icon: Target, link: "/skill-gap", color: "text-green-400" },
    { title: "AI Roadmap", desc: "Generate a dynamic, milestone-driven pathway to professional mastery post-analysis.", icon: Route, link: "/roadmap", color: "text-emerald-500" },
    { title: "Practice Battle", desc: "Engage in logic combat against industry-grade AI simulators for live performance testing.", icon: Swords, link: "/battle", color: "text-brand-primary" },
    { title: "AI Evaluation", desc: "Extract cognitive feedback and placement readiness metrics from your data.", icon: ClipboardCheck, link: "/evaluation", color: "text-green-500" },
    { title: "Recommendations", desc: "Unlock high-priority certifications and job openings curated for your profile.", icon: Lightbulb, link: "/recommendations", color: "text-emerald-300" },
    { title: "Discovery Courses", desc: "Access the adaptive learning grid designed to bypass typical friction and accelerate placement.", icon: BookOpen, link: "/courses", color: "text-emerald-600" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-6 relative overflow-hidden bg-transparent">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-brand-primary/5 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/5 blur-[180px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-28 text-center relative px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 mb-8 relative z-10"
          >
             <span className="text-[10px] font-black uppercase tracking-[1em] text-brand-primary/60">Access Specific AI Modules</span>
          </motion.div>
          
          <div className="flex items-center justify-center gap-6 md:gap-14 group relative z-10">
             <motion.div initial={{ x: -40, opacity: 0, scale: 0.5 }} animate={{ x: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }}>
               <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-brand-primary/20 group-hover:text-brand-primary transition-all duration-500 animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, scale: 0.8, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
               className="text-6xl md:text-8xl font-black uppercase tracking-tighter relative"
             >
               <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">BRIDGE </span>
               <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">FACTOR</span>
               <div className="absolute -bottom-6 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent blur-[2px]" />
             </motion.h1>

             <motion.div initial={{ x: 40, opacity: 0, scale: 0.5 }} animate={{ x: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }}>
               <MoveUpRight className="w-10 h-10 md:w-16 md:h-16 text-brand-primary/20 group-hover:text-brand-primary transition-all duration-500 animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
             </motion.div>
          </div>
        </div>

        {/* Factors Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {allFeatures.map((f, i) => (
            <FactorCard key={i} feature={f} index={i} />
          ))}
        </motion.div>

        {/* Footer Shortcut */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center gap-10"
        >
          <span className="text-[12px] uppercase tracking-[0.8em] text-white/20 font-black">Central Intelligence Access</span>
          <Link to="/dashboard">
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="px-14 py-6 rounded-2xl bg-white/5 border border-white/10 text-brand-primary text-sm font-black uppercase tracking-[0.4em] hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all flex items-center gap-3"
            >
               Enter Dashboard
               <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BridgeFactor;
