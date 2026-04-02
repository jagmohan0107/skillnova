import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const GlassCard = ({ children, className, glow = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden p-6 transition-all duration-300",
        glow ? "glass-card-glow" : "glass-card",
        className
      )}
    >
      <div className="absolute top-0 right-0 p-1 bg-emerald-500/10 rounded-bl-xl border-b border-l border-emerald-500/20"></div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
