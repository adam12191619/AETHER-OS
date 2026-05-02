import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Terminal as TerminalIcon, 
  Copy, 
  Check, 
  Skull, 
  Activity, 
  Layers,
  AlertOctagon,
  Ghost,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const VIRTEX_TYPES = [
  { id: 'lagger', name: 'UI Lagger', icon: <Activity />, color: 'text-cyber-cyan', desc: 'Saturates message rendering buffers.' },
  { id: 'freezer', name: 'System Freezer', icon: <Cpu />, color: 'text-cyber-magenta', desc: 'Overloads heap memory with complex characters.' },
  { id: 'ghost', name: 'Ghost Payload', icon: <Ghost />, color: 'text-white', desc: 'Invisible zero-width character flood.' },
  { id: 'crash', name: 'Kernel Smasher', icon: <Skull />, color: 'text-red-500', desc: 'Designed to trigger exception handling loops.' },
];

export const VirtexForge = () => {
  const [selectedType, setSelectedType] = useState('lagger');
  const [intensity, setIntensity] = useState(50);
  const [isForging, setIsForging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
  };

  const handleForge = () => {
    setIsForging(true);
    addLog(`INITIALIZING_${selectedType.toUpperCase()}_PROTOCOL...`);
    
    setTimeout(() => {
      addLog(`INJECTING_CHARSET_V4.2... DONE`);
      setTimeout(() => {
        setIsForging(false);
        addLog(`PAYLOAD_READY: ${(intensity * 3).toLocaleString()}B_KB_DENSITY`);
      }, 1500);
    }, 1000);
  };

  const copyToClipboard = () => {
    setCopied(true);
    addLog('PAYLOAD_EXTRACTED_TO_BUFFER');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 animate-pulse">
           <Zap className="w-24 h-24 text-cyber-cyan" />
        </div>
        <div className="flex items-center gap-6 relative">
          <div className={`p-4 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shadow-[0_0_20px_rgba(0,243,255,0.1)] ${isForging ? 'animate-pulse' : ''}`}>
            <Skull className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">MURBUG_VIRTEX_FORGE</h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-[10px] text-gray-500 flex items-center gap-2 uppercase tracking-[0.3em] font-mono">
                <span className={`w-1.5 h-1.5 rounded-full bg-cyber-magenta animate-ping`} />
                Neural_Payload_Gen : v9.5.1
              </p>
              <span className="text-[8px] bg-cyber-cyan/20 border border-cyber-cyan/30 px-2 py-0.5 rounded text-cyber-cyan font-bold uppercase tracking-widest">5200_FEATURES_ACTIVE</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="glass-morphism px-4 py-2 rounded-xl flex flex-col items-end">
             <span className="text-[8px] text-gray-500 uppercase">Buffer Stability</span>
             <span className="text-xl font-black text-cyber-magenta">Critical</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Selector Side */}
        <div className="w-80 border-r border-white/5 p-8 space-y-6 overflow-y-auto">
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold text-cyber-cyan tracking-widest uppercase">Select_Payload_Type</h2>
            {VIRTEX_TYPES.map(type => (
              <button 
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group ${selectedType === type.id ? 'bg-white/5 border-cyber-cyan shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'border-white/5 opacity-40 hover:opacity-100 hover:bg-white/5'}`}
              >
                <div className={`${type.color} group-hover:scale-110 transition-transform`}>{type.icon}</div>
                <div className="flex-1 overflow-hidden">
                   <div className="text-xs font-bold uppercase">{type.name}</div>
                   <div className="text-[8px] opacity-40 truncate">{type.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <h2 className="text-[10px] font-bold text-cyber-cyan tracking-widest uppercase">Murbug_Intensity</h2>
                <div className="flex flex-col items-end">
                   <span className="text-xs font-mono text-cyber-magenta">{intensity}%</span>
                   <span className="text-[7px] text-gray-500 font-mono">{(intensity * 3).toLocaleString()}_B_KB</span>
                </div>
             </div>
             <input 
               type="range" 
               min="1" 
               max="100" 
               value={intensity}
               onChange={(e) => setIntensity(parseInt(e.target.value))}
               className="w-full accent-cyber-cyan"
             />
             <div className="flex justify-between text-[8px] font-mono text-gray-600">
                <span>STABLE</span>
                <span>SYSTEM_WIPE</span>
             </div>
          </div>

          <button 
            onClick={handleForge}
            disabled={isForging}
            className="w-full py-4 rounded-2xl bg-cyber-cyan text-black font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-[0_0_30px_rgba(0,243,255,0.2)] transition-all flex items-center justify-center gap-2 group"
          >
            {isForging ? <Layers className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 group-hover:animate-pulse" />}
            {isForging ? 'Forging...' : 'Forge_Murbug'}
          </button>
        </div>

        {/* Display Side */}
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 relative glass-morphism rounded-3xl border-white/5 p-8 font-mono text-[11px] overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 flex gap-4">
               <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-cyber-cyan hover:text-white transition-colors uppercase text-[10px] font-bold bg-black/40 border border-white/10 px-4 py-2 rounded-xl"
               >
                 {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 {copied ? 'Copied' : 'Extract_Payload'}
               </button>
            </div>

            <div className="space-y-4 h-full overflow-y-auto pr-4 scrollbar-hide py-10">
              <div className="text-cyber-magenta animate-pulse tracking-[0.5em] mb-8 font-black text-center text-xl">
                 /// MURBUG_VIRTEX_ACTIVE ///
              </div>
              
              <div className="break-all text-gray-500 leading-none">
                {isForging ? (
                  <div className="space-y-2 opacity-50">
                    {Array.from({length: 10}).map((_, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-cyber-cyan">[Infecting]</span>
                        {Math.random().toString(36).substring(2, 60)}...
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-white">Payload Reference: [GURU-{selectedType.toUpperCase()}-X]</div>
                    <div className="text-gray-600 line-clamp-[15] text-[8px]">
                       {Array.from({length: Math.floor(intensity * 10)}).map(() => "҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉").join(" ")}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
               <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-3">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Warning: Payload strictly for stress testing and ethical neural audit.</span>
               </div>
            </div>
          </div>

          {/* Mini Terminal */}
          <div className="h-40 glass-morphism rounded-2xl border-white/5 bg-black/40 p-4 font-mono text-[10px] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
               <span className="text-gray-500 uppercase">Murbug_Console_Stream</span>
               <TerminalIcon className="w-3 h-3 text-cyber-cyan" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 text-gray-500 scrollbar-hide">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-cyber-cyan opacity-40">❯</span>
                  <span>{log}</span>
                </div>
              ))}
              {logs.length === 0 && <div className="italic opacity-30 italic">Awaiting neural input...</div>}
              <div className="animate-pulse text-cyber-cyan">_</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
