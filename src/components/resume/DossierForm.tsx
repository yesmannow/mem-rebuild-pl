import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, ShieldCheck, Terminal, ChevronRight } from 'lucide-react';

export interface DossierFormData {
  name: string;
  email: string;
  sector: 'B2B' | 'Health' | 'D2C' | 'Agency';
}

interface DossierFormProps {
  isOpen: boolean;
  onUnlock: (data: DossierFormData) => void;
  onClose: () => void;
}

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 30 + Math.random() * 40);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, text]);

  return <span>{displayedText}</span>;
};

export const DossierForm: React.FC<DossierFormProps> = ({ isOpen, onUnlock, onClose }) => {
  const [bootSequence, setBootSequence] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DossierFormData>({
    defaultValues: {
      sector: 'B2B'
    }
  });

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setBootSequence(prev => (prev < 2 ? prev + 1 : prev));
      }, 800);
      return () => clearInterval(timer);
    } else {
      setBootSequence(0);
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const onSubmit = (data: DossierFormData) => {
    onUnlock(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl px-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg font-mono"
          >
            {/* Terminal Window */}
            <div className="bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <div className="h-4 w-[1px] bg-white/10 mx-1" />
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-cyan-400" />
                    <span className="text-[10px] uppercase tracking-widest text-cyan-400/70 font-bold">
                      SECURE_TERMINAL_V4.0
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/30 hover:text-cyan-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-8">
                <div className="space-y-1 mb-8">
                  <div className="flex items-start gap-2 text-cyan-400 text-xs">
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0" />
                    <TypewriterText text="SECURE_CONNECTION_ESTABLISHED..." />
                  </div>
                  {bootSequence >= 1 && (
                    <div className="flex items-start gap-2 text-white/60 text-xs">
                      <ChevronRight size={14} className="mt-0.5 flex-shrink-0" />
                      <TypewriterText text="INITIALIZING_HANDSHAKE_PROTOCOL" />
                    </div>
                  )}
                  {bootSequence >= 2 && (
                    <div className="flex items-start gap-2 text-cyan-400 text-xs">
                      <ChevronRight size={14} className="mt-0.5 flex-shrink-0" />
                      <span className="flex items-center gap-2">
                        <TypewriterText text="IDENTIFY_USER_FOR_CLEARANCE" />
                        <span className="w-1.5 h-4 bg-cyan-400 animate-pulse" />
                      </span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 mb-2">
                      NAME_STRING
                    </label>
                    <input
                      {...register('name', { required: 'REQUIRED' })}
                      className="w-full bg-white/5 border border-cyan-500/20 px-4 py-3 text-white text-sm focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-white/10"
                      placeholder="ENTER_FULL_NAME"
                    />
                    {errors.name && (
                      <span className="absolute -bottom-4 left-0 text-[9px] text-red-400 tracking-widest">
                        ERROR: {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 mb-2">
                      COMM_CHANNEL_ID
                    </label>
                    <input
                      {...register('email', {
                        required: 'REQUIRED',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'INVALID_FORMAT' }
                      })}
                      className="w-full bg-white/5 border border-cyan-500/20 px-4 py-3 text-white text-sm focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-white/10"
                      placeholder="EMAIL_ADDRESS"
                    />
                    {errors.email && (
                      <span className="absolute -bottom-4 left-0 text-[9px] text-red-400 tracking-widest">
                        ERROR: {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Sector Select */}
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 mb-2">
                      SECTOR_CLASSIFICATION
                    </label>
                    <select
                      {...register('sector')}
                      className="w-full bg-slate-900 border border-cyan-500/20 px-4 py-3 text-white text-sm focus:border-cyan-400 focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="B2B">B2B SaaS / FINTECH</option>
                      <option value="Health">HEALTHTECH / COMPLIANCE</option>
                      <option value="D2C">D2C / CONSUMER_RETAIL</option>
                      <option value="Agency">AGENCY / FRACTIONAL</option>
                    </select>
                    <div className="absolute right-4 top-[38px] pointer-events-none text-cyan-400/50">
                      <ChevronRight size={14} className="rotate-90" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full bg-cyan-500/10 border border-cyan-400 py-4 overflow-hidden transition-all hover:bg-cyan-500/20 active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-cyan-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-10" />
                      <div className="relative flex items-center justify-center gap-3">
                        <ShieldCheck size={18} className="text-cyan-400" />
                        <span className="text-[11px] font-bold tracking-[0.3em] text-cyan-400">
                          {isSubmitting ? 'AUTHORIZING...' : 'INITIATE_DEPLOYMENT'}
                        </span>
                      </div>
                    </button>
                    <div className="mt-4 flex justify-between items-center text-[8px] tracking-widest text-white/20 uppercase">
                      <span>DATA_PRIVACY: ACTIVE</span>
                      <span>ENCRYPTION: AES-256</span>
                      <span>STATUS: READY</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
