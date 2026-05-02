import React from 'react';
import { 
  Settings as SettingsIcon, 
  Layout, 
  Smartphone, 
  Monitor,
  Shield,
  Palette,
  Check
} from 'lucide-react';

interface SettingsProps {
  layoutPolicy: 'tabs' | 'slider' | 'bottom';
  setLayoutPolicy: (p: 'tabs' | 'slider' | 'bottom') => void;
  showActionBar: boolean;
  setShowActionBar: (v: boolean) => void;
}

export const SettingsApp = ({ layoutPolicy, setLayoutPolicy, showActionBar, setShowActionBar }: SettingsProps) => {
  return (
    <div className="h-full bg-[#0a0a0a] text-white p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-md mx-auto space-y-12 pb-12">
        <div>
          <h2 className="text-[10px] font-black tracking-[0.3em] text-cyber-cyan uppercase mb-6 flex items-center gap-2">
            <Layout className="w-3 h-3" /> Mobile_Layout_Engine
          </h2>
          <div className="grid gap-3">
             {[
               { id: 'tabs', name: 'Tabs System', desc: 'Standard Android navigation' },
               { id: 'slider', name: 'Slider Menu', desc: 'Modern side-scrolling interface' },
               { id: 'bottom', name: 'Bottom Menu', desc: 'Classic iOS style control' }
             ].map(opt => (
               <button 
                 key={opt.id}
                 onClick={() => setLayoutPolicy(opt.id as any)}
                 className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${layoutPolicy === opt.id ? 'bg-cyber-cyan/10 border-cyber-cyan shadow-[0_0_20px_rgba(0,243,255,0.1)]' : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100'}`}
               >
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider">{opt.name}</div>
                    <div className="text-[10px] text-gray-500">{opt.desc}</div>
                  </div>
                  {layoutPolicy === opt.id && <Check className="w-4 h-4 text-cyber-cyan" />}
               </button>
             ))}
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-black tracking-[0.3em] text-cyber-magenta uppercase mb-6 flex items-center gap-2">
            <Smartphone className="w-3 h-3" /> Action_Bar_Config
          </h2>
          <button 
            onClick={() => setShowActionBar(!showActionBar)}
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${showActionBar ? 'bg-cyber-magenta/10 border-cyber-magenta' : 'bg-white/5 border-white/10 opacity-60'}`}
          >
             <div>
                <div className="text-xs font-bold uppercase tracking-wider">Top Action Bar</div>
                <div className="text-[10px] text-gray-500">{showActionBar ? 'Status: VISIBLE' : 'Status: HIDDEN'}</div>
             </div>
             <div className={`w-10 h-5 rounded-full relative transition-colors ${showActionBar ? 'bg-cyber-magenta' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${showActionBar ? 'left-6' : 'left-1'}`} />
             </div>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20">
           <div className="flex items-center gap-3 mb-2 text-red-500">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Advanced Kernel</span>
           </div>
           <p className="text-[10px] text-gray-500 leading-relaxed">
             Modifying system layouts requires neural sync. Changing to 'Slider' will enable side-scrolling navigation in the next update.
           </p>
        </div>
      </div>
    </div>
  );
};
