import React, { useState, useEffect } from 'react';
import {
  Wallet,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  PlusCircle,
  ArrowLeft,
  Banknote,
  History,
  FileText,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  User,
  Calculator,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DriverPayroll, PaymentStatus } from '../types';

const payouts = [
  { id: 'PAY-8821', name: 'Julian Rossi', amount: '$3,240.00', date: 'Mar 25, 2024', status: 'Paid', method: 'Direct Deposit' },
  { id: 'PAY-8822', name: 'Sarah Mitchell', amount: '$2,850.50', date: 'Mar 25, 2024', status: 'Processing', method: 'Direct Deposit' },
  { id: 'PAY-8823', name: 'Marcus Chen', amount: '$4,120.00', date: 'Mar 24, 2024', status: 'Paid', method: 'Wire Transfer' },
  { id: 'PAY-8824', name: 'Alex Thompson', amount: '$1,980.00', date: 'Mar 24, 2024', status: 'Scheduled', method: 'Direct Deposit' }
];

export default function SalaryPayout() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<Partial<DriverPayroll>>({
    SalaryMonth: new Date().getMonth() + 1,
    SalaryYear: new Date().getFullYear(),
    BasicSalary: 3000,
    PerDaySalary: 100,
    PresentDays: 22,
    TotalDays: 30,
    AbsentDays: 2,
    LeaveDays: 6,
    OvertimeAmount: 250,
    Bonus: 500,
    Allowances: 300,
    Penalty: 50,
    AdvanceDeduction: 200,
    PaymentStatus: PaymentStatus.Pending,
    PaymentMode: 'Bank Transfer',
    PaymentDate: new Date().toISOString().split('T')[0],
    Remarks: ''
  });

  const [grossSalary, setGrossSalary] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  useEffect(() => {
    const gross = (formData.BasicSalary || 0) +
      (formData.OvertimeAmount || 0) +
      (formData.Bonus || 0) +
      (formData.Allowances || 0);

    const net = gross - (formData.Penalty || 0) - (formData.AdvanceDeduction || 0);

    setGrossSalary(gross);
    setNetSalary(net);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const exportToPDF = (title: string, data: any[]) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [['Transaction', 'Amount', 'Date', 'Method', 'Status']],
      body: data.map(p => [
        `${p.name}\n(${p.id})`,
        p.amount,
        p.date,
        p.method,
        p.status
      ]),
      headStyles: { fillColor: [0, 63, 135] },
      theme: 'striped',
    });

    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  const handleRunPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setView('list');
    }, 2000);
  };

  if (view === 'form') {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <section className="flex items-center justify-between">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={16} />
            Back to Payouts
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Payroll Engine</span>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Driver & Period */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-outline">Step 01</span>
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Driver & Period</span>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient border border-outline/5 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Select Driver</label>
                    <div className="relative">
                      <select
                        name="Driver_Id"
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-4 py-3.5 text-sm appearance-none transition-all font-bold"
                      >
                        <option value="1">Marcus Aurelius - SR-902</option>
                        <option value="2">Lucius Verus - SR-441</option>
                        <option value="3">Commodus Antoninus - SR-112</option>
                      </select>
                      <ChevronRight size={20} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline rotate-90" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Month</label>
                      <select
                        name="SalaryMonth"
                        value={formData.SalaryMonth}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-4 py-3.5 text-sm font-bold"
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Year</label>
                      <input
                        name="SalaryYear"
                        type="number"
                        value={formData.SalaryYear}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-4 py-3.5 text-sm font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Attendance Summary */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-outline">Step 02</span>
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Attendance Summary</span>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient border border-outline/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Days', name: 'TotalDays', color: 'primary' },
                    { label: 'Present', name: 'PresentDays', color: 'emerald' },
                    { label: 'Absent', name: 'AbsentDays', color: 'error' },
                    { label: 'Leave', name: 'LeaveDays', color: 'amber' },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-[0.6rem] font-black uppercase tracking-widest text-on-surface-variant">{field.label}</label>
                      <input
                        name={field.name}
                        type="number"
                        value={formData[field.name as keyof DriverPayroll] as number}
                        onChange={handleChange}
                        className={cn(
                          "w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:ring-0 rounded-t-lg px-4 py-3 text-sm font-black italic",
                          field.color === 'emerald' ? "text-emerald-500 focus:border-emerald-500" :
                            field.color === 'error' ? "text-error focus:border-error" :
                              field.color === 'amber' ? "text-amber-500 focus:border-amber-500" :
                                "text-primary focus:border-primary"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 3: Salary Structure & Earnings */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-outline">Step 03</span>
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Earnings & Structure</span>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient border border-outline/5 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Basic Salary</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      <input
                        name="BasicSalary"
                        type="number"
                        value={formData.BasicSalary}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg pl-10 pr-4 py-3.5 text-sm font-black italic text-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Per Day Salary</label>
                    <div className="relative">
                      <Calculator size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                      <input
                        name="PerDaySalary"
                        type="number"
                        value={formData.PerDaySalary}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg pl-10 pr-4 py-3.5 text-sm font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-outline/5">
                  {[
                    { label: 'Overtime', name: 'OvertimeAmount', icon: Clock },
                    { label: 'Bonus', name: 'Bonus', icon: TrendingUp },
                    { label: 'Allowances', name: 'Allowances', icon: PlusCircle },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-[0.6rem] font-black uppercase tracking-widest text-on-surface-variant">{field.label}</label>
                      <div className="relative">
                        <field.icon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                          name={field.name}
                          type="number"
                          value={formData[field.name as keyof DriverPayroll] as number}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg pl-8 pr-3 py-2.5 text-xs font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 4: Deductions */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-outline">Step 04</span>
                <span className="text-xs text-error font-bold uppercase tracking-wider">Deductions</span>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient border border-outline/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Penalty Amount</label>
                    <div className="relative">
                      <AlertCircle size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-error" />
                      <input
                        name="Penalty"
                        type="number"
                        value={formData.Penalty}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-error focus:ring-0 rounded-t-lg pl-10 pr-4 py-3.5 text-sm font-black italic text-error"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Advance Deduction</label>
                    <div className="relative">
                      <ArrowDownRight size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-error" />
                      <input
                        name="AdvanceDeduction"
                        type="number"
                        value={formData.AdvanceDeduction}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-error focus:ring-0 rounded-t-lg pl-10 pr-4 py-3.5 text-sm font-black italic text-error"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Summary & Payment */}
          <div className="space-y-8">
            {/* Calculation Summary Card */}
            <section className="space-y-4">
              <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 -mr-24 -mt-24 rounded-full blur-3xl"></div>
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                    <span>Gross Earnings</span>
                    <span>${grossSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                    <span>Total Deductions</span>
                    <span className="text-tertiary-fixed">-${((formData.Penalty || 0) + (formData.AdvanceDeduction || 0)).toLocaleString()}</span>
                  </div>
                  <div className="pt-8 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-3">Net Payable Amount</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black tracking-tighter">${netSalary.toLocaleString()}</span>
                      <span className="text-xs font-bold opacity-40 uppercase tracking-widest italic">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section className="space-y-4">
              <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient border border-outline/5 space-y-6">
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Payment Mode</label>
                  <select
                    name="PaymentMode"
                    value={formData.PaymentMode}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-4 py-3.5 text-sm font-bold"
                  >
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>UPI / Digital</option>
                    <option>Cheque</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Payment Date</label>
                  <input
                    name="PaymentDate"
                    type="date"
                    value={formData.PaymentDate}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-4 py-3.5 text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Payment Status</label>
                  <select
                    name="PaymentStatus"
                    value={formData.PaymentStatus}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-4 py-3.5 text-sm font-bold"
                  >
                    {Object.values(PaymentStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">Remarks</label>
                  <textarea
                    name="Remarks"
                    value={formData.Remarks}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg px-4 py-3.5 text-sm font-medium min-h-[100px]"
                    placeholder="Add payroll notes..."
                  />
                </div>
              </div>
            </section>

            {/* Action Button */}
            <button
              onClick={handleRunPayroll}
              disabled={isProcessing}
              className={cn(
                "w-full bg-primary text-white py-6 rounded-3xl font-black text-lg uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 hover:bg-primary/90 shadow-primary/20",
                isProcessing && "opacity-80 cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck size={24} />
                  <span>Finalize Payout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface uppercase italic leading-none">Payroll Engine</h1>
          <p className="text-on-surface-variant mt-2 font-medium italic">Strategic financial management for fleet personnel.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToPDF('Payroll History - March 2024', payouts)}
            className="flex items-center px-6 py-3 bg-surface-container-lowest text-on-surface-variant border border-outline/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-surface-container transition-colors"
          >
            <History size={16} className="mr-2" />
            History
          </button>
          <button
            onClick={() => setView('form')}
            className="btn-primary px-8 py-3 shadow-lg shadow-primary/20"
          >
            <Wallet size={18} />
            Run Payroll
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary p-8 rounded-3xl text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-52">
            <div className="relative z-10">
              <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] opacity-60">Total Monthly Disbursement</span>
              <div className="text-5xl font-black mt-2 tracking-tighter">$452,800.00</div>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-4 py-2 rounded-full border border-white/10">
              <TrendingUp size={14} />
              <span>+4.2% Growth</span>
            </div>
            <Wallet size={140} className="absolute -right-6 -bottom-6 opacity-10" />
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-ambient border border-outline/5 flex flex-col justify-between h-52">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-on-surface-variant">Pending Settlements</span>
                <div className="text-4xl font-black text-on-surface mt-1 tracking-tighter">$12,450.00</div>
              </div>
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/10">
                <CreditCard size={24} />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex-1">
                <div className="flex justify-between text-[9px] font-black text-on-surface-variant uppercase tracking-widest mb-2">
                  <span>Processing Queue</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container-low p-8 rounded-3xl border border-outline/5 space-y-6">
          <h3 className="text-[0.65rem] font-black text-on-surface uppercase tracking-[0.2em]">Financial Toolkit</h3>
          <div className="space-y-4">
            <button
              onClick={() => exportToPDF('Generated Payslips - March 2024', payouts)}
              className="w-full flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all group border border-outline/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors border border-primary/5">
                  <FileText size={22} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-on-surface uppercase tracking-widest">Payslips</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">Generate March batch</p>
                </div>
              </div>
              <Download size={18} className="text-outline" />
            </button>
            <button className="w-full flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all group border border-outline/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors border border-emerald-500/10">
                  <CheckCircle size={22} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-on-surface uppercase tracking-widest">Compliance</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">Verify tax filings</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-outline" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden border border-outline/5">
        <div className="p-8 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-6 border-b border-outline/5">
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-xl transition-all text-xs font-bold"
              placeholder="Search payout by name or ID..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <button
              onClick={() => exportToPDF('Payouts List - March 2024', payouts)}
              className="flex items-center px-6 py-3 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-colors"
            >
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-[0.7rem] font-black uppercase tracking-widest text-on-surface-variant">Recipient</th>
                <th className="px-8 py-5 text-[0.7rem] font-black uppercase tracking-widest text-on-surface-variant">Disbursement</th>
                <th className="px-8 py-5 text-[0.7rem] font-black uppercase tracking-widest text-on-surface-variant">Date</th>
                <th className="px-8 py-5 text-[0.7rem] font-black uppercase tracking-widest text-on-surface-variant">Method</th>
                <th className="px-8 py-5 text-[0.7rem] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {payouts.map((pay) => (
                <tr key={pay.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-xs border border-primary/10">
                        {pay.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-on-surface italic">{pay.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{pay.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-primary italic">{pay.amount}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-on-surface">{pay.date}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{pay.method}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ring-1 ring-inset",
                      pay.status === 'Paid' && "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
                      pay.status === 'Processing' && "bg-amber-500/10 text-amber-500 ring-amber-500/20",
                      pay.status === 'Scheduled' && "bg-surface-container-highest text-on-surface-variant ring-outline/20"
                    )}>
                      {pay.status}
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

