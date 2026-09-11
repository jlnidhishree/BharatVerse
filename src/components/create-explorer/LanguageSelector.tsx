/**
 * BHARATVERSE — LanguageSelector Component
 * Compact, game-styled language selector for top navigation and onboarding.
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, ChevronDown, Check } from 'lucide-react'
import { LANGUAGES, DEFAULT_LANGUAGE } from '../../data/explorerData.ts'
import type { LanguageCode, LanguageOption } from '../../types/explorer.ts'

export interface LanguageSelectorProps {
  /** Currently selected language code (supports value or currentLanguage) */
  value?: LanguageCode | string;
  currentLanguage?: LanguageCode | string;
  /** Callback fired when a new language is selected (supports code or full LanguageOption) */
  onChange?: (languageCode: LanguageCode, language: LanguageOption) => void;
  onLanguageChange?: (language: LanguageOption) => void;
  /** Whether the component should render in a minimal compact mode */
  compact?: boolean;
  /** Optional custom CSS classes */
  className?: string;
}

export function LanguageSelector({
  value,
  currentLanguage,
  onChange,
  onLanguageChange,
  compact = false,
  className = ''
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Resolve active language code from value or currentLanguage prop
  const activeCode = value || currentLanguage || DEFAULT_LANGUAGE.code

  // Resolve current active language object
  const activeLanguage =
    LANGUAGES.find(l => l.code === activeCode) || DEFAULT_LANGUAGE


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = (lang: LanguageOption) => {
    onLanguageChange?.(lang)
    onChange?.(lang.code, lang)
    setIsOpen(false)
  }


  return (
    <div ref={containerRef} className={`relative inline-block text-left z-30 ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`group relative flex items-center gap-2 rounded-lg transition-all duration-200 ${
          compact
            ? 'px-2.5 py-1.5 text-xs'
            : 'px-3.5 py-2 text-xs font-medium'
        } bg-midnight-950/80 hover:bg-midnight-900 border ${
          isOpen
            ? 'border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.25)] text-amber-200'
            : 'border-amber-500/25 hover:border-amber-400/50 text-slate-200'
        } backdrop-blur-md`}
      >
        {/* Ambient subtle glow ring on hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <Languages className="w-3.5 h-3.5 text-amber-400 shrink-0" />

        <span className="font-semibold tracking-wide">
          {compact ? activeLanguage.nativeLabel : activeLanguage.name}
        </span>

        {!compact && (
          <span className="text-[10px] text-amber-400/75 uppercase tracking-widest hidden sm:inline">
            ({activeLanguage.nativeLabel})
          </span>
        )}

        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-amber-400' : 'group-hover:text-slate-200'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className="absolute right-0 mt-2 w-52 rounded-xl p-1.5 bg-midnight-950/95 backdrop-blur-xl border border-amber-500/30 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.15)] focus:outline-none"
          >
            {/* Header / Guide Title */}
            <div className="px-3 py-2 border-b border-amber-500/15 mb-1">
              <span className="text-[10px] uppercase font-serif tracking-widest text-amber-400/80 font-bold block">
                Select Language
              </span>
              <span className="text-[9px] text-slate-400">
                Choose your cultural medium
              </span>
            </div>

            {/* Language Options List */}
            <div className="space-y-1">
              {LANGUAGES.map(lang => {
                const isSelected = lang.code === activeLanguage.code
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(lang)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-[inset_0_1px_0_rgba(254,240,138,0.2)] font-semibold'
                        : 'text-slate-300 hover:bg-midnight-900/90 hover:text-amber-100 border border-transparent'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="leading-tight">{lang.name}</span>
                      <span className="text-[10px] text-amber-400/70 font-medium">
                        {lang.nativeLabel}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Subtle ornamental footer indicator */}
            <div className="pt-2 mt-1.5 border-t border-amber-500/15 text-center">
              <span className="text-[9px] text-slate-500 tracking-wider">
                ◆ BHARATVERSE MULTILINGUAL ◆
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector
