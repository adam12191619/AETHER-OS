
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Globe, 
  Terminal as TerminalIcon, 
  Cpu, 
  Wifi, 
  Database,
  Lock,
  Unlock,
  AlertTriangle,
  Zap,
  Search
} from 'lucide-react';

export const NetRunner = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [nodes, setNodes] = useState<{ id: number, x: number, y: number, status: 'active' | 'warning' | 'alert' }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToolCategory, setSelectedToolCategory] = useState<string | null>(null);

  const TOOL_CATEGORIES = [
    { 
      name: 'Exploit Kits', 
      count: 245, 
      icon: <Cpu className="w-3 h-3" />, 
      tools: [
        'Metasploit Core v6.2', 'Auto-ZeroDay Engine', 'Buffer-Vortex', 'Payload Generator X', 
        'Flash-Exploit Pro', 'Java-Siphon', 'Browser-Hook v2', 'RCE-Pulse', 'Heap-Spray Master',
        'Stack-Puncher', 'Format-Stringer', 'Kernel-Panic v9'
      ] 
    },
    { 
      name: 'Surveillance', 
      count: 182, 
      icon: <Globe className="w-3 h-3" />, 
      tools: [
        'Ghost-Eye v4', 'Traffic Intercept Alpha', 'Metadata Harvester', 'Location Tracer Pro', 
        'STINGRAY-Simulator', 'IMSI-Catcher v3', 'Video-Stream Hi-Jack', 'Mic-Listen Stealth',
        'Camera-Peek X', 'History-Scraper', 'Social-Grapher', 'Contact-Sync Bypass'
      ] 
    },
    { 
      name: 'Crypto Decoders', 
      count: 312, 
      icon: <Lock className="w-3 h-3" />, 
      tools: [
        'AES-Cracker (Quantum)', 'Quantum Brute-Force', 'Entropy Smasher v2', 'Hash Decoder Pro', 
        'RSA-Factorizer', 'SHA-Collision-Gen', 'Bcrypt-Burner', 'Argon2-Optimizer', 'ECC-Snapper',
        'Poly1305-Cracker', 'ChaCha20-Decrypt', 'Seed-Phrase Recover'
      ] 
    },
    { 
      name: 'Neural Bypass', 
      count: 98, 
      icon: <Zap className="w-3 h-3" />, 
      tools: [
        'Firewall Ghost v8', 'Auth-Skip Protocol', 'LDAP Injector Pro', 'Session Hijacker X', 
        'Face-Recognition Bypass', 'Voice-Clone Auth', 'Iris-Scan Simulator', 'Pattern-Lock Cracker',
        'MFA-Intercept Relay', 'CAPTCHA-Neural Solver', 'Behavioral-Sync Spoofer'
      ] 
    },
    { 
      name: 'Satellite Uplink', 
      count: 154, 
      icon: <Wifi className="w-3 h-3" />, 
      tools: [
        'Starlink-Intercept v2', 'GPS Spoofer Pro', 'Signal Jammer Alpha', 'UHF Intercept Master', 
        'Iridium-Paging Decrypt', 'LEO-Band Scanner', 'VSAT-Hijacker', 'Space-Packet Injector',
        'Telemetry-Streamer', 'Orbital-Drift Tracker', 'Ground-Station Spoofer'
      ] 
    },
    { 
      name: 'Database Infiltration', 
      count: 104, 
      icon: <Database className="w-3 h-3" />, 
      tools: [
        'SQL-Venom v5', 'NoSQL Bypasser', 'Schema Dumper Pro', 'Admin Brute-Force X', 
        'MongoDB-Atlas Cracker', 'Redis-Exploit Unit', 'Cassandra-Node Reaper', 'Oracle-Shadow Access',
        'Postgres-PrivEsc', 'DB2-Infiltrator', 'MariaDB-Slave Clone'
      ] 
    },
  ];

  const filteredTools = useMemo(() => {
    if (!searchTerm) return [];
    const allTools = TOOL_CATEGORIES.flatMap(cat => cat.tools);
    return allTools.filter(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // Generate random nodes for the map
// ... (rest of the useEffect for nodes and logs remains same)
  useEffect(() => {
    const newNodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      status: Math.random() > 0.8 ? 'warning' : 'active'
    }));
    setNodes(newNodes);
  }, []);

  // Simulate logs
  useEffect(() => {
    const messages = [
      "Establishing handshake with primary gateway...",
      "PACKET_RECV: 1024 bytes from 192.168.1.1",
      "Analyzing neural firewall patterns...",
      "DECRYPTING: Entropy level high.",
      "WARNING: Intrusion attempt detected at node 0x04",
      "REROUTING: Traffic redirected via AetherProxy",
      "STATUS: All systems operating within secure parameters.",
      "FETCH: Metadata mapping initiated.",
      "DEBUG: Buffer overflow protection active."
    ];

    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setLogs(prev => [msg, ...prev].slice(0, 15));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full bg-[#050505] text-[#00f3ff] font-mono p-4 gap-4 overflow-hidden">
      {/* Network Map */}
      <div className="flex-1 relative glass-morphism rounded-xl border-cyber-cyan/10 overflow-hidden">
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <Globe className="w-4 h-4 animate-spin-slow" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Global_Node_Map</span>
        </div>

        {/* SVG Connections and Nodes */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {nodes.map((node, i) => (
            nodes.slice(i + 1, i + 3).map(target => (
              <line 
                key={`${node.id}-${target.id}`}
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${target.x}%`} y2={`${target.y}%`}
                stroke="currentColor" strokeWidth="0.5"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
            ))
          ))}
        </svg>

        {nodes.map(node => (
          <motion.div 
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className={`relative group cursor-pointer`}>
              <div className={`w-3 h-3 rounded-full ${
                node.status === 'active' ? 'bg-cyber-cyan' : node.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              } shadow-[0_0_10px_currentColor] animate-pulse`} />
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block z-50">
                <div className="bg-black/90 border border-cyber-cyan/30 p-2 rounded text-[8px] whitespace-nowrap">
                  <div>NODE_ID: 0x{node.id.toString(16)}</div>
                  <div>IP: 10.0.0.{node.id}</div>
                  <div>LATENCY: {Math.floor(Math.random() * 50)}ms</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Floating Metrics */}
        <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-4">
          <div className="p-2 border border-cyber-cyan/10 bg-black/40 rounded flex flex-col">
            <span className="text-[8px] opacity-50 uppercase">Packets/Sec</span>
            <span className="text-sm font-bold">14,201</span>
          </div>
          <div className="p-2 border border-cyber-cyan/10 bg-black/40 rounded flex flex-col">
            <span className="text-[8px] opacity-50 uppercase">Encryption</span>
            <span className="text-sm font-bold">VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Side Control Panel */}
      <div className="w-80 flex flex-col gap-4">
        {/* Tools Arsenal (1090+ Tools via Cloud) */}
        <div className="flex-1 glass-morphism rounded-xl border-cyber-cyan/20 p-4 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-cyan">Tactical_Arsenal</span>
              <span className="text-[7px] text-gray-500 font-mono text-cyan-400/50">FIREBASE_CLOUD_SYNC: ACTIVE</span>
            </div>
            <span className="text-[8px] bg-cyber-cyan/20 px-2 py-0.5 rounded text-cyber-cyan font-bold">1090+ TOOLS</span>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
            <input 
              type="text"
              placeholder="Search 1090+ tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/60 border border-white/5 rounded-lg py-2 pl-7 pr-3 text-[10px] text-cyber-cyan outline-none focus:border-cyber-cyan/30 transition-all font-mono"
            />
          </div>

          <div className="flex-1 overflow-auto space-y-2 terminal-scroll">
            {searchTerm ? (
              <div className="space-y-1">
                {filteredTools.map((tool, i) => (
                  <button key={i} className="w-full text-left p-1.5 rounded bg-cyber-cyan/5 border border-cyber-cyan/10 text-[9px] text-cyber-cyan hover:bg-cyber-cyan/20 transition-all">
                    ❯ {tool}
                  </button>
                ))}
                {filteredTools.length === 0 && <span className="text-[8px] text-gray-600 block text-center mt-4">NO_MATCHING_TOOLS_FOUND</span>}
              </div>
            ) : (
              TOOL_CATEGORIES.map((cat, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedToolCategory(cat.name === selectedToolCategory ? null : cat.name)}
                  className={`w-full text-left p-2 rounded border border-white/5 hover:border-cyber-cyan/30 flex flex-col group transition-all ${selectedToolCategory === cat.name ? 'bg-cyber-cyan/10 border-cyber-cyan/50' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 group-hover:text-cyber-cyan">{cat.icon}</div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 group-hover:text-white">{cat.name}</span>
                    </div>
                    <span className="text-[8px] font-mono text-cyber-cyan/50">{cat.count}</span>
                  </div>
                  {selectedToolCategory === cat.name && (
                    <div className="mt-2 pl-6 space-y-1 border-l border-cyber-cyan/20 ml-1.5 animate-in slide-in-from-top-1">
                      {cat.tools.map((t, idx) => (
                        <div key={idx} className="text-[8px] text-gray-500 hover:text-cyber-cyan cursor-pointer transition-colors">
                          ↳ {t}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="p-4 glass-morphism rounded-xl border-cyber-cyan/20 space-y-4">
          <div className="flex items-center justify-between">
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-bold">SYS_HEALTH</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Neural Core', val: 92 },
              { label: 'Logic Buffer', val: 45 },
              { label: 'Heat Index', val: 18 }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[8px] uppercase">
                  <span>{stat.label}</span>
                  <span>{stat.val}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.val}%` }}
                    className="h-full bg-cyber-cyan"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Terminal Log */}
        <div className="flex-1 glass-morphism rounded-xl border-cyber-cyan/20 p-3 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
            <TerminalIcon className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase">Tactical_Stream</span>
          </div>
          <div className="flex-1 overflow-auto space-y-1 text-[9px] text-[#00f3ff]/70 terminal-scroll">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="opacity-30">[{new Date().toLocaleTimeString('en-GB')}]</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="flex flex-col items-center gap-1 p-2 border border-cyber-cyan/20 hover:bg-cyber-cyan/10 transition-colors rounded text-[8px] uppercase">
            <Wifi className="w-3 h-3" />
            Scan Wifi
          </button>
          <button className="flex flex-col items-center gap-1 p-2 border border-cyber-cyan/20 hover:bg-cyber-cyan/10 transition-colors rounded text-[8px] uppercase">
            <Lock className="w-3 h-3" />
            Secure Disk
          </button>
        </div>
      </div>
    </div>
  );
};
