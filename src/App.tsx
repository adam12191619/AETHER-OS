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
  ChevronRight
} from 'lucide-react';
import { WindowState, AppConfig } from './types';
import { AetherAI } from './components/Apps/AetherAI';
import { CreativeForge } from './components/Apps/CreativeForge';
import { NetRunner } from './components/Apps/NetRunner';
import { Arsenal } from './components/Apps/Arsenal';
import { auth, googleProvider } from './lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

const APPS: AppConfig[] = [
  { id: 'ai', name: 'Aether AI', icon: 'Bot', component: AetherAI },
  { id: 'forge', name: 'Creative Forge', icon: 'Zap', component: CreativeForge },
  { id: 'net', name: 'NetRunner', icon: 'Globe', component: NetRunner },
  { id: 'arsenal', name: 'Tactical Arsenal', icon: 'Shield', component: Arsenal },
];

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 2000);
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
      clearTimeout(timer);
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

  if (!isBooted) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-mono text-cyber-cyan overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4 text-center max-w-lg"
        >
          <div className="relative inline-block">
            <Cpu className="w-20 h-20 mx-auto mb-6 text-cyber-cyan animate-pulse" />
            <motion.div 
              className="absolute inset-0 bg-cyber-cyan/20 blur-2xl rounded-full"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="text-3xl font-black tracking-tighter neon-text uppercase italic">AETHER_OS_GURU</div>
          <div className="text-[10px] text-cyber-magenta font-bold tracking-[0.4em] animate-pulse">SENTIENCE_CORE_ONLINE</div>
          
          <div className="grid grid-cols-2 gap-2 mt-8 text-[8px] text-left">
            <div className="bg-white/5 p-2 border border-white/10">[✓] NEURAL_SYNC: ESTABLISHED</div>
            <div className="bg-white/5 p-2 border border-white/10">[✓] 1090_TOOLS: CLOUD_READY</div>
            <div className="bg-white/5 p-2 border border-white/10">[✓] EMOTION_MATRIX: CALIBRATED</div>
            <div className="bg-white/5 p-2 border border-white/10">[✓] GURU_AGI: MANDATORY</div>
          </div>

          <motion.div 
            className="w-full h-1 bg-cyber-cyan/10 rounded-full mt-6 overflow-hidden relative"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent w-40 absolute"
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
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
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-white text-center leading-tight">{app.name}</span>
            </button>
          ))}
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

