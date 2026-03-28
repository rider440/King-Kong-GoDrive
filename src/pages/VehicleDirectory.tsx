import React from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Calendar, 
  Fuel,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const vehicles = [
  {
    id: 'V-882',
    name: 'Mercedes-Benz Actros',
    reg: 'ABC-1234',
    type: 'Heavy Duty Truck',
    driver: 'Marcus Thorne',
    status: 'Active',
    fuel: '82%',
    nextService: 'Oct 12, 2023'
  },
  {
    id: 'V-119',
    name: 'Volvo FH16',
    reg: 'XYZ-5678',
    type: 'Heavy Duty Truck',
    driver: 'Sarah Connor',
    status: 'Idle',
    fuel: '45%',
    nextService: 'Nov 05, 2023'
  },
  {
    id: 'V-445',
    name: 'Scania R-Series',
    reg: 'KEC-445',
    type: 'Light Commercial',
    driver: 'Unassigned',
    status: 'Maintenance',
    fuel: '12%',
    nextService: 'In Progress'
  }
];

export default function VehicleDirectory() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Vehicle Assets</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Manage and monitor your fleet inventory.</p>
        </div>
        <Link to="/vehicles/new" className="btn-primary px-6 py-3">
          <Plus size={18} />
          <span>Register Asset</span>
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Assets', value: '150', icon: Truck, color: 'primary' },
          { label: 'In Operation', value: '112', icon: MapPin, color: 'emerald' },
          { label: 'Maintenance', value: '8', icon: Settings, color: 'error' }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5 flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
              <p className={cn("text-3xl font-black mt-1", `text-${stat.color}`)}>{stat.value}</p>
            </div>
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", `bg-${stat.color}/10 text-${stat.color}`)}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input 
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm" 
              placeholder="Search by registration, model..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <Filter size={16} className="mr-2" />
              Type
            </button>
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Registration</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Assigned Driver</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant text-right">Next Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <Truck size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{v.name}</p>
                        <p className="text-xs text-on-surface-variant">{v.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary bg-primary/5 px-2 py-1 rounded">{v.reg}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className={cn("text-sm font-medium", v.driver === 'Unassigned' ? "text-slate-400 italic" : "text-on-surface")}>
                      {v.driver}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                      v.status === 'Active' && "bg-green-50 text-green-700 ring-green-600/20",
                      v.status === 'Idle' && "bg-amber-50 text-amber-700 ring-amber-600/20",
                      v.status === 'Maintenance' && "bg-error-container text-error ring-error/20"
                    )}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <p className="text-sm font-bold text-on-surface">{v.nextService}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Fuel size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500">{v.fuel}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
