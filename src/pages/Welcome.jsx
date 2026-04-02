import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Zap, Radio, Terminal } from "lucide-react";

const Welcome = () => {
  const [userName, setUserName] = useState("AI Commander");
  const [loadingText, setLoadingText] = useState("Establishing AI Link...");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user identity
    const storedUser = localStorage.getItem("skillnova_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name?.split(" ")[0] || "Commander");
    }

    // Sequence of loading messages
    const sequence = [
      { text: "Synchronizing Identity Nodes...", time: 1000 },
      { text: "Optimizing Bridge-Factor Vectors...", time: 2000 },
      { text: "Uplink Established. Welcome.", time: 3500 },
    ];

    sequence.forEach((item, index) => {
      setTimeout(() => {
        setLoadingText(item.text);
      }, item.time);
    });

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    // Auto-redirect to Bridge Factor
    const timer = setTimeout(() => {
      navigate("/bridge-factor");
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden font-mono">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key="welcome-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-4"
          >
            <div className="flex justify-center gap-6 mb-12">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Radio className="w-8 h-8 text-brand-primary" />
              </motion.div>
              <div className="w-px h-8 bg-brand-primary/30" />
              <ShieldCheck className="w-8 h-8 text-brand-primary" />
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              WELCOME: <br />
              <span className="text-brand-primary drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                {userName}
              </span>
            </h1>

            <p className="text-white/40 text-[10px] md:text-sm font-black uppercase tracking-[0.5em] mt-8 flex items-center justify-center gap-4">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
              SYSTEM_ONLINE: ACCESS_GRANTED
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Loading Section */}
        <div className="mt-24 space-y-6 max-w-md mx-auto">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2 text-[10px] text-brand-primary font-black uppercase tracking-widest">
                <Terminal className="w-3 h-3" />
                {loadingText}
            </div>
            <span className="text-[10px] text-brand-primary/60 font-black">
                {progress}%
            </span>
          </div>

          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
            <motion.div
              className="h-full bg-brand-primary shadow-[0_0_15px_rgba(34,197,94,0.8)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4 pt-4 opacity-30">
            {[...Array(4)].map((_, i) => (
                <motion.div 
                    key={i}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="h-1 bg-brand-primary"
                />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Scan Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-full h-px bg-brand-primary mb-12 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Welcome;
