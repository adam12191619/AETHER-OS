import React, { useState, useRef } from 'react';
import { 
  Upload, 
  File, 
  FolderPlus, 
  Search, 
  MoreVertical, 
  HardDrive,
  Cloud,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

interface FileItem {
  name: string;
  size: string;
  type: string;
  date: string;
  status: 'synced' | 'uploading' | 'error';
  progress?: number;
}

export const CloudVault = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { name: 'Neural_Module_v2.bin', size: '2.4 GB', type: 'Binary', date: '2026-05-01', status: 'synced' },
    { name: 'Target_Profile_09.osint', size: '124 MB', type: 'Data', date: '2026-05-02', status: 'synced' },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    const storageRef = ref(storage, `users/${auth.currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsUploading(true);
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => {
        console.error("Upload failed", error);
        setIsUploading(false);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newFile: FileItem = {
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            type: file.type.split('/')[1] || 'Unknown',
            date: new Date().toISOString().split('T')[0],
            status: 'synced'
          };
          setFiles([newFile, ...files]);
          setIsUploading(false);
          setUploadProgress(0);
        });
      }
    );
  };

  return (
    <div className="h-full bg-[#030303] text-white flex flex-col font-sans overflow-hidden">
      {/* Vault Header */}
      <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.1)]">
              <Cloud className="w-6 h-6 text-cyber-cyan" />
           </div>
           <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic">Guru_Vault</h1>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mt-0.5">
                 <Shield className="w-3 h-3 text-green-500" /> AES_256_ACTIVE // <HardDrive className="w-3 h-3" /> 3.0TB_PERSISTENCE
              </div>
           </div>
        </div>
        <div className="flex gap-2">
           <div className="relative group">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-6 py-2.5 bg-cyber-cyan text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,243,255,0.2)] disabled:opacity-50"
              >
                <Upload className="w-3 h-3" /> {isUploading ? 'Transferring...' : 'Inject_Data'}
              </button>
           </div>
           <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:border-white/40 transition-colors">
              <FolderPlus className="w-4 h-4 text-gray-400" />
           </button>
        </div>
      </div>

      {/* Progress Overlay */}
      <AnimatePresence>
        {isUploading && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-cyber-cyan/10 border-b border-cyber-cyan/20 overflow-hidden"
          >
            <div className="p-4 flex items-center gap-4">
               <Zap className="w-4 h-4 text-cyber-cyan animate-pulse" />
               <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest text-cyber-cyan">
                    <span>Neural Link: Uploading Payload</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyber-cyan shadow-[0_0_10px_#00f3ff]" 
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Explorer Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Search */}
        <div className="relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
           <input 
             type="text" 
             placeholder="Search Guru Vault..." 
             className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium focus:border-cyber-cyan/40 outline-none transition-all"
           />
        </div>

        {/* File List */}
        <div className="space-y-2">
           <div className="grid grid-cols-12 px-4 mb-2 text-[9px] font-black uppercase tracking-widest text-gray-600">
              <div className="col-span-6">Identifier</div>
              <div className="col-span-2">Density</div>
              <div className="col-span-2">Mod_Date</div>
              <div className="col-span-2 text-right">Sync</div>
           </div>
           
           <div className="space-y-1">
             {files.map((file, i) => (
               <div key={i} className="grid grid-cols-12 items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer group">
                  <div className="col-span-6 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyber-cyan/40 transition-all">
                        <File className="w-4 h-4 text-gray-400 group-hover:text-cyber-cyan" />
                     </div>
                     <div>
                        <div className="text-[11px] font-bold tracking-tight text-white">{file.name}</div>
                        <div className="text-[9px] text-gray-500 uppercase">{file.type}</div>
                     </div>
                  </div>
                  <div className="col-span-2 text-[10px] font-mono text-gray-400">{file.size}</div>
                  <div className="col-span-2 text-[10px] font-mono text-gray-400">{file.date}</div>
                  <div className="col-span-2 flex justify-end">
                     {file.status === 'synced' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500/50" />
                     ) : file.status === 'error' ? (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                     ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-t-cyber-cyan border-white/10 animate-spin" />
                     )}
                     <button className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                     </button>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Vault Footer Info */}
      <div className="p-4 bg-black/60 border-t border-white/5 flex items-center justify-between text-[9px] font-bold text-gray-600 uppercase tracking-widest">
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Encryption: End-to-End</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-cyber-cyan" /> Connection: Fiber_Direct</span>
         </div>
         <div className="flex items-center gap-2">
            <span>Quota: 124.5 GB / 3.0 TB</span>
            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-cyber-cyan w-[4%]" />
            </div>
         </div>
      </div>
    </div>
  );
};
