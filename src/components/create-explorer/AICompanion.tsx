/**
 * BHARATVERSE — AICompanion Component
 * Mystical cultural AI guide combining an animated energy orb with
 * responsive glassmorphic dialogue panels and contextual mood states.
 */

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Bot, Flame, Compass, X } from 'lucide-react'


import { INTERESTS } from '../../data/explorerData.ts'
import type { InterestId } from '../../types/explorer.ts'

export type CompanionMood = 'guiding' | 'thinking' | 'celebrating'

export interface AICompanionProps {
  /** Contextual guidance dialogue string */
  message?: string;
  /** Section or context title (e.g. 'Cultural Oracle', 'Path Alignment') */
  title?: string;
  /** Speaker identifier */
  speakerName?: string;
  /** Explorer name for dynamic personalized greeting */
  explorerName?: string;
  /** Selected cultural interests for dynamic companion dialogue */
  selectedInterests?: (InterestId | string)[];
  /** Emotional/computational state of the AI guide */
  mood?: CompanionMood;
  /** Compact rendering mode for small viewports or dense layouts */
  compact?: boolean;
  /** Optional dismiss callback */
  onDismiss?: () => void;
  /** Optional CSS class overrides */
  className?: string;
}

export function AICompanion({
  message,
  title = 'Cultural Oracle',
  speakerName = 'Mitra AI',
  explorerName,
  selectedInterests,
  mood = 'guiding',
  compact = false,
  onDismiss,
  className = ''
}: AICompanionProps) {
  const resolveContextualMessage = () => {
    if (message) return message

    if (selectedInterests && selectedInterests.length > 0) {
      if (selectedInterests.length === 1) {
        const id = selectedInterests[0]
        if (id === 'history') {
          return 'Ancient kingdoms and forgotten cities have caught your attention. I sense many stories waiting beneath the stones of Bharat.'
        }
        if (id === 'traditional_games') {
          return 'Strategy and play have always carried the wisdom of civilizations. Let us rediscover the games that shaped ancient minds.'
        }
        if (id === 'art_culture') {
          return 'Temple iconography and sacred aesthetics illuminate forgotten dimensions of our heritage.'
        }
        if (id === 'mythology') {
          return 'Epic legends and moral allegories are woven into the sacred landscape of Bharat.'
        }
        if (id === 'music_dance') {
          return 'Sacred ragas and classical mudras awaken. Ancient rhythms will accompany your path.'
        }
        if (id === 'architecture') {
          return 'Monumental stone poetry and sacred geometry beckon. The builders of Bharat left puzzles for the vigilant.'
        }
        if (id === 'festivals') {
          return 'Living harvest celebrations and seasonal pageants bind our lands in joy.'
        }
        if (id === 'nature') {
          return 'Sacred peaks, wild sanctuaries, and river valleys hold the oldest memories of this continent.'
        }
      }

      // Multiple interests selected
      const matchingNames = INTERESTS.filter(i => selectedInterests.includes(i.id))
        .map(i => i.title.toLowerCase())
      
      const formattedList = matchingNames.slice(0, 3).join(', ')
      return `Your path is beginning to take shape. ${formattedList} now guide your cultural journey.`
    }

    if (explorerName) {
      return `Greetings, ${explorerName}. Your journey through Bharat begins here. Choose the path that reflects your spirit.`
    }

    return 'Welcome, Explorer. Your journey through Bharat begins here. Choose the path that reflects your spirit.'
  }

  const displayMessage = resolveContextualMessage()
  // Mood-based color configurations
  const moodConfig = {
    guiding: {
      accentColor: '#EAB308', // Warm Gold
      glowColor: 'rgba(234, 179, 8, 0.35)',
      badgeBg: 'rgba(234, 179, 8, 0.12)',
      badgeBorder: 'rgba(234, 179, 8, 0.35)',
      badgeText: 'text-amber-300',
      statusText: 'Guiding Path',
      icon: Sparkles
    },
    thinking: {
      accentColor: '#38BDF8', // Mystic Cyan
      glowColor: 'rgba(56, 189, 248, 0.35)',
      badgeBg: 'rgba(56, 189, 248, 0.12)',
      badgeBorder: 'rgba(56, 189, 248, 0.35)',
      badgeText: 'text-sky-300',
      statusText: 'Weaving Lore',
      icon: Compass
    },
    celebrating: {
      accentColor: '#F97316', // Auspicious Saffron
      glowColor: 'rgba(249, 115, 22, 0.35)',
      badgeBg: 'rgba(249, 115, 22, 0.12)',
      badgeBorder: 'rgba(249, 115, 22, 0.35)',
      badgeText: 'text-orange-300',
      statusText: 'Destiny Aligned',
      icon: Flame
    }
  }[mood]

  const MoodIcon = moodConfig.icon

  return (
    <div
      className={`bv-glass-panel relative flex items-start gap-3.5 p-4 md:p-5 border-amber-500/25 transition-all duration-300 ${className}`}
    >
      {/* 1. Floating Mystical Energy Core / Orb */}
      <div className="relative shrink-0 pt-0.5">
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: 'easeInOut'
          }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Pulsing Aura Ring */}
          <div
            className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-500 relative"
            style={{
              borderColor: moodConfig.accentColor,
              backgroundColor: 'rgba(8, 12, 20, 0.85)',
              boxShadow: `0 0 20px ${moodConfig.glowColor}`
            }}
          >
            {/* Spinning Concentric Sacred Geometry Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed opacity-40"
              style={{ borderColor: moodConfig.accentColor }}
            />

            {/* Inner Core Icon */}
            <MoodIcon
              className="w-5 h-5 transition-colors duration-300"
              style={{ color: moodConfig.accentColor }}
            />
          </div>

          {/* Active Radiant Beacon Indicator */}
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-midnight-950 flex items-center justify-center"
            style={{ backgroundColor: moodConfig.accentColor }}
          >
            <span
              className="w-full h-full rounded-full animate-ping opacity-75"
              style={{ backgroundColor: moodConfig.accentColor }}
            />
          </span>
        </motion.div>
      </div>

      {/* 2. Dialogue & Cultural Guidance Bubble */}
      <div className="flex-1 min-w-0">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="bv-gold-text text-xs font-bold font-serif tracking-wider">
              {speakerName}
            </span>
            <span className="text-[10px] text-slate-500">|</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold font-mono ${moodConfig.badgeText}`}
              style={{
                backgroundColor: moodConfig.badgeBg,
                borderColor: moodConfig.badgeBorder
              }}
            >
              {moodConfig.statusText}
            </span>

            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="text-slate-500 hover:text-amber-300 transition-colors p-0.5 rounded"
                aria-label="Dismiss companion guidance"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Message Content with Smooth Reveal */}
        <AnimatePresence mode="wait">
          <motion.p
            key={displayMessage}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.25 }}
            className={`text-slate-200 font-light leading-relaxed ${
              compact ? 'text-xs' : 'text-xs md:text-sm'
            }`}
          >
            "{displayMessage}"
          </motion.p>
        </AnimatePresence>

        {/* Footer Cultural Prompt */}
        <div className="mt-2.5 pt-2 border-t border-amber-500/10 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1 text-amber-400/70 font-mono">
            <Bot className="w-3 h-3" />
            AI Vedic Guide Active
          </span>
          <span className="text-[9px] text-slate-500 italic hidden sm:inline">
            Adapts dynamically to player traits
          </span>
        </div>
      </div>
    </div>
  )
}

export default AICompanion
