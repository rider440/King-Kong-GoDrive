import React, { useState, useEffect } from 'react';
import {
  Send,
  Truck,
  Users,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  ChevronRight,
  Navigation,
  FileText,
  CheckCircle2,
  Info,
  Loader2,
  Route as RouteIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TripStatus } from '@/types';
import { getVehicles } from '@/services/vehicleService';
import { getDrivers } from '@/services/driverService';
import { createTrip } from '@/services/tripService';
import { useToast } from '@/context/ToastContext';

export default function TripDispatch() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);

  const [formData, setFormData] = useState<any>({
    TripStatus: TripStatus.Scheduled,
    Vehicle_Id: 0,
    Driver_Id: 0,
    Origin: '',
    Destination: '',
    DepartureDate: new Date().toISOString().split('T')[0],
    DepartureTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    ExpectedArrivalDate: '',
    ExpectedArrivalTime: '',
    DistanceKM: 0,
    Remarks: ''
  });

  // Fetch Available Assets
  useEffect(() => {
    const fetchAssets = async () => {
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
        showToast("Failed to load available vehicles and drivers", "error");
      } finally {
        setIsLoadingAssets(false);
      }
    };
    fetchAssets();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name.includes('_Id') || name === 'DistanceKM') ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (progress < 100) return;

    setIsSubmitting(true);
    try {
      await createTrip(formData);
      showToast("Trip dispatched successfully!", "success");
      navigate('/trips');
    } catch (error: any) {
      console.error("❌ DISPATCH ERROR:", error);
      showToast(error.response?.data?.message || "Failed to dispatch trip", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiredFields = ['Vehicle_Id', 'Driver_Id', 'Origin', 'Destination', 'DepartureDate', 'DepartureTime'];
  const completedRequiredFields = requiredFields.filter(field => {
    const val = formData[field];
    return val !== undefined && val !== '' && val !== 0;
  });
  const progress = Math.round((completedRequiredFields.length / requiredFields.length) * 100);

  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Trip Dispatch</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Coordinate precision logistics and vehicle deployment.</p>
        </div>
        <button 
          onClick={() => navigate('/trips')}
          className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
        >
          <ChevronRight size={14} className="rotate-180" />
          Back to list
        </button>
      </section>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient border border-outline/5 overflow-hidden">
            <div className="p-8 space-y-10">

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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Departure Date *</label>
                    <div className="relative group">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        name="DepartureDate"
                        value={formData.DepartureDate}
                        onChange={handleChange}
                        className="input-field pl-12"
                        type="date"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Departure Time *</label>
                    <div className="relative group">
                      <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        name="DepartureTime"
                        value={formData.DepartureTime}
                        onChange={handleChange}
                        className="input-field pl-12"
                        type="time"
                        required
                      />
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
                      <input
                        name="DistanceKM"
                        value={formData.DistanceKM}
                        onChange={handleChange}
                        className="input-field pl-12"
                        placeholder="Estimated distance..."
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Initial Trip Status</label>
                    <div className="relative group">
                      <Info size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                      <select
                        name="TripStatus"
                        value={formData.TripStatus}
                        onChange={handleChange}
                        className="input-field pl-12 appearance-none"
                      >
                        {Object.values(TripStatus).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Remarks / Special Instructions</label>
                  <div className="relative group">
                    <FileText size={18} className="absolute left-4 top-4 text-outline" />
                    <textarea
                      name="Remarks"
                      value={formData.Remarks}
                      onChange={handleChange}
                      className="input-field pl-12 min-h-[100px] py-4"
                      placeholder="Add any special instructions for the driver..."
                    />
                  </div>
                </div>
              </div>

            </div>
            <div className="bg-surface-container-low p-6 flex items-center justify-between border-t border-outline/5">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={18} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {progress < 100 ? `Complete ${100 - progress}% more to dispatch` : 'Ready for deployment'}
                </span>
              </div>
              <button
                type="submit"
                disabled={progress < 100 || isSubmitting}
                className={cn(
                  "btn-primary px-10 py-3 transition-all duration-300 relative overflow-hidden",
                  (progress < 100 || isSubmitting) && "opacity-50 cursor-not-allowed grayscale"
                )}
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{isSubmitting ? 'Confirming...' : 'Confirm Dispatch'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline/5 sticky top-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-on-surface uppercase tracking-widest">Dispatch Readiness</h3>
                <span className="text-2xl font-black text-primary">{progress}%</span>
              </div>

              <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden border border-outline/5">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-700 ease-out shadow-primary-glow"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="space-y-4 pt-4">
                {[
                  { label: 'Vehicle Assigned', key: 'Vehicle_Id' },
                  { label: 'Driver Assigned', key: 'Driver_Id' },
                  { label: 'Route Defined', key: 'Origin' },
                  { label: 'Schedule Set', key: 'DepartureDate' }
                ].map((step) => {
                  const isDone = step.key === 'Origin'
                    ? (formData.Origin && formData.Destination)
                    : step.key === 'DepartureDate'
                      ? (formData.DepartureDate && formData.DepartureTime)
                      : (formData[step.key] && formData[step.key] !== 0);

                  return (
                    <div key={step.label} className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center transition-colors border",
                        isDone ? "bg-primary border-primary text-white" : "border-outline/20 text-outline/20"
                      )}>
                        {isDone ? <CheckCircle2 size={12} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                      </div>
                      <span className={cn(
                        "text-[0.7rem] font-bold uppercase tracking-widest transition-colors",
                        isDone ? "text-on-surface" : "text-on-surface-variant/50"
                      )}>{step.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-8 border-t border-outline/5">
                <div className="bg-primary/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Info size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Dispatch Tip</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-on-surface-variant font-medium">
                    Assets listed are automatically filtered for current availability and active status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
