import { useState } from 'react'
import {
  Compass,
  Search,
  Flame,
  Star,
  Shield,
  ChevronDown,
  Menu,
  X,
  Bell
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface DashboardHeaderProps {
  explorerName?: string;
  level?: number;
  xp?: number;
  streak?: number;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function DashboardHeader({
  explorerName = 'Nidhi',
  level = 12,
  xp = 4820,
  streak = 7,
  onMobileMenuToggle,
  isMobileMenuOpen = false
}: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-40 w-full bg-midnight-950/90 backdrop-blur-md border-b border-amber-500/20 px-3 sm:px-6 py-2.5">
      <div className="flex items-center justify-between gap-3 max-w-[1700px] mx-auto">
        {/* Left: Brand Identity / Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg bg-midnight-900 border border-amber-500/30 text-amber-300 hover:text-amber-200"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-amber-500/25 to-orange-500/15 border border-amber-500/40 shadow-gold-glow group-hover:border-amber-400 transition-colors">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-spin" style={{ animationDuration: '28s' }} />
              <div className="absolute inset-0 rounded-lg border border-amber-400/20 animate-pulse" />
            </div>
            <div>
              <span className="bv-gold-text text-base sm:text-lg font-bold tracking-wider block leading-none">
                BharatVerse
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest text-amber-400/80 uppercase font-mono hidden sm:block">
                PLAY • EXPLORE • BELONG
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-amber-400/60" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, games, stories..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-midnight-900/80 text-slate-200 placeholder-slate-400/70 rounded-full border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/40 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-amber-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Metrics & User Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Day Streak Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight-900/80 border border-orange-500/30 text-orange-400 text-xs font-semibold shadow-sm">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-500/30 animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs">{streak}</span>
            <span className="text-[10px] text-slate-400 hidden xl:inline">Day Streak</span>
          </div>

          {/* XP Points Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight-900/80 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span className="font-mono text-[11px] sm:text-xs">{xp.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 hidden xl:inline">XP Points</span>
          </div>

          {/* Level Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight-900/80 border border-amber-400/30 text-amber-200 text-xs font-semibold shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">Level {level}</span>
            <span className="text-[10px] text-amber-400/70 hidden 2xl:inline">Cultural Explorer</span>
          </div>

          {/* Notifications Bell */}
          <button
            type="button"
            className="p-1.5 rounded-full bg-midnight-900/80 border border-amber-500/25 text-amber-300/80 hover:text-amber-200 hover:border-amber-400/50 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
          </button>

          {/* User Profile Pill */}
          <Link
            to="/create-explorer"
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-midnight-900/90 border border-amber-500/35 hover:border-amber-400 text-left transition-all shadow-sm group"
            title="View or Edit Explorer"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-400/60 bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shrink-0">
              <span className="text-xs font-serif font-bold text-amber-100">
                {explorerName.charAt(0)}
              </span>
              <div className="absolute inset-0 bg-amber-400/10 group-hover:bg-transparent" />
            </div>
            <div className="hidden md:block leading-tight">
              <div className="text-[11px] font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                {explorerName}
              </div>
              <div className="text-[9px] text-amber-400/80 font-medium">
                Keep Exploring!
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400/70 group-hover:text-amber-300" />
          </Link>
        </div>
      </div>
    </header>
  )
}
