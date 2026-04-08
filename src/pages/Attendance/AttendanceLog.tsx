import React from 'react';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const attendance = [
  { id: 'DRV-9021', name: 'Julian Rossi', shift: 'Morning', checkIn: '05:58 AM', checkOut: '02:05 PM', status: 'Present', workingHours: 8.1, overtime: 0.5, location: 'Main Depot', color: 'emerald' },
  { id: 'DRV-4412', name: 'Sarah Mitchell', shift: 'Morning', checkIn: '06:02 AM', checkOut: '02:10 PM', status: 'HalfDay', workingHours: 4.0, overtime: 0, location: 'North Terminal', color: 'amber' },
  { id: 'DRV-7718', name: 'Marcus Chen', shift: 'Night', checkIn: '---', checkOut: '---', status: 'Absent', workingHours: 0, overtime: 0, location: '---', color: 'error' },
  { id: 'DRV-1256', name: 'Alex Thompson', shift: 'Morning', checkIn: '05:45 AM', checkOut: '01:55 PM', status: 'Present', workingHours: 8.2, overtime: 1.2, location: 'Main Depot', color: 'emerald' }
];

export default function AttendanceLog() {
  const navigate = useNavigate();

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Attendance Log', 14, 20);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [['Driver', 'ID', 'Check-In', 'Check-Out', 'Hours', 'OT', 'Status']],
      body: attendance.map(log => [log.name, log.id, log.checkIn, log.checkOut, log.workingHours, log.overtime, log.status]),
      headStyles: { fillColor: [0, 63, 135] },
      theme: 'striped',
    });

    doc.save(`attendance_log_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface uppercase italic">Attendance Log</h1>
          <p className="text-on-surface-variant mt-1 font-medium italic">Daily shift tracking and personnel availability.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2.5 bg-surface-container-lowest text-on-surface-variant border border-outline/10 rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export Log
          </button>
          <button
            onClick={() => navigate('/attendance/bulk')}
            className="btn-primary px-6 py-2.5"
          >
            <CalendarCheck size={18} />
            Log Attendance
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Present Today', value: '112', icon: CheckCircle2, color: 'emerald' },
          { label: 'Late Arrivals', value: '5', icon: Clock, color: 'amber' },
          { label: 'Absent', value: '2', icon: XCircle, color: 'error' },
          { label: 'On Leave', value: '8', icon: AlertCircle, color: 'primary' }
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

      <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden border border-outline/5">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm"
              placeholder="Search driver by name or ID..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <input className="px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold border-none focus:ring-0" type="date" placeholder="YYYY-MM-DD" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Driver</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Check-In/Out</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant text-center">Hours (OT)</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Location</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {attendance.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs">
                        {log.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{log.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">{log.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                        <LogIn size={12} className="text-emerald-500" />
                        {log.checkIn}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant">
                        <LogOut size={12} className="text-error" />
                        {log.checkOut}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm font-black text-on-surface">{log.workingHours}h</p>
                    {log.overtime > 0 && (
                      <p className="text-[10px] font-bold text-emerald-600">+{log.overtime}h OT</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant">
                      <MapPin size={12} />
                      {log.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                      log.status === 'Present' && "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
                      log.status === 'HalfDay' && "bg-amber-500/10 text-amber-500 ring-amber-500/20",
                      log.status === 'Absent' && "bg-error/10 text-error ring-error/20",
                      log.status === 'Leave' && "bg-primary/10 text-primary ring-primary/20"
                    )}>
                      {log.status}
                    </span>
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

import { LogIn, LogOut, MapPin } from 'lucide-react';
