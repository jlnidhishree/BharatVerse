/**
 * BHARATVERSE — PlayerInfoForm Component
 * RPG-styled identity crucible collecting the explorer's name, age group tier,
 * and preferred cultural language.
 */

import { motion } from 'framer-motion'
import {
  User,
  Compass,
  Check,
  Languages as LanguagesIcon,
  Scroll,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { AGE_GROUPS, LANGUAGES } from '../../data/explorerData.ts'
import type { AgeGroupId, LanguageCode } from '../../types/explorer.ts'
import { LanguageSelector } from './LanguageSelector.tsx'

export interface PlayerInfoFormProps {
  /** Current explorer name */
  name: string;
  /** Current age group identifier */
  ageGroup: AgeGroupId | string;
  /** Current language code */
  language: LanguageCode | string;

  /** Callbacks for field changes */
  onNameChange: (name: string) => void;
  onAgeGroupChange: (ageGroup: AgeGroupId) => void;
  onLanguageChange: (language: LanguageCode) => void;

  /** Optional navigation continue callback */
  onContinue?: () => void;

  /** Optional custom CSS classes */
  className?: string;
}

export function PlayerInfoForm({
  name,
  ageGroup,
  language,
  onNameChange,
  onAgeGroupChange,
  onLanguageChange,
  onContinue,
  className = ''
}: PlayerInfoFormProps) {
  // Resolve current active language object for rich metadata display
  const currentLangObj =
    LANGUAGES.find(l => l.code === language) || LANGUAGES[0]

  return (
    <div className={`bv-glass-panel p-5 md:p-7 space-y-7 relative overflow-hidden ${className}`}>
      {/* Background Subtle Heritage Watermark */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      {/* 1. Header Banner */}
      <div className="border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-amber-400 text-xs">✦</span>
          <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-amber-400/90 font-bold">
            Identity Inscription
          </span>
          <span className="text-amber-400 text-xs">✦</span>
        </div>
        <h3 className="bv-heading-section text-xl md:text-2xl font-bold text-amber-100">
          Genesis of the Explorer
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">
          Inscribe your name, tune your age chronicle, and choose the sacred language of your quest.
        </p>
      </div>

      {/* 2. Field 1: Explorer Name */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="explorer-name-input"
            className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300 uppercase tracking-wider"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span>Explorer Name</span>
          </label>
          <span className="text-[10px] text-slate-500 font-mono">
            {name.trim().length} / 28 Characters
          </span>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400/70 group-focus-within:text-amber-300 transition-colors">
            <Scroll className="w-4 h-4" />
          </div>

          <input
            id="explorer-name-input"
            type="text"
            value={name}
            maxLength={28}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter the name your legend will remember..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-midnight-950/80 border border-amber-500/30 text-amber-100 placeholder:text-slate-500 text-sm font-medium transition-all duration-200 outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] focus:bg-midnight-950"
          />

          {/* Golden accent corner notch */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-400/50 pointer-events-none" />
        </div>

        <p className="text-[11px] text-slate-400/90 font-light italic flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400/70 shrink-0" />
          <span>Your name will be inscribed upon ancient temple tablets and oral chronicles.</span>
        </p>
      </div>

      {/* 3. Field 2: Age Group Tier */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Age of the Journey</span>
          </div>
          <span className="text-[10px] text-amber-400/80 uppercase font-mono tracking-widest">
            Narrative Tier
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label="Age Group Tiers"
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {AGE_GROUPS.map((ag) => {
            const isSelected = ag.id === ageGroup

            return (
              <motion.button
                key={ag.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onAgeGroupChange(ag.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.2)]'
                    : 'bg-midnight-950/70 border-amber-500/20 hover:border-amber-400/40 hover:bg-midnight-900/80'
                }`}
              >
                {/* Header: Range and Experience Level */}
                <div className="flex items-start justify-between gap-2 mb-2 w-full">
                  <div>
                    <span className="bv-gold-text text-base font-bold font-serif leading-none block">
                      {ag.label}
                    </span>
                    <span className="text-[10px] text-amber-400/80 font-mono tracking-wider block mt-0.5">
                      {ag.experienceLevel}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-midnight-950 flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-300/90 font-light leading-relaxed">
                  {ag.description}
                </p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* 4. Field 3: Language Selection */}
      <div className="space-y-3 pt-2 border-t border-amber-500/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300 uppercase tracking-wider">
            <LanguagesIcon className="w-4 h-4 text-amber-400" />
            <span>Language of Your Story</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            Voice of Bharat
          </span>
        </div>

        <div className="p-4 rounded-xl bg-midnight-950/80 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-200">
                {currentLangObj.name}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {currentLangObj.nativeLabel}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Quests, folklore riddles, and AI guide prophecies will weave in this tongue.
            </p>
          </div>

          {/* Reusable LanguageSelector Component Integration */}
          <div className="shrink-0">
            <LanguageSelector
              value={language}
              onChange={(code) => onLanguageChange(code)}
            />
          </div>
        </div>
      </div>

      {/* 5. Bottom Navigation Action */}
      {onContinue && (
        <div className="pt-3 border-t border-amber-500/20 flex justify-end">
          <button
            type="button"
            onClick={onContinue}
            className="bv-btn-primary text-xs w-full sm:w-auto shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          >
            <span>Continue to Archetype</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default PlayerInfoForm
