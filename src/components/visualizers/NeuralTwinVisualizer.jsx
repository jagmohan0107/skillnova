import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Activity, Brain, Target, Shield, 
  Cpu, Database, Sparkles, Binary, Dna,
  Route, Swords, ClipboardCheck, Lightbulb, BookOpen} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DataNode = ({ icon: Icon, label, value, x, y, delay, link = "#" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    className="absolute z-30"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <Link to={link} className="relative group block cursor-pointer">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="p-3 rounded-xl bg-black/60 border border-brand-primary/40 group-hover:border-brand-primary transition-all backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)]"
      >
        <Icon className="w-5 h-5 text-brand-primary" />
      </motion.div>
      
      {/* Connector Line (SVG) - Simplified as CSS line for performance */}
      <div className="absolute top-1/2 left-1/2 w-8 h-[1px] bg-gradient-to-r from-brand-primary/50 to-transparent -translate-y-1/2 origin-left rotate-45 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity"></div>

      {/* Label Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-1">
        <GlassCard className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border-brand-primary/20 shadow-xl">
          <div className="flex flex-col items-center gap-1">
            <span className="text-white/60">{label}</span>
            <span className="text-brand-primary text-[8px]">{value}</span>
          </div>
        </GlassCard>
      </div>
    </Link>
  </motion.div>
);

const NeuralTwinVisualizer = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto group">
      {/* Curved Border Container */}
      <div className="relative overflow-hidden rounded-[4rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] p-6 aspect-[4/5] flex items-center justify-center">
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)]"></div>
        
        {/* 1. Simplified Rotating Background Rings */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[15%] border border-dashed border-brand-primary/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[25%] border border-brand-primary/5 rounded-full"
          />
        </div>

        {/* 2. Central Holographic Body */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8">
          {/* HUD Elements */}
          <div className="w-full flex justify-between px-4 pointer-events-none opacity-60">
             <div className="flex flex-col gap-0.5">
                <span className="text-[6px] font-black tracking-[0.4em] text-white/20 uppercase">Sync Status</span>
                <span className="text-xs font-black text-brand-primary">94.2%</span>
             </div>
             <div className="flex flex-col gap-0.5 text-right">
                <span className="text-[6px] font-black tracking-[0.4em] text-white/20 uppercase">AI ID</span>
                <span className="text-[8px] font-mono text-brand-primary/40 truncate w-20">SN-X842</span>
             </div>
          </div>

          <motion.div
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-[65%] flex items-center justify-center"
          >
            <img 
              src="/neural_twin_base.png" 
              alt="AI Digital Twin" 
              className="h-full object-contain filter drop-shadow-[0_0_50px_rgba(34,197,94,0.3)] mix-blend-screen"
            />
            
            {/* Scanning Overlay Effect */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-[1px] bg-brand-primary/40 blur-[1px] z-20 pointer-events-none"
            />
          </motion.div>

          {/* Status Label */}
          <div className="text-center space-y-1">
             <div className="text-[8px] font-black uppercase tracking-[0.6em] text-white/20">AI Matrix Synced</div>
             <div className="h-px w-12 bg-brand-primary/30 mx-auto"></div>
          </div>
        </div>

        {/* 3. Reference Image Interactive Nodes - Updated to Bridge Factor Modules */}
        <DataNode icon={Brain} label="AI ANALYSIS" value="[SYNCED]" x={58} y={15} delay={0.5} link="/analysis" />
        <DataNode icon={Target} label="SKILL GAP" value="[DETECTED]" x={62} y={32} delay={0.7} link="/skill-gap" />
        <DataNode icon={Route} label="AI ROADMAP" value="[GENERATING]" x={65} y={54} delay={0.9} link="/roadmap" />
        <DataNode icon={Swords} label="PRACTICE BATTLE" value="[ACTIVE]" x={60} y={75} delay={1.1} link="/battle" />
        <DataNode icon={ClipboardCheck} label="AI EVALUATION" value="[READY]" x={15} y={28} delay={1.3} link="/evaluation" />
        <DataNode icon={Lightbulb} label="RECOMMENDATIONS" value="[HIGH]" x={12} y={48} delay={1.5} link="/recommendations" />
        <DataNode icon={BookOpen} label="AI COURSES" value="[UNLOCKED]" x={18} y={70} delay={1.7} link="/courses" />
        
        {/* UUID Badge Callout */}
        <div className="absolute top-[18%] left-[10%] z-40 bg-black/80 border border-brand-primary/30 p-3 rounded-xl backdrop-blur-md">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-primary/10 rounded-lg">
                <Dna className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <div className="text-[6px] font-black text-white/30 tracking-[0.4em] uppercase">User Fingerprint</div>
                <div className="text-[10px] font-mono text-white/80">UUID: USER-4192-X</div>
              </div>
           </div>
        </div>

        {/* Core Logic Badge */}
        <div className="absolute top-[4%] right-[25%] z-40 bg-brand-primary/10 border border-brand-primary/30 px-3 py-1 rounded-full text-[6px] font-black text-brand-primary tracking-[0.2em] uppercase">
          CORE LOGIC
        </div>
      </div>

      {/* Modern DNA Decorations */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-32 w-px bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent"></div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-32 w-px bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent"></div>
    </div>
  );
};

const GlassCard = ({ children, className }) => (
  <div className={`bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-2 ${className}`}>
    {children}
  </div>
);

export default NeuralTwinVisualizer;
