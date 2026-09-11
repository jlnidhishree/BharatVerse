import { useState } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'

interface AICompanionPanelProps {
  onOpenCompanionChat?: () => void;
}

export function AICompanionPanel({ onOpenCompanionChat }: AICompanionPanelProps) {
  const [inputQuery, setInputQuery] = useState('')
  const [lastResponse, setLastResponse] = useState<string | null>(null)
  const [isThinking, setIsThinking] = useState(false)

  const handleAsk = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputQuery.trim()) return

    setIsThinking(true)
    setTimeout(() => {
      setIsThinking(false)
      if (inputQuery.toLowerCase().includes('chola')) {
        setLastResponse('The Imperial Cholas built the towering Brihadeeswara Temple with a monolithic 80-tonne granite dome, using elephant ramps and master stone geometry!')
      } else if (inputQuery.toLowerCase().includes('hampi')) {
        setLastResponse('Hampi was the jewel of the Vijayanagara Empire—where ancient musical pillars in the Vitthala Temple emit distinct swaras when struck!')
      } else {
        setLastResponse(`Explorer, the chronicles of Bharat hold countless wonders regarding "${inputQuery}". Let us uncover its sacred games and traditions!`)
      }
    }, 600)
  }

  return (
    <div className="bv-glass-panel p-4 rounded-2xl border-amber-500/30 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          {/* Small Mitra AI Robot Icon */}
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.4)]">
            <div className="w-4 h-2.5 rounded-full bg-midnight-950 flex items-center justify-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-amber-100 font-serif leading-none">
              Ask Bharat AI
            </h3>
            <span className="text-[9px] text-cyan-400/90 font-mono">Mitra Companion</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCompanionChat}
          className="p-1 rounded-md text-amber-400/80 hover:text-amber-200 hover:bg-amber-500/10 transition-colors"
          title="Open AI Companion Dialog"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={handleAsk} className="relative">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Try: 'Tell me a story about the Cholas'"
          className="w-full pl-3 pr-8 py-2 text-[11px] bg-midnight-950/80 text-slate-200 placeholder-slate-400/60 rounded-xl border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/40 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isThinking}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-amber-500 text-midnight-950 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 transition-all"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>

      {/* Quick response bubble if asked */}
      {isThinking && (
        <div className="mt-2 p-2 rounded-lg bg-midnight-950/90 border border-cyan-500/20 text-[10px] text-cyan-300 animate-pulse flex items-center gap-1.5">
          <Bot className="w-3 h-3" />
          <span>Consulting ancient chronicles...</span>
        </div>
      )}

      {lastResponse && !isThinking && (
        <div className="mt-2 p-2 rounded-lg bg-midnight-950/90 border border-amber-500/30 text-[10px] text-slate-300 leading-relaxed">
          <span className="text-amber-400 font-bold block mb-0.5">Mitra AI:</span>
          {lastResponse}
        </div>
      )}
    </div>
  )
}
