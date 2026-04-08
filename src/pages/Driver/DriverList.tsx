import React, { useState, useEffect } from 'react';
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
  MapPin,
  Route,
  FileText
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Gender, PaymentType, Driver } from '@/types';
import AddDriver from './AddDriver';
import { getDrivers } from '@/services/driverService';
import { Loader2 } from 'lucide-react';

export default function DriverDirectory() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    id?: string | number;
  }>({
    isOpen: false,
    mode: 'add'
  });

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const res = await getDrivers();
      console.log('Driver API Response:', res);

      // Deep search for an array in the response (useful for .NET $values or wrapped responses)
      const findArray = (obj: any): any[] | null => {
        if (Array.isArray(obj)) return obj;
        if (!obj || typeof obj !== 'object') return null;

        // 1. Check common wrapper properties first (PascalCase and camelCase)
        const commonKeys = ['data', 'value', '$values', 'items', 'drivers', 'driverList', 'Data', 'Value', 'Items', 'Drivers'];
        for (const key of commonKeys) {
          if (Array.isArray(obj[key])) return obj[key];
        }

        // 2. Scan all properties for any array
        for (const key in obj) {
          if (Array.isArray(obj[key])) return obj[key];
        }

        // 3. Check for Axios-like nested data
        if (obj.data && typeof obj.data === 'object') {
          return findArray(obj.data);
        }

        return null;
      };

      const rawList = findArray(res) || [];

      // Map API data to component display format
      const mappedDrivers = rawList.map((d: any) => ({
        ...d,
        id: d.Driver_Id || d.driver_Id || d.driverId || d.id,
        FirstName: d.FirstName || d.firstName || '',
        LastName: d.LastName || d.lastName || '',
        PhoneNo: d.PhoneNo || d.phoneNo || '',
        Email: d.Email || d.email || '',
        LicenseNumber: d.LicenseNumber || d.licenseNumber || '',
        LicenseType: d.LicenseType || d.licenseType || '',
        IsAvailable: d.IsAvailable ?? d.isAvailable ?? true,
        image: d.DriverImagePath || d.driverImagePath || d.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop'
      }));
      setDrivers(mappedDrivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const openModal = (mode: 'add' | 'edit' | 'view', id?: string | number) => {
    setModalState({ isOpen: true, mode, id });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Driver Directory</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Manage and monitor your precision team.</p>
        </div>
        <button
          onClick={() => openModal('add')}
          className="btn-primary px-6 py-3"
        >
          <UserPlus size={18} />
          <span>Add Driver</span>
        </button>
      </section>

      <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Search drivers..."
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm"
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
              {drivers.length > 0 ? (
                drivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div 
                        className="flex items-center gap-4 group/profile cursor-pointer" 
                        onClick={() => navigate(`/drivers/${driver.id}`)}
                      >
                        <div className="relative">
                          <img
                            src={driver.image}
                            alt={`${driver.FirstName} ${driver.LastName}`}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container group-hover/profile:ring-primary/50 transition-colors"
                          />
                          <div className={cn(
                            "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                            driver.IsAvailable ? "bg-green-500 animate-pulse" : "bg-amber-500"
                          )} />
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface group-hover/profile:text-primary transition-colors">{driver.FirstName} {driver.LastName}</p>
                          <p className="text-xs text-on-surface-variant">ID: {driver.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-on-surface">{driver.LicenseNumber}</p>
                      <p className="text-xs text-on-surface-variant">{driver.LicenseType}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="text-on-surface">{driver.PhoneNo}</p>
                      <p className="text-on-surface-variant text-xs">{driver.Email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                        driver.IsAvailable ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-amber-50 text-amber-700 ring-amber-600/20"
                      )}>
                        {driver.IsAvailable ? 'Active' : 'Idle'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/drivers/${driver.id}`)}
                          title="View Detailed Profile"
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openModal('edit', driver.id)}
                          title="Edit Driver"
                          className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <Link
                          to={`/drivers/${driver.id}?tab=trips`}
                          title="View Trips"
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Route size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <UserPlus size={48} />
                      <p className="text-sm font-black uppercase tracking-widest text-on-surface">No precision drivers found</p>
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Add your first driver to begin fleet synchronization</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline/5 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant font-medium">Showing <span className="text-on-surface font-bold">{drivers.length}</span> of <span className="text-on-surface font-bold">{drivers.length}</span> precision drivers</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm">1</button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-surface/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <Loader2 size={40} className="animate-spin text-primary" />
            <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Syncing Live Data...</p>
          </div>
        </div>
      )}

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

      {/* Driver Form Modal */}
      {modalState.isOpen && (
        <AddDriver
          mode={modalState.mode}
          id={modalState.id}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
