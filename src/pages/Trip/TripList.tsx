import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Route as RouteIcon,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MoreVertical,
  Eye,
  Edit2,
  CheckCircle2,
  Timer,
  XCircle,
  AlertCircle,
  AlertTriangle,
  X,
  Navigation,
  Truck,
  Users,
  FileText,
  Save,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getTrips, getTrip, updateTrip } from '@/services/tripService';
import { getVehicles } from '@/services/vehicleService';
import { getDrivers } from '@/services/driverService';
import { TripStatus } from '@/types';
import { TripTableSkeleton } from '@/components/Skeleton';
import { useToast } from '@/context/ToastContext';

const PAGE_SIZE = 10;

interface TripModalProps {
  tripId: number;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSuccess: () => void;
}

const TripModal: React.FC<TripModalProps> = ({ tripId, mode: initialMode, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'view' | 'edit'>(initialMode);
  const [trip, setTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Edit mode assets
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);

  const [formData, setFormData] = useState<any>({
    Trip_Id: tripId,
    Vehicle_Id: 0,
    Driver_Id: 0,
    Origin: '',
    Destination: '',
    DepartureDate: '',
    DepartureTime: '',
    ExpectedArrivalDate: '',
    ExpectedArrivalTime: '',
    ActualDepartureTime: '',
    ActualArrivalTime: '',
    DistanceKM: 0,
    TripStatus: 'Scheduled',
    Remarks: ''
  });

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getTrip(tripId);
      const data = res?.data || res;
      setTrip(data);
      setFormData({
        Trip_Id: tripId,
        Vehicle_Id: data.Vehicle_Id || data.vehicle_Id || 0,
        Driver_Id: data.Driver_Id || data.driver_Id || 0,
        Origin: data.Origin || data.origin || '',
        Destination: data.Destination || data.destination || '',
        DepartureDate: data.DepartureDate || data.departureDate || '',
        DepartureTime: data.DepartureTime || data.departureTime || '',
        ExpectedArrivalDate: data.ExpectedArrivalDate || data.expectedArrivalDate || '',
        ExpectedArrivalTime: data.ExpectedArrivalTime || data.expectedArrivalTime || '',
        ActualDepartureTime: data.ActualDepartureTime || data.actualDepartureTime || '',
        ActualArrivalTime: data.ActualArrivalTime || data.actualArrivalTime || '',
        DistanceKM: data.DistanceKM || data.distanceKM || 0,
        TripStatus: data.TripStatus || data.tripStatus || 'Scheduled',
        Remarks: data.Remarks || data.remarks || ''
      });
    } catch (error) {
      console.error('❌ ERROR FETCHING TRIP DETAILS:', error);
      showToast('Failed to load trip details', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [tripId, showToast]);

  const fetchAssets = useCallback(async () => {
    setIsLoadingAssets(true);
    try {
      const [vehRes, driRes] = await Promise.all([
        getVehicles({ isAvailable: true, isActive: true, pageSize: 100 }),
        getDrivers({ isAvailable: true, isActive: true, pageSize: 100 })
      ]);
      setVehicles(vehRes?.data?.data || vehRes?.data || []);
      setDrivers(driRes?.data?.data || driRes?.data || []);
    } catch (error) {
      console.error("❌ ERROR FETCHING ASSETS:", error);
    } finally {
      setIsLoadingAssets(false);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useEffect(() => {
    if (mode === 'edit') {
      fetchAssets();
    }
  }, [mode, fetchAssets]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name.includes('_Id') || name === 'DistanceKM') ? (value === '' ? 0 : Number(value)) : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateTrip(formData);
      showToast('Mission strategy updated successfully!', 'success');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('❌ UPDATE ERROR:', error);
      showToast(error.response?.data?.message || 'Failed to update trip strategy', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!trip && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-outline/10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-outline/5 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              {mode === 'view' ? <Eye size={24} /> : <Edit2 size={24} />}
            </div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Mission Control</p>
              <h2 className="text-xl font-black text-on-surface uppercase italic tracking-tight">
                {mode === 'view' ? `Intelligence Report #TRP-${tripId}` : `Recalibrate Mission #TRP-${tripId}`}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={40} className="animate-spin text-primary" />
              <p className="text-sm font-black uppercase tracking-widest text-on-surface-variant italic animate-pulse">Decrypting Signal Details...</p>
            </div>
          ) : mode === 'view' ? (
            <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-300">
              {/* Route & Status Banner */}
              <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-outline/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Calculated Corridor</p>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-black text-on-surface uppercase italic tracking-tighter">{trip.Origin || trip.origin}</p>
                      <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">Origin Point</p>
                    </div>
                    <div className="flex-1 h-px bg-outline/20 relative min-w-[60px]">
                      <Navigation size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary rotate-45" />
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-on-surface uppercase italic tracking-tighter">{trip.Destination || trip.destination}</p>
                      <p className="text-[9px] font-bold text-error uppercase tracking-widest mt-1">Target Point</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline/10 shadow-sm flex flex-col items-center gap-2 min-w-[160px]">
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Operational Status</p>
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                    (trip.TripStatus || trip.tripStatus || '').toLowerCase().includes('progress') ? 'bg-amber-100 text-amber-700 shadow-[0_0_15px_rgba(251,191,36,0.3)]' :
                    (trip.TripStatus || trip.tripStatus || '').toLowerCase().includes('completed') ? 'bg-emerald-100 text-emerald-700' :
                    (trip.TripStatus || trip.tripStatus || '').toLowerCase().includes('cancelled') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  )}>
                    {trip.TripStatus || trip.tripStatus || 'Scheduled'}
                  </div>
                </div>
              </div>

              {/* Deployment Intel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group space-y-4">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface">Tactical Asset</h3>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/5 space-y-1 hover:border-primary/20 transition-colors">
                    <p className="text-xl font-black text-on-surface uppercase tracking-tight">{trip.VehicleNumber || trip.vehicleNumber || 'V-N/A'}</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Heavy Deployment Vehicle #ID-{trip.Vehicle_Id || trip.vehicle_Id}</p>
                  </div>
                </div>
                <div className="group space-y-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface">Mission Crew</h3>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/5 space-y-1 hover:border-primary/20 transition-colors">
                    <p className="text-xl font-black text-on-surface uppercase tracking-tight">{trip.DriverName || trip.driverName || 'No Driver'}</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Strategic Specialist #ID-{trip.Driver_Id || trip.driver_Id}</p>
                  </div>
                </div>
              </div>

              {/* Timeline Matrix */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface">Temporal Constraints</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Planned Departure', value: trip.DepartureDate || trip.departureDate || '--', alt: trip.DepartureTime || trip.departureTime, icon: Clock },
                    { label: 'Expected Arrival', value: trip.ExpectedArrivalDate || trip.expectedArrivalDate || '--', alt: trip.ExpectedArrivalTime || trip.expectedArrivalTime || '--', icon: Timer },
                    { label: 'Actual Start', value: trip.ActualDepartureTime || trip.actualDepartureTime || 'Awaiting...', icon: Navigation },
                    { label: 'Actual End', value: trip.ActualArrivalTime || trip.actualArrivalTime || 'In Orbit...', icon: MapPin },
                  ].map((item, i) => (
                    <div key={i} className="bg-surface-container-low/50 p-5 rounded-2xl border border-outline/5 flex flex-col items-center gap-2 text-center group hover:bg-surface-container-low transition-colors">
                      <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-tighter opacity-60">{item.label}</p>
                      <p className={cn("text-xs font-black uppercase tracking-tight", (typeof item.value === 'string' && !item.value.includes('...')) ? "text-on-surface" : "text-on-surface-variant/40 italic")}>
                        {item.value}
                      </p>
                      {item.alt && <p className="text-[10px] font-bold text-primary italic uppercase tracking-widest leading-none">{item.alt}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Navigation size={16} className="text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface">Mission Metrics</h3>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Total Corridor Distance</p>
                      <p className="text-2xl font-black text-on-surface uppercase italic tracking-tighter">
                        {trip.DistanceKM || trip.distanceKM || 0} <span className="text-sm font-black opacity-40">KM</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <RouteIcon size={20} />
                    </div>
                  </div>
                </div>
                {(trip.Remarks || trip.remarks) && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface">Strategic Remarks</h3>
                    </div>
                    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/5 italic text-sm text-on-surface-variant font-medium leading-relaxed">
                      "{trip.Remarks || trip.remarks}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-8 animate-in slide-in-from-right-2 duration-300 pb-10">
              
              {/* Asset Assignment */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Truck size={18} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Asset Assignment</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Select Vehicle *</label>
                    <div className="relative group">
                      <Truck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                      <select
                        name="Vehicle_Id"
                        value={formData.Vehicle_Id}
                        onChange={handleInputChange}
                        disabled={isLoadingAssets}
                        className="input-field pl-12 appearance-none disabled:opacity-50"
                      >
                        <option value={0}>{isLoadingAssets ? 'Loading fleet...' : 'Choose Available Vehicle...'}</option>
                        {vehicles.map(v => (
                          <option key={v.vehicle_Id || v.Vehicle_Id} value={v.vehicle_Id || v.Vehicle_Id}>
                            {v.vehicleNumber || v.VehicleNumber} | {v.brand || v.Brand} {v.model || v.Model}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Assign Driver *</label>
                    <div className="relative group">
                      <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                      <select
                        name="Driver_Id"
                        value={formData.Driver_Id}
                        onChange={handleInputChange}
                        disabled={isLoadingAssets}
                        className="input-field pl-12 appearance-none disabled:opacity-50"
                      >
                        <option value={0}>{isLoadingAssets ? 'Syncing crew...' : 'Choose Available Driver...'}</option>
                        {drivers.map(d => (
                          <option key={d.driver_Id || d.Driver_Id} value={d.driver_Id || d.Driver_Id}>
                            {d.firstName || d.FirstName} {d.lastName || d.LastName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Configuration */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Navigation size={18} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Route Configuration</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Origin *</label>
                    <div className="relative group">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input
                        name="Origin"
                        value={formData.Origin}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                        placeholder="Start location..."
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Destination *</label>
                    <div className="relative group">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-error" />
                      <input
                        name="Destination"
                        value={formData.Destination}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                        placeholder="End location..."
                        type="text"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Calendar size={18} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Schedule & Timing</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant block">Dept. Date *</label>
                    <div className="relative group">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input name="DepartureDate" value={formData.DepartureDate} onChange={handleInputChange} className="input-field pl-9 text-xs py-3" type="date" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant block">Dept. Time *</label>
                    <div className="relative group">
                      <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input name="DepartureTime" value={formData.DepartureTime} onChange={handleInputChange} className="input-field pl-9 text-xs py-3" type="time" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant block">Exp. Date</label>
                    <div className="relative group">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input name="ExpectedArrivalDate" value={formData.ExpectedArrivalDate} onChange={handleInputChange} className="input-field pl-9 text-xs py-3" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant block">Exp. Time</label>
                    <div className="relative group">
                      <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input name="ExpectedArrivalTime" value={formData.ExpectedArrivalTime} onChange={handleInputChange} className="input-field pl-9 text-xs py-3" type="time" />
                    </div>
                  </div>
                </div>

                {/* Actual Timestamps (Manual override/Log) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-emerald-700 block">Actual Departure (Log)</label>
                    <div className="relative group">
                      <Navigation size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input name="ActualDepartureTime" value={formData.ActualDepartureTime} onChange={handleInputChange} className="input-field bg-white/50 pl-9 text-xs py-3 border-emerald-200" type="text" placeholder="HH:mm or ISO..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-emerald-700 block">Actual Arrival (Log)</label>
                    <div className="relative group">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input name="ActualArrivalTime" value={formData.ActualArrivalTime} onChange={handleInputChange} className="input-field bg-white/50 pl-9 text-xs py-3 border-emerald-200" type="text" placeholder="HH:mm or ISO..." />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logistics Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <RouteIcon size={18} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Logistical Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Distance (KM)</label>
                    <div className="relative group">
                      <Navigation size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                      <input name="DistanceKM" value={formData.DistanceKM} onChange={handleInputChange} className="input-field pl-12" placeholder="Estimated distance..." type="number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Trip Status</label>
                    <div className="relative group">
                      <Info size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                      <select name="TripStatus" value={formData.TripStatus} onChange={handleInputChange} className="input-field pl-12 appearance-none font-bold uppercase text-xs tracking-wider">
                        {Object.values(TripStatus).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Remarks / Special Instructions</label>
                  <div className="relative group">
                    <FileText size={18} className="absolute left-4 top-4 text-outline" />
                    <textarea name="Remarks" value={formData.Remarks} onChange={handleInputChange} className="input-field pl-12 min-h-[100px] py-4" placeholder="Briefing notes..." />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
                <AlertCircle size={18} className="text-primary flex-shrink-0" />
                <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold uppercase tracking-tight">
                  Warning: Recalibrating mission parameters will bypass standard scheduling logic. Ensure tactical oversight.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Dynamic Footer */}
        <div className="p-6 bg-surface-container-low border-t border-outline/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {mode === 'view' ? (
              <button
                onClick={() => setMode('edit')}
                className="btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 group"
              >
                <Edit2 size={14} className="group-hover:rotate-12 transition-transform" />
                <span>Enter Recalibration Mode</span>
              </button>
            ) : (
              <button
                onClick={() => setMode('view')}
                disabled={isSaving}
                className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2 px-4 py-2"
              >
                Cancel Recalibration
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} disabled={isSaving} className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">
              Dismiss
            </button>
            {mode === 'edit' && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary px-10 py-2.5 text-xs flex items-center gap-2 shadow-primary-glow"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>{isSaving ? 'Synchronizing...' : 'Save Strategy'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TripList() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1;
  const startIndex = totalCount > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = totalCount > 0 ? Math.min(currentPage * PAGE_SIZE, totalCount) : 0;
  const showPagination = !isLoading && totalCount > 0 && trips.length > 0;

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Status filter state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [modalState, setModalState] = useState<{ id: number; mode: 'view' | 'edit' } | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target as Node)) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchTerm]);

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
        search: debouncedSearch || undefined,
        tripStatus: statusFilter === 'all' ? undefined : statusFilter,
      };

      const res = await getTrips(params);
      
      const rawList = res?.data?.data || res?.data || res || [];
      const total = res?.data?.totalRecords ?? res?.totalRecords ?? rawList.length;

      setTrips(rawList);
      setTotalCount(total);
    } catch (error) {
      console.error('❌ ERROR FETCHING TRIPS:', error);
      showToast('Internal communication failure. Tactical grid offline.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const getStatusConfig = (status: string) => {
    const s = String(status || '').toLowerCase();
    if (s.includes('scheduled')) {
      return { icon: <Calendar size={14} />, class: "bg-blue-50 text-blue-700 ring-blue-600/20", label: "Scheduled" };
    }
    if (s.includes('progress')) {
      return { icon: <Timer size={14} className="animate-pulse" />, class: "bg-amber-50 text-amber-700 ring-amber-600/20", label: "In Progress" };
    }
    if (s.includes('completed')) {
      return { icon: <CheckCircle2 size={14} />, class: "bg-green-50 text-green-700 ring-green-600/20", label: "Completed" };
    }
    if (s.includes('cancelled')) {
      return { icon: <XCircle size={14} />, class: "bg-red-50 text-red-700 ring-red-600/20", label: "Cancelled" };
    }
    return { icon: <AlertCircle size={14} />, class: "bg-gray-50 text-gray-700 ring-gray-600/20", label: status || 'Unknown' };
  };

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Trip Directory</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Monitor and manage all active and past logistical operations.</p>
        </div>
        <button
          onClick={() => navigate('/trips/new')}
          className="btn-primary px-6 py-3 shadow-primary-glow"
        >
          <Plus size={18} />
          <span>Dispatch New Trip</span>
        </button>
      </section>

      <div className="bg-surface-container-lowest rounded-2xl shadow-ambient border border-outline/5 overflow-hidden">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          {/* Search Box */}
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Search by Origin, Destination or Trip ID..."
              className="w-full pl-12 pr-10 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm font-medium"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container-high transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative" ref={statusDropdownRef}>
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className={cn(
                  "flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors uppercase tracking-widest italic",
                  statusFilter !== 'all'
                    ? "bg-primary text-white shadow-primary-glow ring-0"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                )}
              >
                <Filter size={16} className="mr-2" />
                <span>{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
              </button>

              {showStatusDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-lg ring-1 ring-outline/10 z-50 overflow-hidden">
                  <div className="py-1">
                    {['all', ...Object.values(TripStatus)].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setCurrentPage(1);
                          setShowStatusDropdown(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 hover:bg-surface-container-low transition-colors text-xs font-black uppercase tracking-widest italic",
                          statusFilter === status ? "text-primary bg-primary/5" : "text-on-surface"
                        )}
                      >
                        {status === 'all' ? 'All Status' : status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Route</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle / Driver</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Timeline</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {isLoading ? (
                <TripTableSkeleton count={PAGE_SIZE} />
              ) : (trips.length > 0) ? (
                trips.map((trip) => {
                  const status = getStatusConfig(trip.TripStatus || trip.tripStatus);
                  const tId = trip.Trip_Id || trip.trip_Id;
                  return (
                    <tr key={tId} className="hover:bg-surface-container-low transition-colors group border-b border-outline/5">
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <p className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.2em]">
                            #TRP-{tId}
                          </p>
                          <div className="flex items-center gap-2 font-semibold text-on-surface tracking-tight text-sm">
                            <span>{trip.Origin || trip.origin}</span>
                            <ChevronRight size={14} className="text-primary" />
                            <span>{trip.Destination || trip.destination}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                            <Truck size={14} className="text-primary/60" />
                            <span>{trip.VehicleNumber || trip.vehicleNumber || 'V-N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                            <Users size={12} />
                            <span>{trip.DriverName || trip.driverName || 'No Driver'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2 text-on-surface font-medium">
                            <Calendar size={14} className="text-primary/50" />
                            <span>{trip.DepartureDate || trip.departureDate}</span>
                          </div>
                          <div className="text-on-surface-variant text-xs ml-6">
                            @ {trip.DepartureTime || trip.departureTime}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ring-1 ring-inset shadow-sm",
                          status.class
                        )}>
                          {status.icon}
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/live?tripId=${tId}`)}
                            title="Live Tactical"
                            className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all hover:scale-110 active:scale-90"
                          >
                            <MapPin size={18} />
                          </button>
                          <button
                            onClick={() => setModalState({ id: tId, mode: 'view' })}
                            title="View Intelligence"
                            className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all border border-outline/5 hover:border-primary/20 hover:scale-110 active:scale-90"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => setModalState({ id: tId, mode: 'edit' })}
                            title="Recalibrate Mission"
                            className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all border border-outline/5 hover:border-amber-500/30 hover:text-amber-600 hover:scale-110 active:scale-90"
                          >
                            <Edit2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-40">
                      <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center animate-pulse">
                        <RouteIcon size={40} className="text-outline" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-on-surface italic">No logistical data found</p>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">
                          Initiate a new dispatch cycle to populate this matrix.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {showPagination && (
          <div className="px-6 py-5 bg-surface-container-low/30 border-t border-outline/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Info Section */}
            <div className="flex flex-col gap-1">
              <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-widest">
                Showing <span className="text-on-surface font-bold text-sm">{startIndex}–{endIndex}</span> of <span className="text-on-surface font-bold text-sm">{totalCount}</span>
              </p>
              <p className="text-[10px] text-on-surface-variant font-medium">
                Page <span className="text-on-surface font-bold">{currentPage}</span> of <span className="text-on-surface font-bold">{totalPages}</span>
              </p>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                title="Previous page"
                className={cn(
                  "p-2 rounded-lg transition-all",
                  currentPage === 1
                    ? "text-on-surface-variant/30 cursor-not-allowed"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-primary"
                )}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 px-2">
                {getPageNumbers().map((page, idx) =>
                  page === '...' ? (
                    <span key={`dots-${idx}`} className="px-1.5 text-xs text-on-surface-variant font-bold">…</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={cn(
                        "min-w-[32px] h-8 px-2 rounded-lg text-xs font-bold transition-all",
                        currentPage === page
                          ? "bg-primary text-white shadow-md"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      )}
                      title={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => currentPage < totalPages && setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                title="Next page"
                className={cn(
                  "p-2 rounded-lg transition-all",
                  currentPage >= totalPages
                    ? "text-on-surface-variant/30 cursor-not-allowed"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-primary"
                )}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoading && !trips.length && (
        <div className="fixed inset-0 bg-surface/60 backdrop-blur-xl flex items-center justify-center z-[70] animate-in fade-in duration-500">
          <div className="bg-surface-container-lowest p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-8 border border-outline/10">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse rounded-full"></div>
              <Loader2 size={64} className="animate-spin text-primary relative z-10" />
              <RouteIcon size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/40 relative z-20" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-on-surface italic animate-pulse">Syncing Tactical Grid...</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Establishing neural link with fleet assets</p>
            </div>
          </div>
        </div>
      )}

      {/* Mission Control Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-outline/5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Active Operations</h3>
            <Timer size={18} className="text-amber-500 animate-pulse" />
          </div>
          <p className="text-4xl font-black italic tracking-tighter text-amber-600">
            {trips.filter(t => t.TripStatus?.toLowerCase().includes('progress')).length}
          </p>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(trips.filter(t => t.TripStatus?.toLowerCase().includes('progress')).length / (trips.length || 1)) * 100}%` }}></div>
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Missions currently underway</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-outline/5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Mission Success</h3>
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
          <p className="text-4xl font-black italic tracking-tighter text-emerald-600">
            {trips.filter(t => t.TripStatus?.toLowerCase().includes('completed')).length}
          </p>
          <div className="flex gap-1 opacity-70">
            {[1, 2, 3, 4, 5].map(i => <RouteIcon key={i} size={12} className="text-emerald-500" />)}
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Successfully completed objectives</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-outline/5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Logistical Anomalies</h3>
            <AlertTriangle size={18} className="text-error" />
          </div>
          <p className="text-4xl font-black italic tracking-tighter text-error">
            {trips.filter(t => t.TripStatus?.toLowerCase().includes('cancelled')).length}
          </p>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-error h-1.5 rounded-full" style={{ width: `${(trips.filter(t => t.TripStatus?.toLowerCase().includes('cancelled')).length / (trips.length || 1)) * 100}%` }}></div>
          </div>
          <p className="text-[10px] text-error font-bold uppercase tracking-widest">Cancelled or aborted operations</p>
        </div>
      </section>

      {/* Unified Modal */}
      {modalState && (
        <TripModal
          tripId={modalState.id}
          mode={modalState.mode}
          onClose={() => setModalState(null)}
          onSuccess={() => fetchTrips()}
        />
      )}
    </div>
  );
}
