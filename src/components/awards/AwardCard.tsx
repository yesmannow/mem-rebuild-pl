import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Calendar } from 'lucide-react';
import { motionVariants } from '../../utils/narrativeMotion';

interface Award {
  id: string;
  title: string;
  organization: string;
  issuer: string;
  date: string;
  year: string;
  description: string;
  significance: string;
  image: string;
  category: string;
  colorTheme: string[];
  glowColor: string;
}

interface AwardCardProps {
  award: Award;
  index?: number;
}

const AwardCard: React.FC<AwardCardProps> = ({ award, index = 0 }) => {
  return (
    <motion.div
      className="relative group"
      variants={motionVariants.awardCard}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      {/* Glow Effect Background */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${award.glowColor}40, transparent 70%)`,
        }}
      />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
        {/* Award Badge */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <Award className="w-6 h-6 text-black" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Award Image/Icon */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 mx-auto lg:mx-0">
              {award.image ? (
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-contain rounded-xl"
                  onError={e => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}

              {/* Fallback Icon */}
              <div
                className={`${award.image ? 'hidden' : 'flex'} w-full h-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl items-center justify-center border border-yellow-400/30`}
              >
                <Star className="w-16 h-16 text-yellow-400" />
              </div>

              {/* Glow Ring */}
              <div
                className="absolute inset-0 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `0 0 30px ${award.glowColor}60`,
                }}
              />
            </div>
          </div>

          {/* Award Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Category Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-xs text-yellow-300 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              <Star className="w-3 h-3" />
              {award.category}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.4 }}
            >
              {award.title}
            </motion.h3>

            {/* Organization */}
            <motion.p
              className="text-yellow-400 font-semibold mb-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              {award.organization}
            </motion.p>

            {/* Date */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.6 }}
            >
              <Calendar className="w-4 h-4" />
              {award.date}
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-gray-300 text-sm leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.7 }}
            >
              {award.description}
            </motion.p>

            {/* Significance */}
            <motion.div
              className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.8 }}
            >
              <p className="text-xs text-yellow-200 italic leading-relaxed">
                <strong className="text-yellow-400">Significance:</strong> {award.significance}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60" />
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-orange-400 rounded-full opacity-40" />
        <div className="absolute top-1/2 left-0 w-px h-8 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent" />
      </div>
    </motion.div>
  );
};

export default AwardCard;
