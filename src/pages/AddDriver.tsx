import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Save,
  ShieldCheck,
  CreditCard,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  FileText,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gender, PaymentType, Driver } from '../types';

export default function AddDriver() {
  const [formData, setFormData] = useState<Partial<Driver>>({
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
    IsAvailable: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const calculateProgress = () => {
    const requiredFields = ['FirstName', 'DateOfBirth', 'PhoneNo', 'LicenseNumber', 'LicenseExpiryDate'];
    const filledRequired = requiredFields.filter(f => !!formData[f as keyof Driver]).length;
    return Math.round((filledRequired / requiredFields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      <section className="flex items-center gap-4">
        <Link to="/drivers" className="p-2 hover:bg-surface-container rounded-full transition-colors">
          <ArrowLeft size={24} className="text-primary" />
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Add New Driver</h1>
          <p className="text-on-surface-variant font-medium">Onboard a new precision operator to the King Kong GoDrive fleet.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Section: Personal Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <User size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Personal Information</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">First Name *</label>
                  <input
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Last Name</label>
                  <input
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Gender</label>
                  <select
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                    className="input-field appearance-none"
                  >
                    <option value={Gender.Male}>Male</option>
                    <option value={Gender.Female}>Female</option>
                    <option value={Gender.Other}>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Date of Birth *</label>
                  <input
                    name="DateOfBirth"
                    value={formData.DateOfBirth}
                    onChange={handleChange}
                    className="input-field"
                    type="date"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Contact Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Phone size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Contact Details</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Phone Number *</label>
                  <input
                    name="PhoneNo"
                    value={formData.PhoneNo}
                    onChange={handleChange}
                    className="input-field"
                    type="tel"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Alternate Phone</label>
                  <input
                    name="AlternatePhoneNo"
                    value={formData.AlternatePhoneNo}
                    onChange={handleChange}
                    className="input-field"
                    type="tel"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Email Address</label>
                <input
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="input-field"
                  type="email"
                />
              </div>
            </div>
          </section>

          {/* Section: Address */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <MapPin size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Address Details</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Address Line 1</label>
                  <input
                    name="AddressLine1"
                    value={formData.AddressLine1}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Address Line 2</label>
                  <input
                    name="AddressLine2"
                    value={formData.AddressLine2}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">City</label>
                  <input
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">State</label>
                  <input
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Pincode</label>
                  <input
                    name="Pincode"
                    value={formData.Pincode}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Country</label>
                <input
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                  className="input-field"
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* Section: License & Experience */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <CreditCard size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">License & Experience</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">License Number *</label>
                  <input
                    name="LicenseNumber"
                    value={formData.LicenseNumber}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">License Type</label>
                  <input
                    name="LicenseType"
                    value={formData.LicenseType}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Issue Date</label>
                  <input
                    name="LicenseIssueDate"
                    value={formData.LicenseIssueDate}
                    onChange={handleChange}
                    className="input-field"
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Expiry Date *</label>
                  <input
                    name="LicenseExpiryDate"
                    value={formData.LicenseExpiryDate}
                    onChange={handleChange}
                    className="input-field"
                    type="date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Issued By</label>
                  <input
                    name="LicenseIssuedBy"
                    value={formData.LicenseIssuedBy}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Experience (Years)</label>
                  <input
                    name="ExperienceYears"
                    value={formData.ExperienceYears}
                    onChange={handleChange}
                    className="input-field"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Allowed Vehicles</label>
                  <input
                    name="VehicleTypeAllowed"
                    value={formData.VehicleTypeAllowed}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Employment & Identity */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Briefcase size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Employment & Identity</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Join Date</label>
                  <input
                    name="JoinDate"
                    value={formData.JoinDate}
                    onChange={handleChange}
                    className="input-field"
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Salary</label>
                  <input
                    name="Salary"
                    value={formData.Salary}
                    onChange={handleChange}
                    className="input-field"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Payment Type</label>
                  <select
                    name="PaymentType"
                    value={formData.PaymentType}
                    onChange={handleChange}
                    className="input-field appearance-none"
                  >
                    <option value={PaymentType.Monthly}>Monthly</option>
                    <option value={PaymentType.Daily}>Daily</option>
                    <option value={PaymentType.Trip}>Trip</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Aadhaar Number</label>
                  <input
                    name="AadhaarNo"
                    value={formData.AadhaarNo}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">PAN Number</label>
                  <input
                    name="PANNo"
                    value={formData.PANNo}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Status & Verification */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Activity size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Status & Verification</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-ambient border border-outline/5">
              <div className="flex items-center gap-3">
                <input
                  id="IsVerified"
                  name="IsVerified"
                  type="checkbox"
                  checked={formData.IsVerified}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
                />
                <label htmlFor="IsVerified" className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Verified</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="IsAvailable"
                  name="IsAvailable"
                  type="checkbox"
                  checked={formData.IsAvailable}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
                />
                <label htmlFor="IsAvailable" className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Available</label>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl relative overflow-hidden sticky top-8">
            <ShieldCheck size={80} className="absolute -right-4 -bottom-4 opacity-10" />
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Onboarding Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black">{progress}%</span>
                <span className="text-[10px] font-bold uppercase opacity-80">
                  {progress === 100 ? 'Ready to Save' : 'Required Fields'}
                </span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <ul className="mt-8 space-y-3 text-[11px] font-bold uppercase tracking-wider">
              <li className={`flex items-center gap-2 ${formData.FirstName && formData.DateOfBirth ? 'text-white' : 'opacity-50'}`}>
                {formData.FirstName && formData.DateOfBirth ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />}
                <span>Basic Details</span>
              </li>
              <li className={`flex items-center gap-2 ${formData.PhoneNo ? 'text-white' : 'opacity-50'}`}>
                {formData.PhoneNo ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />}
                <span>Contact Info</span>
              </li>
              <li className={`flex items-center gap-2 ${formData.LicenseNumber && formData.LicenseExpiryDate ? 'text-white' : 'opacity-50'}`}>
                {formData.LicenseNumber && formData.LicenseExpiryDate ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />}
                <span>License Validation</span>
              </li>
            </ul>

            <div className="mt-12 space-y-3">
              <button
                className={`btn-primary w-full py-4 text-lg ${progress < 100 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={progress < 100}
              >
                <Save size={20} />
                Save Driver Profile
              </button>
              <Link
                to="/drivers"
                className="w-full py-4 text-white/70 font-bold rounded-xl hover:bg-white/10 transition-colors uppercase text-xs tracking-widest block text-center"
              >
                Cancel and Discard
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/5 space-y-4">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Quick Tips</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Ensure the <strong>License Expiry Date</strong> is accurate. The system will automatically notify the driver 30 days before expiration.
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong>Aadhaar</strong> and <strong>PAN</strong> are required for automated payroll processing and compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
