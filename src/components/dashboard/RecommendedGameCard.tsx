import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Landmark,
  Dice5,
  Eye,
  BookOpen,
  Compass,
  Box,
  Sparkles
} from 'lucide-react'

export interface CulturalGameFeature {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  themeColor: string;
  accentGradient: string;
  badge?: string;
  actionId?: string;
}

interface RecommendedGameCardProps {
  onSelectGame?: (gameId: string) => void;
}

export function RecommendedGameCard({ onSelectGame }: RecommendedGameCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const gameCards: CulturalGameFeature[] = [
    {
      id: 'historical-adventures',
      title: 'Historical Adventures',
      subtitle: 'Step into the past',
      icon: Landmark,
      themeColor: '#eab308',
      accentGradient: 'from-amber-600/30 via-orange-900/20 to-midnight-950',
      badge: 'STORY RPG',
      actionId: 'adventure'
    },
    {
      id: 'traditional-games',
      title: 'Traditional Games',
      subtitle: 'Play. Learn. Preserve',
      icon: Dice5,
      themeColor: '#f97316',
      accentGradient: 'from-orange-600/30 via-amber-900/20 to-midnight-950',
      badge: 'CHOWKA BARA',
      actionId: 'games'
    },
    {
      id: 'guess-the-heritage',
      title: 'Guess the Heritage',
      subtitle: 'Identify & Discover',
      icon: Eye,
      themeColor: '#10b981',
      accentGradient: 'from-emerald-600/30 via-teal-900/20 to-midnight-950',
      badge: 'POPULAR QUIZ',
      actionId: 'guess-heritage'
    },
    {
      id: 'ai-story-world',
      title: 'AI Story World',
      subtitle: 'Your choices, new stories',
      icon: BookOpen,
      themeColor: '#a855f7',
      accentGradient: 'from-purple-600/30 via-indigo-900/20 to-midnight-950',
      badge: 'GEN AI TALES',
      actionId: 'ai-story'
    },
    {
      id: 'cultural-quests',
      title: 'Cultural Quests',
      subtitle: 'Complete challenges',
      icon: Compass,
      themeColor: '#38bdf8',
      accentGradient: 'from-cyan-600/30 via-blue-900/20 to-midnight-950',
      badge: 'DAILY QUEST',
      actionId: 'quests'
    },
    {
      id: 'explore-3d-india',
      title: 'Explore 3D India',
      subtitle: 'Walk through history',
      icon: Box,
      themeColor: '#f43f5e',
      accentGradient: 'from-rose-600/30 via-red-900/20 to-midnight-950',
      badge: 'VIRTUAL TOURS',
      actionId: '3d-india'
    }
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full pt-1">
      {/* Header controls for carousel */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-amber-300">
            Cultural Playgrounds & Experiences
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-midnight-900 border border-amber-500/20 text-slate-400 hover:text-amber-300 hover:border-amber-400/50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-midnight-900 border border-amber-500/20 text-slate-400 hover:text-amber-300 hover:border-amber-400/50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent select-none snap-x"
        style={{ scrollbarWidth: 'thin' }}
      >
        {gameCards.map((card) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGame?.(card.actionId || card.id)}
              className={`min-w-[190px] sm:min-w-[210px] md:min-w-[220px] flex-1 snap-start rounded-xl p-3.5 bg-gradient-to-b ${card.accentGradient} border border-amber-500/25 hover:border-amber-400/70 cursor-pointer transition-all shadow-md group relative overflow-hidden flex flex-col justify-between`}
            >
              {/* Corner decorative light */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: card.themeColor }}
              />

              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="p-2 rounded-lg border shadow-sm"
                    style={{
                      borderColor: `${card.themeColor}50`,
                      backgroundColor: `${card.themeColor}15`
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: card.themeColor }} />
                  </div>

                  {card.badge && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold bg-midnight-950/80 text-amber-300 border border-amber-500/30">
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-tight mb-1">
                  {card.title}
                </h4>
                <p className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                  {card.subtitle}
                </p>
              </div>

              {/* Bottom Action Hint */}
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-amber-400/80 font-medium">
                <span>Play Now</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
