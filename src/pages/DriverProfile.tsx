import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Route,
    FileText,
    LayoutDashboard,
    Clock,
    TrendingUp,
    AlertCircle,
    Download,
    Filter,
    Plus,
    Eye,
    Edit
} from 'lucide-react';
import { Layout } from '@/src/components/Layout';
import { cn } from '@/src/lib/utils';

export default function DriverProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentDate, setCurrentDate] = useState(new Date());

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
        navigate(`/drivers/${id}?tab=${tab}`, { replace: true });
    };

    // Helper to get days in month
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const viewYear = currentDate.getFullYear();
    const viewMonth = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(viewYear, viewMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(viewYear, viewMonth + 1, 1));
    };

    // In a real app, you would fetch driver data based on the ID
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
                            <img
                                alt={driver.name}
                                className="w-full h-full object-cover"
                                src={driver.image}
                            />
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

                {/* Tab Navigation */}
                <div className="flex items-center gap-2 border-b border-outline/5 overflow-x-auto pb-px">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'trips', label: 'Trips', icon: Route },
                        { id: 'reports', label: 'Reports', icon: FileText }
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

                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Details */}
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-outline/5 space-y-6">
                                <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                                    <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                        <User size={20} />
                                    </div>
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

                            {/* Contact Details */}
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-outline/5 space-y-6">
                                <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                                    <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                        <Smartphone size={20} />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">Contact Info</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-1.5 bg-surface-container rounded-md text-on-surface-variant">
                                            <Phone size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Phone Number</p>
                                            <p className="text-sm font-bold text-on-surface">{driver.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-1.5 bg-surface-container rounded-md text-on-surface-variant">
                                            <Mail size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Email Address</p>
                                            <p className="text-sm font-bold text-on-surface">{driver.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-1.5 bg-surface-container rounded-md text-on-surface-variant">
                                            <MapPin size={16} />
                                        </div>
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
                                    <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                        <BadgeCheck size={20} />
                                    </div>
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
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Attendance Intelligence</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handlePrevMonth}
                                        className="p-1 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest min-w-[120px] text-center">
                                        {monthNames[viewMonth]} {viewYear}
                                    </p>
                                    <button
                                        onClick={handleNextMonth}
                                        className="p-1 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 border border-outline/5">
                                <div className="grid grid-cols-7 gap-y-6 text-center mb-8">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                        <div key={day} className="text-[10px] font-black text-on-surface-variant/40 tracking-widest">{day}</div>
                                    ))}

                                    {/* Empty slots for previous month padding */}
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`empty-${i}`} className="py-2"></div>
                                    ))}

                                    {/* Actual Days */}
                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                        // Mock status logic - in real app this would come from a database for this specific driver/date
                                        const date = new Date(viewYear, viewMonth, day);
                                        const isToday = new Date().toDateString() === date.toDateString();
                                        const dayOfWeek = date.getDay();

                                        let status = 'present';
                                        if (dayOfWeek === 0) status = 'off';
                                        else if (day % 15 === 0) status = 'absent';
                                        else if (day % 22 === 0) status = 'leave';

                                        return (
                                            <div key={day} className="relative py-2 group cursor-help">
                                                <span className={cn(
                                                    "text-xs font-bold transition-colors w-8 h-8 flex items-center justify-center mx-auto rounded-lg",
                                                    isToday ? "bg-primary text-white shadow-sm" : "text-on-surface"
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
                )}

                {activeTab === 'trips' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Trip History</h3>
                            <button className="btn-primary py-2 px-4 text-[10px]">
                                <Plus size={14} />
                                New Trip
                            </button>
                        </div>

                        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline/5 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low border-b border-outline/5">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Trip ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Route</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Date</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline/5">
                                    {[
                                        { id: 'TRP-4492', origin: 'New York, NY', destination: 'Boston, MA', date: 'Mar 28, 2026', status: 'Completed' },
                                        { id: 'TRP-4481', origin: 'Boston, MA', destination: 'New York, NY', date: 'Mar 26, 2026', status: 'Completed' },
                                        { id: 'TRP-4475', origin: 'New York, NY', destination: 'Philadelphia, PA', date: 'Mar 24, 2026', status: 'Completed' },
                                        { id: 'TRP-4460', origin: 'Philadelphia, PA', destination: 'New York, NY', date: 'Mar 22, 2026', status: 'Completed' },
                                    ].map((trip) => (
                                        <tr key={trip.id} className="group hover:bg-surface-container-low transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-black font-mono text-primary">{trip.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-on-surface">{trip.origin}</span>
                                                    <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">to {trip.destination}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium text-on-surface-variant">{trip.date}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700">
                                                    {trip.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 hover:bg-primary/10 text-primary rounded-md transition-colors">
                                                        <Eye size={14} />
                                                    </button>
                                                    <button className="p-1.5 hover:bg-surface-container-high text-on-surface-variant rounded-md transition-colors">
                                                        <Edit size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Performance Reports</h3>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high transition-colors">
                                    <Filter size={14} />
                                    Filter
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-colors">
                                    <Download size={14} />
                                    Export PDF
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Safety Score', value: '98/100', icon: BadgeCheck, color: 'text-green-600', trend: '+2%' },
                                { label: 'On-Time Rate', value: '94%', icon: Clock, color: 'text-blue-600', trend: '+1.5%' },
                                { label: 'Fuel Efficiency', value: '8.2 km/l', icon: TrendingUp, color: 'text-amber-600', trend: '-0.3%' }
                            ].map((stat) => (
                                <div key={stat.label} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline/5 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={cn("p-2 rounded-lg bg-surface-container", stat.color)}>
                                            <stat.icon size={20} />
                                        </div>
                                        <span className={cn(
                                            "text-[10px] font-black px-2 py-0.5 rounded-full",
                                            stat.trend.startsWith('+') ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                        )}>
                                            {stat.trend}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h4 className="text-2xl font-black text-on-surface tracking-tight">{stat.value}</h4>
                                </div>
                            ))}
                        </div>

                        <div className="bg-surface-container-lowest rounded-2xl border border-outline/5 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <AlertCircle className="text-amber-500" size={20} />
                                <h4 className="text-sm font-black uppercase tracking-widest text-on-surface">Incident Summary</h4>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { type: 'Hard Braking', count: 2, severity: 'Low', date: 'Mar 24, 2026' },
                                    { type: 'Speeding (>80km/h)', count: 1, severity: 'Medium', date: 'Mar 15, 2026' },
                                ].map((incident, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline/5">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                incident.severity === 'Low' ? "bg-amber-400" : "bg-red-500"
                                            )} />
                                            <div>
                                                <p className="text-xs font-bold text-on-surface">{incident.type}</p>
                                                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{incident.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-on-surface">x{incident.count}</p>
                                            <p className={cn(
                                                "text-[10px] font-black uppercase tracking-widest",
                                                incident.severity === 'Low' ? "text-amber-600" : "text-red-600"
                                            )}>{incident.severity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
