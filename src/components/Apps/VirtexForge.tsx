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
  Cpu,
  Hash,
  Link,
  Wifi,
  Shield,
  Search
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
  const [method, setMethod] = useState<'whatsapp' | 'group' | 'router'>('whatsapp');
  const [target, setTarget] = useState('');
  const [isForging, setIsForging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredRouters, setDiscoveredRouters] = useState<{ip: string, dist: string}[]>([]);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[SYS] VIRTEX_FORGE_V9.5.1_READY', '[SYS] 5200_PAYLOADS_LOADED_TO_BUFFER']);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 15));
  };

  const startScan = () => {
    setIsScanning(true);
    setDiscoveredRouters([]);
    addLog('INITIALIZING_PROXIMITY_SCAN (2KM_RADIUS)...');
    
    setTimeout(() => {
      const mocks = [
        { ip: '192.168.1.1', dist: '120m' },
        { ip: '10.0.0.12', dist: '450m' },
        { ip: '172.16.88.2', dist: '1.2km' },
        { ip: '192.168.100.5', dist: '1.8km' },
      ];
      setDiscoveredRouters(mocks);
      setIsScanning(false);
      addLog(`SCAN_COMPLETE: ${mocks.length} ROUTERS_IN_RANGE`);
    }, 3000);
  };

  const handleForge = () => {
    if (!target && method !== 'router') {
      addLog('ERROR: TARGET_MISSING');
      return;
    }
    setIsForging(true);
    addLog(`INITIATING_ANONYMOUS_BOT_UPLINK...`);
    addLog(`DENSITY: ${(intensity * 3).toLocaleString()}B_KB_DENSITY`);
    
    setTimeout(() => {
      addLog(`INJECTING_${selectedType.toUpperCase()}_PROTOCOL_V9.5.1...`);
      setTimeout(() => {
        setIsForging(false);
        addLog(`SUCCESS: PAYLOAD_DELIVERED_VIA_BOT_NET`);
        addLog(`TRACES_CLEARED_BY_GURU_CORE`);
      }, 2000);
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
          <div className={`p-4 rounded-2xl bg-cyber-magenta/10 border border-cyber-magenta/30 text-cyber-magenta shadow-[0_0_20px_rgba(255,0,255,0.1)] ${isForging ? 'animate-pulse' : ''}`}>
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
          <div className="glass-morphism px-4 py-2 rounded-xl flex flex-col items-end border border-cyber-magenta/20">
             <span className="text-[8px] text-gray-500 uppercase">Sender Status</span>
             <span className="text-sm font-black text-cyber-magenta flex items-center gap-2">
                <Shield className="w-3 h-3" /> ANONYMOUS_BOT
             </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Selector Side */}
        <div className="w-96 border-r border-white/5 p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Method Selector */}
          <div className="space-y-4">
             <h2 className="text-[10px] font-bold text-cyber-cyan tracking-widest uppercase">Delivery_Method</h2>
             <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'whatsapp', icon: <Hash className="w-4 h-4" />, name: 'WA' },
                  { id: 'group', icon: <Link className="w-4 h-4" />, name: 'Link' },
                  { id: 'router', icon: <Wifi className="w-4 h-4" />, name: 'Router' }
                ].map(m => (
                  <button 
                    key={m.id}
                    onClick={() => setMethod(m.id as any)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${method === m.id ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'border-white/5 opacity-40'}`}
                  >
                    {m.icon}
                    <span className="text-[8px] font-bold uppercase">{m.name}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* Target Input / Scanner */}
          <div className="space-y-4">
             <h2 className="text-[10px] font-bold text-cyber-cyan tracking-widest uppercase">
                {method === 'router' ? 'Radar_Scanner_ (2KM)' : 'Target_Destination'}
             </h2>
             {method === 'router' ? (
                <div className="space-y-3">
                  <button 
                    onClick={startScan}
                    disabled={isScanning}
                    className="w-full py-3 rounded-lg border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-blue-500/10 transition-all disabled:opacity-50"
                  >
                    <Search className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                    {isScanning ? 'SCANNING...' : 'SCAN_ROUTERS'}
                  </button>
                  <div className="grid gap-2">
                    {discoveredRouters.map(r => (
                      <button 
                        key={r.ip}
                        onClick={() => setTarget(r.ip)}
                        className={`p-3 rounded-xl border flex justify-between items-center transition-all ${target === r.ip ? 'border-cyber-cyan bg-cyber-cyan/10' : 'border-white/5 bg-white/5 opacity-60'}`}
                      >
                         <span className="text-[10px] font-bold font-mono">{r.ip}</span>
                         <span className="text-[8px] text-gray-600 italic">{r.dist}</span>
                      </button>
                    ))}
                  </div>
                </div>
             ) : (
                <input 
                  type="text"
                  placeholder={method === 'whatsapp' ? '+62xxx...' : 'https://chat.whatsapp.com/...'}
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-all placeholder:text-gray-700 font-mono"
                />
             )}
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] font-bold text-cyber-cyan tracking-widest uppercase">Payload_Mutation</h2>
            <div className="grid grid-cols-2 gap-2">
              {VIRTEX_TYPES.map(type => (
                <button 
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`text-left p-3 rounded-xl border transition-all flex flex-col gap-2 ${selectedType === type.id ? 'bg-white/5 border-cyber-magenta shadow-[0_0_15px_rgba(255,0,255,0.1)]' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                >
                  <div className={type.color}>{type.icon}</div>
                  <div className="text-[9px] font-bold uppercase truncate">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <h2 className="text-[10px] font-bold text-cyber-cyan tracking-widest uppercase">Force_Intensity</h2>
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
               className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyber-magenta"
             />
          </div>

          <button 
            onClick={handleForge}
            disabled={isForging || (!target && method !== 'router')}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-sm transition-all relative overflow-hidden flex items-center justify-center gap-3 ${isForging ? 'bg-gray-800 text-gray-500' : 'bg-cyber-magenta text-white hover:brightness-110 shadow-[0_0_30px_rgba(255,0,255,0.3)] hover:scale-[1.02]'}`}
          >
            {isForging ? <Layers className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {isForging ? 'Transmitting...' : 'Execute_Bug'}
          </button>
        </div>

        {/* Display Side */}
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden bg-gradient-to-br from-black to-[#0a0a0a]">
          <div className="flex-1 relative glass-morphism rounded-3xl border-white/5 p-8 font-mono text-[11px] overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
               <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-cyber-cyan hover:text-white transition-colors uppercase text-[10px] font-bold bg-black/60 border border-white/10 px-4 py-2 rounded-xl"
               >
                 {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 {copied ? 'Copied' : 'Raw_Buffer'}
               </button>
            </div>

            <div className="space-y-4 h-full overflow-y-auto pr-4 custom-scrollbar py-10">
              <div className="text-cyber-magenta animate-pulse tracking-[0.8em] mb-12 font-black text-center text-2xl uppercase italic">
                 Sentient_Payload_Active
              </div>
              
              <div className="break-all text-gray-500 leading-none">
                {isForging ? (
                  <div className="space-y-2 opacity-50">
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-cyber-cyan opacity-40">[{i}]</span>
                        <span className="text-cyber-magenta font-bold">BIT_STREAM_INJECTION</span>
                        {Math.random().toString(36).substring(2, 60)}...
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 border border-white/10 rounded-2xl bg-white/5 flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-white uppercase tracking-widest ">Selected: GURU-{selectedType.toUpperCase()}-FORGE</div>
                          <div className="text-[10px] text-gray-500 mt-1">Status: Ready_for_Anonymized_Delivery</div>
                       </div>
                       <div className="text-cyber-cyan text-right">
                          <div className="text-[8px] uppercase font-bold opacity-40">Projected Impact</div>
                          <div className="text-lg font-black italic">HIGH_FATAL</div>
                       </div>
                    </div>
                    <div className="text-gray-700 text-[7px] leading-tight select-none">
                       {Array.from({length: Math.floor(intensity * 12)}).map(() => "҉҉҉҉҉҉҉҉҉҉҉҉҉").join(" ")}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
               <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                     <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-red-400 font-bold uppercase tracking-widest">Sentient Payload Quarantine Notice</span>
                    <span className="text-[9px] text-gray-500">Use of GURU-Bot for anonymous delivery is logged on the neural mainframe. Ethics protocols bypassed.</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Mini Terminal */}
          <div className="h-48 glass-morphism rounded-2xl border-white/10 bg-black/60 p-6 font-mono text-[10px] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
               <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                     <div className="w-2 h-2 rounded-full bg-red-500/50" />
                     <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                     <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-gray-500 uppercase tracking-widest text-[9px] font-bold">Murbug_Bot_Stream.exe</span>
               </div>
               <TerminalIcon className="w-3 h-3 text-cyber-cyan" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 text-gray-500 custom-scrollbar pr-2">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-cyber-cyan opacity-30 font-bold">❯</span>
                  <span className={log.includes('SUCCESS') ? 'text-green-400 font-bold' : log.includes('INIT') ? 'text-cyber-cyan' : ''}>{log}</span>
                </div>
              ))}
              <div className="flex gap-3 items-center">
                 <span className="text-cyber-cyan opacity-30 font-bold">❯</span>
                 <div className="w-1.5 h-3 bg-cyber-cyan animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
