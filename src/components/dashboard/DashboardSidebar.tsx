import {
  Home,
  Scroll,
  Compass,
  Gamepad2,
  Route,
  Archive,
  Trophy,
  Bot,
  Globe,
  Quote,
  Sparkles
} from 'lucide-react'
import type { LanguageCode } from '../../types/explorer.ts'

export type DashboardNavTab =
  | 'home'
  | 'quests'
  | 'explore-india'
  | 'games'
  | 'my-journey'
  | 'my-collection'
  | 'leaderboard'
  | 'ai-companion';

interface DashboardSidebarProps {
  activeTab: DashboardNavTab;
  onTabChange: (tab: DashboardNavTab) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
  currentLanguage,
  onLanguageChange,
  onCloseMobile
}: DashboardSidebarProps) {
  const navItems: { id: DashboardNavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'quests', label: 'Quests', icon: Scroll, badge: '3 New' },
    { id: 'explore-india', label: 'Explore India', icon: Compass },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'my-journey', label: 'My Journey', icon: Route },
    { id: 'my-collection', label: 'My Collection', icon: Archive, badge: '52' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'ai-companion', label: 'AI Companion', icon: Bot, badge: 'AI' }
  ]

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'en', label: 'English', native: 'English' }
  ]

  const handleSelect = (tab: DashboardNavTab) => {
    onTabChange(tab)
    if (onCloseMobile) onCloseMobile()
  }

  return (
    <aside className="w-60 xl:w-64 bg-midnight-950/95 border-r border-amber-500/20 flex flex-col justify-between py-5 px-3.5 select-none h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-2 pt-1 pb-3 border-b border-amber-500/15">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/40 shadow-gold-glow">
              <Compass className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="bv-gold-text text-base font-bold tracking-wider leading-tight">
                BharatVerse
              </h2>
              <span className="text-[8px] tracking-widest text-amber-400/70 uppercase font-mono block">
                PLAY • EXPLORE • BELONG
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)] font-bold'
                    : 'text-slate-400 hover:text-amber-200 hover:bg-midnight-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-amber-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {/* Active Indicator bar on left or badge */}
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-amber-400 text-midnight-950 shadow-sm'
                        : 'bg-midnight-900 text-amber-400/90 border border-amber-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Regional Language Selector Section */}
        <div className="pt-2 px-2 border-t border-amber-500/15">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 flex items-center gap-1.5 font-serif">
              <Globe className="w-3 h-3 text-amber-400" />
              Language
            </span>
            <span className="text-[10px] text-amber-300 font-mono uppercase bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              {currentLanguage.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  currentLanguage === lang.code
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-200 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-midnight-900/40'
                }`}
              >
                <span className="text-[11px]">{lang.label}</span>
                <span className="text-xs font-serif text-amber-400/90">{lang.native}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Inspiration Quote Card */}
      <div className="mt-6 p-3 rounded-xl bg-gradient-to-br from-midnight-900/90 to-midnight-950 border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -top-1 -right-1 text-amber-500/10 pointer-events-none">
          <Quote className="w-10 h-10" />
        </div>
        <p className="text-[11px] text-amber-100/90 font-serif italic leading-relaxed mb-1.5">
          "A Nation's Culture Lives Through Its People"
        </p>
        <span className="text-[9px] text-amber-400/80 font-mono block">
          — Dr. A.P.J. Abdul Kalam
        </span>
      </div>
    </aside>
  )
}
