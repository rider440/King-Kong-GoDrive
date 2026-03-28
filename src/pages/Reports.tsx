import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  FileText, 
  PieChart, 
  Activity,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Reports() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface uppercase">Analytics & Reports</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Data-driven insights for fleet optimization.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center px-4 py-2.5 bg-surface-container-lowest text-on-surface-variant border border-outline/10 rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors">
            <Calendar size={16} className="mr-2" />
            Last 30 Days
          </button>
          <button className="btn-primary px-6 py-2.5">
            <Download size={18} />
            Generate Report
          </button>
        </div>
      </section>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline/5 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-on-surface">Fleet Utilization</h3>
              <p className="text-xs text-on-surface-variant font-medium">Daily active vehicles vs total fleet capacity.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-[10px] font-bold uppercase text-on-surface-variant">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-surface-container-highest rounded-full" />
                <span className="text-[10px] font-bold uppercase text-on-surface-variant">Idle</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-2">
            {[65, 80, 45, 90, 70, 85, 95, 60, 75, 80, 90, 85].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-surface-container-high rounded-t-lg relative overflow-hidden h-full">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary group-hover:bg-primary-container transition-all duration-500 rounded-t-lg" 
                    style={{ height: `${val}%` }} 
                  />
                </div>
                <span className="text-[8px] font-bold text-on-surface-variant uppercase">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline/5 space-y-6">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Efficiency Score</h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-on-surface">85</span>
                  <span className="text-[8px] font-bold uppercase text-on-surface-variant">Excellent</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant font-medium">Fuel Efficiency</span>
                <span className="font-bold text-on-surface">92%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant font-medium">Route Optimization</span>
                <span className="font-bold text-on-surface">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Operational Costs', icon: TrendingDown, value: '$12,450', trend: '-12%', color: 'emerald' },
          { title: 'Revenue Generated', icon: TrendingUp, value: '$84,200', trend: '+18%', color: 'primary' },
          { title: 'Maintenance Expense', icon: Activity, value: '$4,120', trend: '+2%', color: 'amber' }
        ].map((item, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">{item.title}</h3>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", `bg-${item.color}/10 text-${item.color}`)}>
                <item.icon size={18} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-on-surface">{item.value}</p>
              <span className={cn("text-xs font-bold", item.trend.startsWith('+') ? "text-primary" : "text-emerald-600")}>
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider px-1">Available Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Monthly Fuel Consumption', desc: 'Detailed breakdown of fuel usage across all assets.', type: 'PDF • 2.4MB' },
            { title: 'Driver Safety Audit', desc: 'Safety scores and incident reports for the current quarter.', type: 'XLS • 1.1MB' },
            { title: 'Vehicle Maintenance Schedule', desc: 'Upcoming service dates and historical maintenance logs.', type: 'PDF • 4.8MB' },
            { title: 'Payroll Summary', desc: 'Complete payout history and tax documentation.', type: 'CSV • 0.5MB' }
          ].map((report, i) => (
            <button key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline/5 flex items-center justify-between hover:shadow-md transition-all text-left group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-low text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">{report.title}</h4>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-1">{report.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{report.type}</p>
                <Download size={16} className="text-primary mt-2 ml-auto" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
