import React, { useState } from 'react';
import { 
  Globe, 
  Code2, 
  Layout, 
  Sparkles, 
  ChevronRight, 
  HardDrive,
  Rocket,
  Palette,
  Eye,
  Terminal as TerminalIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TEMPLATES = [
  { id: 'dark-neon', name: 'Cyberpunk Portfolio', tech: 'React / Tailwind', color: 'text-cyber-cyan' },
  { id: 'brutalist', name: 'Raw Infiltration', tech: 'Next.js / CSS-in-JS', color: 'text-cyber-magenta' },
  { id: 'minimal-agi', name: 'AGI Interface', tech: 'Vue / Framer', color: 'text-white' },
];

export const WebForge = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0].id);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar - Settings */}
      <div className="w-64 border-r border-white/5 p-6 flex flex-col gap-8 bg-black/20">
        <div>
          <h2 className="text-[10px] font-bold text-cyber-cyan uppercase tracking-[0.3em] mb-6">Forge_Protocols</h2>
          <div className="space-y-4">
            {TEMPLATES.map(t => (
              <button 
                key={t.id}
                onClick={() => setActiveTemplate(t.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${activeTemplate === t.id ? 'bg-white/5 border-cyber-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'border-white/5 hover:bg-white/5 opacity-60'}`}
              >
                <div className="text-xs font-bold">{t.name}</div>
                <div className="text-[8px] opacity-40 font-mono mt-1">{t.tech}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-mono">
          <div className="flex items-center justify-between text-[8px]">
            <span className="text-gray-500 uppercase">Deployment Ready</span>
            <span className="text-green-500">100%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Builder */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="p-8 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-black/40">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">Web_Forge_v1.0</h1>
              <p className="text-[9px] text-gray-500 tracking-[0.2em] uppercase font-mono">Neural_Template_Generator : Active</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/5 text-[10px] uppercase font-bold tracking-widest border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
              <Eye className="w-3 h-3" /> Preview
            </button>
            <button className="px-6 py-2 rounded-xl bg-cyber-cyan text-black text-[10px] uppercase font-bold tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all flex items-center gap-2">
              <Rocket className="w-3 h-3" /> Deploy_Cloud
            </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 p-8 overflow-auto flex flex-col gap-6 scrollbar-hide">
          <div className="relative">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website your neural net envision... (e.g., A brutalist landing page for a tactical hacker group)"
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-xl font-medium text-cyber-cyan placeholder:text-gray-700 outline-none focus:border-cyber-cyan/30 transition-all shadow-inner h-48 resize-none"
            />
            <button 
              onClick={handleGenerate}
              className="absolute bottom-6 right-6 p-4 rounded-full bg-cyber-cyan text-black hover:scale-110 transition-transform shadow-lg group disabled:opacity-50 disabled:scale-100"
              disabled={isGenerating || !prompt}
            >
              {isGenerating ? <Sparkles className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[ 
              { icon: <Layout />, label: 'Neural Structure', val: 'Optimized' },
              { icon: <Palette />, label: 'Color Matrix', val: 'Vibrant' },
              { icon: <HardDrive />, label: 'Assets Cache', val: '1.2 GB' }
            ].map((stat, i) => (
              <div key={i} className="glass-morphism p-6 rounded-3xl border-white/5 flex items-center gap-4 group hover:border-cyber-cyan/20 transition-all cursor-pointer">
                <div className="p-3 rounded-xl bg-white/5 text-cyber-cyan group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xs font-bold">{stat.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Code Preview View */}
          <div className="flex-1 rounded-3xl border border-white/5 bg-black/60 p-8 font-mono text-[11px] text-gray-400 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 flex gap-2">
               <div className="w-2 h-2 rounded-full bg-red-500/30" />
               <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
               <div className="w-2 h-2 rounded-full bg-cyber-cyan/30" />
            </div>
            <div className="space-y-1">
              <div className="text-cyber-cyan">&lt;AetherOS_Component name="Sentinel_Landing"&gt;</div>
              <div className="pl-4 text-cyber-magenta">import <span className="text-white">{"{ motion }"}</span> from 'motion/react';</div>
              <div className="pl-4 mt-2">export const Landing = () =&gt; (</div>
              <div className="pl-8 text-yellow-500">&lt;motion.div animate={"{{ opacity: 1 }}"} className="bg-black"&gt;</div>
              <div className="pl-12 text-blue-400">&lt;h1&gt;INITIALIZING_NEURAL_STORM&lt;/h1&gt;</div>
              <div className="pl-12">&lt;TacticalGrid density={10} /&gt;</div>
              <div className="pl-8 text-yellow-500">&lt;/motion.div&gt;</div>
              <div className="pl-4">);</div>
              <div className="text-cyber-cyan">&lt;/AetherOS_Component&gt;</div>
              <div className="animate-pulse text-cyber-cyan">_</div>
            </div>
            {isGenerating && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                <TerminalIcon className="w-12 h-12 text-cyber-cyan animate-bounce mb-4" />
                <div className="text-cyber-cyan font-bold tracking-widest uppercase text-xs animate-pulse">Forging_Neural_Assets...</div>
                <div className="text-[8px] text-gray-600 mt-2 font-mono italic">Bypassing standard CSS constraints... Established.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
