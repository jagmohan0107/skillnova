import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X, User, Loader2, ShieldCheck, ShieldAlert, Fingerprint } from "lucide-react";
import { authService } from "../../services/authService";

const ChangeNameModal = ({ isOpen, onClose, currentName, userEmail }) => {
  const [newName, setNewName] = useState(currentName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateIdentifier = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.updateProfile(userEmail, newName);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] grid place-items-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-md bg-[#050a14] border border-emerald-500/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)]"
          >
            <div className="p-10 space-y-8 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-brand-primary" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white">AI Rename</h3>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">Identitier Update Protocol</p>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {success ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-brand-primary/10 border border-brand-primary/40 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                    <ShieldCheck className="w-10 h-10 text-brand-primary animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase text-white tracking-widest">New Identity Synced</h4>
                    <p className="text-brand-primary/60 text-[9px] uppercase tracking-widest">Global telemetry updated.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateIdentifier} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 block italic">Define New Subject Alias</label>
                    <div className="relative group/field">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/10 group-focus-within/field:text-brand-primary transition-colors" />
                      <input
                        type="text"
                        required
                        placeholder="Enter Alias..."
                        autoFocus
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-7 pl-16 pr-6 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all text-white placeholder:text-white/20 tracking-widest text-lg font-black"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 bg-brand-primary rounded-2xl flex items-center justify-center gap-4 text-black font-black uppercase tracking-[0.5em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Commit Identifier"}
                  </button>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-center gap-4">
                      <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                      <p className="text-red-500 text-[9px] font-black uppercase tracking-widest leading-relaxed">{error}</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ChangeNameModal;
