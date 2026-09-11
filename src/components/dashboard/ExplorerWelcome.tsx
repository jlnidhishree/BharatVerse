import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Sparkles,
  Compass,
  ArrowRight,
  Shield,
  Bot,
  ExternalLink
} from 'lucide-react'

export interface MapRegionNode {
  id: string;
  name: string;
  subtitle: string;
  x: number; // percentage from left
  y: number; // percentage from top
  signatureGame: string;
  highlighted?: boolean;
  unlocked?: boolean;
}

interface ExplorerWelcomeProps {
  onSelectRegion?: (regionId: string) => void;
  selectedRegionId?: string;
  onExploreKarnataka?: () => void;
}

export function ExplorerWelcome({
  onSelectRegion,
  selectedRegionId = 'karnataka',
  onExploreKarnataka
}: ExplorerWelcomeProps) {
  const [hoveredNode, setHoveredNode] = useState<MapRegionNode | null>(null)

  // Canonical Indian states with visual positioning on the custom map canvas
  const regionNodes: MapRegionNode[] = [
    { id: 'jammu_kashmir', name: 'Jammu & Kashmir', subtitle: 'Heaven on Earth', x: 34, y: 11, signatureGame: 'Pashmina Crafting', unlocked: true },
    { id: 'himachal_pradesh', name: 'Himachal Pradesh', subtitle: 'Land of the Gods', x: 40, y: 17, signatureGame: 'Thoda Archery', unlocked: true },
    { id: 'uttarakhand', name: 'Uttarakhand', subtitle: 'Sacred Abodes', x: 45, y: 22, signatureGame: 'Bagwal', unlocked: true },
    { id: 'delhi', name: 'Delhi', subtitle: 'Empires & Evolution', x: 41, y: 28, signatureGame: 'Kabaddi', unlocked: true },
    { id: 'rajasthan', name: 'Rajasthan', subtitle: 'Forts & Legends', x: 28, y: 34, signatureGame: 'Gitte & Goli', unlocked: true },
    { id: 'uttar_pradesh', name: 'Uttar Pradesh', subtitle: 'Heritage & Devotion', x: 49, y: 35, signatureGame: 'Pachisi & Gulli Danda', unlocked: true },
    { id: 'bihar', name: 'Bihar', subtitle: 'Knowledge & Legacy', x: 61, y: 38, signatureGame: 'Kabbadi & Kho-Kho', unlocked: true },
    { id: 'north_east', name: 'North East', subtitle: 'Seven Sisters', x: 79, y: 34, signatureGame: 'Dhopkhel & Insuknawr', unlocked: true },
    { id: 'gujarat', name: 'Gujarat', subtitle: 'Traditions & Trade', x: 24, y: 45, signatureGame: 'Satoliya & Ras Garba', unlocked: true },
    { id: 'madhya_pradesh', name: 'Madhya Pradesh', subtitle: 'Temples & Wilderness', x: 44, y: 47, signatureGame: 'Ati-Pati', unlocked: true },
    { id: 'chhattisgarh', name: 'Chhattisgarh', subtitle: 'Forest & Folklore', x: 55, y: 50, signatureGame: 'Bati & Phugdi', unlocked: true },
    { id: 'jharkhand', name: 'Jharkhand', subtitle: 'Tribes & Nature', x: 62, y: 46, signatureGame: 'Chhau Martial Dance', unlocked: true },
    { id: 'maharashtra', name: 'Maharashtra', subtitle: 'Warriors & Wonders', x: 33, y: 58, signatureGame: 'Mallakhamb', unlocked: true },
    { id: 'odisha', name: 'Odisha', subtitle: 'Art & Spirituality', x: 63, y: 56, signatureGame: 'Ganjifa Cards', unlocked: true },
    { id: 'goa', name: 'Goa', subtitle: 'Beaches & Blend', x: 30, y: 70, signatureGame: 'Dhalo & Fugdi', unlocked: true },
    { id: 'telangana', name: 'Telangana', subtitle: 'Heritage & Innovation', x: 46, y: 64, signatureGame: 'Ashta Chamma', unlocked: true },
    { id: 'andhra_pradesh', name: 'Andhra Pradesh', subtitle: 'Culture & Coast', x: 53, y: 71, signatureGame: 'Vamana Guntalu', unlocked: true },
    { id: 'karnataka', name: 'Karnataka', subtitle: 'Art, Architecture & Games', x: 38, y: 74, signatureGame: 'Chowka Bara & Aligulimane', highlighted: true, unlocked: true },
    { id: 'tamil_nadu', name: 'Tamil Nadu', subtitle: 'Temples & Traditions', x: 47, y: 84, signatureGame: 'Pallanguzhi & Silambam', unlocked: true },
    { id: 'kerala', name: 'Kerala', subtitle: 'Nature & Knowledge', x: 39, y: 88, signatureGame: 'Kalaripayattu & Vallam Kali', unlocked: true }
  ]

  const handleNodeClick = (node: MapRegionNode) => {
    if (onSelectRegion) onSelectRegion(node.id)
    if (node.id === 'karnataka' && onExploreKarnataka) {
      onExploreKarnataka()
    }
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 border border-amber-500/30 shadow-panel-elevated">
      {/* 1. Header Banner */}
      <div className="relative z-10 pt-5 pb-3 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-orange-200 drop-shadow-md">
            One Land Infinite Stories
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <span className="text-[10px] sm:text-xs font-serif font-bold tracking-[0.25em] text-amber-400/90 uppercase">
              EXPLORE • PLAY • LEARN • PRESERVE
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
        </motion.div>
      </div>

      {/* 2. Interactive Map Canvas Container */}
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] lg:h-[620px] overflow-hidden">
        {/* Cartographic Background Glows */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle celestial compass background watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-amber-500/10 opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-amber-500/15 opacity-50 pointer-events-none border-dashed" />
          {/* Ambient landmass aura */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[380px] h-[440px] bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-16 left-1/3 w-64 h-64 bg-emerald-900/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Stylized Illustrated Vector Contour Map of India */}
        <svg
          viewBox="0 0 800 900"
          className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(234,179,8,0.15)] select-none pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mapLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#172554" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#0f172a" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="karnatakaHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
            </linearGradient>

            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Stylized India Subcontinent Path Silhouette */}
          <path
            d="M 320,60
               C 340,50 360,55 380,80
               C 400,100 440,110 470,140
               C 490,160 510,180 500,210
               C 520,230 560,250 630,250
               C 690,250 740,280 730,320
               C 720,350 680,370 650,380
               C 620,390 590,410 570,440
               C 550,470 540,520 540,560
               C 540,610 500,690 450,750
               C 420,790 390,830 380,860
               C 375,850 350,790 330,730
               C 310,680 290,620 280,560
               C 270,510 240,470 210,430
               C 190,400 200,360 230,330
               C 260,300 280,260 290,210
               C 300,160 310,100 320,60 Z"
            fill="url(#mapLandGradient)"
            stroke="#eab308"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            className="transition-all duration-700"
          />

          {/* Internal Regional Border Filigree & Sacred Rivers */}
          <path
            d="M 320,220 Q 380,260 450,290 T 560,340 T 630,360"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            strokeDasharray="4 3"
          />
          <path
            d="M 280,520 Q 380,550 480,560 T 530,600"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeDasharray="4 3"
          />
          <path
            d="M 310,700 Q 360,720 420,740 T 450,770"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="3 3"
          />

          {/* Karnataka Regional Accent Polygon Glow */}
          <polygon
            points="310,660 380,630 420,680 390,750 330,730"
            fill="url(#karnatakaHighlight)"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeOpacity="0.8"
            filter="url(#goldGlow)"
          />

          {/* Sri Lanka Silhouette */}
          <ellipse
            cx="440"
            cy="880"
            rx="18"
            ry="28"
            fill="#1e293b"
            fillOpacity="0.4"
            stroke="#eab308"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>

        {/* 3. Top-Right Badge: "EXPLORE ALL 28 STATES" */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-midnight-900/90 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold tracking-wider shadow-gold-glow backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '30s' }} />
            <span>EXPLORE ALL 28 STATES</span>
          </div>
        </div>

        {/* 4. Interactive Regional Nodes Pins */}
        <div className="absolute inset-0 z-20">
          {regionNodes.map((node) => {
            const isSelected = selectedRegionId === node.id || node.highlighted
            const isHovered = hoveredNode?.id === node.id

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Pulsing Aura if selected or hovered */}
                {(isSelected || isHovered) && (
                  <div className="absolute -inset-3 rounded-full bg-amber-400/25 blur-sm animate-ping" />
                )}

                {/* Node Pin Marker */}
                <div
                  className={`relative flex items-center gap-1.5 px-2 py-1 rounded-full text-left transition-all backdrop-blur-md border ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/90 to-orange-600/90 border-amber-200 text-midnight-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-110 z-30'
                      : isHovered
                      ? 'bg-midnight-900/95 border-amber-400 text-amber-200 shadow-md scale-105 z-20'
                      : 'bg-midnight-950/80 border-amber-500/30 text-slate-200 hover:border-amber-400/70 z-10'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isSelected
                        ? 'bg-midnight-950'
                        : isHovered
                        ? 'bg-amber-400'
                        : 'bg-amber-500/80'
                    }`}
                  />
                  <div className="leading-tight">
                    <span className="text-[10px] sm:text-[11px] font-bold block whitespace-nowrap">
                      {node.name}
                    </span>
                    <span
                      className={`text-[8px] tracking-tight block whitespace-nowrap ${
                        isSelected ? 'text-midnight-950/80' : 'text-amber-400/70'
                      }`}
                    >
                      {node.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 5. Hover / Active Node Details Tooltip Card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            >
              <div className="bv-glass-panel p-3.5 border-amber-400/50 shadow-gold-glow max-w-xs text-center">
                <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold block mb-0.5 font-serif">
                  Regional Sandbox
                </span>
                <h4 className="text-sm font-bold text-amber-100">{hoveredNode.name}</h4>
                <p className="text-[11px] text-slate-300 italic mb-2">"{hoveredNode.subtitle}"</p>
                <div className="text-[10px] text-amber-300 font-medium bg-midnight-950/80 py-1 px-2 rounded-lg border border-amber-500/20">
                  Signature Game: <strong className="text-amber-100">{hoveredNode.signatureGame}</strong>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Floating AI Companion Mitra (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 flex items-end gap-3 pointer-events-auto">
          <motion.div
            className="relative cursor-pointer group"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            onClick={onExploreKarnataka}
          >
            {/* Robot Orb Mascot */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 border-2 border-amber-400/80 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center">
              {/* Cyan Visor */}
              <div className="w-8 h-4 rounded-full bg-midnight-950 flex items-center justify-center gap-1.5 border border-cyan-400/60 shadow-[inset_0_0_8px_rgba(34,211,238,0.7)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <div className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>

            {/* Speech Bubble */}
            <div className="absolute bottom-full left-0 mb-2 w-48 p-2 rounded-xl bg-midnight-950/95 border border-amber-500/40 text-[10px] text-slate-200 shadow-xl pointer-events-none">
              <span className="text-amber-400 font-bold block mb-0.5 font-serif">Mitra AI:</span>
              "Explore Karnataka! The ruins of Hampi hold timeless secrets."
              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-midnight-950 border-r border-b border-amber-500/40 transform rotate-45" />
            </div>
          </motion.div>
        </div>

        {/* 7. Bottom-Right Golden Motto Plaque */}
        <div className="absolute bottom-4 right-4 z-20 text-right">
          <div className="px-3 py-2 rounded-xl bg-midnight-950/90 border border-amber-500/40 shadow-gold-glow backdrop-blur-sm inline-block text-right">
            <div className="bv-gold-text text-xs sm:text-sm font-serif font-bold tracking-wider">
              "वसुधैव कुटुम्बकम्"
            </div>
            <div className="text-[8px] sm:text-[9px] tracking-widest text-amber-400/80 uppercase font-mono">
              THE WORLD IS ONE FAMILY
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
