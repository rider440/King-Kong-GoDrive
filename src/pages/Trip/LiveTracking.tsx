import React from 'react';
import { 
  MapPin, 
  Truck, 
  Navigation, 
  Search, 
  Layers, 
  Maximize2,
  Phone,
  MessageSquare,
  Info,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LiveTracking() {
  return (
    <div className="fixed inset-0 lg:left-64 top-16 bottom-16 lg:bottom-0 bg-surface-container overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Live Map" 
          className="w-full h-full object-cover grayscale brightness-75 contrast-125" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjFnkrPxZAwKIFTZvNLhsh6ybt3QT6FtS61xsrBA0sJX7fPe0srEONKh_Hw2LsCnUE-62V3Rj1ujUxgnMNz5tz16DC2s1ocyWt-bC_7EjzflQYTuDUwae2UbWqpJuGRbxclQsqoSyiDP9AUs1uQt46r70COCfzX4ppSRPlcQySxgLFTTHvHwsFTxUWRbbJiqcpdxDAK5JK36EJZB5jKYYNnEFjydR8D6N4WjBqwtp-mB9WkO-29RI0S1B2_eiEm4Uf7wVgworxh1k"
        />
        
        {/* Mock Vehicle Markers */}
        <div className="absolute top-1/3 left-1/4 group cursor-pointer">
          <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface px-3 py-1.5 rounded-lg shadow-xl border border-outline/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <p className="text-[10px] font-black text-primary uppercase">V-882 • Active</p>
              <p className="text-xs font-bold text-on-surface">Julian Rossi</p>
            </div>
            <div className="p-2 bg-primary text-white rounded-full shadow-lg border-2 border-white animate-bounce">
              <Truck size={16} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/3 group cursor-pointer">
          <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface px-3 py-1.5 rounded-lg shadow-xl border border-outline/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <p className="text-[10px] font-black text-emerald-600 uppercase">V-119 • Active</p>
              <p className="text-xs font-bold text-on-surface">Sarah Mitchell</p>
            </div>
            <div className="p-2 bg-emerald-500 text-white rounded-full shadow-lg border-2 border-white">
              <Truck size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 z-10 space-y-4">
        <div className="bg-surface/80 backdrop-blur-md p-1.5 rounded-xl shadow-xl border border-outline/10 flex flex-col gap-1">
          <button className="p-2.5 text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
            <Layers size={20} />
          </button>
          <button className="p-2.5 text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
            <Navigation size={20} />
          </button>
          <button className="p-2.5 text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <div className="absolute top-6 left-20 right-6 lg:right-auto lg:w-96 z-10">
        <div className="bg-surface/80 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-outline/10 flex items-center gap-2">
          <div className="flex-1 flex items-center bg-surface-container-low rounded-xl px-4 py-2 gap-3">
            <Search size={18} className="text-outline" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-outline font-medium" 
              placeholder="Track vehicle or driver..." 
              type="text"
            />
          </div>
          <button className="p-2.5 bg-primary text-white rounded-xl shadow-lg hover:shadow-primary/20 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Fleet Sidebar (Desktop) */}
      <div className="hidden lg:flex absolute top-24 bottom-6 right-6 w-80 z-10 flex-col gap-4">
        <div className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-outline/10 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-on-surface uppercase tracking-wider">Active Fleet</h3>
            <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">45 Running</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
            {[
              { id: 'V-882', driver: 'Julian Rossi', status: 'Moving', speed: '64 km/h', color: 'primary' },
              { id: 'V-119', driver: 'Sarah Mitchell', status: 'Moving', speed: '52 km/h', color: 'emerald' },
              { id: 'V-445', driver: 'Marcus Chen', status: 'Idle', speed: '0 km/h', color: 'amber' },
              { id: 'V-902', driver: 'Alex Thompson', status: 'Moving', speed: '78 km/h', color: 'primary' }
            ].map((v, i) => (
              <div key={i} className="p-4 bg-surface-container-lowest rounded-xl border border-outline/5 hover:border-primary/20 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", `bg-${v.color}/10 text-${v.color}`)}>
                      <Truck size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-on-surface">{v.id}</p>
                      <p className="text-[10px] text-on-surface-variant font-bold">{v.driver}</p>
                    </div>
                  </div>
                  <span className={cn("text-[8px] font-black uppercase px-1.5 py-0.5 rounded", `bg-${v.color}/10 text-${v.color}`)}>
                    {v.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant">
                    <Navigation size={10} className="text-primary" />
                    <span>{v.speed}</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-surface-container-low text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                      <Phone size={12} />
                    </button>
                    <button className="p-1.5 bg-surface-container-low text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                      <MessageSquare size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Vehicle Detail */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaNL4kXfGeKZirbRZyD4PyrRRPcgbOvVfCTpt4fqEWnT6ZmSyCky9vKwuSxEOPNn2Zn_UWx12voTsahbnjx9mCWtitmzhJblBk7rHSCsmSl246WUXZLhyZKQcXrhMo8m03EilogrSQaHq-wNzqrW9FV6CF2XXWpTj3IFK9Kn8gKW7X-9UAIoKTIlZgYRLVwruRkv_eQJ_JYayaFDnPUzUaKvws9gjeDx7ngFhjHezZiEXKdGdbmGngv6UMdDcNBj6pVMzkrDEtOlQ" alt="Driver" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Currently Tracking</p>
              <p className="text-lg font-black leading-none mt-1">Julian Rossi</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
            <div className="flex flex-col gap-1">
              <span className="opacity-60">Destination</span>
              <span>Chicago, IL</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="opacity-60">ETA</span>
              <span>2h 45m</span>
            </div>
          </div>
          <Truck size={100} className="absolute -right-8 -bottom-8 opacity-10" />
        </div>
      </div>
    </div>
  );
}
