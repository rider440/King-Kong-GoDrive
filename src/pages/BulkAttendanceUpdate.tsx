import React, { useState } from 'react';
import {
  UserSearch,
  Calendar,
  LogIn,
  LogOut,
  Send,
  ChevronDown,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Activity
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';
import { DriverAttendance, AttendanceStatus } from '../types';

const recentLogs = [
  { name: 'M. Thompson', date: 'Oct 26', time: '08:15 - 17:45', status: 'Verified', color: 'emerald' },
  { name: 'E. Rodriguez', date: 'Oct 26', time: '09:00 - 18:00', status: 'Logged', color: 'slate' }
];

export default function BulkAttendanceUpdate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<DriverAttendance>>({
    Status: AttendanceStatus.Present,
    AttendanceDate: new Date().toISOString().split('T')[0],
    CheckInTime: '08:00',
    CheckOutTime: '17:00',
    OvertimeHours: 0,
    Remarks: '',
    CheckInLocation: '',
    CheckOutLocation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'OvertimeHours' || name === 'Driver_Id' ? Number(value) : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <section>
        <h2 className="text-3xl font-black tracking-tight text-on-surface uppercase italic">Log Attendance</h2>
        <p className="text-on-surface-variant mt-1 font-medium italic">Enter shift details for fleet operations.</p>
      </section>

      {/* Form Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Basic Info */}
        <div className="space-y-6">
          {/* Driver Selection Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5">
            <div className="flex items-center gap-2 mb-4">
              <UserSearch size={20} className="text-primary" />
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Select Driver *</label>
            </div>
            <div className="relative">
              <select
                name="Driver_Id"
                onChange={handleChange}
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent py-3.5 px-4 rounded-t-lg text-on-surface focus:border-primary focus:ring-0 appearance-none font-bold text-sm"
              >
                <option value="">Choose a driver...</option>
                <option value="1">Marcus Thompson (ID: 4492)</option>
                <option value="2">Elena Rodriguez (ID: 3821)</option>
                <option value="3">David Chen (ID: 5509)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Date & Status */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Service Date *</label>
              </div>
              <input
                name="AttendanceDate"
                value={formData.AttendanceDate}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent py-3.5 px-4 rounded-t-lg text-on-surface focus:border-primary focus:ring-0 font-bold text-sm"
                type="date"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-primary" />
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Attendance Status *</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(AttendanceStatus).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, Status: status }))}
                    className={cn(
                      "py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                      formData.Status === status
                        ? "bg-primary text-on-primary border-primary shadow-md"
                        : "bg-surface-container-low text-on-surface-variant border-outline/10 hover:bg-surface-container-high"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timing & Location */}
        <div className="space-y-6">
          {/* Timing Grid */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <LogIn size={20} className="text-emerald-500" />
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Clock In</label>
                </div>
                <input
                  name="CheckInTime"
                  value={formData.CheckInTime}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-0 border-b-2 border-transparent py-3.5 px-4 rounded-t-lg text-on-surface focus:border-primary focus:ring-0 font-bold text-sm"
                  type="time"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <LogOut size={20} className="text-error" />
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Clock Out</label>
                </div>
                <input
                  name="CheckOutTime"
                  value={formData.CheckOutTime}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-0 border-b-2 border-transparent py-3.5 px-4 rounded-t-lg text-on-surface focus:border-primary focus:ring-0 font-bold text-sm"
                  type="time"
                />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-outline/5 space-y-4">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Overtime Hours</label>
              </div>
              <input
                name="OvertimeHours"
                value={formData.OvertimeHours}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent py-3.5 px-4 rounded-t-lg text-on-surface focus:border-primary focus:ring-0 font-bold text-sm"
                type="number"
                step="0.5"
                placeholder="0.0"
              />
            </div>
          </div>

          {/* Location Tracking */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Check-In Location</label>
              </div>
              <input
                name="CheckInLocation"
                value={formData.CheckInLocation}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent py-3.5 px-4 rounded-t-lg text-on-surface focus:border-primary focus:ring-0 font-bold text-sm"
                placeholder="Enter location or GPS..."
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-on-surface-variant/60">
                <FileText size={20} />
                <label className="text-[0.65rem] font-bold uppercase tracking-widest">Remarks</label>
              </div>
              <textarea
                name="Remarks"
                value={formData.Remarks}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-0 border-b-2 border-transparent py-3.5 px-4 rounded-t-lg text-on-surface focus:border-primary focus:ring-0 font-bold text-sm min-h-[80px]"
                placeholder="Add any shift notes..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pulse Status Indicator */}
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Real-time sync active</span>
        </div>
        <span className="text-[10px] text-on-surface-variant/60 font-medium tracking-wider italic">Fleet ID: #KK-DRIVE</span>
      </div>

      {/* Submit Action */}
      <button
        onClick={() => navigate('/attendance')}
        className="w-full bg-primary text-on-primary py-6 rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-primary/90 shadow-primary/20"
      >
        <span>Submit Attendance Record</span>
        <Send size={20} />
      </button>

      {/* Recent Logs Section */}
      <section className="space-y-4">
        <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Latest Logs</h3>
        <div className="space-y-3">
          {recentLogs.map((log, i) => (
            <div key={i} className={cn(
              "glass-panel flex items-center justify-between p-4 rounded-2xl border border-outline/5",
              i === 1 && "opacity-60"
            )}>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-1.5 h-10 rounded-full",
                  log.color === 'emerald' ? "bg-emerald-500" : "bg-surface-container-highest"
                )}></div>
                <div>
                  <p className="text-sm font-bold text-on-surface">{log.name}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">{log.date} • {log.time}</p>
                </div>
              </div>
              <span className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                log.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500" : "bg-surface-container-highest text-on-surface-variant"
              )}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
