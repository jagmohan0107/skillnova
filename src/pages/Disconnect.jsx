import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PowerOff, Loader2 } from "lucide-react";

const Disconnect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform real logout in background
    localStorage.removeItem("skillnova_user");
    localStorage.removeItem("skillnova_token");
    window.dispatchEvent(new Event("storage"));

    // Cinematic delay before returning to login
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-brand-primary">
      {/* Background Pulse */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8 flex flex-col items-center z-10"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-t-2 border-brand-primary/40 border-r-2 border-brand-primary/10"
          />
          <PowerOff className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand-primary" />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-black uppercase tracking-[0.4em] drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            UPLINK TERMINATED
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black animate-pulse">
            AI Session Offline...
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Loader2 className="w-4 h-4 animate-spin opacity-40" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">
            System Reset in Progress
          </span>
        </div>
      </motion.div>

      {/* Decorative Glitch Overlay */}
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-brand-primary/10 opacity-20 pointer-events-none"
      />
    </div>
  );
};

export default Disconnect;
