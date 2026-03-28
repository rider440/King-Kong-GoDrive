import React from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  UserPlus,
  Star,
  ShieldCheck,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const drivers = [
  {
    id: 'DRV-9021',
    name: 'Julian Rossi',
    license: 'NY-8829-XJ',
    type: 'Class A • Commercial',
    phone: '+1 (555) 012-3456',
    email: 'jrossi@kinetic.com',
    status: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNL4kXfGeKZirbRZyD4PyrRRPcgbOvVfCTpt4fqEWnT6ZmSyCky9vKwuSxEOPNn2Zn_UWx12voTsahbnjx9mCWtitmzhJblBk7rHSCsmSl246WUXZLhyZKQcXrhMo8m03EilogrSQaHq-wNzqrW9FV6CF2XXWpTj3IFK9Kn8gKW7X-9UAIoKTIlZgYRLVwruRkv_eQJ_JYayaFDnPUzUaKvws9gjeDx7ngFhjHezZiEXKdGdbmGngv6UMdDcNBj6pVMzkrDEtOlQ'
  },
  {
    id: 'DRV-4412',
    name: 'Sarah Mitchell',
    license: 'CA-1120-PO',
    type: 'Class B • Regional',
    phone: '+1 (555) 789-0123',
    email: 'smitchell@kinetic.com',
    status: 'Idle',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI6thDko0M43AIaPup3CgwoDnxU-eSVJI253kWLyHTJZBW7Xc3dSkTFcmtJ2cwd10qgVnJhZPcNrGInStwXRt53plWx1O7l5FK2jO-OWA6USZ39YULbpPRjp8bd6FHyXfjRvNbEWPVO9L8XQYpjwG9Svgg3m9_Hb_4Asn8h9oztq6qTW8Y9fw4cbAUB0upPYg2P0K9CmKzPtoHkk1m0tcu1VXJKcCSqmsyA1bUEJ6jGt0nMnZJzHD2UOZPkMN0pWCNed8uSd9SpJI'
  },
  {
    id: 'DRV-7718',
    name: 'Marcus Chen',
    license: 'TX-9001-AS',
    type: 'Class A • Long-Haul',
    phone: '+1 (555) 345-6789',
    email: 'mchen@kinetic.com',
    status: 'Offline',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0msHYteY3wNwXSrxZnn4iW9BiejN5lAcpyAuMFsr8XhdZrcyWwZ_HHglXQ11CZHwZdR0cDHtAQBIulzEAwsx-Ak32jgBWF3PIOy_1HXO093_AlNTyHJuur6ZTNCZ7WE4a_LoF1j3fUwF7BCTDHWtbb4hVIbh46LlVSx3_2EzmjKkBMHuVq3nGVZ13fOSjAugu1PLoEvpC54pmW5al5cNwCR7pPI0lobDNECg7qYX77xwuQAwpmlQsvoMy9gcVLLJj5XB_8HZRwVg'
  },
  {
    id: 'DRV-1256',
    name: 'Alex Thompson',
    license: 'FL-4498-MZ',
    type: 'Class C • Passenger',
    phone: '+1 (555) 231-5544',
    email: 'athompson@kinetic.com',
    status: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBku2EU5F0i9ooif8aAOoboKxcRUfExZfUoKKTb_hF7ptjmrkgJbdUfahmfEIkO54Q0Nt9tudgsVRw5VEBybtavaU98G5_eJeEVGbVPAJltMBY8HI32_tDPHfmiUKmAAZ93M6_fzAgKMtVQXds1N8jQeiwN04mkbyNE9LxsqJpbdNsvrfFBw7mwLuqEl2sqFxpW-o7Le_8BE4yUIjUtWYZ7xuaJQ27w-XaBPW6uG6XdQ4uRvunALTa2Tt1Y8vMYsMxIgSzDejpN7rc'
  }
];

export default function DriverDirectory() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Driver Directory</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Manage and monitor your precision team.</p>
        </div>
        <Link to="/drivers/new" className="btn-primary px-6 py-3">
          <UserPlus size={18} />
          <span>Add Driver</span>
        </Link>
      </section>

      <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm"
              placeholder="Search by name, license, or ID..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <Filter size={16} className="mr-2" />
              Status
            </button>
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <MoreVertical size={16} className="mr-2" />
              Sort
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Profile</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">License</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Contact</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={driver.image}
                          alt={driver.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container"
                        />
                        <div className={cn(
                          "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                          driver.status === 'Active' ? "bg-green-500 animate-pulse" :
                            driver.status === 'Idle' ? "bg-amber-500" : "bg-slate-300"
                        )} />
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{driver.name}</p>
                        <p className="text-xs text-on-surface-variant">ID: {driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-on-surface">{driver.license}</p>
                    <p className="text-xs text-on-surface-variant">{driver.type}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p className="text-on-surface">{driver.phone}</p>
                    <p className="text-on-surface-variant text-xs">{driver.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                      driver.status === 'Active' && "bg-green-50 text-green-700 ring-green-600/20",
                      driver.status === 'Idle' && "bg-amber-50 text-amber-700 ring-amber-600/20",
                      driver.status === 'Offline' && "bg-slate-100 text-slate-600 ring-slate-400/20"
                    )}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/drivers/${driver.id}`}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </Link>
                      <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline/5 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant font-medium">Showing <span className="text-on-surface font-bold">4</span> of <span className="text-on-surface font-bold">128</span> precision drivers</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors disabled:opacity-30" disabled>
              <Search size={16} className="rotate-90" />
            </button>
            <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm">1</button>
            <button className="px-3 py-1.5 hover:bg-surface-container-high text-xs font-bold rounded-lg transition-colors">2</button>
            <button className="px-3 py-1.5 hover:bg-surface-container-high text-xs font-bold rounded-lg transition-colors">3</button>
            <span className="px-2 text-on-surface-variant">...</span>
            <button className="px-3 py-1.5 hover:bg-surface-container-high text-xs font-bold rounded-lg transition-colors">12</button>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">On-Duty Drivers</h3>
            <MapPin size={18} className="text-primary" />
          </div>
          <p className="text-4xl font-bold text-primary">84%</p>
          <div className="w-full bg-surface-container rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium">+5% from yesterday</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Avg. Safety Score</h3>
            <ShieldCheck size={18} className="text-green-600" />
          </div>
          <p className="text-4xl font-bold text-on-surface">9.2</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => <Star key={i} size={12} className="text-primary fill-primary" />)}
            <Star size={12} className="text-slate-300" />
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium">Fleet-wide average rating</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Compliance Alerts</h3>
            <AlertTriangle size={18} className="text-error" />
          </div>
          <p className="text-4xl font-bold text-on-surface">3</p>
          <div className="flex -space-x-2">
            {[1, 2].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/driver${i}/32/32`} alt="Driver" />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full bg-error-container text-on-error-container text-[8px] flex items-center justify-center font-bold border-2 border-white">+1</div>
          </div>
          <p className="text-[10px] text-error font-bold uppercase tracking-tight">Expiring licenses detected</p>
        </div>
      </section>
    </div>
  );
}
