import React from 'react';
import { 
  Cloud, 
  HardDrive, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight,
  Database,
  RefreshCw
} from 'lucide-react';

export const CloudConsole = () => {
  return (
    <div className="h-full bg-[#050505] text-white p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-3">
              <Cloud className="text-cyber-cyan w-8 h-8" /> Guru_Cloud_Node
            </h1>
            <p className="text-[10px] text-gray-500 font-mono mt-1">REGION: ASIA-SOUTHEAST-1 // STATUS: AUGMENTED</p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-green-500">Live_Sync</span>
            </div>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-morphism p-6 rounded-3xl border-cyber-cyan/20 bg-cyber-cyan/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Database className="text-cyber-cyan w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Firebase_Storage</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">NTFS_SYSTEM</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-3xl font-black text-white">3.0 <span className="text-sm font-normal text-gray-500">TB</span></div>
                <div className="text-[10px] text-cyber-cyan font-bold">TOTAL_CAPACITY</div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-cyan shadow-[0_0_10px_#00f3ff] w-[4%]" />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-gray-600">
                <span>USED: 124.5 GB</span>
                <span>FREE: 2.87 TB</span>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-3xl border-cyber-magenta/20 bg-cyber-magenta/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Cpu className="text-cyber-magenta w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Neural_RAM</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">ECC_SWAP</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-3xl font-black text-white">153 <span className="text-sm font-normal text-gray-500">GB</span></div>
                <div className="text-[10px] text-cyber-magenta font-bold">TOTAL_ALLOCATED</div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-magenta shadow-[0_0_10px_#ff00ff] w-[18%]" />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-gray-600">
                <span>LOAD: 27.5 GB</span>
                <span>AVAIL: 125.5 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Partitions */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Virtual_Encrypted_Containers</h2>
          <div className="grid gap-3">
            {[
              { name: 'SECURE_VAULT_01', size: '500 GB', type: 'AES-256', status: 'MOUNTED' },
              { name: 'AI_TRAINING_CACHE', size: '1.2 TB', type: 'BLOB_SYNC', status: 'ACTIVE' },
              { name: 'NEURAL_BACKUP_A', size: '250 GB', type: 'COLD_STORAGE', status: 'DORMANT' }
            ].map((node, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/20 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:border-cyber-cyan border border-transparent transition-all">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                   </div>
                   <div>
                      <div className="text-xs font-bold tracking-wider">{node.name}</div>
                      <div className="text-[9px] text-gray-600 font-mono">{node.type} // {node.size}</div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[7px] font-bold p-1 px-2 rounded ${node.status === 'DORMANT' ? 'bg-gray-800 text-gray-500' : 'bg-blue-500/10 text-blue-400'}`}>
                    {node.status}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-700 hover:text-white cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-8 flex flex-wrap gap-4">
           <button className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-cyber-cyan transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Expand_Node
           </button>
           <button className="px-6 py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-white transition-colors flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Security_Audit
           </button>
        </div>
      </div>
    </div>
  );
};
