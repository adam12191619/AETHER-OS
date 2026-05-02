import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Cpu, 
  Search, 
  Lock, 
  Zap, 
  Globe, 
  Database, 
  Wifi, 
  Terminal as TerminalIcon,
  HardDrive,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

const CATEGORIES = [
  { id: 'exploits', name: 'Exploit Kits', count: 245, icon: <Cpu />, color: 'text-cyber-cyan', border: 'border-cyber-cyan/30' },
  { id: 'recon', name: 'Surveillance', count: 182, icon: <Globe />, color: 'text-cyber-magenta', border: 'border-cyber-magenta/30' },
  { id: 'crypto', name: 'Crypto Decoders', count: 312, icon: <Lock />, color: 'text-orange-500', border: 'border-orange-500/30' },
  { id: 'bypass', name: 'Neural Bypass', count: 98, icon: <Zap />, color: 'text-yellow-400', border: 'border-yellow-400/30' },
  { id: 'sat', name: 'Satellite Uplink', count: 154, icon: <Wifi />, color: 'text-blue-500', border: 'border-blue-500/30' },
  { id: 'db', name: 'DB Infiltration', count: 104, icon: <Database />, color: 'text-green-500', border: 'border-green-500/30' },
  { id: 'osint', name: 'Deep OSINT', count: 85, icon: <Search />, color: 'text-indigo-400', border: 'border-indigo-400/30' },
  { id: 'malware', name: 'Payload Lab', count: 120, icon: <Activity />, color: 'text-red-500', border: 'border-red-500/30' },
];

const ALL_TOOLS = [
  { name: 'Metasploit Core v6.2', cat: 'exploits', desc: 'Neural modular penetration framework' },
  { name: 'Auto-ZeroDay Engine', cat: 'exploits', desc: 'AI-driven vulnerability discovery' },
  { name: 'Buffer-Vortex', cat: 'exploits', desc: 'Advanced heap/stack overflow generator' },
  { name: 'Ghost-Eye v4', cat: 'recon', desc: 'Global IP surveillance & trace' },
  { name: 'Quantum AES Cracker', cat: 'crypto', desc: 'Sub-atomic bit-level decryption' },
  { name: 'Firewall Ghost v8', cat: 'bypass', desc: 'Stealth bypass for enterprise firewalls' },
  { name: 'Starlink Intercept', cat: 'sat', desc: 'Direct uplink hijacking protocol' },
  { name: 'SQL-Venom v5', cat: 'db', desc: 'Relational database injection engine' },
  { name: 'Social-Siphon', cat: 'osint', desc: 'Mass data harvesting from social APIs' },
  { name: 'Ransom-Gen Alpha', cat: 'malware', desc: 'Encrypted payload construction unit' },
  { name: 'Kernel-Striker', cat: 'exploits', desc: 'Ring-0 access privilege escalation' },
  { name: 'Signal-Jammer X', cat: 'sat', desc: 'Wide-spectrum frequency interference' },
];

export const Arsenal = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    let tools = ALL_TOOLS;
    if (selectedCat) tools = tools.filter(t => t.cat === selectedCat);
    if (search) {
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) || 
        t.desc.toLowerCase().includes(search.toLowerCase())
      );
    }
    return tools;
  }, [search, selectedCat]);

  return (
    <div className="flex flex-col h-full bg-[#050505] overflow-hidden font-sans">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-cyber-cyan/10 to-transparent border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter flex items-center gap-3">
              <Shield className="text-cyber-cyan" />
              1090_TACTICAL_ARSENAL
            </h2>
            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-[0.2em] font-mono">Firebase_Cloud_Sync : Level_Alpha</p>
          </div>
          <div className="flex gap-4">
            <div className="glass-morphism px-3 py-1 rounded-lg flex flex-col items-end">
              <span className="text-[8px] text-gray-500 uppercase">Cloud Capacity</span>
              <span className="text-[12px] text-cyber-cyan font-bold font-mono">10.4 PB Free</span>
            </div>
          </div>
        </div>

        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Neural search 1090+ cloud tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-cyber-cyan outline-none focus:border-cyber-cyan/30 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Categories */}
        <div className="w-64 border-r border-white/5 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setSelectedCat(null)}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${!selectedCat ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'}`}
          >
            <span className="text-xs font-bold uppercase tracking-widest">All Categories</span>
            <span className="text-[10px] opacity-50">1090+</span>
          </button>
          
          <div className="h-[1px] bg-white/5 my-4" />
          
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${selectedCat === cat.id ? `bg-white/10 border ${cat.border}` : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
            >
              <div className={`${cat.color} scale-75`}>{cat.icon}</div>
              <div className="flex-1 overflow-hidden">
                <div className="text-[10px] font-bold uppercase truncate">{cat.name}</div>
                <div className="text-[8px] opacity-40 font-mono tracking-tighter">{cat.count} AVAILABLE</div>
              </div>
              <ChevronRight className="w-3 h-3 opacity-20" />
            </button>
          ))}
        </div>

        {/* Tools Display */}
        <div className="flex-1 p-6 overflow-y-auto terminal-scroll">
          <div className="grid grid-cols-2 gap-4">
            {filteredTools.map((tool, i) => (
              <div 
                key={i}
                className="glass-morphism p-4 rounded-xl border-white/5 hover:border-cyber-cyan/30 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Activity className="w-3 h-3 text-cyber-cyan animate-pulse" />
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-cyber-cyan group-hover:scale-110 transition-transform">
                    <TerminalIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-cyber-cyan transition-colors">{tool.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{tool.desc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[8px] px-1.5 py-0.5 bg-white/5 rounded border border-white/10 font-mono text-gray-400">v4.2.0</span>
                      <span className="text-[8px] text-cyber-cyan/50 font-bold uppercase tracking-widest">Ready to Inject</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder for "the rest" of 1090 */}
            <div className="col-span-2 py-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
              <Layers className="w-8 h-8 mx-auto text-gray-700 mb-2" />
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">And {1090 - filteredTools.length} additional tactical modules integrated</p>
              <p className="text-[8px] text-gray-600 font-mono mt-1 italic">Synchronization verified via Guru-Neural_Link</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
