import React, { useState, useRef, useEffect } from 'react';
import { 
  Scan, 
  Camera, 
  Upload, 
  User, 
  Globe, 
  MapPin, 
  Database, 
  ShieldAlert,
  Activity,
  Search,
  Fingerprint,
  Users,
  ChevronRight,
  Loader2,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TraceResult {
  id: string;
  name: string;
  alias: string;
  location: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  socialNodes: string[];
  lastSeen: string;
}

export const FaceTrace = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<TraceResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 12));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        startScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setResults(null);
    addLog('INITIALIZING_NEURAL_FACE_DECODER...');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      setUploadProgress(Math.min(100, progress));
      
      if (progress >= 30 && progress < 40) addLog('DECODING_BIOMETRIC_POINTS...');
      if (progress >= 60 && progress < 70) addLog('CROSS_REFERENCING_INTERPOL_DB...');
      if (progress >= 85 && progress < 95) addLog('GLOBAL_OSINT_SYPHON_ACTIVE...');

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setResults({
            id: 'NODE-X-7742',
            name: 'Classified Identity',
            alias: 'Subject_Beta_9',
            location: 'South Jakarta, Indonesia',
            threatLevel: 'High',
            socialNodes: ['Instagram: @subject_zero', 'GitHub: guru-neural', 'LinkedIn: Anonymous'],
            lastSeen: '14 minutes ago via Satellite Uplink 4'
          });
          addLog('TRACE_COMPLETE: Match found with 99.8% precision');
        }, 1000);
      }
    }, 400).unref();
  };

  const reset = () => {
    setSelectedImage(null);
    setResults(null);
    setIsScanning(false);
    setUploadProgress(0);
    setLogs([]);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar Info */}
      <div className="w-80 border-r border-white/5 bg-black/40 p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-500">
            <Scan className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase">Face_Trace_AI</h1>
            <span className="text-[8px] text-gray-500 font-mono tracking-widest uppercase">Global_Surveillance_v9</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Neural_Logs</h2>
          <div className="flex-1 glass-morphism rounded-2xl p-4 font-mono text-[9px] text-orange-400/70 h-64 overflow-y-auto scrollbar-hide space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="opacity-30">❯</span>
                <span>{log}</span>
              </div>
            ))}
            {logs.length === 0 && <div className="opacity-20 italic">Awaiting biometric input...</div>}
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-4 rounded-2xl border border-white/5 bg-white/5 font-mono text-[9px] space-y-2">
            <div className="flex justify-between text-gray-500">
              <span className="uppercase">Sat_Uplink</span>
              <span className="text-green-500 font-bold">STABLE</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span className="uppercase">Deep_Web_Tunnel</span>
              <span className="text-orange-500 font-bold">READY</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-3">
              <motion.div 
                className="h-full bg-orange-500"
                animate={{ width: isScanning ? `${uploadProgress}%` : '0%' }}
              />
            </div>
          </div>
          {selectedImage && (
            <button 
              onClick={reset}
              className="w-full mt-4 flex items-center justify-center gap-2 text-[9px] text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest font-bold"
            >
              <Trash2 className="w-3 h-3" /> WIPE_TRACE_DATA
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-12 flex-1 overflow-y-auto terminal-scroll">
          {!selectedImage && !isScanning && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl group hover:border-orange-500/20 transition-all cursor-pointer bg-white/[0.02]"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Upload_Target_Face</h2>
              <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Supports .JPG, .PNG / HD Surveillance Stream</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
            </motion.div>
          )}

          {(selectedImage || isScanning) && (
            <div className="grid grid-cols-2 gap-12 h-full">
              {/* Scan Area */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                {selectedImage && (
                  <img src={selectedImage} alt="Target" className="w-full h-full object-cover opacity-60" />
                )}
                
                {/* Scanner Overlay */}
                <AnimatePresence>
                  {isScanning && (
                    <>
                      <motion.div 
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_#00f3ff] z-10"
                      />
                      <motion.div 
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,143,255,0.1)_100%)] bg-[size:20px_20px] pointer-events-none"
                      />
                    </>
                  )}
                </AnimatePresence>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none font-mono">
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-t-2 border-l-2 border-orange-500" />
                    <div className="w-6 h-6 border-t-2 border-r-2 border-orange-500" />
                  </div>
                  {isScanning && (
                    <div className="text-center text-xs font-bold text-orange-500 animate-pulse tracking-[0.5em] bg-black/40 py-2 rounded">
                      [ANALYSING_FRAME_#{Math.floor(Math.random()*9999)}]
                    </div>
                  )}
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-b-2 border-l-2 border-orange-500" />
                    <div className="w-6 h-6 border-b-2 border-r-2 border-orange-500" />
                  </div>
                </div>
              </div>

              {/* Data Panel */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {isScanning ? (
                    <motion.div 
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center p-8 glass-morphism rounded-3xl"
                    >
                      <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Aggregating_Global_Data...</div>
                    </motion.div>
                  ) : results ? (
                    <motion.div 
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="glass-morphism p-6 rounded-3xl border-orange-500/20">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500">
                            <Fingerprint className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Match_Confirmed</h3>
                            <p className="text-[10px] text-gray-500 font-mono italic">Source: Interpol_Global_Audit</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Subject Name</span>
                            <span className="text-sm font-bold text-cyber-cyan">{results.name}</span>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Current Location</span>
                             <span className="text-sm font-bold text-gray-300">{results.location}</span>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Threat Assessment</span>
                             <span className={`text-sm font-bold ${results.threatLevel === 'High' ? 'text-red-500' : 'text-orange-500'}`}>{results.threatLevel}</span>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Last Contact</span>
                             <span className="text-[10px] font-mono text-gray-500">{results.lastSeen}</span>
                          </div>
                        </div>
                      </div>

                      <div className="glass-morphism p-6 rounded-3xl border-white/5">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Globe className="w-3 h-3" /> Connected_Social_Nodes
                        </h4>
                        <div className="space-y-2">
                          {results.socialNodes.map((node, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/20 transition-all cursor-pointer">
                               <span className="text-xs text-gray-300">{node}</span>
                               <ChevronRight className="w-3 h-3 text-orange-500" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-start gap-3">
                         <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                         <p className="text-[9px] text-orange-400 font-mono leading-relaxed">
                           WARNING: Subject connected to AetherOS neural nodes. 
                           Deep tracing has unlocked 1090+ tactical vectors.
                         </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 opacity-20">
                      <Search className="w-12 h-12 mb-4" />
                      <span className="text-xs uppercase tracking-widest">Awaiting neural analysis...</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
