import { ChevronRight, Landmark, Dice5, Award, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

interface Achievement {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  borderColor: string;
  level: string;
  desc: string;
}

interface AchievementCardProps {
  onViewAll?: () => void;
}

export function AchievementCard({ onViewAll }: AchievementCardProps) {
  const achievements: Achievement[] = [
    {
      id: 'heritage-explorer',
      title: 'Heritage Explorer',
      icon: Landmark,
      color: '#f59e0b',
      bgGradient: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/40',
      level: 'Tier III',
      desc: 'Discovered 50+ ancient monuments across Bharat'
    },
    {
      id: 'game-seeker',
      title: 'Game Seeker',
      icon: Dice5,
      color: '#10b981',
      bgGradient: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/40',
      level: 'Tier II',
      desc: 'Mastered Chowka Bara and Pallanguzhi strategies'
    },
    {
      id: 'south-scholar',
      title: 'South India Scholar',
      icon: Award,
      color: '#38bdf8',
      bgGradient: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/40',
      level: 'Mastered',
      desc: 'Completed all Karnataka & Tamil Nadu quests'
    },
    {
      id: 'bharat-master',
      title: 'Bharat Master',
      icon: Crown,
      color: '#c084fc',
      bgGradient: 'from-purple-500/20 to-pink-500/10',
      borderColor: 'border-purple-500/40',
      level: 'Elite',
      desc: 'Ranked in the top 10% of cultural explorers'
    }
  ]

  return (
    <div className="bv-glass-panel p-4 rounded-2xl border-amber-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="bv-heading-section text-sm font-bold text-amber-100 font-serif">
          Achievements
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[10px] text-amber-400/90 hover:text-amber-200 flex items-center gap-0.5 font-medium transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* 4 Circular Heraldic Shield Badges */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {achievements.map((item) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2, scale: 1.05 }}
              className="flex flex-col items-center group cursor-pointer"
              title={`${item.title} (${item.level}): ${item.desc}`}
            >
              {/* Heraldic Circular Shield */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 border ${item.borderColor} bg-gradient-to-b ${item.bgGradient} flex items-center justify-center shadow-md group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all relative`}
              >
                <div className="w-full h-full rounded-full bg-midnight-950/80 flex items-center justify-center">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" style={{ color: item.color }} />
                </div>
                {/* Crown notch or star */}
                <div className="absolute -top-1 w-2 h-2 rounded-full bg-amber-400/80 border border-midnight-950" />
              </div>

              {/* Title */}
              <span className="text-[9px] font-bold text-slate-300 group-hover:text-amber-200 transition-colors mt-1.5 leading-tight line-clamp-2">
                {item.title}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
