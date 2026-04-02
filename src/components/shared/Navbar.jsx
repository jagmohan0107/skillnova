import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, LayoutDashboard, Target, Zap, Swords, UserCircle, LogOut, Key, User } from "lucide-react";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../auth/ChangePasswordModal";
import ChangeNameModal from "../auth/ChangeNameModal";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/disconnect');
  };

  useEffect(() => {
    const handleIdentitySync = () => {
      const storedUser = localStorage.getItem("skillnova_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    handleIdentitySync();
    window.addEventListener("storage", handleIdentitySync);
    return () => window.removeEventListener("storage", handleIdentitySync);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 border-b border-emerald-500/10 bg-black/20 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Sparkles className="w-6 h-6 text-brand-primary" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent tracking-tight">
          SkillNova
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-white/70">
        <Link to="/analysis" className="hover:text-brand-primary transition-colors flex items-center gap-2">
          <Zap className="hover:animate-glow-pulse w-4 h-4" /> AI Analysis
        </Link>
        <Link to="/skill-gap" className="hover:text-brand-primary transition-colors flex items-center gap-2">
          <Target className="w-4 h-4" /> Skill Gap
        </Link>
        <Link to="/bridge-factor" className="hover:text-brand-primary transition-colors flex items-center gap-2">
          <Zap className="w-4 h-4" /> Bridge Factor
        </Link>
        <Link to="/roadmap" className="hover:text-brand-primary transition-colors flex items-center gap-2">
          <Zap className="w-4 h-4" /> Roadmap
        </Link>
        <Link to="/battle" className="hover:text-brand-primary transition-colors flex items-center gap-2">
          <Swords className="w-4 h-4" /> Battle
        </Link>
        <Link to="/dashboard" className="hover:text-brand-primary transition-colors flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-6 relative group/profile text-white/40">
        <Link to="/login" className="hidden md:block text-[10px] font-black uppercase tracking-widest hover:text-brand-primary transition-all">
          {user?.name ? `Welcome, ${user.name}` : "_System_Auth"}
        </Link>
        <div className="relative">
          <motion.button 
             whileHover={{ scale: 1.1, rotate: 5 }}
             className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center hover:border-emerald-500 transition-all duration-300 group shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
             <UserCircle className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
          </motion.button>
          
          <div className="absolute top-14 right-0 w-64 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-500 translate-y-2 group-hover/profile:translate-y-0 z-[100]">
             <div className="bg-[#020617]/95 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] space-y-2">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <UserCircle className="w-7 h-7 text-brand-primary" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">{user?.name || "AI Scan Active"}</h4>
                      <p className="text-[9px] font-black text-brand-primary/60 uppercase tracking-widest leading-none truncate w-32">{user?.email || "Checking Identity..."}</p>
                   </div>
                </div>
                
                <div className="pt-4 mt-2 border-t border-white/5 space-y-2">
                   <button 
                     onClick={() => setIsNameModalOpen(true)}
                     className="w-full bg-white/5 hover:bg-emerald-500/10 text-white/40 hover:text-brand-primary transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-2 group/btn border border-white/5"
                   >
                     <User className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Change Identifier</span>
                   </button>

                   <button 
                     onClick={handleLogout}
                     className="w-full bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-black transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-2 group/btn"
                   >
                     <LogOut className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Disconnect</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

       <ChangePasswordModal 
         isOpen={isPasswordModalOpen} 
         onClose={() => setIsPasswordModalOpen(false)} 
         userEmail={user?.email} 
       />

       <ChangeNameModal 
          isOpen={isNameModalOpen}
          onClose={() => setIsNameModalOpen(false)}
          currentName={user?.name}
          userEmail={user?.email}
       />
    </nav>
  );
};

export default Navbar;
