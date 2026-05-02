
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Music, 
  ImageIcon, 
  Layers, 
  Play, 
  Zap, 
  Cpu, 
  Loader2, 
  Download,
  Terminal as TerminalIcon,
  Trash2,
  Sparkles,
  Film,
  ShieldCheck
} from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore';

interface Task {
  id: string;
  type: 'video' | 'music' | 'image' | 'anime' | 'film';
  prompt: string;
  progress: number;
  status: 'processing' | 'completed' | 'queued' | 'failed';
  resultUrl?: string;
  isUltraHDR?: boolean;
  createdAt?: any;
}

export const CreativeForge = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'video' | 'music' | 'image' | 'anime' | 'film'>('video');
  const [prompt, setPrompt] = useState('');
  const [isHDR, setIsHDR] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'creative_tasks'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as Task[];
      setTasks(taskList);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'creative_tasks');
    });

    return () => unsubscribe();
  }, []);

  const startGeneration = async () => {
    if (!prompt.trim() || !auth.currentUser) return;
    
    const userId = auth.currentUser.uid;
    const initialPrompt = prompt;
    setPrompt('');

    try {
      // 1. Create task in Firestore
      const taskCol = collection(db, 'users', userId, 'creative_tasks');
      const docRef = await addDoc(taskCol, {
        userId,
        type: activeTab,
        prompt: initialPrompt,
        progress: 0,
        status: 'processing',
        createdAt: serverTimestamp()
      });

      // 2. Simulate generation process (In a real app, this would be a server-side trigger)
      let progress = 0;
      const interval = setInterval(async () => {
        progress += 10;
        
        if (progress >= 100) {
          clearInterval(interval);
          await updateDoc(doc(db, 'users', userId, 'creative_tasks', docRef.id), {
            progress: 100,
            status: 'completed',
            resultUrl: `https://picsum.photos/seed/${docRef.id}/800/450`
          });
        } else {
          await updateDoc(doc(db, 'users', userId, 'creative_tasks', docRef.id), {
            progress: progress
          });
        }
      }, 800);

    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'creative_tasks');
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'creative_tasks', taskId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'creative_tasks');
    }
  };

  return (
    <div className="flex h-full bg-[#050505] text-white">
      {/* Sidebar Tool Selection */}
      <div className="w-16 border-r border-white/10 flex flex-col items-center py-6 gap-6">
        <button 
          onClick={() => setActiveTab('video')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'video' ? 'bg-cyber-cyan text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'text-gray-500 hover:bg-white/5'}`}
        >
          <Video className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setActiveTab('image')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'image' ? 'bg-cyber-purple text-white shadow-[0_0_15px_rgba(112,0,255,0.4)]' : 'text-gray-500 hover:bg-white/5'}`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setActiveTab('music')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'music' ? 'bg-cyber-magenta text-white shadow-[0_0_15px_rgba(255,0,255,0.4)]' : 'text-gray-500 hover:bg-white/5'}`}
        >
          <Music className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setActiveTab('anime')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'anime' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-gray-500 hover:bg-white/5'}`}
        >
          <Sparkles className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setActiveTab('film')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'film' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-gray-500 hover:bg-white/5'}`}
        >
          <Film className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-8 space-y-6">
          <header className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter flex items-center gap-3">
                <Zap className="text-cyber-cyan" />
                CYBER_FORGE <span className="text-xs font-mono font-normal text-gray-500 mt-2">PROCESSOR_v4.2 ULTRA</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Hyper-Realistic Neural Synthesis Engine</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsHDR(!isHDR)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-bold transition-all ${isHDR ? 'bg-white/10 border-white/20 text-cyber-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'bg-black/40 border-white/5 text-gray-600'}`}
              >
                <ShieldCheck className="w-3 h-3" /> ULTRA_HDR
              </button>
            </div>
          </header>

          <div className="space-y-4">
            <div className="p-4 glass-morphism rounded-xl border-cyber-cyan/20">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe your ${activeTab} idea for hyper-realistic synthesis...`}
                className="w-full bg-transparent border-none outline-none resize-none h-24 text-sm font-mono text-cyber-cyan placeholder:text-gray-700"
              />
              <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-4">
                <div className="flex gap-4 text-[10px] text-gray-500 font-mono">
                  <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> NEURAL_GURU: LINKED</span>
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> HDR_PASS: {isHDR ? 'ULTRA' : 'SD'}</span>
                  <span className="text-cyber-cyan animate-pulse">● Render Speed: 1.2min/hr</span>
                </div>
                <button 
                  onClick={startGeneration}
                  className="bg-cyber-cyan/10 hover:bg-cyber-cyan text-cyber-cyan hover:text-black px-6 py-2 rounded-full font-bold text-xs transition-all uppercase tracking-widest flex items-center gap-2 border border-cyber-cyan/30"
                >
                  <Play className="w-3 h-3 fill-current" /> Initialize Render
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-auto px-8 pb-8 space-y-6">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <TerminalIcon className="w-3 h-3" /> Output_Logs
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {tasks.length === 0 && (
              <div className="h-32 rounded-xl flex items-center justify-center border border-dashed border-white/10 group cursor-default">
                <span className="text-xs text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">Queue is currently empty</span>
              </div>
            )}
            
            <AnimatePresence>
              {tasks.map(task => (
                <motion.div 
                  key={task.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-4 glass-morphism rounded-xl flex flex-col gap-4 border-l-4 border-cyber-cyan"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-cyber-cyan/20 text-cyber-cyan px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                          {task.type}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">ID://{task.id}</span>
                      </div>
                      <p className="text-xs text-gray-400 italic line-clamp-1">"{task.prompt}"</p>
                    </div>
                    {task.status === 'processing' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-cyber-cyan" />
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-cyber-cyan">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-cyber-cyan">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {task.status === 'processing' ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono text-cyber-cyan">
                        <span>SYNTHESIZING_BLOCKS...</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-cyber-cyan" 
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative group rounded-lg overflow-hidden border border-white/10 aspect-video bg-black/40">
                      <img 
                        src={task.resultUrl} 
                        alt="Generated Media" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-all">
                        <span className="text-xs font-bold uppercase tracking-widest text-cyber-cyan border-2 border-cyber-cyan px-4 py-2 rounded-lg">View Master Copy</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
