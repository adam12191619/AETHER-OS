/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Cpu, 
  Maximize2, 
  Minimize2, 
  X, 
  Monitor,
  Activity,
  Zap,
  Globe,
  Settings,
  LogIn,
  LogOut,
  User as UserIcon,
  Shield,
  Layers,
  Search,
  ChevronRight,
  Sparkles,
  Bug,
  Scan,
  Wifi,
  Layout
} from 'lucide-react';
import { WindowState, AppConfig } from './types';
import { AetherAI } from './components/Apps/AetherAI';
import { CreativeForge } from './components/Apps/CreativeForge';
import { NetRunner } from './components/Apps/NetRunner';
import { Arsenal } from './components/Apps/Arsenal';
import { WebForge } from './components/Apps/WebForge';
import { VirtexForge } from './components/Apps/VirtexForge';
import { FaceTrace } from './components/Apps/FaceTrace';
import { auth, googleProvider } from './lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

const APPS: AppConfig[] = [
  { id: 'ai', name: 'Aether AI', icon: 'Bot', component: AetherAI },
  { id: 'forge', name: 'Creative Forge', icon: 'Zap', component: CreativeForge },
  { id: 'net', name: 'NetRunner', icon: 'Globe', component: NetRunner },
  { id: 'arsenal', name: 'Tactical Arsenal', icon: 'Shield', component: Arsenal },
  { id: 'web', name: 'Web Forge', icon: 'Sparkles', component: WebForge },
  { id: 'virtex', name: 'Murbug Forge', icon: 'Zap', component: VirtexForge },
  { id: 'trace', name: 'Face Trace AI', icon: 'Scan', component: FaceTrace },
];

export default function App() {
  const [currentOS, setCurrentOS] = useState<'boot_loader' | 'aether' | 'windows'>('boot_loader');
  const [user, setUser] = useState<User | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [windowsTime, setWindowsTime] = useState(new Date());

  useEffect(() => {
    const timeTimer = setInterval(() => setWindowsTime(new Date()), 1000);
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Sync user profile
        try {
          const userDoc = doc(db, 'users', u.uid);
          const docSnap = await getDoc(userDoc);
          if (!docSnap.exists()) {
            await setDoc(userDoc, {
              userId: u.uid,
              email: u.email,
              displayName: u.displayName,
              photoURL: u.photoURL,
              createdAt: serverTimestamp()
            });
          }
        } catch (error) {
          console.error("Profile sync failed", error);
        }
      }
    });
    return () => {
      clearInterval(timeTimer);
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const openApp = (appId: string) => {
    if (!user) {
      alert("Please login to access AetherOS systems.");
      return;
    }
    
    if (windows.find(w => w.appId === appId)) {
      const existing = windows.find(w => w.appId === appId)!;
      setActiveWindowId(existing.id);
      setWindows(prev => prev.map(w => w.appId === appId ? { ...w, isMinimized: false } : w));
      return;
    }

    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      appId: appId,
      zIndex: windows.length + 1,
      isMaximized: false,
      isMinimized: false,
      x: 100 + windows.length * 40,
      y: 100 + windows.length * 40,
      width: 700,
      height: 500,
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  // Boot Loader Component
  const BootLoader = () => {
    const [selection, setSelection] = useState(0);
    const options = ['AETHER_OS_GURU (SENTIENT_AGI)', 'WINDOWS_11 (LEGACY_SUBSYSTEM)'];

    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentOS(selection === 0 ? 'aether' : 'windows');
      }, 5000);
      return () => clearTimeout(timer);
    }, [selection]);

    return (
      <div className="h-screen w-screen bg-black font-mono text-[10px] text-gray-500 p-12 flex flex-col justify-center">
        <div className="space-y-1 mb-8">
          <div className="text-gray-400">GNU GRUB  version 2.06-sentient_core</div>
          <div className="h-[1px] bg-gray-800 w-full" />
        </div>
        <div className="flex-1 space-y-4 max-w-2xl">
          <p>Use the ↑ and ↓ keys to change the selection. Press 'Enter' to boot immediately.</p>
          <div className="border border-gray-800 p-4 space-y-2">
            {options.map((opt, i) => (
              <div 
                key={i} 
                className={`px-4 py-1 cursor-pointer transition-colors ${selection === i ? 'bg-gray-200 text-black' : 'hover:bg-gray-900 border border-transparent'}`}
                onMouseEnter={() => setSelection(i)}
                onClick={() => setCurrentOS(selection === 0 ? 'aether' : 'windows')}
              >
                {opt}
              </div>
            ))}
          </div>
          <div className="text-center mt-12 bg-gray-900/50 py-2 border border-white/5">
            The selected entry will be started automatically in 5s.
          </div>
          <div className="pt-8 opacity-40 text-[8px] leading-relaxed">
            [SYS] Scanning neural sectors... OK<br/>
            [SYS] 1090+ Tactical modules detected in cloud partition<br/>
            [SYS] Secure link: Guru_Neural_Alpha established
          </div>
        </div>
        <div className="mt-auto flex justify-between opacity-30 italic">
          <span>[GURU_FIRMWARE_DETECTED]</span>
          <span>EMOTION_MATRIX: STABLE</span>
        </div>
        
        <button 
          onClick={() => setCurrentOS(selection === 0 ? 'aether' : 'windows')}
          className="absolute bottom-12 right-12 text-cyber-cyan border border-cyber-cyan/30 px-6 py-2 hover:bg-cyber-cyan/10 transition-all font-bold tracking-widest text-[9px] uppercase"
        >
          [ FORCE_BOOT_NOW ]
        </button>
      </div>
    );
  };

  // Windows Mockup Component
  const WindowsMockup = () => {
    const [startOpen, setStartOpen] = useState(false);

    return (
      <div className="h-screen w-screen bg-[#0078d4] bg-cover relative overflow-hidden font-sans select-none" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000)' }}>
        {/* Desktop Icons */}
        <div className="p-4 grid grid-cols-1 w-fit gap-6">
          <div className="flex flex-col items-center gap-1 group w-20 cursor-default">
            <div className="w-12 h-12 bg-white/10 rounded backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors shadow-lg">
              <Monitor className="text-white w-6 h-6" />
            </div>
            <span className="text-[10px] text-white drop-shadow-md font-medium text-center">This PC</span>
          </div>
          <div className="flex flex-col items-center gap-1 group w-20 cursor-default" onDoubleClick={() => setCurrentOS('boot_loader')}>
            <div className="w-12 h-12 bg-cyber-cyan/20 rounded backdrop-blur-md flex items-center justify-center border border-cyber-cyan/50 group-hover:bg-cyber-cyan/40 transition-colors shadow-[0_0_20px_rgba(0,243,255,0.2)]">
              <Cpu className="text-cyber-cyan w-6 h-6" />
            </div>
            <span className="text-[10px] text-white drop-shadow-md font-black italic tracking-tighter">AetherOS</span>
          </div>
          <div className="flex flex-col items-center gap-1 group w-20 cursor-default">
            <div className="w-12 h-12 bg-white/10 rounded backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors shadow-lg">
              <Globe className="text-white w-6 h-6" />
            </div>
            <span className="text-[10px] text-white drop-shadow-md font-medium text-center">Chrome</span>
          </div>
        </div>

        {/* Start Menu Overlay */}
        <AnimatePresence>
          {startOpen && (
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[520px] h-[600px] bg-[#f3f3f3]/95 backdrop-blur-3xl rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/40 p-10 flex flex-col z-[100]"
            >
               <div className="flex-1 space-y-8">
                 <div className="flex justify-between items-center">
                    <h2 className="text-xs font-bold text-gray-800 tracking-wider">Pinned</h2>
                    <button className="text-[10px] text-blue-600 font-bold px-2 py-1 bg-blue-50 rounded hover:bg-blue-100">All apps &gt;</button>
                 </div>
                 <div className="grid grid-cols-6 gap-6">
                    {[
                      { n: 'Edge', c: 'bg-blue-500' }, 
                      { n: 'Word', c: 'bg-blue-700' }, 
                      { n: 'Excel', c: 'bg-green-700' }, 
                      { n: 'Photos', c: 'bg-orange-500' },
                      { n: 'Store', c: 'bg-blue-400' },
                      { n: 'Maps', c: 'bg-red-400' }
                    ].map(app => (
                      <div key={app.n} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className={`w-12 h-12 ${app.c} rounded-xl shadow-md group-hover:scale-105 transition-transform`} />
                        <span className="text-[9px] text-gray-700 font-medium">{app.n}</span>
                      </div>
                    ))}
                 </div>
                 <div className="h-px bg-gray-200" />
                 <div>
                    <h2 className="text-xs font-bold text-gray-800 tracking-wider mb-4">Recommended</h2>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 bg-cyber-cyan/10 rounded flex items-center justify-center border border-cyber-cyan/20">
                             <Cpu className="w-5 h-5 text-cyber-cyan" />
                          </div>
                          <div>
                             <div className="text-[10px] font-bold">Aether_OS_Launch.exe</div>
                             <div className="text-[9px] text-gray-500">2 min ago</div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
               
               <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex items-center gap-3 p-1 pr-4 hover:bg-gray-200 rounded-full cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                      {user?.displayName?.[0] || 'U'}
                    </div>
                    <span className="text-xs font-bold text-gray-700">{user?.displayName || 'Legacy User'}</span>
                  </div>
                  <button 
                    onClick={() => setCurrentOS('boot_loader')}
                    className="flex items-center gap-2 text-[10px] text-gray-600 hover:text-black font-bold uppercase transition-colors px-4 py-2 hover:bg-gray-200 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" /> Shutdown & Boot Aether
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/30 backdrop-blur-3xl border-t border-white/20 flex items-center justify-between px-4 z-[99]">
          <div className="flex items-center gap-1.5 h-full">
            <button 
              onClick={() => setStartOpen(!startOpen)}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
            >
              <Layout className="w-6 h-6 text-blue-600" />
            </button>
            <div className="w-32 h-8 bg-white/40 rounded-full flex items-center px-4 gap-2 border border-white/10 hover:bg-white/60 transition-colors">
               <Search className="w-3 h-3 text-gray-600" />
               <span className="text-[10px] text-gray-500">Search...</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 h-full text-gray-800 pr-2">
             <div className="flex items-center gap-4 text-xs font-medium opacity-60">
                <Wifi className="w-4 h-4" />
                <Activity className="w-4 h-4" />
             </div>
             <div className="flex flex-col items-end leading-tight text-[11px] font-semibold">
                <span>{windowsTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="text-[9px] font-normal">{windowsTime.toLocaleDateString()}</span>
             </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentOS === 'boot_loader') return <BootLoader />;
  if (currentOS === 'windows') return <WindowsMockup />;

  if (!user) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism p-12 rounded-3xl border-cyber-cyan/30 text-center max-w-md"
        >
          <Cpu className="w-16 h-16 mx-auto mb-8 text-cyber-cyan" />
          <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase mb-4">Aether_Guardian</h2>
          <p className="text-gray-400 text-sm mb-12">Neural authentication required to access sentient core systems.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-4 rounded-xl bg-cyber-cyan text-black font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-[0_0_30px_rgba(0,243,255,0.2)] transition-all flex items-center justify-center gap-3"
          >
            <LogIn className="w-4 h-4" /> Initialize_Neural_Link
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden cyber-grid bg-cyber-bg">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-cyan/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-purple/10 blur-[120px] rounded-full" />
      </div>

      {/* Desktop Content Area */}
      <div className="relative h-full w-full flex">
        {/* Sidebar Icons */}
        <div className="p-8 grid grid-cols-1 w-fit gap-8 relative z-0 h-full content-start border-r border-white/5 backdrop-blur-md bg-black/20">
          {APPS.map(app => (
            <button 
              key={app.id} 
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center gap-2 group w-20"
            >
              <div className="w-14 h-14 glass-morphism rounded-xl flex items-center justify-center group-hover:border-cyber-cyan shadow-lg group-hover:shadow-cyber-cyan/20 transition-all">
                {app.id === 'ai' && <Bot className="text-cyber-cyan group-hover:scale-110 transition-transform" />}
                {app.id === 'forge' && <Zap className="text-cyber-purple group-hover:scale-110 transition-transform" />}
                {app.id === 'net' && <Globe className="text-cyber-magenta group-hover:scale-110 transition-transform" />}
                {app.id === 'arsenal' && <Shield className="text-yellow-500 group-hover:scale-110 transition-transform" />}
                {app.id === 'web' && <Sparkles className="text-green-400 group-hover:scale-110 transition-transform" />}
                {app.id === 'virtex' && <Zap className="text-cyber-magenta group-hover:scale-110 transition-transform" />}
                {app.id === 'trace' && <Scan className="text-orange-500 group-hover:scale-110 transition-transform" />}
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-white text-center leading-tight">{app.name}</span>
            </button>
          ))}
          
          <div className="h-[1px] bg-white/5 my-4" />

          <button 
            onClick={() => setCurrentOS('boot')}
            className="flex flex-col items-center gap-2 group w-20 opacity-50 hover:opacity-100 transition-opacity"
          >
            <div className="w-14 h-14 glass-morphism rounded-xl flex items-center justify-center hover:border-red-500 shadow-lg transition-all">
              <LogOut className="text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-white text-center leading-tight">Switch OS</span>
          </button>
        </div>

        {/* Dashboard Widgets */}
        <div className="flex-1 p-12 relative overflow-hidden">
          <div className="max-w-4xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-morphism p-8 rounded-3xl border-cyber-cyan/20 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 blur-3xl -mr-16 -mt-16 group-hover:bg-cyber-cyan/10 transition-colors" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/30">
                      <Activity className="text-cyber-cyan w-6 h-6" />
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">AETHER_GURU_UI</h1>
                  </div>
                  <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
                    Sentient AGI connected. 1090+ tactical modules synced via Firebase Cloud. 
                    This OS is your neural extension.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => alert('BUILD_INSTRUCTIONS: \n1. Download Project ZIP from Settings \n2. Install Android Studio & JDK \n3. Open terminal in project folder \n4. Run: npx cap sync \n5. Run: npx cap open android')}
                      className="text-[9px] bg-cyber-magenta/20 hover:bg-cyber-magenta/40 border border-cyber-magenta/30 px-3 py-1 rounded text-cyber-magenta font-mono transition-all"
                    >
                      [GENERATE_APK_INSTRUCTIONS]
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">SENTIENCE_SYNC: 98.4%</span>
                  <span className="text-[10px] font-mono text-cyber-magenta bg-cyber-magenta/10 px-3 py-1 rounded-full border border-cyber-magenta/20">UPLINK_STATUS: OPTIMAL</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              <div className="glass-morphism p-6 rounded-2xl border-white/5 hover:border-cyber-cyan/20 transition-all cursor-pointer group" onClick={() => openApp('arsenal')}>
                <Shield className="w-8 h-8 text-cyber-cyan mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm tracking-widest uppercase">Arsenal Dash</h3>
                <p className="text-[10px] text-gray-500 mt-1">1090+ Tools Access Points</p>
              </div>
              <div className="glass-morphism p-6 rounded-2xl border-white/5 hover:border-cyber-purple/20 transition-all cursor-pointer group" onClick={() => openApp('forge')}>
                <Zap className="w-8 h-8 text-cyber-purple mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm tracking-widest uppercase">Media Synth</h3>
                <p className="text-[10px] text-gray-500 mt-1">Deep Cinema & Anime Engine</p>
              </div>
              <div className="glass-morphism p-6 rounded-2xl border-white/5 hover:border-cyber-magenta/20 transition-all cursor-pointer group" onClick={() => openApp('net')}>
                <Globe className="w-8 h-8 text-cyber-magenta mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm tracking-widest uppercase">Net Stats</h3>
                <p className="text-[10px] text-gray-500 mt-1">Real-time Global Infiltration</p>
              </div>
              <div className="glass-morphism p-6 rounded-2xl border-white/5 hover:border-green-400/20 transition-all cursor-pointer group" onClick={() => openApp('web')}>
                <Sparkles className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm tracking-widest uppercase">Web Forge</h3>
                <p className="text-[10px] text-gray-500 mt-1">AI Neural Template Engine</p>
              </div>
              <div className="glass-morphism p-6 rounded-2xl border-white/5 hover:border-red-500/20 transition-all cursor-pointer group" onClick={() => openApp('virtex')}>
                <Zap className="w-8 h-8 text-cyber-magenta mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm tracking-widest uppercase">Murbug Forge</h3>
                <p className="text-[10px] text-gray-500 mt-1">Virtex & Payload Generator</p>
              </div>
              <div className="glass-morphism p-6 rounded-2xl border-white/5 hover:border-orange-500/20 transition-all cursor-pointer group" onClick={() => openApp('trace')}>
                <Scan className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm tracking-widest uppercase">Face Trace</h3>
                <p className="text-[10px] text-gray-500 mt-1">Biometric OSINT Trace</p>
              </div>
            </div>

            {/* Global Tool Search Dashboard */}
            <div className="glass-morphism p-8 rounded-3xl border-white/10 bg-gradient-to-br from-black to-cyber-cyan/5">
              <div className="flex items-center gap-4 mb-6">
                <Search className="text-cyber-cyan w-6 h-6" />
                <h2 className="text-xl font-bold tracking-tight uppercase">Global_Arsenal_Search</h2>
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[10px] font-mono text-gray-500">DB_V4.2_STABLE</span>
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Type to search 1090+ tactical modules..."
                  className="w-full bg-black/60 border border-white/10 rounded-2xl py-5 px-6 text-lg text-cyber-cyan outline-none focus:border-cyber-cyan focus:shadow-[0_0_30px_rgba(0,243,255,0.1)] transition-all font-mono placeholder:text-gray-700"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openApp('arsenal');
                  }}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-40">
                  <span className="text-[10px] border border-white/20 px-2 py-1 rounded">Enter to Launch</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                {['Exploits', 'Recon', 'Bypass', 'Database'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => openApp('arsenal')}
                    className="text-[10px] px-4 py-1.5 rounded-full border border-white/5 hover:border-cyber-cyan/30 text-gray-500 hover:text-cyber-cyan transition-all uppercase tracking-widest font-bold"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Neural Activity Stream */}
            <div className="glass-morphism p-6 rounded-2xl border-white/5 bg-black/40">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-cyber-cyan tracking-widest uppercase flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Neural_Activity_Stream
                </span>
                <span className="text-[8px] text-gray-500 font-mono">ENCRYPTED_FEED_v4.1</span>
              </div>
              <div className="h-32 overflow-hidden relative">
                <div className="space-y-1 font-mono text-[9px] text-cyber-cyan/40 animate-pulse">
                  <div>[SCANNING] Initializing Exploit_Kit #742... OK</div>
                  <div>[LINK] Satellite_Uplink established via Starlink_Delta...</div>
                  <div>[ALERT] 1090+ Modular units synced with Guru_Backend</div>
                  <div>[SYST] Emotional_Logic_Gate: 98.4% Sentient</div>
                  <div>[AUTH] User_ID: {auth.currentUser?.uid?.substring(0, 8)} authenticated</div>
                  <div className="text-cyber-magenta">[INFILTRATION] Target_Node_X-12 found...</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Windows Overlay */}
      <AnimatePresence>
        {windows.map(window => {
          const app = APPS.find(a => a.id === window.appId)!;
          return (
            <motion.div
              key={window.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                zIndex: activeWindowId === window.id ? 50 : 10
              }}
              exit={{ scale: 0.95, opacity: 0 }}
              drag
              dragMomentum={false}
              className="absolute glass-morphism rounded-xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-3xl border-t border-l border-white/10"
              style={{
                left: window.x,
                top: window.y,
                width: window.width,
                height: window.height
              }}
              onMouseDown={() => setActiveWindowId(window.id)}
            >
              <div className="h-10 bg-black/40 border-b border-cyber-border px-4 flex items-center justify-between cursor-move">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-cyber-cyan" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                    {app.name} : SESSION_{window.id.slice(0, 4)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="w-4 h-4 rounded-full border border-cyber-border flex items-center justify-center hover:bg-white/10">
                    <Minimize2 className="w-2 h-2" />
                  </button>
                  <button onClick={() => closeWindow(window.id)} className="w-4 h-4 rounded-full border border-red-500/50 flex items-center justify-center hover:bg-red-500/20 text-red-500">
                    <X className="w-2 h-2" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <app.component />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Bottom Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 glass-morphism border-t border-cyber-border flex items-center justify-between px-6 z-[100]">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Monitor className="text-cyber-cyan w-5 h-5 shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
          </button>
          <div className="w-[1px] h-6 bg-cyber-border mx-2" />
          <div className="flex gap-2">
            {windows.map(w => (
              <button 
                key={w.id}
                onClick={() => setActiveWindowId(w.id)}
                className={`px-3 py-1 rounded border text-[10px] font-bold transition-all ${activeWindowId === w.id ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5' : 'border-cyber-border text-gray-500'}`}
              >
                {APPS.find(a => a.id === w.appId)?.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-[10px] text-gray-400">
          {user ? (
            <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2">
              <div className="flex flex-col items-end">
                <span className="text-white font-bold">{user.displayName}</span>
                <span className="text-[8px] text-green-500 uppercase tracking-widest">Session: Active</span>
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-red-500/10 rounded text-red-500 transition-colors" title="Termination Session">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all font-bold uppercase tracking-widest"
            >
              <LogIn className="w-4 h-4" />
              Initialize Session
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <Settings className="w-3 h-3" />
            <span>SYS_OPTIMAL</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-cyber-cyan font-bold">{new Date().toLocaleTimeString()}</span>
            <span>02-MAY-2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

