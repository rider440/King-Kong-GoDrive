import React from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  UserPlus,
  Star,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Route,
  FileText,
  X,
  Save,
  Phone,
  Mail,
  CreditCard,
  Briefcase,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Gender, PaymentType, Driver } from '../types';

const drivers = [
  {
    id: 'DRV-9021',
    FirstName: 'Julian',
    LastName: 'Rossi',
    LicenseNumber: 'NY-8829-XJ',
    LicenseType: 'Class A • Commercial',
    PhoneNo: '+1 (555) 012-3456',
    AlternatePhoneNo: '+1 (555) 999-8888',
    Email: 'jrossi@kinetic.com',
    Gender: Gender.Male,
    DateOfBirth: '1985-05-12',
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    State: 'NY',
    Pincode: '10001',
    Country: 'USA',
    LicenseIssueDate: '2015-06-10',
    LicenseExpiryDate: '2025-06-10',
    LicenseIssuedBy: 'NY DMV',
    ExperienceYears: 10,
    VehicleTypeAllowed: 'Truck, Bus',
    IsVerified: true,
    JoinDate: '2020-01-15',
    Salary: 4500,
    PaymentType: PaymentType.Monthly,
    AadhaarNo: '1234-5678-9012',
    PANNo: 'ABCDE1234F',
    IsActive: true,
    IsAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNL4kXfGeKZirbRZyD4PyrRRPcgbOvVfCTpt4fqEWnT6ZmSyCky9vKwuSxEOPNn2Zn_UWx12voTsahbnjx9mCWtitmzhJblBk7rHSCsmSl246WUXZLhyZKQcXrhMo8m03EilogrSQaHq-wNzqrW9FV6CF2XXWpTj3IFK9Kn8gKW7X-9UAIoKTIlZgYRLVwruRkv_eQJ_JYayaFDnPUzUaKvws9gjeDx7ngFhjHezZiEXKdGdbmGngv6UMdDcNBj6pVMzkrDEtOlQ'
  },
  {
    id: 'DRV-4412',
    FirstName: 'Sarah',
    LastName: 'Mitchell',
    LicenseNumber: 'CA-1120-PO',
    LicenseType: 'Class B • Regional',
    PhoneNo: '+1 (555) 789-0123',
    AlternatePhoneNo: '+1 (555) 777-6666',
    Email: 'smitchell@kinetic.com',
    Gender: Gender.Female,
    DateOfBirth: '1990-08-22',
    AddressLine1: '456 Oak Ave',
    AddressLine2: '',
    City: 'Los Angeles',
    State: 'CA',
    Pincode: '90001',
    Country: 'USA',
    LicenseIssueDate: '2018-02-15',
    LicenseExpiryDate: '2028-02-15',
    LicenseIssuedBy: 'CA DMV',
    ExperienceYears: 6,
    VehicleTypeAllowed: 'Car, Van',
    IsVerified: true,
    JoinDate: '2021-03-20',
    Salary: 4200,
    PaymentType: PaymentType.Monthly,
    AadhaarNo: '9876-5432-1098',
    PANNo: 'FGHIJ5678K',
    IsActive: true,
    IsAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI6thDko0M43AIaPup3CgwoDnxU-eSVJI253kWLyHTJZBW7Xc3dSkTFcmtJ2cwd10qgVnJhZPcNrGInStwXRt53plWx1O7l5FK2jO-OWA6USZ39YULbpPRjp8bd6FHyXfjRvNbEWPVO9L8XQYpjwG9Svgg3m9_Hb_4Asn8h9oztq6qTW8Y9fw4cbAUB0upPYg2P0K9CmKzPtoHkk1m0tcu1VXJKcCSqmsyA1bUEJ6jGt0nMnZJzHD2UOZPkMN0pWCNed8uSd9SpJI'
  },
  {
    id: 'DRV-7718',
    FirstName: 'Marcus',
    LastName: 'Chen',
    LicenseNumber: 'TX-9001-AS',
    LicenseType: 'Class A • Long-Haul',
    PhoneNo: '+1 (555) 345-6789',
    AlternatePhoneNo: '+1 (555) 222-1111',
    Email: 'mchen@kinetic.com',
    Gender: Gender.Male,
    DateOfBirth: '1982-11-30',
    AddressLine1: '789 Pine Rd',
    AddressLine2: 'Suite 100',
    City: 'Austin',
    State: 'TX',
    Pincode: '73301',
    Country: 'USA',
    LicenseIssueDate: '2010-11-12',
    LicenseExpiryDate: '2025-11-12',
    LicenseIssuedBy: 'TX DPS',
    ExperienceYears: 15,
    VehicleTypeAllowed: 'Truck',
    IsVerified: true,
    JoinDate: '2015-05-10',
    Salary: 5000,
    PaymentType: PaymentType.Monthly,
    AadhaarNo: '5555-4444-3333',
    PANNo: 'LMNOP9012Q',
    IsActive: true,
    IsAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0msHYteY3wNwXSrxZnn4iW9BiejN5lAcpyAuMFsr8XhdZrcyWwZ_HHglXQ11CZHwZdR0cDHtAQBIulzEAwsx-Ak32jgBWF3PIOy_1HXO093_AlNTyHJuur6ZTNCZ7WE4a_LoF1j3fUwF7BCTDHWtbb4hVIbh46LlVSx3_2EzmjKkBMHuVq3nGVZ13fOSjAugu1PLoEvpC54pmW5al5cNwCR7pPI0lobDNECg7qYX77xwuQAwpmlQsvoMy9gcVLLJj5XB_8HZRwVg'
  },
  {
    id: 'DRV-1256',
    FirstName: 'Alex',
    LastName: 'Thompson',
    LicenseNumber: 'FL-4498-MZ',
    LicenseType: 'Class C • Passenger',
    PhoneNo: '+1 (555) 231-5544',
    AlternatePhoneNo: '+1 (555) 444-3333',
    Email: 'athompson@kinetic.com',
    Gender: Gender.Male,
    DateOfBirth: '1995-03-15',
    AddressLine1: '321 Palm Dr',
    AddressLine2: '',
    City: 'Miami',
    State: 'FL',
    Pincode: '33101',
    Country: 'USA',
    LicenseIssueDate: '2019-04-20',
    LicenseExpiryDate: '2029-04-20',
    LicenseIssuedBy: 'FL DHSMV',
    ExperienceYears: 4,
    VehicleTypeAllowed: 'Car, Bus',
    IsVerified: true,
    JoinDate: '2022-06-01',
    Salary: 3800,
    PaymentType: PaymentType.Monthly,
    AadhaarNo: '1111-2222-3333',
    PANNo: 'RSTUV3456W',
    IsActive: true,
    IsAvailable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBku2EU5F0i9ooif8aAOoboKxcRUfExZfUoKKTb_hF7ptjmrkgJbdUfahmfEIkO54Q0Nt9tudgsVRw5VEBybtavaU98G5_eJeEVGbVPAJltMBY8HI32_tDPHfmiUKmAAZ93M6_fzAgKMtVQXds1N8jQeiwN04mkbyNE9LxsqJpbdNsvrfFBw7mwLuqEl2sqFxpW-o7Le_8BE4yUIjUtWYZ7xuaJQ27w-XaBPW6uG6XdQ4uRvunALTa2Tt1Y8vMYsMxIgSzDejpN7rc'
  }
];

export default function DriverDirectory() {
  const [selectedDriver, setSelectedDriver] = React.useState<any>(null);
  const [modalMode, setModalMode] = React.useState<'view' | 'edit' | 'add' | null>(null);

  const handleAction = (driver: any, mode: 'view' | 'edit' | 'add') => {
    setSelectedDriver(driver || {
      FirstName: '',
      LastName: '',
      Gender: Gender.Male,
      DateOfBirth: '',
      PhoneNo: '',
      AlternatePhoneNo: '',
      Email: '',
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      State: '',
      Pincode: '',
      Country: 'India',
      LicenseNumber: '',
      LicenseType: '',
      LicenseIssueDate: '',
      LicenseExpiryDate: '',
      LicenseIssuedBy: '',
      ExperienceYears: 0,
      VehicleTypeAllowed: '',
      IsVerified: false,
      JoinDate: new Date().toISOString().split('T')[0],
      Salary: 0,
      PaymentType: PaymentType.Monthly,
      AadhaarNo: '',
      PANNo: '',
      IsActive: true,
      IsAvailable: true
    });
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedDriver(null);
    setModalMode(null);
  };
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Driver Directory</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Manage and monitor your precision team.</p>
        </div>
        <button
          onClick={() => handleAction(null, 'add')}
          className="btn-primary px-6 py-3"
        >
          <UserPlus size={18} />
          <span>Add Driver</span>
        </button>
      </section>

      <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm"
              placeholder="Search by name, license, or ID..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <Filter size={16} className="mr-2" />
              Status
            </button>
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <MoreVertical size={16} className="mr-2" />
              Sort
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Profile</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">License</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Contact</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={driver.image}
                          alt={`${driver.FirstName} ${driver.LastName}`}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container"
                        />
                        <div className={cn(
                          "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                          driver.IsActive && driver.IsAvailable ? "bg-green-500 animate-pulse" :
                            driver.IsActive && !driver.IsAvailable ? "bg-amber-500" : "bg-slate-300"
                        )} />
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{driver.FirstName} {driver.LastName}</p>
                        <p className="text-xs text-on-surface-variant">ID: {driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-on-surface">{driver.LicenseNumber}</p>
                    <p className="text-xs text-on-surface-variant">{driver.LicenseType}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p className="text-on-surface">{driver.PhoneNo}</p>
                    <p className="text-on-surface-variant text-xs">{driver.Email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                      driver.IsActive && driver.IsAvailable && "bg-green-50 text-green-700 ring-green-600/20",
                      driver.IsActive && !driver.IsAvailable && "bg-amber-50 text-amber-700 ring-amber-600/20",
                      !driver.IsActive && "bg-slate-100 text-slate-600 ring-slate-400/20"
                    )}>
                      {driver.IsActive ? (driver.IsAvailable ? 'Active' : 'Idle') : 'Offline'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleAction(driver, 'view')}
                        title="View Profile"
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleAction(driver, 'edit')}
                        title="Edit Driver"
                        className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <Link
                        to={`/drivers/${driver.id}?tab=trips`}
                        title="View Trips"
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Route size={18} />
                      </Link>
                      <Link
                        to={`/drivers/${driver.id}?tab=reports`}
                        title="View Reports"
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <FileText size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Driver Action Modal */}
        {modalMode && selectedDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-surface-container-lowest w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-outline/10">
              <div className="p-6 border-b border-outline/5 flex items-center justify-between bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <UserPlus size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-on-surface uppercase italic">
                      {modalMode === 'add' ? 'Add New Driver' : modalMode === 'view' ? 'Driver Details' : 'Edit Driver Profile'}
                    </h2>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      {modalMode === 'add' ? 'New Precision Team Member' : `Driver ID: ${selectedDriver.id} • ${selectedDriver.FirstName} ${selectedDriver.LastName}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {modalMode === 'view' && (
                    <div className="hidden sm:flex items-center gap-2 mr-2">
                      <Link
                        to={`/drivers/${selectedDriver.id}?tab=trips`}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors border border-emerald-200"
                      >
                        <Route size={14} />
                        View Trips
                      </Link>
                      <Link
                        to={`/drivers/${selectedDriver.id}?tab=reports`}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-colors border border-amber-200"
                      >
                        <FileText size={14} />
                        View Reports
                      </Link>
                    </div>
                  )}
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                {/* Personal Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                    <User size={16} className="text-primary" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">First Name</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.FirstName}
                        placeholder="e.g. Julian"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Last Name</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.LastName}
                        placeholder="e.g. Rossi"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Gender</label>
                      <select
                        disabled={modalMode === 'view'}
                        defaultValue={selectedDriver.Gender}
                        className={cn("input-field appearance-none", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      >
                        <option value={Gender.Male}>Male</option>
                        <option value={Gender.Female}>Female</option>
                        <option value={Gender.Other}>Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date of Birth</label>
                      <input
                        readOnly={modalMode === 'view'}
                        type="date"
                        defaultValue={selectedDriver.DateOfBirth}
                        placeholder="YYYY-MM-DD"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                    <Phone size={16} className="text-primary" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Contact Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Phone Number</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.PhoneNo}
                        placeholder="+1 (555) 012-3456"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Alternate Phone</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.AlternatePhoneNo}
                        placeholder="+1 (555) 999-8888"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.Email}
                        placeholder="jrossi@kinetic.com"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                    <MapPin size={16} className="text-primary" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Address Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Address Line 1</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.AddressLine1}
                        placeholder="House No, Street"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Address Line 2</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.AddressLine2}
                        placeholder="Locality, Landmark"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">City</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.City}
                        placeholder="City"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">State</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.State}
                        placeholder="State"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Pincode</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.Pincode}
                        placeholder="Pincode"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Country</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedDriver.Country}
                      placeholder="Country"
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                </div>

                {/* License & Experience */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                    <CreditCard size={16} className="text-primary" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">License & Experience</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">License Number</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.LicenseNumber}
                        placeholder="NY-8829-XJ"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">License Type</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.LicenseType}
                        placeholder="e.g. Class A • Commercial"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Issue Date</label>
                      <input
                        readOnly={modalMode === 'view'}
                        type="date"
                        defaultValue={selectedDriver.LicenseIssueDate}
                        placeholder="YYYY-MM-DD"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Expiry Date</label>
                      <input
                        readOnly={modalMode === 'view'}
                        type="date"
                        defaultValue={selectedDriver.LicenseExpiryDate}
                        placeholder="YYYY-MM-DD"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Issued By</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.LicenseIssuedBy}
                        placeholder="NY DMV"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Experience (Years)</label>
                      <input
                        readOnly={modalMode === 'view'}
                        type="number"
                        defaultValue={selectedDriver.ExperienceYears}
                        placeholder="0"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Allowed Vehicles</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.VehicleTypeAllowed}
                        placeholder="e.g. Truck, Bus"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                </div>

                {/* Employment & Identity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                    <Briefcase size={16} className="text-primary" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Employment & Identity</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Join Date</label>
                      <input
                        readOnly={modalMode === 'view'}
                        type="date"
                        defaultValue={selectedDriver.JoinDate}
                        placeholder="YYYY-MM-DD"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Salary</label>
                      <input
                        readOnly={modalMode === 'view'}
                        type="number"
                        defaultValue={selectedDriver.Salary}
                        placeholder="0.00"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Payment Type</label>
                      <select
                        disabled={modalMode === 'view'}
                        defaultValue={selectedDriver.PaymentType}
                        className={cn("input-field appearance-none", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      >
                        <option value={PaymentType.Monthly}>Monthly</option>
                        <option value={PaymentType.Daily}>Daily</option>
                        <option value={PaymentType.Trip}>Trip</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Aadhaar Number</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.AadhaarNo}
                        placeholder="XXXX-XXXX-XXXX"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">PAN Number</label>
                      <input
                        readOnly={modalMode === 'view'}
                        defaultValue={selectedDriver.PANNo}
                        placeholder="ABCDE1234F"
                        className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      />
                    </div>
                  </div>
                </div>

                {/* Status & Verification */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                    <ShieldCheck size={16} className="text-primary" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Status & Verification</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                    <div className="flex items-center gap-3">
                      <input
                        disabled={modalMode === 'view'}
                        type="checkbox"
                        defaultChecked={selectedDriver.IsVerified}
                        className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
                      />
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Verified</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        disabled={modalMode === 'view'}
                        type="checkbox"
                        defaultChecked={selectedDriver.IsActive}
                        className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
                      />
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Active</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        disabled={modalMode === 'view'}
                        type="checkbox"
                        defaultChecked={selectedDriver.IsAvailable}
                        className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
                      />
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Available</label>
                    </div>
                  </div>
                  {modalMode === 'view' && selectedDriver.CreatedAt && (
                    <div className="pt-4 border-t border-outline/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Created At</p>
                      <p className="text-xs font-medium text-on-surface">{new Date(selectedDriver.CreatedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-surface-container-low border-t border-outline/5 flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
                >
                  {modalMode === 'view' ? 'Close' : 'Cancel'}
                </button>
                {(modalMode === 'edit' || modalMode === 'add') && (
                  <button
                    onClick={closeModal}
                    className="btn-primary px-8 py-2.5"
                  >
                    <Save size={18} />
                    {modalMode === 'add' ? 'Add Driver' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline/5 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant font-medium">Showing <span className="text-on-surface font-bold">4</span> of <span className="text-on-surface font-bold">128</span> precision drivers</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors disabled:opacity-30" disabled>
              <Search size={16} className="rotate-90" />
            </button>
            <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm">1</button>
            <button className="px-3 py-1.5 hover:bg-surface-container-high text-xs font-bold rounded-lg transition-colors">2</button>
            <button className="px-3 py-1.5 hover:bg-surface-container-high text-xs font-bold rounded-lg transition-colors">3</button>
            <span className="px-2 text-on-surface-variant">...</span>
            <button className="px-3 py-1.5 hover:bg-surface-container-high text-xs font-bold rounded-lg transition-colors">12</button>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">On-Duty Drivers</h3>
            <MapPin size={18} className="text-primary" />
          </div>
          <p className="text-4xl font-bold text-primary">84%</p>
          <div className="w-full bg-surface-container rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium">+5% from yesterday</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Avg. Safety Score</h3>
            <ShieldCheck size={18} className="text-green-600" />
          </div>
          <p className="text-4xl font-bold text-on-surface">9.2</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => <Star key={i} size={12} className="text-primary fill-primary" />)}
            <Star size={12} className="text-slate-300" />
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium">Fleet-wide average rating</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Compliance Alerts</h3>
            <AlertTriangle size={18} className="text-error" />
          </div>
          <p className="text-4xl font-bold text-on-surface">3</p>
          <div className="flex -space-x-2">
            {[1, 2].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/driver${i}/32/32`} alt="Driver" />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full bg-error-container text-on-error-container text-[8px] flex items-center justify-center font-bold border-2 border-white">+1</div>
          </div>
          <p className="text-[10px] text-error font-bold uppercase tracking-tight">Expiring licenses detected</p>
        </div>
      </section>
    </div>
  );
}
