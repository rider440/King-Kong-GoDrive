import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Bell,
    CheckCircle,
    User,
    Phone,
    Mail,
    MapPin,
    BadgeCheck,
    Smartphone,
    Calendar,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Layout } from '@/src/components/Layout';
import { cn } from '@/src/lib/utils';

export default function DriverProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());

    // Calendar Logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate arrays for calendar grid
    const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Check if viewed month is the current actual month to highlight "today"
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDayNumber = today.getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Generate years for dropdown (5 years in past to 5 years in future)
    const currentRealYear = today.getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentRealYear - 5 + i);

    // Navigation Handlers
    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setCurrentDate(new Date(year, newMonth, 1));
    };

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentDate(new Date(newYear, month, 1));
    };

    // Mock Driver Data
    const driver = {
        id: id || 'DRV-88293',
        name: 'Marcus Sterling',
        empId: '#DRV-88293',
        status: 'ACTIVE',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3u3haQrE0jp9DZJGue_sV856PQR1fn-nPRsAh4oQU18ttxdfCW5L2EyQT1JzHXs-ACi1ZMv55d-tJSbDjDejokGx1RPwSoy2FPPuFBtbTESMknOa2i5GxJDzwQIL3n5gxw0d7C_Nz-VvVabqvktrMbr8v5GH0E7I2KgzoRJMAyAWlhnBUnDRZjU_i7DwwiIlQqeYtL_-MfP-naVL4oZbYYcE0axQezt9uhcjdhmxH0x6o9J1ZadV-bsp5kdRR0NR1QCz3Gb-F2Bc',
        dob: 'May 12, 1985',
        gender: 'Male',
        bloodGroup: 'O Positive',
        phone: '+1 (555) 234-8890',
        email: 'm.sterling@fleetlink.com',
        address: '442 Executive Way, Suite 200, Portland, OR',
        licenseNo: 'OR-9921-X88L',
        licenseType: 'Class A CDL',
        licenseExpiry: 'Dec 15, 2026',
        earnings: 4850.00,
        baseSalary: 4000.00,
        incentives: 950.00,
        deductions: 100.00
    };

    return (
        <Layout title="Driver Profile">
            <div className="space-y-6 max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors font-bold uppercase text-xs tracking-widest"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Directory</span>
                </button>

                {/* Profile Header Section */}
                <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 flex flex-col items-center text-center border border-outline/5">
                    <div className="relative mb-6">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-surface-container shadow-inner">
                            <img alt={driver.name} className="w-full h-full object-cover" src={driver.image} />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg border border-outline/10">
                            <CheckCircle size={24} className="text-green-600 fill-green-600/10" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-on-surface uppercase">{driver.name}</h2>
                    <p className="text-sm font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2">Emp ID: {driver.empId}</p>
                    <div className="mt-4">
                        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-green-100 text-green-800 border border-green-200 tracking-widest">
                            {driver.status}
                        </span>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details & Contact Details blocks remain unchanged here */}
                    <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-outline/5 space-y-6">
                        <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                            <div className="p-2 bg-primary/5 rounded-lg text-primary"><User size={20} /></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Personal Details</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">Date of Birth</p>
                                <p className="text-sm font-bold text-on-surface">{driver.dob}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">Gender</p>
                                <p className="text-sm font-bold text-on-surface">{driver.gender}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">Blood Group</p>
                                <p className="text-sm font-bold text-error">{driver.bloodGroup}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-outline/5 space-y-6">
                        <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                            <div className="p-2 bg-primary/5 rounded-lg text-primary"><Smartphone size={20} /></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Contact Info</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-1.5 bg-surface-container rounded-md text-on-surface-variant"><Phone size={16} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Phone Number</p>
                                    <p className="text-sm font-bold text-on-surface">{driver.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-1.5 bg-surface-container rounded-md text-on-surface-variant"><Mail size={16} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Email Address</p>
                                    <p className="text-sm font-bold text-on-surface">{driver.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-1.5 bg-surface-container rounded-md text-on-surface-variant"><MapPin size={16} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Residential Address</p>
                                    <p className="text-sm font-bold text-on-surface leading-relaxed">{driver.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* License Details */}
                    <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border-l-4 border-primary border-y border-r border-outline/5 space-y-6 md:col-span-2">
                        <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                            <div className="p-2 bg-primary/5 rounded-lg text-primary"><BadgeCheck size={20} /></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary">License Credentials</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">License No.</p>
                                <p className="text-sm font-black font-mono tracking-tight text-primary">{driver.licenseNo}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">Type</p>
                                <p className="text-sm font-bold text-on-surface">{driver.licenseType}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">Expiry Date</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-on-surface">{driver.licenseExpiry}</p>
                                    <span className="bg-blue-50 text-[10px] text-blue-700 px-2 py-0.5 rounded-full font-black tracking-tighter">RENEWAL READY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendance Calendar Section */}
                <section className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Attendance Intelligence</h3>

                        {/* Interactive Calendar Navigation with Dropdowns */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevMonth}
                                className="p-1.5 hover:bg-surface-container rounded-md text-on-surface-variant transition-colors border border-transparent hover:border-outline/10"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline/10 rounded-lg p-1">
                                <select
                                    value={month}
                                    onChange={handleMonthChange}
                                    className="bg-transparent text-xs font-bold text-primary uppercase tracking-widest outline-none cursor-pointer hover:bg-surface-container-high px-2 py-1 rounded-md transition-colors"
                                >
                                    {monthNames.map((m, idx) => (
                                        <option key={m} value={idx}>{m}</option>
                                    ))}
                                </select>

                                <span className="text-outline/20">|</span>

                                <select
                                    value={year}
                                    onChange={handleYearChange}
                                    className="bg-transparent text-xs font-bold text-primary uppercase tracking-widest outline-none cursor-pointer hover:bg-surface-container-high px-2 py-1 rounded-md transition-colors"
                                >
                                    {years.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={nextMonth}
                                className="p-1.5 hover:bg-surface-container rounded-md text-on-surface-variant transition-colors border border-transparent hover:border-outline/10"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 border border-outline/5">
                        <div className="grid grid-cols-7 gap-y-6 text-center mb-8">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                                <div key={idx} className="text-[10px] font-black text-on-surface-variant/40 tracking-widest">{day}</div>
                            ))}

                            {/* Empty offset days based on month's start day */}
                            {blankDays.map((_, index) => (
                                <div key={`blank-${index}`} className="py-2"></div>
                            ))}

                            {/* Render Actual Days */}
                            {days.map(day => {
                                // Mock logic for statuses - in a real app, this maps to an API response matching specific dates
                                const status = day % 7 === 0 ? 'off' : day % 8 === 0 ? 'absent' : day % 12 === 0 ? 'leave' : 'present';
                                const isToday = isCurrentMonth && day === currentDayNumber;

                                return (
                                    <div key={day} className="relative py-2 group cursor-help">
                                        <span className={cn(
                                            "text-xs font-bold transition-colors",
                                            isToday ? "bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg mx-auto" : "text-on-surface"
                                        )}>
                                            {day}
                                        </span>
                                        {!isToday && (
                                            <div className={cn(
                                                "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full",
                                                status === 'present' && "bg-green-500",
                                                status === 'absent' && "bg-red-500",
                                                status === 'leave' && "bg-orange-500",
                                                status === 'off' && "bg-slate-300"
                                            )}></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-outline/5 pt-6">
                            {[
                                { label: 'Present', color: 'bg-green-500' },
                                { label: 'Absent', color: 'bg-red-500' },
                                { label: 'Leave', color: 'bg-orange-500' },
                                { label: 'Off-Day', color: 'bg-slate-300' }
                            ].map(item => (
                                <div key={item.label} className="flex items-center gap-2">
                                    <div className={cn("w-2.5 h-2.5 rounded-full", item.color)}></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Financial Overview */}
                <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Financial Performance</h3>
                    <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline/5">
                        <div className="bg-primary p-8 flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Current Month Earnings</p>
                                <h4 className="text-4xl font-black text-white tracking-tighter">${driver.earnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h4>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Processing</span>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Base Salary</span>
                                <span className="font-bold text-on-surface">${driver.baseSalary.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Incentives</span>
                                <span className="font-bold text-green-600">+${driver.incentives.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Deductions</span>
                                <span className="font-bold text-error">-${driver.deductions.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-outline/5 pt-6 flex justify-between items-center">
                                <span className="text-sm font-black uppercase tracking-[0.2em] text-on-surface">Net Total</span>
                                <span className="text-2xl font-black text-primary tracking-tighter">${driver.earnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}