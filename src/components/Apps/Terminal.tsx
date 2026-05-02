import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  ChevronRight, 
  Activity,
  Zap
} from 'lucide-react';

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'AETHER_GURU_SHELL v1.0.4',
    'Session established. Neural uplink stable.',
    'Type "help" for commands.'
  ]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newLogs = [...logs, `❯ ${input}`];
      
      switch (cmd) {
        case 'help':
          newLogs.push('Available: help, murbug --info, clear, sys -v, exit');
          break;
        case 'murbug --info':
          newLogs.push('MURBUG_CORE_V9.5: 5200 active features, 3B_KB Payload Density detected.');
          break;
        case 'sys -v':
          newLogs.push('AetherOS Guru Build 2026.05.02-ALPHA');
          break;
        case 'clear':
          setLogs([]);
          setInput('');
          return;
        default:
          newLogs.push(`Command not found: ${cmd}`);
      }
      
      setLogs(newLogs.slice(-15));
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black/90 p-6 font-mono text-[11px] text-cyber-cyan flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className={log.startsWith('❯') ? 'text-white' : 'opacity-80'}>{log}</div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-white">❯</span>
          <input 
            autoFocus
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-cyber-cyan p-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
          />
          <div className="w-1.5 h-3 bg-cyber-cyan animate-pulse" />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-30 text-[9px]">
        <span>SYS_LOG: BUFFER_OPTIMAL</span>
        <Activity className="w-3 h-3" />
      </div>
    </div>
  );
};
