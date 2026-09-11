import { Sparkles, Clock, BookOpen, Star, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface CulturalQuestCardProps {
  onContinueQuest?: () => void;
}

export function CulturalQuestCard({ onContinueQuest }: CulturalQuestCardProps) {
  return (
    <div className="bv-glass-panel p-4 rounded-2xl border-amber-500/30 relative overflow-hidden group">
      {/* Top Header & AI Badge */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="bv-heading-section text-sm font-bold text-amber-100 flex items-center gap-1.5 font-serif">
          <span>Today's Quest</span>
        </h3>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-medium font-mono">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>Recommended by AI</span>
        </div>
      </div>

      {/* Quest Visual Card / Banner */}
      <div className="relative rounded-xl overflow-hidden mb-3 border border-amber-500/25 aspect-[16/9] bg-gradient-to-br from-amber-900/40 via-midnight-950 to-midnight-900 flex flex-col justify-end p-3">
        {/* Stylized Illustrated Temple Ruins Background Graphic */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/30 via-transparent to-transparent pointer-events-none" />

        {/* Stone Chariot Vector Silhouette Graphic */}
        <svg
          viewBox="0 0 400 200"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Temple towers and chariot wheels */}
          <circle cx="120" cy="150" r="30" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <circle cx="280" cy="150" r="30" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <path d="M 90,140 L 310,140 L 290,90 L 110,90 Z" fill="#b45309" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
          <polygon points="200,30 160,90 240,90" fill="#d97706" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M 50,180 L 350,180" stroke="#f59e0b" strokeWidth="3" />
        </svg>

        {/* Ambient warm glow */}
        <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-orange-500/20 blur-xl pointer-events-none" />

        {/* Location tag */}
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-amber-300/90 font-bold font-serif drop-shadow">
            Hampi • Karnataka
          </span>
        </div>
      </div>

      {/* Quest Title & Description */}
      <div className="mb-3">
        <h4 className="text-sm sm:text-base font-bold text-amber-100 font-serif leading-tight group-hover:text-amber-300 transition-colors">
          The Merchant's Choice — Hampi
        </h4>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
          Make decisions. Shape history. Learn the legacy.
        </p>
      </div>

      {/* Metadata Chips & Action Button */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-amber-500/15">
        <div className="flex items-center gap-2 text-[10px] text-slate-300">
          <span className="flex items-center gap-1 font-mono text-slate-400">
            <Clock className="w-3 h-3 text-amber-400" />
            12 min
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 font-mono text-amber-300">
            <BookOpen className="w-3 h-3 text-amber-400" />
            Story
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 font-mono text-orange-400 font-bold">
            <Star className="w-3 h-3 text-orange-400 fill-orange-400/40" />
            +250 XP
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={onContinueQuest}
          className="bv-btn-primary px-3 py-1.5 text-[11px] rounded-lg shadow-sm"
        >
          <span>Continue</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  )
}
