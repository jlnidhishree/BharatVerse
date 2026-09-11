import { useState, useMemo } from 'react'
import {
  Compass,
  Sparkles,
  Shield,
  MapPin,
  Cpu,
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

import { LanguageSelector } from './components/create-explorer/LanguageSelector.tsx'
import { ExplorerProgress } from './components/create-explorer/ExplorerProgress.tsx'
import { CharacterPreview } from './components/create-explorer/CharacterPreview.tsx'
import { AICompanion, type CompanionMood } from './components/create-explorer/AICompanion.tsx'
import { AvatarSelector } from './components/create-explorer/AvatarSelector.tsx'
import { PlayerInfoForm } from './components/create-explorer/PlayerInfoForm.tsx'
import { InterestSelector } from './components/create-explorer/InterestSelector.tsx'
import type { AgeGroupId, LanguageCode, InterestId } from './types/explorer.ts'

function App() {
  const [activeTab, setActiveTab] = useState<'create-explorer' | 'ai-engine' | 'data-models'>('create-explorer')

  // Core Explorer Creation Journey State (Steps 1-5)
  const [currentStep, setCurrentStep] = useState<number>(3)
  const [playerName, setPlayerName] = useState<string>('Arjun of Bharat')
  const [avatarId, setAvatarId] = useState<string>('explorer')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroupId>('13-16')
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en')
  const [selectedInterests, setSelectedInterests] = useState<InterestId[]>([
    'history',
    'traditional_games',
    'art_culture'
  ])
  const [startingRegion, setStartingRegion] = useState<string>('karnataka')
  const [companionMood] = useState<CompanionMood>('guiding')

  // Live computed recommendation from deterministic engine
  const liveRecommendation = useMemo(() => {
    const request: RecommendationRequest = {
      startingRegion: startingRegion,
      interests: selectedInterests,
      ageGroup: selectedAgeGroup,
      language: selectedLanguage
    }
    return recommendJourney(request)
  }, [startingRegion, selectedInterests, selectedAgeGroup, selectedLanguage])

  // Resolve active avatar object
  const activeAvatar = useMemo(() => {
    return AVATARS.find(a => a.id === avatarId) || AVATARS[0]
  }, [avatarId])

  // Resolve active interests objects
  const activeInterestsList = useMemo(() => {
    return INTERESTS.filter(i => selectedInterests.includes(i.id))
  }, [selectedInterests])

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id as InterestId)
        ? prev.filter(item => item !== id)
        : [...prev, id as InterestId]
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
      <header className="relative z-10 border-b border-amber-500/20 bg-midnight-950/80 backdrop-blur-md">
        <div className="bv-container-cinematic py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/40 shadow-gold-glow">
              <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
              <div className="absolute inset-0 rounded-lg border border-amber-400/30 animate-pulse" />
            </div>
            <div>
              <span className="bv-gold-text text-lg sm:text-xl tracking-wider font-bold block leading-none">
                BHARATVERSE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-amber-400/80 uppercase font-mono">
                AI CULTURAL ODYSSEY
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Navigation Mode Switcher: Journey vs AI Oracle Matrix vs Cultural Codex */}
            <div className="hidden sm:flex items-center gap-1 bg-midnight-900/90 p-1 rounded-lg border border-amber-500/20 text-xs">
              <button
                onClick={() => setActiveTab('create-explorer')}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'create-explorer'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-amber-200'
                }`}
              >
                Genesis Journey
              </button>
              <button
                onClick={() => setActiveTab('ai-engine')}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${
                  activeTab === 'ai-engine'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-amber-200'
                }`}
              >
                <Bot className="w-3 h-3" />
                AI Oracle Matrix
              </button>
              <button
                onClick={() => setActiveTab('data-models')}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${
                  activeTab === 'data-models'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-amber-200'
                }`}
              >
                <Shield className="w-3 h-3" />
                Cultural Codex
              </button>
            </div>

            <LanguageSelector
              compact
              currentLanguage={selectedLanguage}
              onLanguageChange={(l) => setSelectedLanguage(l.code as LanguageCode)}
            />

            <div className="bv-badge-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping mr-1" />
              Engine Online
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 bv-container-cinematic py-6 md:py-10 flex-1 flex flex-col justify-center">
        {/* Main Character Creation Experience */}
        {activeTab === 'create-explorer' && (
          <div className="max-w-7xl mx-auto w-full space-y-7">
            {/* Hero Title & Cultural Fantasy Badge */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Ancient Indian Cultural RPG • SIH26208
              </div>

              <h1 className="bv-heading-hero text-3xl sm:text-5xl md:text-6xl font-black mb-3">
                <span className="bv-gold-text">CREATE YOUR </span>
                <span className="bv-saffron-text">EXPLORER</span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                Step into the living chronicles of Bharat. Shape your identity, align your archetype,
                and choose the cultural paths that will guide your AI-powered odyssey.
              </p>

              {/* Ornate Divider with Diamond Motif */}
              <div className="bv-divider-ornate max-w-md mx-auto my-4">
                <span className="text-amber-400/80 text-xs">◆</span>
                <span className="text-amber-400 text-sm">✦</span>
                <span className="text-amber-400/80 text-xs">◆</span>
              </div>
            </div>

            {/* Cinematic 3-Column Character Creation Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Quest Progression Panel */}
              <div className="lg:col-span-3">
                <ExplorerProgress
                  currentStep={currentStep}
                  onStepClick={(stepId) => setCurrentStep(stepId)}
                />
              </div>

              {/* Center Column: Archetype Revelation & Character Crucible */}
              <div className="lg:col-span-5">
                <CharacterPreview
                  avatarId={avatarId}
                  playerName={playerName}
                  startingRegion={startingRegion}
                  interests={selectedInterests}
                />
              </div>

              {/* Right Column: AI Companion Panel & Explorer State */}
              <div className="lg:col-span-4 space-y-4">
                {/* Mitra AI Companion */}
                <AICompanion
                  mood={companionMood}
                  title="Cultural Oracle"
                  speakerName="Mitra AI"
                  explorerName={playerName}
                  selectedInterests={selectedInterests}
                />

                {/* Player Summary: Explorer State */}
                <div className="bv-glass-panel p-4 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-amber-500/15 pb-2">
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider font-serif">
                      EXPLORER STATE
                    </span>
                    <span className="bv-badge-gold text-[9px] px-1.5 py-0.5">
                      REACTIVE
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Name:</span>
                      <strong className="text-amber-200 font-serif">{playerName || '(Unnamed Explorer)'}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Archetype:</span>
                      <strong className="text-amber-200">{activeAvatar.name}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Age Group:</span>
                      <strong className="text-amber-200">{selectedAgeGroup}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Language:</span>
                      <strong className="text-amber-200 uppercase">{selectedLanguage}</strong>
                    </div>
                    <div className="flex flex-col gap-1 text-slate-400 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span>Interests:</span>
                        <strong className="text-amber-300 font-mono text-[11px]">
                          {selectedInterests.length > 0
                            ? `${selectedInterests.length} Paths Chosen`
                            : 'None Chosen'}
                        </strong>
                      </div>
                      {activeInterestsList.length > 0 && (
                        <div className="text-[10px] text-slate-300 truncate">
                          {activeInterestsList.map(i => i.title.split('&')[0].trim()).slice(0, 3).join(' • ')}
                          {activeInterestsList.length > 3 ? ` +${activeInterestsList.length - 3} more` : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Step Area: Smooth Stage Based on currentStep */}
            <div className="pt-2">
              {currentStep === 1 && (
                <PlayerInfoForm
                  name={playerName}
                  ageGroup={selectedAgeGroup}
                  language={selectedLanguage}
                  onNameChange={setPlayerName}
                  onAgeGroupChange={setSelectedAgeGroup}
                  onLanguageChange={setSelectedLanguage}
                  onContinue={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && (
                <div className="bv-glass-panel p-5 md:p-6">
                  <AvatarSelector
                    selectedAvatar={avatarId}
                    onSelectAvatar={(id) => setAvatarId(id)}
                    onBack={() => setCurrentStep(1)}
                    onContinue={() => setCurrentStep(3)}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="bv-glass-panel p-5 md:p-6">
                  <InterestSelector
                    selectedInterests={selectedInterests}
                    onInterestsChange={(updated) => setSelectedInterests(updated)}
                    onBack={() => setCurrentStep(2)}
                    onContinue={() => setCurrentStep(4)}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="bv-glass-panel p-6 text-center space-y-4">
                  <div className="bv-badge-saffron inline-flex">
                    Step 4: Region Selection (Upcoming Phase)
                  </div>
                  <h4 className="bv-heading-section text-xl font-bold text-amber-200">
                    The Geographic Sandboxes of Bharat
                  </h4>
                  <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                    In the next phase, you will anchor your explorer at a regional cultural crossroads—Karnataka,
                    Tamil Nadu, Kerala, Andhra Pradesh, or Telangana.
                  </p>
                  <div className="p-4 rounded-xl bg-midnight-950/80 border border-amber-500/20 max-w-md mx-auto text-xs text-slate-400">
                    Current Anchor: <strong className="text-amber-300 capitalize">{startingRegion}</strong> • Signature Game: <strong className="text-amber-200">Chowka Bara</strong>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bv-btn-secondary text-xs"
                    >
                      ← Back to Interests
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="bv-glass-panel p-6 text-center space-y-4">
                  <div className="bv-badge-gold inline-flex">
                    Step 5: AI Journey Revelation (Future Phase)
                  </div>
                  <h4 className="bv-heading-section text-xl font-bold text-amber-200">
                    Your Personalized Cultural Quest
                  </h4>
                  <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Recommended Quest: <strong className="text-amber-300 font-serif">"{liveRecommendation.recommendedQuest}"</strong>
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bv-btn-secondary text-xs"
                    >
                      ← Back to Interests
                    </button>
                  </div>
                </div>
              )}
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
                        onClick={() => setStartingRegion(reg.id)}
                        className={`p-2.5 rounded-lg text-left transition-all border ${
                          startingRegion === reg.id
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
                      2. Cultural Interests ({selectedInterests.length} Selected)
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">Multi-select</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {INTERESTS.map(interest => {
                      const isSelected = selectedInterests.includes(interest.id)
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
                            onClick={() => setSelectedAgeGroup(ag.id)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              selectedAgeGroup === ag.id
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
                        value={selectedLanguage}
                        onChange={e => setSelectedLanguage(e.target.value as LanguageCode)}
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
                          {startingRegion.replace('_', ' ')}
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


