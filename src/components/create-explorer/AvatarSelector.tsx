/**
 * BHARATVERSE — AvatarSelector Component
 * RPG-styled character archetype selector showcasing the 5 cultural classes:
 * Explorer, Scholar, Warrior, Artist, and Seeker (Default).
 */

import { motion } from 'framer-motion'
import {
  Compass,
  BookOpen,
  Shield,
  Palette,
  Sparkles,
  Check,
  Award,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { AVATARS } from '../../data/explorerData.ts'
import type { Avatar, AvatarId } from '../../types/explorer.ts'

export interface AvatarSelectorProps {
  /** Currently selected avatar archetype ID */
  selectedAvatar?: AvatarId | string;
  selectedAvatarId?: AvatarId | string;
  /** Callback fired when an avatar archetype is selected */
  onSelectAvatar?: (avatarId: AvatarId) => void;
  onAvatarSelect?: (avatarId: AvatarId) => void;
  /** Navigation callbacks */
  onBack?: () => void;
  onContinue?: () => void;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Resolves the Lucide icon component corresponding to the avatar's icon string.
 */
function renderAvatarIcon(iconName: string, className: string) {
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

export function AvatarSelector({
  selectedAvatar,
  selectedAvatarId,
  onSelectAvatar,
  onAvatarSelect,
  onBack,
  onContinue,
  className = ''
}: AvatarSelectorProps) {
  // Resolve active avatar ID from either prop alias
  const activeId = selectedAvatar || selectedAvatarId || 'explorer'

  const handleSelect = (id: AvatarId) => {
    onSelectAvatar?.(id)
    onAvatarSelect?.(id)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-amber-400/90 font-bold">
              Archetype Alignment
            </span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
          <h3 className="bv-heading-section text-lg sm:text-xl font-bold text-amber-100">
            Choose Your Cultural Archetype
          </h3>
        </div>
        <div className="bv-badge-gold text-[10px] self-start sm:self-auto">
          5 Archetypes Available
        </div>
      </div>

      {/* Grid of 5 RPG Archetype Cards */}
      <div
        role="radiogroup"
        aria-label="Cultural Archetypes"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
      >
        {AVATARS.map((avatar: Avatar) => {
          const isSelected = avatar.id === activeId

          return (
            <motion.button
              key={avatar.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(avatar.id)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`relative flex flex-col justify-between text-left p-4 rounded-xl border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none overflow-hidden ${
                isSelected
                  ? 'bg-midnight-950/90 border-amber-400/80 shadow-[0_0_22px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/60'
                  : 'bg-midnight-950/70 border-amber-500/20 hover:border-amber-400/50 hover:bg-midnight-900/80'
              }`}
            >
              {/* Selected Ambient Aura Glow */}
              {isSelected && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-25 blur-xl transition-opacity duration-500"
                  style={{ backgroundColor: avatar.themeColor }}
                  aria-hidden="true"
                />
              )}

              {/* Ornate Corner Accent Brackets for Selected State */}
              {isSelected && (
                <>
                  <div
                    className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2"
                    style={{ borderColor: avatar.themeColor }}
                  />
                  <div
                    className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2"
                    style={{ borderColor: avatar.themeColor }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2"
                    style={{ borderColor: avatar.themeColor }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2"
                    style={{ borderColor: avatar.themeColor }}
                  />
                </>
              )}

              {/* Top Row: Icon Container + Selected Check Badge */}
              <div className="flex items-start justify-between mb-3 w-full relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 relative shadow-inner"
                  style={{
                    backgroundColor: `${avatar.themeColor}15`,
                    borderColor: isSelected ? avatar.themeColor : `${avatar.themeColor}40`,
                    boxShadow: isSelected ? `0 0 16px ${avatar.accentGlow}` : 'none'
                  }}
                >
                  {renderAvatarIcon(
                    avatar.icon,
                    'w-6 h-6 transition-colors duration-300'
                  )}
                  {/* Subtle spinning geometry ring on selected card */}
                  {isSelected && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                      className="absolute inset-0 rounded-xl border border-dashed opacity-40 pointer-events-none"
                      style={{ borderColor: avatar.themeColor }}
                    />
                  )}
                </div>

                {isSelected ? (
                  <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-400 text-midnight-950 font-mono shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Chosen
                  </span>
                ) : (
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">
                    {avatar.id}
                  </span>
                )}
              </div>

              {/* Body: Name, Title & Lore */}
              <div className="relative z-10 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span
                    className="text-[10px] uppercase font-serif tracking-widest font-semibold block"
                    style={{ color: avatar.themeColor }}
                  >
                    {avatar.title}
                  </span>
                  <h4 className="text-sm font-bold text-amber-100 font-serif leading-tight">
                    {avatar.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mt-1.5 line-clamp-3">
                    {avatar.shortDescription}
                  </p>
                </div>

                {/* Cultural Lore Snippet / Trait footer */}
                <div className="pt-2 mt-2 border-t border-amber-500/10 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1 truncate text-slate-400">
                    <Award className="w-3 h-3 shrink-0 text-amber-400/80" />
                    <span className="truncate">{avatar.loreSnippet}</span>
                  </span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Bottom RPG Navigation Controls */}
      {(onBack || onContinue) && (
        <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="bv-btn-secondary text-xs w-full sm:w-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Identity</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {onContinue && (
            <button
              type="button"
              onClick={onContinue}
              className="bv-btn-primary text-xs w-full sm:w-auto shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            >
              <span>Continue to Interests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default AvatarSelector
