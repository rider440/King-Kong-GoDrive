import React, { useState } from 'react';
import {
  Send,
  Truck,
  Users,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  ChevronRight,
  Route,
  Navigation,
  FileText,
  CheckCircle2,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TripDispatch as TripDispatchType, TripStatus } from '@/types';

export default function TripDispatch() {
  const [formData, setFormData] = useState<Partial<TripDispatchType>>({
    TripStatus: TripStatus.Scheduled,
    Vehicle_Id: 0,
    Driver_Id: 0,
    Origin: '',
    Destination: '',
    DepartureDate: '',
    DepartureTime: '',
    Remarks: '',
    DistanceKM: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('_Id') || name === 'DistanceKM' ? Number(value) : value
    }));
  };

  const requiredFields = ['Vehicle_Id', 'Driver_Id', 'Origin', 'Destination', 'DepartureDate', 'DepartureTime'];
  const completedRequiredFields = requiredFields.filter(field => {
    const val = formData[field as keyof TripDispatchType];
    return val !== undefined && val !== '' && val !== 0;
  });
  const progress = Math.round((completedRequiredFields.length / requiredFields.length) * 100);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-black tracking-tight text-on-surface uppercase italic">Trip Dispatch</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Coordinate precision logistics and vehicle deployment.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Dispatch Form */}
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
                        className="input-field pl-12 appearance-none"
                      >
                        <option value={0}>Choose Vehicle...</option>
                        <option value={1}>MH31AB1234 | Mercedes Actros</option>
                        <option value={2}>MH31CD5678 | Volvo FH16</option>
                        <option value={3}>MH31EF9012 | Scania R-Series</option>
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
                        className="input-field pl-12 appearance-none"
                      >
                        <option value={0}>Choose Driver...</option>
                        <option value={1}>Julian Rossi</option>
                        <option value={2}>Sarah Mitchell</option>
                        <option value={3}>Marcus Chen</option>
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
                        placeholder="YYYY-MM-DD"
                        type="date"
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
                        placeholder="HH:MM"
                        type="time"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Expected Arrival Date</label>
                    <div className="relative group">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        name="ExpectedArrivalDate"
                        value={formData.ExpectedArrivalDate}
                        onChange={handleChange}
                        className="input-field pl-12"
                        placeholder="YYYY-MM-DD"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Expected Arrival Time</label>
                    <div className="relative group">
                      <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        name="ExpectedArrivalTime"
                        value={formData.ExpectedArrivalTime}
                        onChange={handleChange}
                        className="input-field pl-12"
                        placeholder="HH:MM"
                        type="time"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Metrics */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Route size={18} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Advanced Metrics</h3>
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
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Trip Status</label>
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
                disabled={progress < 100}
                className={cn(
                  "btn-primary px-10 py-3 transition-all duration-300",
                  progress < 100 && "opacity-50 cursor-not-allowed grayscale"
                )}
              >
                <Send size={18} />
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Progress Tracker */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline/5 sticky top-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-on-surface uppercase tracking-widest italic">Dispatch Readiness</h3>
                <span className="text-2xl font-black text-primary italic">{progress}%</span>
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
                      : (formData[step.key as keyof TripDispatchType] && formData[step.key as keyof TripDispatchType] !== 0);

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
                    Ensure the driver has completed the pre-trip vehicle inspection before confirming dispatch.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider px-1">Active Dispatches</h2>
          <div className="space-y-4">
            {[
              { id: 'TRP-990', route: 'NY → CHI', status: 'In Transit', progress: 65 },
              { id: 'TRP-991', route: 'LA → SF', status: 'Loading', progress: 10 },
              { id: 'TRP-992', route: 'MIA → ATL', status: 'In Transit', progress: 88 }
            ].map((trip) => (
              <div key={trip.id} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline/5 space-y-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[0.65rem] font-bold text-primary uppercase tracking-widest">{trip.id}</p>
                    <p className="text-lg font-black text-on-surface mt-1">{trip.route}</p>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase px-2 py-1 bg-primary/5 text-primary rounded-lg">{trip.status}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase">
                    <span>Progress</span>
                    <span>{trip.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${trip.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-[0.7rem] font-bold text-primary uppercase tracking-widest bg-surface-container-lowest border border-outline/10 rounded-xl hover:bg-surface-container transition-colors">
            View Dispatch History
          </button>
        </div>
      </div>
    </div>
  );
}
