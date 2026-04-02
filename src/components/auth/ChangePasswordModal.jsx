import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Lock, Loader2, ShieldCheck, ShieldAlert, Key, Fingerprint, MailCheck, Eye, EyeOff } from "lucide-react";
import { authService } from "../../services/authService";

const ChangePasswordModal = ({ isOpen, onClose, userEmail }) => {
  const [step, setStep] = useState("OLD_PASSWORD"); // OLD_PASSWORD, VERIFICATION, NEW_PASSWORD, SUCCESS
  const [oldPassword, setOldPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleVerifyIdentity = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Stage 1: Eagerly verify the current pattern before sending code
      await authService.verifyPassword(userEmail, oldPassword);
      
      // If code reaches here, identity is valid. Now send 2FA
      await authService.sendVerification(userEmail);
      setStep("VERIFICATION");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.verifyCode(userEmail, verificationCode);
      setStep("NEW_PASSWORD");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRewritePattern = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.changePassword(userEmail, oldPassword, newPassword);
      setStep("SUCCESS");
      setTimeout(() => {
        onClose();
        resetModal();
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setStep("OLD_PASSWORD");
    setOldPassword("");
    setVerificationCode("");
    setNewPassword("");
    setError(null);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] grid place-items-center p-4 overflow-y-auto">
          {/* Global Cinematic Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
          />
          
          {/* Modal Container - Absolute Centering via Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-lg bg-[#050a14] border border-emerald-500/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)]"
          >
            {/* Progress Bar HUD */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: step === "OLD_PASSWORD" ? "25%" : step === "VERIFICATION" ? "50%" : step === "NEW_PASSWORD" ? "75%" : "100%" }}
                 className="h-full bg-brand-primary shadow-[0_0_10px_rgba(16,185,129,0.8)]"
               />
            </div>

            <div className="p-10 space-y-8 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-brand-primary" />
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white">AI Protocol</h3>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">
                    {step === "OLD_PASSWORD" && "Stage 1: Identity Confirmed"}
                    {step === "VERIFICATION" && "Stage 2: Uplink Verification"}
                    {step === "NEW_PASSWORD" && "Stage 3: Pattern Rewrite"}
                    {step === "SUCCESS" && "Mission Success"}
                  </p>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {step === "SUCCESS" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-brand-primary/10 border border-brand-primary/40 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                    <ShieldCheck className="w-12 h-12 text-brand-primary animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black uppercase text-white tracking-widest leading-none">Access Pattern Updated</h4>
                    <p className="text-brand-primary/60 text-[10px] uppercase tracking-[0.3em] font-black">Secure telemetry synchronized with core nexus.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="min-h-[300px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {step === "OLD_PASSWORD" && (
                      <motion.form
                        key="old"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleVerifyIdentity}
                        className="space-y-8"
                      >
                        <div className="space-y-3">
                           <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 block italic">Confirm Legacy Access Pattern</label>
                           <div className="relative group/field">
                             <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/10 group-focus-within/field:text-brand-primary transition-colors" />
                             <input
                               type={showOldPassword ? "text" : "password"}
                               required
                               placeholder="••••••••"
                               autoFocus
                               value={oldPassword}
                               onChange={(e) => setOldPassword(e.target.value)}
                               className="w-full bg-white/5 border border-white/10 rounded-2xl py-7 pl-16 pr-14 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all text-white placeholder:text-white/20 tracking-widest text-lg"
                             />
                             <button
                               type="button"
                               onClick={() => setShowOldPassword(!showOldPassword)}
                               className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                             >
                               {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                             </button>
                           </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.5em] transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-inner translate-z-0"
                        >
                          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                            <>
                              Verify Identity
                              <Key className="w-5 h-5 group-hover:rotate-45 transition-transform text-brand-primary" />
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}

                    {step === "VERIFICATION" && (
                      <motion.form
                        key="verify"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleVerifyCode}
                        className="space-y-8"
                      >
                        <div className="space-y-5">
                           <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-5">
                             <MailCheck className="w-7 h-7 text-brand-primary shrink-0" />
                             <p className="text-white/60 text-[9px] uppercase font-black tracking-widest leading-relaxed">
                                Verification link established. Check your terminal or enter the demo code: <span className="text-brand-primary font-black">123456</span>
                             </p>
                           </div>
                           <div className="relative group/field">
                             <input
                               type="text"
                               required
                               maxLength="6"
                               placeholder="0 0 0 0 0 0"
                               autoFocus
                               value={verificationCode}
                               onChange={(e) => setVerificationCode(e.target.value)}
                               className="w-full bg-white/5 border border-white/10 rounded-2xl py-8 text-center text-5xl font-black tracking-[0.8em] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all text-white placeholder:text-white/10"
                             />
                           </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full h-16 bg-brand-primary rounded-2xl flex items-center justify-center gap-4 text-black font-black uppercase tracking-[0.5em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                        >
                          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Authorize Rewrite"}
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => setStep("OLD_PASSWORD")}
                          className="w-full text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
                        >
                          Back to authentication
                        </button>
                      </motion.form>
                    )}

                    {step === "NEW_PASSWORD" && (
                      <motion.form
                        key="new"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleRewritePattern}
                        className="space-y-8"
                      >
                        <div className="space-y-3">
                           <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 block italic">Define New Secure Pattern (Min 8 Characters)</label>
                           <div className="relative group/field">
                             <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/10 group-focus-within/field:text-brand-primary transition-colors" />
                             <input
                               type={showNewPassword ? "text" : "password"}
                               required
                               minLength={8}
                               placeholder="••••••••"
                               autoFocus
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                               className="w-full bg-white/5 border border-white/10 rounded-2xl py-7 pl-16 pr-14 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all text-white placeholder:text-white/20 tracking-widest text-lg"
                             />
                             <button
                               type="button"
                               onClick={() => setShowNewPassword(!showNewPassword)}
                               className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                             >
                               {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                             </button>
                           </div>
                        </div>

                        {newPassword.length > 0 && newPassword.length < 8 && (
                          <p className="text-red-500/60 text-[9px] uppercase font-black tracking-widest animate-pulse">Pattern Weak: Minimum of 8 AI components required.</p>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full h-16 bg-brand-primary rounded-2xl flex items-center justify-center gap-4 text-black font-black uppercase tracking-[0.5em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                        >
                          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Commit Patterns"}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-center gap-4"
                    >
                      <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                      <p className="text-red-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">{error}</p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ChangePasswordModal;
