import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import CosmicBackground from "./CosmicBackground";
import AIChatbot from "./AIChatbot";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const location = useLocation();
  const hideUI = ["/", "/login", "/disconnect", "/welcome"].includes(location.pathname);

  return (
    <div className="min-h-screen text-white selection:bg-brand-primary selection:text-black">
      {!hideUI && <Navbar />}
      <CosmicBackground />
      {!hideUI && <AIChatbot />}
      
      <main className={`${!hideUI ? "pt-24 pb-12" : ""} w-full min-h-screen overflow-x-hidden relative`}>
        {/* Animated Background Overlay for transitions */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none z-0"></div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="relative z-10"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {!hideUI && (
        <footer className="py-20 border-t border-emerald-500/10 bg-black/60 backdrop-blur-3xl relative z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/40">
                      <div className="w-5 h-5 bg-brand-primary rounded-full animate-pulse"></div>
                   </div>
                   <span className="text-3xl font-black uppercase tracking-tighter neon-text">SkillNova</span>
                </div>
                <p className="text-white/30 text-lg leading-relaxed max-w-xs font-medium italic">
                   "Reimagining career evolution through a decentralized matrix."
                </p>
             </div>
             
             <div className="space-y-6">
                <h4 className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500/50">Connectivity</h4>
                <div className="flex flex-col gap-4 text-white/40 font-bold uppercase tracking-widest text-sm">
                   <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-all hover:translate-x-2">Twitter / X</a>
                   <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-all hover:translate-x-2">Discord Hub</a>
                </div>
             </div>

             <div className="space-y-6">
                <h4 className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500/50">Terminal Status</h4>
                <div className="p-6 rounded-2xl bg-black border border-emerald-500/10 font-mono text-[10px] text-brand-primary/40 space-y-2 shadow-inner">
                   <p>&gt; UPLINK: STABLE</p>
                   <p>&gt; ENCRYPTION: ACTIVE</p>
                   <p>&gt; VERSION: 2.1.0_A</p>
                   <div className="pt-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
                      <span>SYSTEM ONLINE</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
             <p>© 2026 SkillNova AI. All rights reserved.</p>
             <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Protocol Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Auth</a>
             </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
