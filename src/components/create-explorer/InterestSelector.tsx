/**
 * BHARATVERSE — InterestSelector Component
 * Step 3 of 5: Cultural Affinity
 * Premium RPG-styled multi-selection grid showcasing the 8 cultural worlds of Bharat:
 * History & Civilizations, Ancient Board Games, Sacred Arts, Folklore & Mythology,
 * Classical Music & Dance, Architecture & Temples, Traditions & Festivals, and Nature & Heritage.
 */

import { motion, AnimatePresence } from 'framer-motion'
import {
  Landmark,
  Dice5,
  Palette,
  BookOpen,
  Music,
  Castle,
  Sparkles,
  Mountain,
  Check,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkle
} from 'lucide-react'
import { INTERESTS } from '../../data/explorerData.ts'
import type { Interest, InterestId } from '../../types/explorer.ts'

export interface InterestSelectorProps {
  /** Array of currently selected interest IDs */
  selectedInterests: InterestId[] | string[];
  /** Callback fired when selected interests change */
  onInterestsChange: (interests: InterestId[]) => void;
  /** Optional callback when toggling an individual interest */
  onToggleInterest?: (interestId: InterestId) => void;
  /** Optional navigation callbacks */
  onBack?: () => void;
  onContinue?: () => void;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Resolves the appropriate Lucide icon component for an interest's icon identifier.
 */
function renderInterestIcon(iconName: string, className: string) {
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

export function InterestSelector({
  selectedInterests = [],
  onInterestsChange,
  onToggleInterest,
  onBack,
  onContinue,
  className = ''
}: InterestSelectorProps) {
  const selectedCount = selectedInterests.length
  const hasSelection = selectedCount > 0

  const handleToggle = (id: InterestId) => {
    onToggleInterest?.(id)
    const exists = selectedInterests.includes(id)
    const updated = exists
      ? (selectedInterests.filter((item) => item !== id) as InterestId[])
      : ([...selectedInterests, id] as InterestId[])
    onInterestsChange(updated)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Header Banner & Cultural Affinity Identity */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400/90 font-bold">
              Cultural Affinity
            </span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>

          <h3 className="bv-heading-section text-xl sm:text-2xl font-bold text-amber-100">
            Choose the Stories That Call to You
          </h3>

          <p className="text-xs text-slate-300 font-light leading-relaxed mt-1.5 max-w-2xl">
            Every explorer is drawn toward different paths of Bharat's living heritage.
            Choose the cultural worlds you wish to explore.
          </p>
        </div>

        {/* Status Badges: Total Count & Dynamic Selection Counter */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="bv-badge-gold text-[10px]">
            8 Cultural Interests
          </span>

          <span
            className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border transition-all duration-300 ${
              hasSelection
                ? 'bg-amber-500/20 text-amber-200 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'bg-midnight-950/80 text-slate-500 border-slate-800'
            }`}
          >
            {selectedCount} Selected
          </span>
        </div>
      </div>

      {/* 2. Grid of 8 Collectible RPG Knowledge Artifact Cards */}
      <div
        role="group"
        aria-label="Cultural Interests Multi-Selection"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {INTERESTS.map((interest: Interest) => {
          const isSelected = selectedInterests.includes(interest.id)
          const themeColor = interest.themeColor || '#F59E0B'
          const accentGlow = interest.accentGlow || 'rgba(245, 158, 11, 0.35)'

          return (
            <motion.button
              key={interest.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => handleToggle(interest.id)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`relative flex flex-col justify-between text-left p-4 rounded-xl border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none overflow-hidden min-h-[260px] ${
                isSelected
                  ? 'bg-midnight-950/90 border-amber-400/85 shadow-[0_0_25px_rgba(245,158,11,0.28)] ring-1 ring-amber-400/50'
                  : 'bg-midnight-950/70 border-amber-500/20 hover:border-amber-400/50 hover:bg-midnight-900/80 hover:shadow-[0_0_18px_rgba(245,158,11,0.12)]'
              }`}
            >
              {/* Selected Ambient Radial Aura Glow */}
              {isSelected && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 blur-xl transition-opacity duration-500"
                  style={{ backgroundColor: themeColor }}
                  aria-hidden="true"
                />
              )}

              {/* Ornate Corner Accent Filigree for Selected State */}
              {isSelected && (
                <>
                  <div
                    className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2"
                    style={{ borderColor: themeColor }}
                  />
                  <div
                    className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2"
                    style={{ borderColor: themeColor }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2"
                    style={{ borderColor: themeColor }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2"
                    style={{ borderColor: themeColor }}
                  />
                </>
              )}

              {/* TOP AREA: Icon Container + Category Label */}
              <div className="flex items-start justify-between mb-3 w-full relative z-10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 relative shadow-inner"
                  style={{
                    backgroundColor: `${themeColor}15`,
                    borderColor: isSelected ? themeColor : `${themeColor}40`,
                    boxShadow: isSelected ? `0 0 16px ${accentGlow}` : 'none'
                  }}
                >
                  {renderInterestIcon(
                    interest.icon,
                    `w-5 h-5 transition-colors duration-300 ${
                      isSelected ? 'text-amber-200' : 'text-slate-300'
                    }`
                  )}

                  {/* Subtle spinning sacred geometry dashed ring when selected */}
                  {isSelected && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
                      className="absolute inset-0 rounded-xl border border-dashed opacity-40 pointer-events-none"
                      style={{ borderColor: themeColor }}
                    />
                  )}
                </div>

                {/* Category Pill */}
                <span
                  className="text-[9px] uppercase font-serif tracking-widest font-semibold px-2 py-0.5 rounded-full border bg-midnight-950/80"
                  style={{
                    color: themeColor,
                    borderColor: `${themeColor}35`
                  }}
                >
                  {interest.category || 'Heritage Path'}
                </span>
              </div>

              {/* MAIN AREA: Title, Description & Keywords */}
              <div className="relative z-10 flex-1 flex flex-col justify-between space-y-2 mb-3">
                <div>
                  <h4 className="text-sm font-bold text-amber-100 font-serif leading-snug tracking-wide">
                    {interest.title}
                  </h4>

                  <p className="text-xs text-slate-300/90 font-light leading-relaxed mt-1.5 line-clamp-3">
                    {interest.shortDescription}
                  </p>
                </div>

                {/* Thematic Keywords Mini-Pills */}
                {interest.keywords && interest.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {interest.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-midnight-900/90 text-slate-400 border border-slate-800/80 font-mono"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* BOTTOM AREA: Trait Hint & Selection Indicator */}
              <div className="relative z-10 pt-2.5 border-t border-amber-500/15 flex items-center justify-between text-[10px] w-full">
                <span className="flex items-center gap-1 text-slate-400 truncate max-w-[130px]">
                  <Sparkle className="w-2.5 h-2.5 text-amber-400/80 shrink-0" />
                  <span className="truncate italic">
                    {interest.explorationHint || 'Unlock quests'}
                  </span>
                </span>

                {/* Selection Badge / Toggle State */}
                {isSelected ? (
                  <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-400 text-midnight-950 font-mono shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Selected
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 hover:text-amber-300 transition-colors font-mono">
                    + Select
                  </span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* 3. Bottom RPG Navigation Controls & Guiding Hint */}
      <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Navigation: Back to Archetype */}
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="bv-btn-secondary text-xs w-full sm:w-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Archetype</span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Center Guidance Hint when 0 selected */}
        <div className="text-center">
          <AnimatePresence>
            {!hasSelection && (
              <motion.p
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                className="text-xs text-amber-400/90 italic flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Choose at least one cultural path to guide your journey.</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Right Navigation: Continue to Region */}
        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            disabled={!hasSelection}
            className={`text-xs w-full sm:w-auto transition-all ${
              hasSelection
                ? 'bv-btn-primary shadow-[0_0_20px_rgba(245,158,11,0.45)]'
                : 'opacity-50 cursor-not-allowed bg-midnight-900 border border-slate-800 text-slate-500 px-6 py-2.5 rounded-lg'
            }`}
          >
            <span>Continue to Region</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default InterestSelector
