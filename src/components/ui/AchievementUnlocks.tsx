import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Target, Rocket, Shield, Star, Users } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
  metric?: string;
}

const achievements: Achievement[] = [
  {
    id: '400-automations',
    title: 'Automation Master',
    description: 'Built 400+ CRM automations',
    icon: <Zap size={24} />,
    unlocked: true,
    metric: '400+',
  },
  {
    id: '30k-users',
    title: 'Scale Champion',
    description: 'Served 30,000+ users',
    icon: <Users size={24} />,
    unlocked: true,
    metric: '30k+',
  },
  {
    id: '15-years',
    title: 'Veteran Strategist',
    description: '15+ years of experience',
    icon: <Trophy size={24} />,
    unlocked: true,
    metric: '15+',
  },
  {
    id: '70-reduction',
    title: 'Efficiency Expert',
    description: 'Reduced support tickets 70%',
    icon: <Target size={24} />,
    unlocked: true,
    metric: '70%',
  },
  {
    id: '40-conversion',
    title: 'Conversion Wizard',
    description: 'Increased conversions 40%',
    icon: <Rocket size={24} />,
    unlocked: true,
    metric: '40%',
  },
  {
    id: '99-uptime',
    title: 'Reliability Guardian',
    description: '99.9% system uptime',
    icon: <Shield size={24} />,
    unlocked: true,
    metric: '99.9%',
  },
];

const AchievementUnlocks: React.FC = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulate unlocking achievements with delay
    achievements.forEach((achievement, index) => {
      if (achievement.unlocked) {
        setTimeout(() => {
          setUnlockedAchievements((prev) => [...prev, achievement]);
          if (index === achievements.length - 1) {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }
        }, index * 300);
      }
    });
  }, []);

  return (
    <div className="achievement-unlocks relative">
      <h3 className="text-2xl font-bold text-brand-text mb-6 text-center">Achievement Unlocks</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.some((a) => a.id === achievement.id);
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={
                isUnlocked
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0.3, scale: 0.8, rotate: 0 }
              }
              transition={{ duration: 0.5, type: 'spring' }}
              className={`relative p-6 rounded-xl border-2 ${
                isUnlocked
                  ? 'border-brand-teal bg-brand-teal/10'
                  : 'border-brand-muted/20 bg-brand-surface/20'
              }`}
            >
              {isUnlocked && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.3 }}
                >
                  <Star size={14} className="text-brand-dark" />
                </motion.div>
              )}
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className={`mb-3 ${isUnlocked ? 'text-brand-teal' : 'text-brand-muted'}`}
                  animate={isUnlocked ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {achievement.icon}
                </motion.div>
                <h4 className="font-bold text-brand-text mb-1">{achievement.title}</h4>
                <p className="text-sm text-brand-muted mb-2">{achievement.description}</p>
                {achievement.metric && isUnlocked && (
                  <motion.div
                    className="text-2xl font-bold text-brand-orange"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                  >
                    {achievement.metric}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Unlock Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 z-50 bg-brand-teal text-brand-dark px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
          >
            <Trophy size={24} />
            <div>
              <div className="font-bold">All Achievements Unlocked!</div>
              <div className="text-sm opacity-90">You're a Marketing Unicorn 🦄</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementUnlocks;

