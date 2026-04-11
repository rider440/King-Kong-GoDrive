import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDriver, getDriverAttendance, getDrivers } from '@/services/driverService';
import { getImageUrl } from '@/services/api';
import { Loader2, ShieldCheck, CreditCard } from 'lucide-react';
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
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
import AddDriver from './AddDriver';

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

    const [driverData, setDriverData] = useState<any>(null);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDriver = async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            console.log('--- Fetching Driver Data for ID:', id, '---');
            let res;
            try {
                res = await getDriver(id as any);
                console.log('1. Raw API Response (Single):', res);
            } catch (singleFetchError: any) {
                console.warn('Single Driver Fetch Failed (likely 404). Attempting fallback to full list...');
                const listRes = await getDrivers();
                console.log('1b. Fallback List API Response:', listRes);

                // Discovery for list response
                const findArray = (obj: any): any[] | null => {
                    if (Array.isArray(obj)) return obj;
                    const commonKeys = ['data', 'value', '$values', 'driverList', 'drivers'];
                    for (const key of commonKeys) {
                        if (Array.isArray(obj[key])) return obj[key];
                    }
                    return null;
                };

                const array = findArray(listRes) || [];
                // Search for the driver in the list
                const searchId = Number(id);
                res = array.find((d: any) =>
                    (d.Driver_Id || d.driver_Id || d.driverId || d.id) == searchId
                );

                if (res) {
                    console.log('SUCCESS: Driver found in list via fallback discovery!');
                } else {
                    console.error('CRITICAL: Driver not found in list either.');
                    throw singleFetchError; // Rethrow original error if list fallback fails
                }
            }

            if (typeof res === 'string' && (res.includes('<!DOCTYPE html>') || res.includes('<html'))) {
                console.error('CRITICAL: Received HTML instead of JSON. Possible 404/500 redirect.');
                setError('Backend returned an error page (HTML). Please check your API proxy.');
                return;
            }

            // Robust data discovery for single object
            const findObject = (obj: any): any | null => {
                if (!obj || typeof obj !== 'object') {
                    console.warn('findObject: Received non-object', obj);
                    return null;
                }

                // 1. If it has common driver keys at the root, it's our object
                if (obj.FirstName || obj.firstName || obj.Driver_Id || obj.driver_Id || obj.FullName || obj.fullName) {
                    console.log('findObject: Found driver keys at root');
                    return obj;
                }

                // 2. Scan for common wrappers
                const commonKeys = ['data', 'value', '$values', 'driver', 'Driver', 'items', 'Items'];
                for (const key of commonKeys) {
                    if (obj[key] && typeof obj[key] === 'object') {
                        console.log(`findObject: Found wrapped data in .${key}`);
                        // If the wrapper is an array, take the first element
                        if (Array.isArray(obj[key])) return obj[key][0];
                        return obj[key];
                    }
                }

                // 3. If it's a simple object with keys and not an array, it's likely the driver itself
                if (!Array.isArray(obj) && Object.keys(obj).length > 0) {
                    console.log('findObject: Returning root object as fallback (no wrapper found)');
                    return obj;
                }

                console.warn('findObject: No driver-like object discovered');
                return null;
            };

            const data = findObject(res);
            console.log('2. Discovered Driver Data Object:', data);

            if (data) {
                // Map to template format using PascalCase from User's sample
                const mapped = {
                    id: data.Driver_Id || data.driver_Id || data.driverId || id,
                    name: data.FullName || data.fullName || `${data.FirstName || data.firstName || ''} ${data.LastName || data.lastName || ''}`.trim() || '[No Name Found]',
                    empId: data.Driver_Code || data.diver_Code || data.driver_Code || data.Driver_Code,
                    status: (data.IsActive ?? data.isActive ?? true) ? 'ACTIVE' : 'INACTIVE',
                    isAvailable: data.IsAvailable ?? data.isAvailable ?? true,
                    isVerified: data.IsVerified ?? data.isVerified ?? false,
                    image: getImageUrl(data.DriverImagePath || data.driverImagePath || data.image) || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&h=160&fit=crop',
                    dob: (data.DateOfBirth || data.dateOfBirth)?.split('T')[0] || 'N/A',
                    gender: data.Gender || data.gender || 'N/A',
                    bloodGroup: data.BloodGroup || data.bloodGroup || 'Not Specified',
                    phone: data.PhoneNo || data.phoneNo || 'N/A',
                    alternatePhone: data.AlternatePhoneNo || data.alternatePhoneNo || 'N/A',
                    email: data.Email || data.email || 'N/A',
                    address: `${data.AddressLine1 || data.addressLine1 || ''} ${data.AddressLine2 || data.addressLine2 || ''}, ${data.City || data.city || ''}, ${data.State || data.state || ''} ${data.Pincode || data.pincode || ''}, ${data.Country || data.country || ''}`.trim().replace(/^ ,/, '').replace(/, $/, '').replace(/ ,/g, ','),
                    licenseNo: data.LicenseNumber || data.licenseNumber || 'N/A',
                    licenseType: data.LicenseType || data.licenseType || 'N/A',
                    licenseExpiry: (data.LicenseExpiryDate || data.licenseExpiryDate)?.split('T')[0] || 'N/A',
                    licenseIssuedBy: data.LicenseIssuedBy || data.licenseIssuedBy || 'N/A',
                    licenseIssueDate: (data.LicenseIssueDate || data.licenseIssueDate)?.split('T')[0] || 'N/A',
                    aadhaarNo: data.AadhaarNo || data.aadhaarNo || 'Not Provided',
                    panNo: data.PanNo || data.panNo || data.PANNo || 'Not Provided',
                    paymentType: data.PaymentType || data.paymentType || 'Cash',
                    salary: data.Salary || data.salary || 0,
                    earnings: data.Salary || data.salary || 0,
                    baseSalary: data.Salary || data.salary || 0,
                    experienceYears: data.ExperienceYears || data.experienceYears || 0,
                    vehicleTypeAllowed: data.VehicleTypeAllowed || data.vehicleTypeAllowed || 'N/A',
                    joinDate: (data.JoinDate || data.joinDate)?.split('T')[0] || 'N/A',
                    incentives: 0,
                    deductions: 0
                };
                console.log('3. Final Mapped Profile Object:', mapped);
                setDriverData(mapped);
            } else {
                setError('Could not discover driver data in the API response.');
            }
        } catch (error: any) {
            console.error('Error fetching driver profile:', error);
            setError(`Network Error: ${error?.message || 'Check your connection'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAttendance = async () => {
        if (!id) return;
        try {
            const res = await getDriverAttendance(Number(id));
            const data = Array.isArray(res) ? res : (res?.$values || res?.data || []);
            setAttendance(data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    useEffect(() => {
        fetchDriver();
        fetchAttendance();
    }, [id]);

    // Constant reference to the data being displayed
    const driver = driverData || {
        id: id || 'Loading...',
        name: 'Loading...',
        empId: '#DRV-00000',
        status: 'PENDING',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&h=160&fit=crop',
        dob: 'N/A',
        gender: 'N/A',
        bloodGroup: 'N/A',
        phone: 'N/A',
        email: 'N/A',
        address: 'N/A',
        licenseNo: 'N/A',
        licenseType: 'N/A',
        licenseExpiry: 'N/A',
        earnings: 0,
        baseSalary: 0,
        incentives: 0,
        deductions: 0,
        aadhaarNo: 'N/A',
        panNo: 'N/A',
        paymentType: 'N/A'
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
                        {driver.isVerified && (
                            <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg border border-outline/10">
                                <CheckCircle size={24} className="text-green-600 fill-green-600/10" />
                            </div>
                        )}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-on-surface uppercase">{driver.name}</h2>
                    <p className="text-sm font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2">Emp ID: {driver.empId}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        <span className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-black border tracking-widest uppercase",
                            driver.status === 'ACTIVE'
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                        )}>
                            {driver.status}
                        </span>
                        <span className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-black border tracking-widest uppercase",
                            driver.isAvailable
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-amber-100 text-amber-800 border-amber-200"
                        )}>
                            {driver.isAvailable ? 'Available' : 'On Trip'}
                        </span>
                    </div>

                    <div className="absolute top-8 right-8 flex gap-2">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="p-2 hover:bg-surface-container rounded-lg text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-outline/10"
                        >
                            <Edit size={16} />
                            Edit Profile
                        </button>
                    </div>
                </section>

                {error && (
                    <div className="bg-red-50 border border-red-200 p-6 rounded-2xl flex flex-col items-center text-center gap-3 animate-pulse">
                        <AlertCircle className="text-red-600" size={32} />
                        <div>
                            <p className="text-sm font-black text-red-900 uppercase tracking-widest">Data Sync Error</p>
                            <p className="text-xs font-bold text-red-700 mt-1 uppercase tracking-tighter">{error}</p>
                        </div>
                        <button
                            onClick={() => fetchDriver()}
                            className="mt-2 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Retry Sync
                        </button>
                    </div>
                )}

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
                                    {driver.alternatePhone && driver.alternatePhone !== 'N/A' && (
                                        <div className="flex items-start gap-4">
                                            <div className="p-1.5 bg-surface-container rounded-md text-on-surface-variant">
                                                <Phone size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Alt Phone Number</p>
                                                <p className="text-sm font-bold text-on-surface">{driver.alternatePhone}</p>
                                            </div>
                                        </div>
                                    )}
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
                            {/* Legal Identification */}
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-outline/5 space-y-6 md:col-span-2">
                                <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                                    <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">Identity Verification</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl">
                                        <div className="p-1.5 bg-surface-container rounded-md text-primary">
                                            <FileText size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">Aadhaar Number</p>
                                            <p className="text-sm font-black font-mono tracking-widest text-on-surface">{driver.aadhaarNo}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl">
                                        <div className="p-1.5 bg-surface-container rounded-md text-primary">
                                            <CreditCard size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest mb-1">PAN Card Number</p>
                                            <p className="text-sm font-black font-mono tracking-widest text-on-surface uppercase">{driver.panNo}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Profile */}
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border-t-4 border-primary border-x border-b border-outline/5 space-y-6 md:col-span-2">
                                <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
                                    <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">Employment Profile</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Join Date</p>
                                        <p className="text-sm font-black text-on-surface">{driver.joinDate}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Experience</p>
                                        <p className="text-sm font-black text-on-surface">{driver.experienceYears} Years</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Allowed Vehicles</p>
                                        <p className="text-sm font-black text-primary">{driver.vehicleTypeAllowed}</p>
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
                                        const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                        const record = attendance.find(a => (a.Date || a.date)?.split('T')[0] === dateStr);
                                        const date = new Date(viewYear, viewMonth, day);
                                        const isToday = new Date().toDateString() === date.toDateString();
                                        const dayOfWeek = date.getDay();

                                        let status = record ? (record.Status || record.status || 'present').toLowerCase() : 'none';
                                        if (dayOfWeek === 0 && !record) status = 'off';
                                        if (date > new Date()) status = 'none';

                                        return (
                                            <div key={day} className="relative py-2 group cursor-help">
                                                <span className={cn(
                                                    "text-xs font-bold transition-colors w-8 h-8 flex items-center justify-center mx-auto rounded-lg",
                                                    isToday ? "bg-primary text-white shadow-sm" : "text-on-surface",
                                                    status === 'absent' && "bg-red-50 text-red-600",
                                                    status === 'leave' && "bg-orange-50 text-orange-600"
                                                )}>
                                                    {day}
                                                </span>
                                                {status !== 'none' && !isToday && (
                                                    <div className={cn(
                                                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full tooltip-trigger",
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
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{driver.paymentType}</span>
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

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-surface/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface rounded-3xl shadow-2xl relative">
                        <AddDriver
                            mode="edit"
                            id={id}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                fetchDriver(); // Refresh after edit
                            }}
                        />
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="fixed inset-0 bg-surface/50 backdrop-blur-sm flex items-center justify-center z-[60]">
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center">
                        <Loader2 size={40} className="animate-spin text-primary" />
                        <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Syncing Live Data...</p>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-outline-variant">Optimizing profile details</p>
                    </div>
                </div>
            )}
        </Layout>
    );
}
