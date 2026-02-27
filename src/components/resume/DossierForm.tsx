import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, ShieldCheck, Fingerprint } from 'lucide-react';

export interface DossierFormData {
  name: string;
  email: string;
  sector: string;
  objective: string;
}

interface DossierFormProps {
  isOpen: boolean;
  onUnlock: (data: DossierFormData) => void;
  onClose: () => void;
}

export const DossierForm: React.FC<DossierFormProps> = ({ isOpen, onUnlock, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DossierFormData>();

  useEffect(() => {
    if (!isOpen) reset();
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-4"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-400/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-400/60" />

            <div className="border border-cyan-500/20 bg-[#020409]/95 backdrop-blur-xl">
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Fingerprint size={16} className="text-cyan-400" />
                  <span className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-widest text-cyan-400">
                    CLEARANCE REQUIRED
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/30 hover:text-white/70 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                {/* Heading */}
                <h3 className="font-['Playfair_Display'] italic text-2xl text-cyan-400 mb-1">
                  IDENTIFY_USER
                </h3>
                <p className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-widest text-white/30 mb-8">
                  Access to personnel dossier requires authorization
                </p>

                {/* Name */}
                <div className="mb-5">
                  <label className="block font-['Geist',_sans-serif] text-[9px] uppercase tracking-widest text-white/40 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register('name', { required: 'Name required' })}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full bg-transparent border-b border-white/15 text-white text-sm py-2 focus:border-cyan-400 outline-none transition-colors duration-200 placeholder:text-white/20 font-['Geist',_sans-serif]"
                  />
                  {errors.name && (
                    <p className="font-['Geist',_sans-serif] text-[9px] text-red-400/80 mt-1 uppercase tracking-widest">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="block font-['Geist',_sans-serif] text-[9px] uppercase tracking-widest text-white/40 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                    })}
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="w-full bg-transparent border-b border-white/15 text-white text-sm py-2 focus:border-cyan-400 outline-none transition-colors duration-200 placeholder:text-white/20 font-['Geist',_sans-serif]"
                  />
                  {errors.email && (
                    <p className="font-['Geist',_sans-serif] text-[9px] text-red-400/80 mt-1 uppercase tracking-widest">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Sector */}
                <div className="mb-5">
                  <label className="block font-['Geist',_sans-serif] text-[9px] uppercase tracking-widest text-white/40 mb-2">
                    Sector
                  </label>
                  <select
                    {...register('sector')}
                    className="w-full bg-[#020409] border-b border-white/15 text-white text-sm py-2 focus:border-cyan-400 outline-none transition-colors duration-200 font-['Geist',_sans-serif] appearance-none cursor-pointer"
                  >
                    <option value="B2B">B2B SaaS / Technology</option>
                    <option value="D2C">D2C / E-Commerce Retail</option>
                    <option value="Health">Healthcare / HealthTech</option>
                    <option value="Agency">Agency / Fractional Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Objective */}
                <div className="mb-8">
                  <label className="block font-['Geist',_sans-serif] text-[9px] uppercase tracking-widest text-white/40 mb-2">
                    Primary Objective
                  </label>
                  <select
                    {...register('objective')}
                    className="w-full bg-[#020409] border-b border-white/15 text-white text-sm py-2 focus:border-cyan-400 outline-none transition-colors duration-200 font-['Geist',_sans-serif] appearance-none cursor-pointer"
                  >
                    <option value="Revenue">Revenue Architecture & Lead Gen</option>
                    <option value="Automation">System Automation & Efficiency</option>
                    <option value="Brand">Digital Transformation & Rebranding</option>
                    <option value="Hiring">Evaluating for Hire</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-cyan-400 text-[#020409] py-3.5 font-['Geist',_sans-serif] text-[10px] uppercase tracking-widest font-bold hover:bg-cyan-300 transition-colors duration-200 disabled:opacity-60 disabled:cursor-wait"
                >
                  <ShieldCheck size={14} />
                  {isSubmitting ? 'AUTHORIZING...' : 'AUTHORIZE & DOWNLOAD'}
                </button>

                <p className="font-['Geist',_sans-serif] text-[9px] uppercase tracking-widest text-white/15 text-center mt-4">
                  No spam. Used only to personalize your dossier.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
