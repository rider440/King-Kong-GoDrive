import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getVehicle, getVehicles } from '@/services/vehicleService';
import { Loader2, Truck, ShieldCheck, Fuel, Calendar, MapPin, Gauge, Settings, Edit, ArrowLeft, LayoutDashboard, Route, Wrench, AlertCircle, AlertTriangle, Activity } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
import AddVehicle from './AddVehicle';

export default function VehicleProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [vehicleData, setVehicleData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Tab management
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = queryParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/vehicles/${id}?tab=${tab}`, { replace: true });
  };

  // Auto-open edit modal if query param is present
  useEffect(() => {
    if (queryParams.get('edit') === 'true') {
      setIsEditModalOpen(true);
      // Clean up the URL to prevent re-opening on manual refresh if desired, 
      // but keeping it for now to match implementation plan.
    }
  }, [location.search]);

  const fetchVehicle = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      let res;
      try {
        res = await getVehicle(Number(id));
      } catch (singleFetchError: any) {
        console.warn('Single Vehicle Fetch Failed. Attempting fallback to full list...');
        const listRes = await getVehicles({ pageSize: 1000 }); // High page size to find the asset
        
        const findArrayInObject = (obj: any): any[] | null => {
          if (Array.isArray(obj)) return obj;
          if (!obj || typeof obj !== 'object') return null;
          
          const commonKeys = ['data', 'value', '$values', 'dataList', 'vehicles', 'items'];
          for (const key of commonKeys) {
            if (obj[key] && Array.isArray(obj[key]?.data || obj[key])) {
              return obj[key]?.data || obj[key];
            }
          }
          
          for (const key in obj) {
            if (Array.isArray(obj[key])) {
              const first = obj[key][0];
              if (first && (first.VehicleNumber || first.vehicleNumber || first.Vehicle_Id || first.vehicle_Id)) {
                return obj[key];
              }
            } else if (obj[key] && typeof obj[key] === 'object') {
              const found = findArrayInObject(obj[key]);
              if (found) return found;
            }
          }
          return null;
        };

        const array = findArrayInObject(listRes) || [];
        const searchId = String(id);
        res = array.find((v: any) => 
          String(v.Vehicle_Id || v.vehicle_Id || v.VehicleId || v.id) === searchId
        );

        if (!res) throw singleFetchError;
      }

      // Robust data discovery for single object
      const findObject = (obj: any): any | null => {
        if (!obj || typeof obj !== 'object') return null;
        if (obj.VehicleNumber || obj.vehicleNumber || obj.Vehicle_Id || obj.vehicle_Id) return obj;
        
        const commonKeys = ['data', 'value', '$values', 'vehicle', 'Vehicle'];
        for (const key of commonKeys) {
          if (obj[key] && typeof obj[key] === 'object') {
            if (Array.isArray(obj[key])) return obj[key][0];
            return obj[key];
          }
        }

        for (const key in obj) {
          const val = obj[key];
          if (val && typeof val === 'object' && !Array.isArray(val)) {
            if (val.VehicleNumber || val.vehicleNumber || val.Vehicle_Id || val.vehicle_Id) return val;
          }
        }

        return obj;
      };

      const data = findObject(res);
      
      if (!data) throw new Error('Asset intel could not be decoded from response');

      // Map to template format using robust fallback for fields
      const mapped = {
        ...data,
        name: `${data.Brand || data.brand || ''} ${data.Model || data.model || ''}`.trim() || 'Unnamed Asset',
        vehicleNumber: data.VehicleNumber || data.vehicleNumber || 'N/A',
        status: (data.IsActive ?? data.isActive ?? true) ? 'ACTIVE' : 'INACTIVE',
        isAvailable: data.IsAvailable ?? data.isAvailable ?? true,
        vehicleType: data.VehicleType || data.vehicleType || 'N/A',
        fuelType: data.FuelType || data.fuelType || 'N/A',
        fuelCapacity: data.FuelCapacity || data.fuelCapacity || 0,
        mileage: data.Mileage || data.mileage || 0,
        currentLocation: data.CurrentLocation || data.currentLocation || 'Unknown',
        totalDistanceTravelled: data.TotalDistanceTravelled || data.totalDistanceTravelled || 0
      };

      setVehicleData(mapped);
    } catch (err: any) {
      console.error('Error fetching vehicle profile:', err);
      setError(`Data Sync Failed: ${err.response?.status === 404 ? 'Asset not found on server' : err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  if (isLoading && !vehicleData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Syncing Asset Intel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-4">
        <div className="bg-error/10 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
          <AlertCircle className="text-error" size={48} />
          <h2 className="text-xl font-black text-on-surface uppercase italic">Sync Interrupted</h2>
          <p className="text-sm font-bold text-on-surface-variant max-w-sm">{error}</p>
        </div>
        <button 
          onClick={() => fetchVehicle()}
          className="btn-primary px-8"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const v = vehicleData;

  return (
    <Layout title="Vehicle Asset Profile">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate('/vehicles')}
          className="flex items-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} />
          <span>Fleet Directory</span>
        </button>

        {/* Header Section */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 relative border border-outline/5 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 pointer-events-none">
            <Truck size={160} />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-48 h-32 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-inner border border-outline/10 overflow-hidden">
                <Truck size={64} className="opacity-20 absolute" />
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-tighter opacity-40 mb-1">Asset ID</p>
                    <p className="text-3xl font-black italic tracking-tighter">{v.vehicle_Id || v.Vehicle_Id || id}</p>
                </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-end gap-3 mb-2">
                <h2 className="text-4xl font-black tracking-tight text-on-surface uppercase italic leading-none">{v.name}</h2>
                <span className="text-primary font-black text-lg bg-primary/5 px-3 py-1 rounded-lg border border-primary/10 tracking-widest uppercase">{v.vehicleNumber}</span>
              </div>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-[0.2em]">{v.vehicleType || 'Unknown Asset Type'}</p>
              
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black border tracking-widest uppercase",
                  v.status === 'ACTIVE'
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                )}>
                  {v.status}
                </span>
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black border tracking-widest uppercase",
                  v.isAvailable
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-amber-100 text-amber-800 border-amber-200"
                )}>
                  {v.isAvailable ? 'Available' : 'On Mission'}
                </span>
              </div>
            </div>

            <div className="md:border-l border-outline/10 md:pl-8 flex flex-col gap-2">
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                >
                    <Edit size={16} />
                    Update Asset
                </button>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-outline/5 overflow-x-auto pb-px">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'trips', label: 'Mission History', icon: Route },
            { id: 'maintenance', label: 'Maintenance', icon: Wrench }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* Column 1: Core Specs */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 border border-outline/5 space-y-8">
                    <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                        <div className="p-2 bg-primary/5 rounded-lg text-primary">
                            <Settings size={20} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Asset Specifications</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Brand</p>
                            <p className="text-sm font-black text-on-surface">{v.brand || v.Brand || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Model</p>
                            <p className="text-sm font-black text-on-surface">{v.model || v.Model || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Manufacturing Year</p>
                            <p className="text-sm font-black text-on-surface">{v.manufacturingYear || v.ManufacturingYear || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Color</p>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full border border-outline/10 shadow-sm" style={{ backgroundColor: v.color || v.Color || 'transparent' }}></div>
                                <p className="text-sm font-black text-on-surface">{v.color || v.Color || 'Not Specified'}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Chassis Number</p>
                            <p className="text-sm font-black font-mono tracking-wider text-on-surface">{v.chassisNumber || v.ChassisNumber || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Engine Number</p>
                            <p className="text-sm font-black font-mono tracking-wider text-on-surface">{v.engineNumber || v.EngineNumber || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 border border-outline/5 space-y-8">
                    <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                        <div className="p-2 bg-primary/5 rounded-lg text-primary">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Compliance & Insurance</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Provider</p>
                            <p className="text-sm font-black text-on-surface">{v.insuranceProvider || v.InsuranceProvider || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Policy Number</p>
                            <p className="text-sm font-black font-mono text-primary">{v.insurancePolicyNumber || v.InsurancePolicyNumber || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Insurance Expiry</p>
                            <p className={cn("text-sm font-black", (v.insuranceExpiryDate || v.InsuranceExpiryDate) ? 'text-on-surface' : 'text-on-surface-variant')}>{ (v.insuranceExpiryDate || v.InsuranceExpiryDate)?.split('T')[0] || 'N/A' }</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Fitness Expiry</p>
                            <p className="text-sm font-black text-on-surface">{ (v.fitnessExpiryDate || v.FitnessExpiryDate)?.split('T')[0] || 'N/A' }</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Permit Number</p>
                            <p className="text-sm font-black font-mono text-on-surface">{v.permitNumber || v.PermitNumber || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Pollution Expiry</p>
                            <p className="text-sm font-black text-on-surface">{ (v.pollutionExpiryDate || v.PollutionExpiryDate)?.split('T')[0] || 'N/A' }</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 2: Status & Stats */}
            <div className="space-y-6">
                <div className="bg-primary text-white rounded-2xl p-8 shadow-xl shadow-primary/20 relative overflow-hidden">
                    <Gauge size={120} className="absolute -bottom-4 -right-4 opacity-10 -rotate-12" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Total Utilization</p>
                    <h4 className="text-4xl font-black italic tracking-tighter mb-4">{ (v.totalDistanceTravelled || v.TotalDistanceTravelled || 0).toLocaleString() } <span className="text-sm font-bold uppercase">km</span></h4>
                    
                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="opacity-60">Avg. Efficiency</span>
                            <span>{v.mileage || v.Mileage || 0} km/l</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-white h-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 border border-outline/5 space-y-6">
                    <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                        <div className="p-2 bg-primary/5 rounded-lg text-primary">
                            <Fuel size={20} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Fuel Profile</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Fuel Type</p>
                            <p className="text-sm font-black text-on-surface">{v.fuelType || v.FuelType || 'N/A'}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Tank Capacity</p>
                            <p className="text-sm font-black text-on-surface">{v.fuelCapacity || v.FuelCapacity || 0} Liters</p>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 border border-outline/5 space-y-6">
                    <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                        <div className="p-2 bg-primary/5 rounded-lg text-primary">
                            <MapPin size={20} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Live Geostatus</h3>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Current Coordinates</p>
                        <p className="text-sm font-black text-on-surface">{v.currentLocation || v.CurrentLocation || 'Unknown Junction'}</p>
                    </div>
                    <div className="pt-4 flex items-center gap-3 text-emerald-600">
                        <Activity size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Live Tracking Active</span>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 flex items-center justify-between border-b border-outline/5">
                <div className="flex items-center gap-3">
                    <Route size={20} className="text-primary" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Mission Log</h3>
                </div>
                <button className="btn-primary py-2 px-6 text-[10px]">Audit Logs</button>
            </div>
            
            <div className="px-8 py-20 text-center flex flex-col items-center gap-4 opacity-30">
                <Calendar size={48} />
                <p className="text-sm font-black uppercase tracking-widest text-on-surface">No recent missions detected</p>
                <p className="text-[10px] font-bold uppercase tracking-widest">Data sync required from Trip Dispatcher</p>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 flex items-center justify-between border-b border-outline/5">
                <div className="flex items-center gap-3">
                    <Wrench size={20} className="text-primary" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Service & Maintenance</h3>
                </div>
                <button className="btn-primary py-2 px-6 text-[10px]">Schedule Service</button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
                    <AlertTriangle className="text-amber-600 mt-1" size={24} />
                    <div className="space-y-1">
                        <p className="text-sm font-black text-amber-900 uppercase italic">Upcoming Fitness Check</p>
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">Scheduled for next 15 days</p>
                    </div>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Next Oil Change</p>
                        <p className="text-sm font-black text-on-surface">45,200 km</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
                        <span className="text-[8px] font-black">12%</span>
                    </div>
                </div>
            </div>

            <div className="px-8 py-20 text-center flex flex-col items-center gap-4 opacity-10">
                <Wrench size={48} />
                <p className="text-sm font-black uppercase tracking-widest text-on-surface">Maintenance History Optimized</p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <AddVehicle
          mode="edit"
          id={id}
          onClose={(refresh) => {
            setIsEditModalOpen(false);
            if (refresh) fetchVehicle();
          }}
        />
      )}
    </Layout>
  );
}
