import { motion } from 'framer-motion'
import { ChevronRight, Dna } from 'lucide-react'

interface SkillMetric {
  name: string;
  percentage: number;
  color: string;
}

interface JourneyProgressProps {
  onViewDetails?: () => void;
}

export function JourneyProgress({ onViewDetails }: JourneyProgressProps) {
  const skills: SkillMetric[] = [
    { name: 'History', percentage: 82, color: 'from-cyan-500 to-blue-500' },
    { name: 'Mythology', percentage: 91, color: 'from-purple-500 to-indigo-500' },
    { name: 'Art & Culture', percentage: 64, color: 'from-pink-500 to-rose-500' },
    { name: 'Traditional Games', percentage: 48, color: 'from-emerald-500 to-teal-500' },
    { name: 'Geography', percentage: 77, color: 'from-orange-500 to-amber-500' },
    { name: 'Festivals', percentage: 68, color: 'from-yellow-400 to-amber-500' }
  ]

  const overallPercentage = 76
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (overallPercentage / 100) * circumference

  return (
    <div className="bv-glass-panel p-4 rounded-2xl border-amber-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Dna className="w-4 h-4 text-amber-400" />
          <h3 className="bv-heading-section text-sm font-bold text-amber-100 font-serif">
            Your Cultural DNA
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewDetails}
          className="text-[10px] text-amber-400/90 hover:text-amber-200 flex items-center gap-0.5 font-medium transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Grid: Radial Ring on left + Skill Bars on right */}
      <div className="grid grid-cols-12 gap-3 items-center">
        {/* Left Radial Gauge */}
        <div className="col-span-5 flex flex-col items-center justify-center p-2 rounded-xl bg-midnight-950/70 border border-amber-500/15">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-800"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Stroke */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="url(#dnaGradient)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="bv-gold-text text-xl font-bold font-serif leading-none">
                {overallPercentage}%
              </span>
            </div>
          </div>

          <span className="mt-1 text-[10px] font-bold text-amber-200 uppercase tracking-wider font-serif text-center">
            Balanced Explorer
          </span>
        </div>

        {/* Right Skill Progress Bars */}
        <div className="col-span-7 space-y-1.5">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-medium truncate max-w-[90px]">
                  {skill.name}
                </span>
                <span className="text-slate-400 font-mono text-[9px]">
                  {skill.percentage}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800/80">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
