import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  Users, 
  MapPin, 
  Gauge,
  Clock,
  CheckCircle2,
  AlertCircle,
  Route,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Overview Dashboard</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Real-time fleet performance and operational metrics.</p>
        </div>
      </section>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main KPI */}
          <div className="md:col-span-2 bg-primary-container p-8 rounded-2xl text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-56">
            <div className="relative z-10">
              <span className="text-[0.75rem] font-bold uppercase tracking-wider opacity-80">Total Distance Today</span>
              <div className="text-[4rem] font-black leading-none mt-2">2,500 <span className="text-xl font-normal">km</span></div>
            </div>
            <div className="relative z-10 mt-auto flex items-center gap-2 bg-white/10 w-fit px-4 py-1.5 rounded-full text-xs backdrop-blur-sm border border-white/10">
              <TrendingUp size={14} />
              <span>12% increase from yesterday</span>
            </div>
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Route size={120} />
            </div>
          </div>

          {/* Side KPIs */}
          <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5 flex-1 flex flex-col justify-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Total Vehicles</span>
              <div className="text-3xl font-black text-primary mt-1">150</div>
              <div className="w-full h-1.5 bg-surface-container-high mt-4 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-primary"></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5 flex-1 flex flex-col justify-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Active Drivers</span>
              <div className="text-3xl font-black text-primary mt-1">120</div>
              <div className="flex items-center gap-2 mt-3 text-emerald-600">
                <div className="pulse-dot" />
                <span className="text-xs font-bold">80% Utilization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl shadow-ambient border border-outline/5 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-on-surface">Attendance</h3>
              <p className="text-[0.7rem] text-on-surface-variant font-medium">Morning Shift (06:00 - 14:00)</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary">92%</span>
              <p className="text-[0.6rem] text-on-surface-variant font-bold uppercase tracking-tighter">On-Time</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-surface-container-low p-3 rounded-xl text-center">
              <p className="text-lg font-black text-on-surface">112</p>
              <p className="text-[0.6rem] font-bold text-on-surface-variant uppercase">Present</p>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl text-center">
              <p className="text-lg font-black text-tertiary">8</p>
              <p className="text-[0.6rem] font-bold text-on-tertiary-fixed-variant uppercase">Leave</p>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl text-center">
              <p className="text-lg font-black text-error">2</p>
              <p className="text-[0.6rem] font-bold text-on-error-container uppercase">Absent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-on-surface flex items-center gap-2 uppercase tracking-wider">
              <MapPin size={18} className="text-primary" />
              Real-time Fleet Map
            </h2>
            <button className="text-[0.7rem] font-bold uppercase tracking-widest text-primary hover:underline">View Full Map</button>
          </div>
          <div className="h-96 rounded-2xl overflow-hidden shadow-ambient relative border border-outline/5 bg-surface-container">
            <img 
              alt="Map" 
              className="w-full h-full object-cover grayscale brightness-75 contrast-125" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjFnkrPxZAwKIFTZvNLhsh6ybt3QT6FtS61xsrBA0sJX7fPe0srEONKh_Hw2LsCnUE-62V3Rj1ujUxgnMNz5tz16DC2s1ocyWt-bC_7EjzflQYTuDUwae2UbWqpJuGRbxclQsqoSyiDP9AUs1uQt46r70COCfzX4ppSRPlcQySxgLFTTHvHwsFTxUWRbbJiqcpdxDAK5JK36EJZB5jKYYNnEFjydR8D6N4WjBqwtp-mB9WkO-29RI0S1B2_eiEm4Uf7wVgworxh1k"
            />
            {/* Markers */}
            <div className="absolute top-1/4 left-1/3 p-1.5 bg-primary text-white rounded-full shadow-lg border-2 border-white">
              <Truck size={12} />
            </div>
            <div className="absolute top-1/2 right-1/4 p-1.5 bg-emerald-500 text-white rounded-full shadow-lg border-2 border-white">
              <Truck size={12} />
            </div>
            {/* Overlay */}
            <div className="absolute bottom-4 right-4 left-4 lg:left-auto lg:w-72 bg-surface/80 backdrop-blur-md p-4 rounded-xl border border-outline/10 flex justify-between items-center shadow-xl">
              <div>
                <p className="text-[0.65rem] font-black text-primary uppercase tracking-wider">Running Trips</p>
                <p className="text-xl font-black text-on-surface">45 <span className="text-xs font-medium text-on-surface-variant">Vehicles active</span></p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Gauge size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">Recent Activity</h2>
            <button className="text-on-surface-variant hover:bg-surface-container p-1 rounded transition-colors">
              <Settings size={18} />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Robert Fox', id: 'NY-8829', status: 'Active', color: 'emerald' },
              { name: 'Jane Cooper', id: 'NJ-1244', status: 'Idle', color: 'amber' },
              { name: 'Guy Hawkins', id: 'Off Duty', status: 'Offline', color: 'slate' }
            ].map((item, i) => (
              <div key={i} className="bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between shadow-sm border-l-4 border-primary hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{item.name}</p>
                    <p className="text-[0.65rem] text-on-surface-variant font-medium">{item.id}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-[0.65rem] font-black uppercase",
                  item.color === 'emerald' && "bg-emerald-500/10 text-emerald-500",
                  item.color === 'amber' && "bg-amber-500/10 text-amber-500",
                  item.color === 'slate' && "bg-surface-container-highest text-on-surface-variant"
                )}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-[0.7rem] font-bold text-primary uppercase tracking-widest bg-surface-container-lowest border border-outline/10 rounded-xl hover:bg-surface-container transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
}
