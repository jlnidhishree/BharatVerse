import { useState, useMemo } from 'react'
import {
  Compass,
  Sparkles,
  Shield,
  MapPin,
  Cpu,
  Flame,
  CheckCircle2,
  ChevronRight,
  Layers,
  Smartphone,
  Monitor,
  Tablet,
  Dice5,
  Languages as LanguagesIcon,
  Bot
} from 'lucide-react'


import {
  AVATARS,
  AGE_GROUPS,
  LANGUAGES,
  INTERESTS,
  STARTING_REGIONS
} from './data/explorerData.ts'
import { recommendJourney } from './services/journeyRecommendation.ts'
import type { RecommendationRequest } from './types/explorer.ts'

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-engine' | 'data-models' | 'responsive'>('overview')
  const [pulseCount, setPulseCount] = useState(0)

  // Interactive AI Engine test state
  const [testRegion, setTestRegion] = useState<string>('karnataka')
  const [testInterests, setTestInterests] = useState<string[]>(['history', 'traditional_games'])
  const [testAgeGroup, setTestAgeGroup] = useState<string>('13-16')
  const [testLanguage, setTestLanguage] = useState<string>('en')

  // Live computed recommendation from deterministic engine
  const liveRecommendation = useMemo(() => {
    const request: RecommendationRequest = {
      startingRegion: testRegion,
      interests: testInterests,
      ageGroup: testAgeGroup,
      language: testLanguage
    }
    return recommendJourney(request)
  }, [testRegion, testInterests, testAgeGroup, testLanguage])

  const toggleInterest = (id: string) => {
    setTestInterests(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="relative min-h-screen bv-bg-cosmic bv-bg-ambient-stars text-slate-100 flex flex-col justify-between overflow-hidden">
      {/* Ambient background light orbs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/15 via-orange-600/10 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 bg-emerald-900/20 blur-3xl rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-20 -right-20 w-96 h-96 bg-amber-600/15 blur-3xl rounded-full"
        aria-hidden="true"
      />

      {/* Header / Top Navigation Bar */}
      <header className="relative z-10 border-b border-amber-500/20 bg-midnight-950/70 backdrop-blur-md">
        <div className="bv-container-cinematic py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/40 shadow-gold-glow">
              <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
              <div className="absolute inset-0 rounded-lg border border-amber-400/30 animate-pulse" />
            </div>
            <div>
              <span className="bv-gold-text text-xl tracking-wider font-bold block leading-none">
                BHARATVERSE
              </span>
              <span className="text-[10px] tracking-widest text-amber-400/70 uppercase">
                AI Cultural Odyssey • SIH26208
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="bv-badge-saffron hidden sm:inline-flex">
              <Flame className="w-3 h-3 text-orange-400" />
              Data & AI Layer Active
            </span>
            <div className="bv-badge-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping mr-1" />
              Engine Online
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 bv-container-cinematic py-8 md:py-12 flex-1 flex flex-col justify-center">
        {/* Hero Title & Cultural Fantasy Badge */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            SIH 2026 Problem Statement SIH26208 (Toys & Games)
          </div>

          <h1 className="bv-heading-hero text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="bv-gold-text">BHARAT</span>
            <span className="bv-saffron-text">VERSE</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            An AI-powered cultural adventure gaming universe where ancient Indian heritage,
            epic folklore, and cinematic RPG exploration converge.
          </p>

          {/* Ornate Divider with Diamond Motif */}
          <div className="bv-divider-ornate max-w-md mx-auto my-5">
            <span className="text-amber-400/80 text-xs">◆</span>
            <span className="text-amber-400 text-sm">✦</span>
            <span className="text-amber-400/80 text-xs">◆</span>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-xl bg-midnight-900/80 border border-amber-500/20 max-w-fit mx-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-amber-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('ai-engine')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'ai-engine'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-amber-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              AI Recommendation Test
            </button>
            <button
              onClick={() => setActiveTab('data-models')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'data-models'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-amber-200'
              }`}
            >
              Data Models
            </button>
            <button
              onClick={() => setActiveTab('responsive')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'responsive'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-amber-200'
              }`}
            >
              Responsive Matrix
            </button>
          </div>
        </div>

        {/* Tab 1: System Overview & Test Card */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
            {/* System Status Panel */}
            <div className="bv-glass-panel bv-heritage-border p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif tracking-widest text-amber-400/80 uppercase">
                    Architecture Diagnostic
                  </span>
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="bv-heading-section text-xl font-bold text-amber-100 mb-2">
                  Data Layer Online
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  The data layer, avatar archetypes, regional metadata, and deterministic local recommendation service are fully active.
                </p>

                <div className="space-y-2">
                  {[
                    'ExplorerProfile Interface Standardized',
                    '5 Avatar Archetypes Defined',
                    '3 Age Group Difficulty Tiers (8-12, 13-16, 17+)',
                    '6 Multilingual Options (EN, HI, KN, TA, TE, ML)',
                    '8 Cultural Interests (History, Games, etc.)',
                    '5 Starting Regions + Extensible Registry',
                    'Deterministic AI Journey Engine Built',
                    'FastAPI Drop-in Adapter Ready'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-amber-500/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Core Status:</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Fully Operational
                </span>
              </div>
            </div>

            {/* Visual Experience Showcase */}
            <div className="bv-glass-panel-elevated p-6 flex flex-col justify-between md:scale-105 border-amber-500/40 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bv-badge-gold text-[10px] tracking-widest uppercase">
                  Personalization Engine
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="text-xs font-serif tracking-widest text-orange-400 uppercase">
                    Core Innovation
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                <h3 className="bv-heading-section text-xl font-bold text-amber-100 mb-2">
                  Dynamic Cultural Quest
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  "The player does not simply choose a game. The system learns who the player is and creates a personalized cultural journey."
                </p>

                {/* Interactive Action Tester */}
                <div className="p-4 rounded-xl bg-midnight-950/60 border border-amber-500/20 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Interaction Energy:</span>
                    <span className="bv-gold-text text-sm font-bold">{pulseCount} Pulses</span>
                  </div>
                  <button
                    onClick={() => {
                      setPulseCount(prev => prev + 1)
                      setActiveTab('ai-engine')
                    }}
                    className="w-full bv-btn-primary text-xs py-2.5"
                  >
                    <span>Launch Recommendation Test</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-amber-400/70 text-center italic">
                Ready for "CREATE YOUR EXPLORER" component phase
              </div>
            </div>

            {/* Architecture Card */}
            <div className="bv-glass-panel bv-heritage-border p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif tracking-widest text-amber-400/80 uppercase">
                    Code Structure
                  </span>
                  <Layers className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="bv-heading-section text-xl font-bold text-amber-100 mb-2">
                  Preserved Layout
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Clean separation between data schemas, mock service, and future UI components:
                </p>

                <div className="p-3 rounded-lg bg-midnight-950/80 border border-slate-800 text-[11px] font-mono text-amber-200/90 space-y-1">
                  <div>src/types/explorer.ts</div>
                  <div>src/data/explorerData.ts</div>
                  <div>src/services/journeyRecommendation.ts</div>
                  <div>src/components/create-explorer/*</div>
                  <div>src/pages/CreateExplorer.tsx</div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-amber-500/10">
                <button
                  onClick={() => setActiveTab('data-models')}
                  className="w-full bv-btn-secondary text-xs py-2"
                >
                  <span>Inspect Data Models</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live AI Recommendation Engine Test */}
        {activeTab === 'ai-engine' && (
          <div className="max-w-5xl mx-auto w-full space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bv-glass-panel p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <span className="text-xs font-serif tracking-wider text-amber-400 uppercase font-bold flex items-center gap-1.5">
                      <Compass className="w-4 h-4" />
                      1. Starting Region
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">Primary Anchor</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {STARTING_REGIONS.map(reg => (
                      <button
                        key={reg.id}
                        onClick={() => setTestRegion(reg.id)}
                        className={`p-2.5 rounded-lg text-left transition-all border ${
                          testRegion === reg.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                            : 'bg-midnight-950/70 border-slate-800 text-slate-400 hover:border-amber-500/30'
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{reg.name}</div>
                        <div className="text-[9px] text-amber-400/70 truncate">{reg.culturalDescription}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cultural Interests Selector */}
                <div className="bv-glass-panel p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <span className="text-xs font-serif tracking-wider text-amber-400 uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      2. Cultural Interests ({testInterests.length} Selected)
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">Multi-select</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {INTERESTS.map(interest => {
                      const isSelected = testInterests.includes(interest.id)
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`p-2.5 rounded-lg text-left transition-all border flex items-center gap-2 ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                              : 'bg-midnight-950/70 border-slate-800 text-slate-400 hover:border-amber-500/30'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-amber-400' : 'bg-slate-700'}`} />
                          <span className="text-xs truncate">{interest.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Age Group & Language */}
                <div className="bv-glass-panel p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-serif tracking-wider text-amber-400 uppercase font-bold block mb-2">
                        3. Age Group Tier
                      </span>
                      <div className="flex gap-2">
                        {AGE_GROUPS.map(ag => (
                          <button
                            key={ag.id}
                            onClick={() => setTestAgeGroup(ag.id)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              testAgeGroup === ag.id
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                                : 'bg-midnight-950/70 border-slate-800 text-slate-400 hover:border-amber-500/30'
                            }`}
                          >
                            {ag.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-serif tracking-wider text-amber-400 uppercase font-bold block mb-2">
                        4. Language
                      </span>
                      <select
                        value={testLanguage}
                        onChange={e => setTestLanguage(e.target.value)}
                        className="w-full bg-midnight-950/80 border border-slate-800 text-xs text-amber-200 rounded-lg p-2 focus:border-amber-400 outline-none"
                      >
                        {LANGUAGES.map(lang => (
                          <option key={lang.code} value={lang.code} className="bg-midnight-900 text-slate-200">
                            {lang.name} ({lang.nativeLabel})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Output Column: Live Recommendation Card */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bv-glass-panel-elevated p-6 border-amber-500/50 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        <Bot className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-amber-400 block font-semibold">
                          AI Recommendation Output
                        </span>
                        <h4 className="bv-heading-section text-lg font-bold text-amber-100">
                          Personalized Cultural Journey
                        </h4>
                      </div>
                    </div>
                    <span className="bv-badge-gold text-[10px]">
                      Difficulty: {liveRecommendation.difficulty}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Recommended Quest Banner */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-midnight-950 to-orange-500/10 border border-amber-500/30">
                      <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-semibold block mb-1">
                        Recommended Quest
                      </span>
                      <div className="bv-gold-text text-xl font-bold font-serif mb-2">
                        "{liveRecommendation.recommendedQuest}"
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {liveRecommendation.questDescription}
                      </p>
                    </div>

                    {/* Recommended Game & Lore */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-midnight-950/70 border border-amber-500/20">
                        <span className="text-[10px] text-amber-400/70 uppercase tracking-widest block mb-1 font-semibold flex items-center gap-1.5">
                          <Dice5 className="w-3.5 h-3.5 text-amber-400" />
                          Indigenous Game
                        </span>
                        <div className="text-base font-bold text-amber-200">
                          {liveRecommendation.recommendedGame}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Matched to regional tradition & interests
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-midnight-950/70 border border-amber-500/20">
                        <span className="text-[10px] text-amber-400/70 uppercase tracking-widest block mb-1 font-semibold flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-orange-400" />
                          Target Region
                        </span>
                        <div className="text-base font-bold text-orange-200 capitalize">
                          {testRegion.replace('_', ' ')}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Primary cultural sandbox
                        </span>
                      </div>
                    </div>

                    {/* Cultural Progression Path */}
                    <div className="p-4 rounded-xl bg-midnight-950/70 border border-amber-500/20">
                      <span className="text-[10px] text-amber-400/70 uppercase tracking-widest block mb-2 font-semibold">
                        Cultural Path Progression
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {liveRecommendation.culturalPath.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium">
                              {step}
                            </span>
                            {idx < liveRecommendation.culturalPath.length - 1 && (
                              <span className="text-amber-500/50 text-xs">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lore Snippet */}
                    {liveRecommendation.loreSnippet && (
                      <div className="p-3.5 rounded-xl bg-midnight-950/90 border border-slate-800 text-xs text-slate-400 italic">
                        <span className="text-amber-400 not-italic font-bold block mb-1 text-[11px]">
                          Historical & Cultural Insight:
                        </span>
                        "{liveRecommendation.loreSnippet}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-midnight-950/60 border border-amber-500/20 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Engine Architecture:</span>
                  <span className="text-amber-300 font-mono text-[10px]">
                    Local Deterministic Matrix → FastAPI POST Adapter Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Data Models Inspector */}
        {activeTab === 'data-models' && (
          <div className="max-w-5xl mx-auto w-full space-y-6">
            {/* 1. Avatars */}
            <div className="bv-glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <h3 className="bv-heading-section text-base font-bold text-amber-200 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  5 Avatar Archetypes (`AVATARS`)
                </h3>
                <span className="text-[10px] text-slate-400 uppercase">Data-driven placeholder strategy</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {AVATARS.map(avatar => (
                  <div key={avatar.id} className="p-3.5 rounded-xl bg-midnight-950/80 border border-amber-500/20 flex flex-col justify-between">
                    <div>
                      <div
                        className="w-10 h-10 rounded-lg mb-2 flex items-center justify-center border"
                        style={{ borderColor: avatar.themeColor, backgroundColor: `${avatar.themeColor}15` }}
                      >
                        <Sparkles className="w-5 h-5" style={{ color: avatar.themeColor }} />
                      </div>
                      <div className="text-xs font-bold text-amber-100">{avatar.name}</div>
                      <div className="text-[10px] text-amber-400/80 italic mb-2">{avatar.title}</div>
                      <p className="text-[10px] text-slate-400 leading-tight mb-2">
                        {avatar.shortDescription}
                      </p>
                    </div>
                    <div className="text-[9px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                      ID: {avatar.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Regions & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Starting Regions */}
              <div className="bv-glass-panel p-6 space-y-4">
                <h3 className="bv-heading-section text-base font-bold text-amber-200 flex items-center gap-2 border-b border-amber-500/20 pb-3">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  5 Starting Regions (`STARTING_REGIONS`)
                </h3>
                <div className="space-y-2.5">
                  {STARTING_REGIONS.map(region => (
                    <div key={region.id} className="p-3 rounded-lg bg-midnight-950/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-amber-200">{region.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {region.culturalDescription}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2">{region.shortDescription}</p>
                      <div className="flex flex-wrap gap-1">
                        {region.culturalTags.map((tag, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-midnight-900 text-slate-300 border border-slate-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Age Groups */}
              <div className="space-y-6">
                <div className="bv-glass-panel p-6 space-y-3">
                  <h3 className="bv-heading-section text-base font-bold text-amber-200 flex items-center gap-2 border-b border-amber-500/20 pb-2">
                    <LanguagesIcon className="w-4 h-4 text-amber-400" />
                    Languages (`LANGUAGES`)
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {LANGUAGES.map(lang => (
                      <div key={lang.code} className="p-2 rounded-lg bg-midnight-950/80 border border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-200">{lang.name}</span>
                        <span className="text-xs text-amber-400 font-bold">{lang.nativeLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bv-glass-panel p-6 space-y-3">
                  <h3 className="bv-heading-section text-base font-bold text-amber-200 flex items-center gap-2 border-b border-amber-500/20 pb-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    3 Age Groups (`AGE_GROUPS`)
                  </h3>
                  <div className="space-y-2">
                    {AGE_GROUPS.map(ag => (
                      <div key={ag.id} className="p-2.5 rounded-lg bg-midnight-950/80 border border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-amber-300">{ag.label}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">{ag.experienceLevel}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">{ag.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Responsive Matrix Foundation */}
        {activeTab === 'responsive' && (
          <div className="max-w-4xl mx-auto w-full">
            <div className="bv-glass-panel p-6 space-y-6">
              <div>
                <h3 className="bv-heading-section text-lg font-bold text-amber-200 mb-1 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  Phase 5 Responsive Architecture Blueprint
                </h3>
                <p className="text-slate-400 text-xs">
                  Layout behavior mapped for the upcoming Create Explorer interface.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Desktop Spec */}
                <div className="p-4 rounded-xl bg-midnight-900/70 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-300 mb-2">
                    <Monitor className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Desktop View</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1.5 font-light">
                    <p className="text-amber-200/90 font-medium">Cinematic 3-Column Triad:</p>
                    <div className="p-2 rounded bg-midnight-950 text-[10px] space-y-1 border border-amber-500/10">
                      <div>Col 1: Quest Progression</div>
                      <div>Col 2: Central Avatar / Hero Preview</div>
                      <div>Col 3: Interactive Selection Panels</div>
                    </div>
                  </div>
                </div>

                {/* Tablet Spec */}
                <div className="p-4 rounded-xl bg-midnight-900/70 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-orange-300 mb-2">
                    <Tablet className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Tablet View</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1.5 font-light">
                    <p className="text-orange-200/90 font-medium">Intelligent Reorganization:</p>
                    <div className="p-2 rounded bg-midnight-950 text-[10px] space-y-1 border border-orange-500/10">
                      <div>- Scaled character presentation</div>
                      <div>- Stacked progression metrics</div>
                      <div>- Priority drawer for customization</div>
                    </div>
                  </div>
                </div>

                {/* Mobile Spec */}
                <div className="p-4 rounded-xl bg-midnight-900/70 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-400 mb-2">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Mobile View</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1.5 font-light">
                    <p className="text-amber-300/90 font-medium">Vertical Adventure Flow:</p>
                    <div className="p-2 rounded bg-midnight-950 text-[10px] space-y-1 border border-amber-500/10">
                      <div>1. Character Hero View</div>
                      <div>2. Avatar & Archetype</div>
                      <div>3. Player Info & Interests</div>
                      <div>4. Region & AI Preview</div>
                      <div>5. Create My Journey Action</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Phase Preparation Banner */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Next Phase: </span>
            <span className="text-amber-300 font-semibold">
              Building the "Create Your Explorer" Interface Component by Component
            </span>
          </div>
        </div>
      </main>

      {/* Game Footer */}
      <footer className="relative z-10 border-t border-amber-500/20 bg-midnight-950/80 py-4 text-center text-xs text-slate-500">
        <div className="bv-container-cinematic flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-500/70" />
            <span>BharatVerse Cultural AI Game Engine</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Built for Smart India Hackathon (SIH 2026) • Toycathon & Cultural Gaming
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


