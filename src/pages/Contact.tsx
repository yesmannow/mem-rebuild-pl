import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Activity,
  Radio,
  SignalHigh,
  Send,
  Loader2,
  Mail,
  Linkedin,
  Github,
} from 'lucide-react';
import MagneticCursor from '../components/ui/MagneticCursor';

const FINAL_MESSAGE = '[SYSTEM]:: INTEL_RECEIVED. MISSION_UNDER_REVIEW. EXPECT_CONTACT_WITHIN_24_CYCLES.';

const SECTORS = ['Fractional CMO', 'Product Studio', 'Defense Tech', 'Luxury Commerce', 'Media Network', 'Stealth Startup'];
const BUDGET_BANDS = ['<$25K Rapid Strike', '$25K–$75K Systems Build', '$75K–$150K Platform Overhaul', '$150K+ Long Campaign'];
const OBJECTIVES = ['Launch New Initiative', 'Scale Revenue Engine', 'Stabilize Infrastructure', 'Audit + Advisory'];

interface MissionData {
  name: string;
  sector: string;
  budget: string;
  objective: string;
  intel: string;
}

type TransmitStatus = 'idle' | 'arming' | 'uplinking' | 'success' | 'error';

const Contact: React.FC = () => {
  const [mission, setMission] = useState<MissionData>({
    name: '',
    sector: SECTORS[0],
    budget: '',
    objective: OBJECTIVES[0],
    intel: '',
  });
  const [logs, setLogs] = useState<string[]>([
    '[BOOT]:: SECURITY CLEARANCE AWAITING CREDENTIALS',
    '[SYSTEM]:: DIGITAL TWILIGHT RELAY ACTIVE',
    '[PROMPT]:: FILL BRIEFING + INITIATE TRANSMISSION',
  ]);
  const [transmitStatus, setTransmitStatus] = useState<TransmitStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [glitchBurst, setGlitchBurst] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const appendLog = (entry: string) => {
    setLogs(prev => [...prev.slice(-7), entry]);
  };

  const handleChange = (field: keyof MissionData, value: string) => {
    setMission(prev => ({ ...prev, [field]: value }));
  };

  const isReady = mission.name.trim() && mission.budget && mission.intel.trim().length >= 12;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isReady || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setTransmitStatus('arming');
    appendLog('[ARMING]:: ENCRYPTION SALTS PRIMED');

    try {
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'b6c0916d-2dba-4faf-933e-fcdd6c683a88';
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: 'Mission Briefing Protocol',
          from_name: mission.name,
          name: mission.name,
          sector: mission.sector,
          budget: mission.budget,
          objective: mission.objective,
          intel: mission.intel,
          message: `Sector: ${mission.sector}\nBudget: ${mission.budget}\nObjective: ${mission.objective}\nIntel: ${mission.intel}`,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Transmission jammed');
      }

      setTransmitStatus('uplinking');
      appendLog('[UPLINK]:: CARRIER WAVE LOCKED. TRANSMITTING…');

      setTimeout(() => {
        setTransmitStatus('success');
        appendLog(FINAL_MESSAGE);
        setGlitchBurst(true);
        setTimeout(() => setGlitchBurst(false), 2000);
        setMission({ name: '', sector: SECTORS[0], budget: '', objective: OBJECTIVES[0], intel: '' });
      }, 600);
    } catch (error) {
      const description = error instanceof Error ? error.message : 'Unknown fault';
      setTransmitStatus('error');
      setErrorMessage(description);
      appendLog(`[ALERT]:: TRANSMISSION FAILED — ${description.toUpperCase()}`);
    } finally {
      setTimeout(() => setIsSubmitting(false), 300);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#01030A] text-white">
      <MagneticCursor color="#00F2FF" enabled />
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(0,242,255,0.15), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255,111,97,0.25), transparent 50%)',
      }} />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80')] opacity-[0.08] mix-blend-screen" />

      <main className="relative z-10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 flex flex-col gap-3 text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.8em] text-white/40">security clearance · delta tier</p>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-['Playfair_Display'] italic text-[clamp(2.6rem,4vw,3.8rem)] text-white">
                  Mission Briefing Portal
                </h1>
                <p className="font-['Geist',_sans-serif] text-sm uppercase tracking-[0.45em] text-cyan-300">
                  digital twilight operations · real-time uplink
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-['Geist',_sans-serif] uppercase tracking-[0.5em] text-white/70">
                Status · {transmitStatus === 'success' ? 'Secure' : 'Standby'}
              </div>
            </div>
          </header>

          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/5/20 backdrop-blur-xl p-8 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/60 bg-black/60 text-cyan-300">
                  <Shield size={26} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-white/40">Command Center</p>
                  <p className="font-['Geist',_sans-serif] text-lg text-white">System Log &amp; Security Feed</p>
                </div>
              </div>

              <div className="mb-8 rounded-2xl border border-white/10 bg-black/70 p-6 font-['Geist',_sans-serif] text-sm">
                <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-cyan-300">
                  <Activity size={12} />
                  Live terminal stream
                </div>
                <div className="space-y-2 font-mono text-[13px] text-cyan-100">
                  {logs.map((line, idx) => (
                    <motion.p
                      key={`${line}-${idx}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
                      className="rounded bg-white/5 px-3 py-2 text-left"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.5em] text-white/40">Comms</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <Radio size={16} className="text-cyan-300" />
                    Secure Web3 Relay
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.5em] text-white/40">Latency</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <SignalHigh size={16} className="text-cyan-300" />
                    &lt;120ms global
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.5em] text-white/40">Response</p>
                  <p className="mt-2 text-sm text-white/80">Contact within 24 cycles</p>
                </div>
              </div>

              <div className="mt-8 rounded-[26px] border border-white/10 bg-black/60 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">Direct comm channels</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                  <a href="mailto:hoosierdarling@gmail.com" className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-white/80 transition hover:border-cyan-400/60">
                    <Mail size={16} /> Email
                  </a>
                  <a href="https://linkedin.com/in/jacobdarling" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-white/80 transition hover:border-cyan-400/60">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                  <a href="https://github.com/JdarlingGT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-white/80 transition hover:border-cyan-400/60">
                    <Github size={16} /> GitHub
                  </a>
                </div>
              </div>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="rounded-[32px] border border-cyan-400/20 bg-[#050B15]/80 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.5em] text-white/50">
                  Clearance Form · v10
                </div>
                <div className="text-sm text-white/60">Enter credentials + payload</div>
              </div>

              <label className="mb-5 block">
                <span className="text-xs uppercase tracking-[0.4em] text-white/40">Name</span>
                <input
                  type="text"
                  value={mission.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-300 focus:outline-none"
                  placeholder="Commander Alias"
                  required
                />
              </label>

              <label className="mb-5 block">
                <span className="text-xs uppercase tracking-[0.4em] text-white/40">Sector</span>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {SECTORS.map(sector => (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => handleChange('sector', sector)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        mission.sector === sector
                          ? 'border-cyan-400/80 bg-cyan-400/10 text-cyan-100'
                          : 'border-white/10 text-white/60 hover:border-white/25'
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </label>

              <label className="mb-5 block">
                <span className="text-xs uppercase tracking-[0.4em] text-white/40">Budget Band</span>
                <div className="mt-3 grid gap-2">
                  {BUDGET_BANDS.map(band => (
                    <button
                      key={band}
                      type="button"
                      onClick={() => handleChange('budget', band)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        mission.budget === band
                          ? 'border-orange-400/70 bg-orange-400/10 text-orange-100'
                          : 'border-white/10 text-white/60 hover:border-white/25'
                      }`}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              </label>

              <label className="mb-5 block">
                <span className="text-xs uppercase tracking-[0.4em] text-white/40">Objective</span>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {OBJECTIVES.map(obj => (
                    <button
                      key={obj}
                      type="button"
                      onClick={() => handleChange('objective', obj)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        mission.objective === obj
                          ? 'border-cyan-400/80 bg-cyan-400/10 text-cyan-100'
                          : 'border-white/10 text-white/60 hover:border-white/25'
                      }`}
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              </label>

              <label className="mb-8 block">
                <span className="text-xs uppercase tracking-[0.4em] text-white/40">Intel Package</span>
                <textarea
                  value={mission.intel}
                  onChange={e => handleChange('intel', e.target.value)}
                  placeholder="Summarize objectives, constraints, and any sensitive intel. Include contact instructions."
                  rows={6}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80 focus:border-cyan-300 focus:outline-none"
                  required
                />
                <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-white/30">
                  Minimum 12 characters · encrypted in transit
                </p>
              </label>

              {errorMessage && (
                <div className="mb-5 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={!isReady || isSubmitting}
                className={`flex w-full items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-sm uppercase tracking-[0.5em] transition ${
                  !isReady || isSubmitting
                    ? 'border-white/10 text-white/30'
                    : 'border-cyan-400/60 text-cyan-200 hover:border-cyan-400 hover:text-white'
                }`}
                whileTap={{ scale: isReady && !isSubmitting ? 0.98 : 1 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    transmitting
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    transmit brief
                  </>
                )}
              </motion.button>

              <div className="mt-4 text-center text-xs uppercase tracking-[0.45em] text-white/40">
                {transmitStatus === 'success'
                  ? 'intel received • standby'
                  : transmitStatus === 'error'
                    ? 'transmission fault • retry'
                    : 'ready when you are'}
              </div>
            </motion.form>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {glitchBurst && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-40"
          >
            <div className="absolute inset-0 animate-[glitch_0.8s_steps(2)_infinite] bg-gradient-to-br from-cyan-500/40 via-transparent to-orange-400/40 mix-blend-screen" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0)_2px)] opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center text-center font-['Geist',_sans-serif] text-lg uppercase tracking-[0.6em] text-white">
              TRANSMIT_SUCCESS
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
