import React from 'react';
import { HardDrive, Trash2, Folder, AppWindow as AppIcon, Hash } from 'lucide-react';

export const SystemStorage = () => {
  return (
    <div className="h-full bg-white text-black p-8 overflow-y-auto font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-light text-gray-800 mb-6">SYSTEM (C:) - 3.0 TB</h1>
          
          <div className="h-4 w-full bg-gray-200 flex mb-2">
            <div className="h-full bg-gray-700 w-[4%]" />
          </div>
          
          <div className="flex justify-between text-[11px] text-gray-500 font-medium">
             <span>124.5 GB used</span>
             <span>2.87 TB free</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 font-medium border-b border-gray-100 pb-4">
          This is how your storage is used and how you can free up space.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
             <div className="p-2 border border-gray-200">
               <AppIcon className="w-5 h-5 text-gray-700" />
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-xs font-bold">Cloud Apps & tactical modules</span>
                   <span className="text-xs text-gray-800 font-bold">852 GB</span>
                </div>
                <div className="h-1 w-full bg-gray-100">
                   <div className="h-full bg-gray-400 w-[28%]" />
                </div>
                <button className="text-[10px] text-gray-500 mt-2 hover:underline">Manage Aether modules</button>
             </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="p-2 border border-gray-200">
               <Trash2 className="w-5 h-5 text-gray-700" />
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-xs font-bold">Temporary neural cache</span>
                   <span className="text-xs text-gray-800 font-bold">2.4 GB</span>
                </div>
                <div className="h-1 w-full bg-gray-100">
                   <div className="h-full bg-gray-400 w-[2%]" />
                </div>
                <button className="text-[10px] text-gray-500 mt-2 hover:underline">Purge session files</button>
             </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="p-2 border border-gray-200">
               <Folder className="w-5 h-5 text-gray-700" />
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-xs font-bold">Other volumes (Guru_Sync)</span>
                   <span className="text-xs text-gray-800 font-bold">12.5 GB</span>
                </div>
                <div className="h-1 w-full bg-gray-100">
                   <div className="h-full bg-gray-400 w-[5%]" />
                </div>
                <button className="text-[10px] text-gray-500 mt-2 hover:underline">Browse virtual nodes</button>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 mt-8">
           <div className="flex items-center gap-2 mb-4">
              <Hash className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Advanced Neural Memory</span>
           </div>
           <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                 <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Neural_RAM_Capacity</div>
                 <div className="text-sm font-black italic">153.0 GB DDR5_AUGMENTED</div>
              </div>
              <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1">OPTIMIZED</div>
           </div>
        </div>
      </div>
    </div>
  );
};
