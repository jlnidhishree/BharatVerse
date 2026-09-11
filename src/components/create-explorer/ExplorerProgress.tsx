/**
 * BHARATVERSE — ExplorerProgress Component
 * Quest-styled journey progression tracker designed for the left column (desktop)
 * and compact horizontal trail (mobile/tablet).
 */

import { motion } from 'framer-motion'
import { User, Sparkles, Compass, MapPin, Flag, Check } from 'lucide-react'

export interface ProgressStep {
  id: number;
  label: string;
  subtitle: string;
  iconName: string;
}

export const DEFAULT_EXPLORER_STEPS: ProgressStep[] = [
  {
    id: 1,
    label: 'Identity',
    subtitle: 'Name, Age & Language',
    iconName: 'User'
  },
  {
    id: 2,
    label: 'Avatar',
    subtitle: 'Cultural Archetype',
    iconName: 'Sparkles'
  },
  {
    id: 3,
    label: 'Interests',
    subtitle: 'Folklore & Heritage',
    iconName: 'Compass'
  },
  {
    id: 4,
    label: 'Region',
    subtitle: 'Starting Sandbox',
    iconName: 'MapPin'
  },
  {
    id: 5,
    label: 'AI Journey',
    subtitle: 'Personalized Cultural Quest',
    iconName: 'Flag'
  }
]


export interface ExplorerProgressProps {
  /** Current active step (1-indexed: 1 through 5) */
  currentStep: number;
  /** Optional custom step array */
  steps?: ProgressStep[];
  /** Optional callback when clicking a completed or current step */
  onStepClick?: (stepId: number) => void;
  /** Force vertical (desktop left rail) or horizontal (mobile trail) orientation */
  orientation?: 'vertical' | 'horizontal' | 'auto';
  /** Optional CSS class overrides */
  className?: string;
}

function renderStepIcon(iconName: string, className: string) {
  switch (iconName) {
    case 'User':
      return <User className={className} />
    case 'Sparkles':
      return <Sparkles className={className} />
    case 'Compass':
      return <Compass className={className} />
    case 'MapPin':
      return <MapPin className={className} />
    case 'Flag':
      return <Flag className={className} />
    default:
      return <Sparkles className={className} />
  }
}

export function ExplorerProgress({
  currentStep = 1,
  steps = DEFAULT_EXPLORER_STEPS,
  onStepClick,
  orientation = 'auto',
  className = ''
}: ExplorerProgressProps) {
  const isVertical = orientation === 'vertical' || orientation === 'auto'

  return (
    <div className={`bv-glass-panel p-4 md:p-5 relative ${className}`}>
      {/* Component Title Header */}
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
        <div>
          <span className="text-[10px] uppercase font-serif tracking-widest text-amber-400 font-bold block">
            Quest Progression
          </span>
          <h4 className="bv-heading-section text-sm font-bold text-amber-100">
            Explorer Genesis
          </h4>
        </div>
        <div className="bv-badge-gold text-[10px] px-2 py-0.5">
          Step {Math.min(currentStep, steps.length)} of {steps.length}
        </div>
      </div>

      {/* Vertical Quest Progression (Desktop Standard) */}
      <div className={`${isVertical ? 'flex flex-col' : 'hidden'} space-y-2 relative`}>
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id
          const isLocked = currentStep < step.id
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="relative flex items-start group">
              {/* Connecting Quest Thread / Line */}
              {!isLast && (
                <div
                  className={`absolute left-4 top-8 -bottom-2 w-0.5 -ml-px transition-colors duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-b from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                      : isActive
                      ? 'bg-gradient-to-b from-amber-500/60 to-slate-800'
                      : 'bg-slate-800/80'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Interactive Node Button */}
              <button
                type="button"
                disabled={isLocked && !onStepClick}
                onClick={() => (isCompleted || isActive) && onStepClick?.(step.id)}
                className={`flex items-start gap-3 w-full p-2 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-amber-500/15 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : isCompleted
                    ? 'hover:bg-midnight-900/60 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Node Glyph Beacon */}
                <div className="relative shrink-0 z-10">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                      isCompleted
                        ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-gold-glow'
                        : isActive
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-200 text-midnight-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                        : 'bg-midnight-950/80 border-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-amber-300 stroke-[3]" />
                    ) : (
                      renderStepIcon(
                        step.iconName,
                        `w-4 h-4 ${isActive ? 'text-midnight-950' : 'text-slate-400'}`
                      )
                    )}
                  </motion.div>

                  {/* Active Beacon Pulse */}
                  {isActive && (
                    <span className="absolute -inset-1 rounded-xl bg-amber-400/20 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Step Narrative Details */}
                <div className="flex flex-col min-w-0 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-semibold tracking-wide ${
                        isActive
                          ? 'text-amber-200 font-bold'
                          : isCompleted
                          ? 'text-slate-200'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="text-[9px] text-amber-400 font-mono">
                        ◆ Active
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 truncate leading-tight">
                    {step.subtitle}
                  </span>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Horizontal Trail (Mobile / Tablet Compact Mode) */}
      <div
        className={`${
          orientation === 'horizontal' || orientation === 'auto'
            ? 'flex md:hidden'
            : 'hidden'
        } items-center justify-between relative pt-2`}
      >
        {/* Background connector line */}
        <div
          className="absolute left-4 right-4 top-5 h-0.5 bg-slate-800/80 -z-0"
          aria-hidden="true"
        />

        {steps.map(step => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center border text-xs transition-all ${
                  isCompleted
                    ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-gold-glow'
                    : isActive
                    ? 'bg-amber-400 border-amber-200 text-midnight-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                    : 'bg-midnight-950 border-slate-800 text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-[9px] mt-1 tracking-tight truncate max-w-[54px] text-center ${
                  isActive
                    ? 'text-amber-300 font-bold'
                    : isCompleted
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExplorerProgress
