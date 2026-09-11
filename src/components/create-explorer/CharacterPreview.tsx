/**
 * BHARATVERSE — CharacterPreview Component
 * Cinematic central character focus area featuring concentric heritage rings,
 * layered ambient aura, archetype heraldry, and dynamic player lore.
 */

import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  BookOpen,
  Shield,
  Palette,
  Sparkles,
  Award,
  Sparkle,
  Landmark,
  Dice5,
  Music,
  Castle,
  Mountain
} from 'lucide-react'
import { AVATARS, INTERESTS } from '../../data/explorerData.ts'
import type { Avatar, InterestId } from '../../types/explorer.ts'

export interface CharacterPreviewProps {
  /** Selected avatar object OR avatar category id string */
  avatar?: Avatar | string;
  /** Avatar identifier to look up in AVATARS registry (alias) */
  avatarId?: string;
  /** Player's entered explorer name (supports explorerName or playerName) */
  explorerName?: string;
  playerName?: string;
  /** Starting region identifier or display name */
  startingRegion?: string;
  /** Selected cultural interests for affinity badge tokens */
  interests?: (InterestId | string)[];
  selectedInterests?: (InterestId | string)[];
  /** Optional custom CSS classes */
  className?: string;
}

function resolveAvatarIcon(iconName: string, className: string) {
  switch (iconName) {
    case 'Compass':
      return <Compass className={className} />
    case 'BookOpen':
      return <BookOpen className={className} />
    case 'Shield':
      return <Shield className={className} />
    case 'Palette':
      return <Palette className={className} />
    case 'Sparkles':
    default:
      return <Sparkles className={className} />
  }
}

function resolveInterestIcon(iconName: string, className: string) {
  switch (iconName) {
    case 'Landmark':
      return <Landmark className={className} />
    case 'Dice5':
      return <Dice5 className={className} />
    case 'Palette':
      return <Palette className={className} />
    case 'BookOpen':
      return <BookOpen className={className} />
    case 'Music':
      return <Music className={className} />
    case 'Castle':
      return <Castle className={className} />
    case 'Sparkles':
      return <Sparkles className={className} />
    case 'Mountain':
      return <Mountain className={className} />
    default:
      return <Compass className={className} />
  }
}

export function CharacterPreview({
  avatar,
  avatarId,
  explorerName,
  playerName,
  startingRegion = 'Karnataka',
  interests,
  selectedInterests,
  className = ''
}: CharacterPreviewProps) {
  // Resolve active avatar from prop (object or string id) or fallback to default
  const activeAvatar: Avatar = (() => {
    if (avatar && typeof avatar === 'object') return avatar
    const idToFind = (typeof avatar === 'string' ? avatar : avatarId) || 'explorer'
    return AVATARS.find(a => a.id === idToFind) || AVATARS[0]
  })()

  const rawName = explorerName || playerName || ''
  const displayName = rawName.trim() || 'Explorer of Bharat'

  // Resolve active selected interests for affinity badges
  const activeInterestIds = interests || selectedInterests || []
  const activeInterestObjs = INTERESTS.filter(item => activeInterestIds.includes(item.id))


  return (
    <div
      className={`bv-glass-panel-elevated p-6 md:p-8 relative flex flex-col items-center justify-between overflow-hidden text-center min-h-[460px] md:min-h-[520px] ${className}`}
    >
      {/* Background Ambient Radial Auras matching avatar theme */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-40 transition-all duration-700"
        style={{ backgroundColor: activeAvatar.themeColor }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-amber-500/10 blur-2xl rounded-full"
        aria-hidden="true"
      />

      {/* Top Heritage Crest & Category Badge */}
      <div className="relative z-10 flex flex-col items-center space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-amber-400/80 text-xs">✦</span>
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-300/90 font-bold">
            ARCHETYPE REVELATION
          </span>
          <span className="text-amber-400/80 text-xs">✦</span>
        </div>
        <div className="bv-badge-gold text-[10px] tracking-wider uppercase">
          {activeAvatar.title}
        </div>
      </div>

      {/* Central Character Silhouette & Heritage Astrolabe Rings */}
      <div className="relative z-10 my-6 flex items-center justify-center">
        {/* Outer Rotating Heritage Astrolabe Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
          className="absolute w-56 h-56 md:w-68 md:h-68 rounded-full border border-dashed border-amber-500/25 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FACC15]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FACC15]" />
        </motion.div>

        {/* Counter-rotating Inner Celestial Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-amber-400/20 pointer-events-none"
        >
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rotate-45 border border-amber-400/80" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45 border border-amber-400/80" />
        </motion.div>

        {/* Floating Core Avatar Crucible */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative flex items-center justify-center"
        >
          {/* Glowing Aura Ring */}
          <div
            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center p-1 transition-all duration-500"
            style={{
              background: `radial-gradient(circle, ${activeAvatar.accentGlow} 0%, rgba(8,12,20,0.85) 75%)`,
              boxShadow: `0 0 35px ${activeAvatar.accentGlow}`
            }}
          >
            {/* Inner Sacred Frame */}
            <div
              className="w-full h-full rounded-xl flex flex-col items-center justify-center bg-midnight-950/90 border relative overflow-hidden backdrop-blur-md"
              style={{ borderColor: activeAvatar.themeColor }}
            >
              {/* Corner Notches */}
              <div
                className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2"
                style={{ borderColor: activeAvatar.themeColor }}
              />
              <div
                className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2"
                style={{ borderColor: activeAvatar.themeColor }}
              />
              <div
                className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2"
                style={{ borderColor: activeAvatar.themeColor }}
              />
              <div
                className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2"
                style={{ borderColor: activeAvatar.themeColor }}
              />

              {/* Central Archetype Emblem with Fade Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAvatar.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="p-3.5 rounded-xl border mb-1 transition-transform duration-300 hover:scale-110"
                    style={{
                      backgroundColor: `${activeAvatar.themeColor}15`,
                      borderColor: `${activeAvatar.themeColor}60`
                    }}
                  >
                    {resolveAvatarIcon(
                      activeAvatar.icon,
                      'w-10 h-10 md:w-12 md:h-12 transition-colors duration-300'
                    )}
                  </div>

                  <span
                    className="text-[10px] font-mono tracking-widest uppercase font-bold"
                    style={{ color: activeAvatar.themeColor }}
                  >
                    {activeAvatar.id}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Character Identity & Lore Foundation */}
      <div className="relative z-10 w-full max-w-sm space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAvatar.id + displayName}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="bv-gold-text text-xl md:text-2xl font-bold font-serif tracking-wide truncate">
              {displayName}
            </h3>
            <span className="text-xs text-amber-300/80 font-medium block">
              {activeAvatar.name} • {activeAvatar.title}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Lore Snippet with smooth transition */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeAvatar.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-slate-300/90 font-light leading-relaxed px-2"
          >
            {activeAvatar.shortDescription}
          </motion.p>
        </AnimatePresence>

        {/* Cultural Affinities Representation */}
        <div className="pt-2.5 pb-1 border-t border-amber-500/15 w-full">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="text-[9px] uppercase font-serif tracking-[0.2em] text-amber-400/80 font-bold">
              Cultural Affinities
            </span>
          </div>

          {activeInterestObjs.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xs mx-auto">
              {activeInterestObjs.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all"
                  style={{
                    backgroundColor: `${item.themeColor || '#F59E0B'}15`,
                    borderColor: `${item.themeColor || '#F59E0B'}40`,
                    color: item.themeColor || '#FDE047'
                  }}
                >
                  {resolveInterestIcon(item.icon, 'w-3 h-3 shrink-0')}
                  <span className="truncate max-w-[95px]">{item.title}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-slate-500 italic">
              Your cultural path is waiting to be discovered.
            </p>
          )}
        </div>

        {/* Regional & Heritage Footer Pill */}
        <div className="pt-2.5 border-t border-amber-500/20 flex items-center justify-around text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <Compass className="w-3 h-3 text-amber-400" />
            Origin: <strong className="text-slate-200 capitalize">{startingRegion}</strong>
          </span>
          <span className="text-amber-500/40">|</span>
          <span className="flex items-center gap-1">
            <Award className="w-3 h-3 text-orange-400" />
            Rank: <strong className="text-slate-200">Novice Explorer</strong>
          </span>
        </div>
      </div>

      {/* Decorative Ornate Corner Filigree */}
      <div className="absolute top-2 left-2 pointer-events-none opacity-40">
        <Sparkle className="w-3 h-3 text-amber-400" />
      </div>
      <div className="absolute top-2 right-2 pointer-events-none opacity-40">
        <Sparkle className="w-3 h-3 text-amber-400" />
      </div>
    </div>
  )
}

export default CharacterPreview
