import React, { useMemo, useState, useEffect, useRef } from 'react';
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
  Activity,
  Upload,
  Loader2,
  MapPin as MapPinIcon,
  UserPlus,
  X,
  Eye,
  Route
} from 'lucide-react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Gender, PaymentType, Driver } from '@/types';
import { useForm, useImageUpload } from '@/hooks';
import { getDriver, updateDriver, createDriver } from '@/services/driverService';
import { useToast } from '@/context/ToastContext';
import { fetchPincodeData } from '@/services/pincodeService';
import { cn } from '@/lib/utils';

interface AddDriverProps {
  mode?: 'add' | 'edit' | 'view';
  id?: string | number;
  onClose?: () => void;
}

export default function AddDriver({ mode: propMode, id: propId, onClose }: AddDriverProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { pathname } = useLocation();
  const { showToast } = useToast();
  const errorShownRef = useRef(false);

  // Determine mode and ID from props or URL
  const isViewMode = propMode === 'view' || pathname.includes('/view');
  const isEditMode = propMode === 'edit' || (!!paramId && !pathname.includes('/view'));
  const isAddMode = propMode === 'add' || (!paramId && !propMode);

  const currentMode = propMode || (isViewMode ? 'view' : isEditMode ? 'edit' : 'add');
  const currentId = propId || paramId;

  const initialValues: Partial<Driver> = {
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
    PaymentType: PaymentType.Cash,
    AadhaarNo: '',
    PanNo: '',
    IsAvailable: true,
    image: ''
  };

  const { values: formData, handleChange, setFieldValue, setValues } = useForm(initialValues);
  const { preview, handleImageUpload, clearImage, setPreview } = useImageUpload(2);

  // Fetch driver data for Edit/View modes
  useEffect(() => {
    const loadDriverData = async () => {
      if (!currentId || currentMode === 'add') return;

      setIsLoadingData(true);
      try {
        const res = await getDriver(currentId as any);

        // Robust data discovery for single object
        const findObject = (obj: any): any | null => {
          if (!obj || typeof obj !== 'object') return null;
          if (obj.FirstName || obj.firstName || obj.Driver_Id || obj.driver_Id || obj.FullName || obj.fullName) return obj;

          const commonKeys = ['data', 'value', '$values', 'driver', 'Driver', 'items', 'Items'];
          for (const key of commonKeys) {
            if (obj[key] && typeof obj[key] === 'object') {
              if (Array.isArray(obj[key])) return obj[key][0];
              return obj[key];
            }
          }
          if (!Array.isArray(obj) && Object.keys(obj).length > 0) return obj;
          return null;
        };

        const data = findObject(res);
        if (!data) {
          throw new Error('Driver data not found in response');
        }

        const mappedData = {
          ...data,
          FirstName: data.firstName || data.FirstName || '',
          LastName: data.lastName || data.LastName || '',
          Gender: data.gender || data.Gender || Gender.Male,
          DateOfBirth: (data.dateOfBirth || data.DateOfBirth)?.split('T')[0] || '',
          PhoneNo: data.phoneNo || data.PhoneNo || '',
          AlternatePhoneNo: data.alternatePhoneNo || data.AlternatePhoneNo || '',
          Email: data.email || data.Email || '',
          AddressLine1: data.addressLine1 || data.AddressLine1 || '',
          AddressLine2: data.addressLine2 || data.AddressLine2 || '',
          City: data.city || data.City || '',
          State: data.state || data.State || '',
          Pincode: data.pincode || data.Pincode || '',
          Country: data.country || data.Country || 'India',
          LicenseNumber: data.licenseNumber || data.LicenseNumber || '',
          LicenseType: data.licenseType || data.LicenseType || '',
          LicenseIssueDate: (data.licenseIssueDate || data.LicenseIssueDate)?.split('T')[0] || '',
          LicenseExpiryDate: (data.licenseExpiryDate || data.LicenseExpiryDate)?.split('T')[0] || '',
          LicenseIssuedBy: data.licenseIssuedBy || data.LicenseIssuedBy || '',
          ExperienceYears: data.experienceYears || data.ExperienceYears || 0,
          VehicleTypeAllowed: data.vehicleTypeAllowed || data.VehicleTypeAllowed || '',
          IsVerified: data.isVerified ?? data.IsVerified ?? false,
          JoinDate: (data.joinDate || data.JoinDate)?.split('T')[0] || '',
          Salary: data.salary || data.Salary || 0,
          PaymentType: data.paymentType || data.PaymentType || PaymentType.Cash,
          AadhaarNo: data.aadhaarNo || data.AadhaarNo || '',
          PanNo: data.panNo || data.PanNo || data.PANNo || '',
          IsAvailable: data.isAvailable ?? data.IsAvailable ?? true,
          image: data.driverImagePath || data.driverImage || data.image || ''
        };
        setValues(mappedData);
        if (mappedData.image) {
          setPreview(mappedData.image);
        }
      } catch (error) {
        console.error('Error fetching driver:', error);
        showToast('Failed to load driver data', 'error');
        if (onClose) onClose();
        else navigate('/drivers');
      } finally {
        setIsLoadingData(false);
      }
    };

    loadDriverData();
  }, [currentId, currentMode, setValues, setPreview, navigate, showToast, onClose]);

  // Handle Pincode Auto-fill
  useEffect(() => {
    const pincode = formData.Pincode?.trim();

    if (!pincode || isViewMode) return;

    // Wait until 6 digits
    if (pincode.length < 6) {
      errorShownRef.current = false; // reset
      return;
    }

    // ❌ Invalid pincode case
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      if (pincode.length > 0 && !errorShownRef.current) {
        showToast('Invalid Pincode', 'error');
        errorShownRef.current = true;
      }
      return;
    }

    // Reset error ref when pincode becomes 6 digits (potentially valid)
    errorShownRef.current = false;

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoadingPincode(true);

        const data = await fetchPincodeData(pincode);

        if (data) {
          setFieldValue('City', data.city || '');
          setFieldValue('State', data.state || '');
          setFieldValue('Country', data.country || 'India');
        } else {
          showToast('Pincode not found', 'error');
        }
      } catch {
        showToast('Error fetching pincode', 'error');
      } finally {
        setIsLoadingPincode(false);
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [formData.Pincode, isViewMode]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/drivers');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewMode) return;

    // Validate required fields before submission
    const requiredFields = {
      FirstName: 'First Name',
      LastName: 'Last Name',
      PhoneNo: 'Phone Number',
      LicenseNumber: 'License Number',
      LicenseExpiryDate: 'License Expiry Date',
      DateOfBirth: 'Date of Birth'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key as keyof typeof formData])
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      showToast(`Please fill all required fields: ${missingFields.join(', ')}`, 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const driverData = {
        ...formData,
        image: preview || formData.image || ''
      };

      console.log('Submitting driver data:', driverData);

      if (isEditMode) {
        await updateDriver(Number(currentId), driverData);
        showToast('Driver updated successfully!', 'success');
      } else {
        await createDriver(driverData);
        showToast('Driver added successfully!', 'success');
      }

      setTimeout(() => handleClose(), 1000);
    } catch (error: any) {
      console.error('Error saving driver:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save driver';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center gap-4",
        onClose ? "h-[400px]" : "min-h-[60vh]"
      )}>
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Loading precision data...</p>
      </div>
    );
  }

  const formContent = (
    <div className={cn(
      "bg-surface-container-lowest w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-outline/10",
      onClose ? "max-h-[90vh]" : "min-h-[80vh]"
    )}>
      <div className="p-6 border-b border-outline/5 flex items-center justify-between bg-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <UserPlus size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-on-surface uppercase italic">
              {isViewMode ? 'Driver Details' : isEditMode ? 'Edit Driver Profile' : 'Add New Driver'}
            </h2>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              {isAddMode ? 'New Precision Team Member' : `Driver ID: ${currentId} • ${formData.FirstName} ${formData.LastName}`}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Profile Image */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <User size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Profile Image</h3>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 bg-surface-container border-2 border-outline/10 flex items-center justify-center">
              {preview ? <img src={preview} alt="Profile" className="w-full h-full object-cover" /> : <User size={48} className="text-outline" />}
            </div>
            {!isViewMode && (
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg cursor-pointer transition-colors text-sm font-semibold inline-flex items-center gap-2">
                    <Upload size={16} />
                    Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {preview && (
                    <button type="button" onClick={clearImage} className="text-error hover:bg-error/10 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant">Upload a clear photo for the driver's profile.</p>
              </div>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <User size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">First Name *</label>
              <input name="FirstName" value={formData.FirstName} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Last Name</label>
              <input name="LastName" value={formData.LastName} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Gender</label>
              <select name="Gender" value={formData.Gender} disabled={isViewMode} onChange={handleChange} className={cn("input-field appearance-none", isViewMode && "bg-surface-container-low border-transparent cursor-default")}>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
                <option value={Gender.Other}>Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date of Birth *</label>
              <input name="DateOfBirth" type="date" value={formData.DateOfBirth} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <Phone size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Contact Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Phone Number *</label>
              <input name="PhoneNo" value={formData.PhoneNo} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Alternate Phone</label>
              <input name="AlternatePhoneNo" value={formData.AlternatePhoneNo} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
              <input name="Email" type="email" value={formData.Email} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <MapPin size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Address Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Address Line 1</label>
              <input name="AddressLine1" value={formData.AddressLine1} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Address Line 2</label>
              <input name="AddressLine2" value={formData.AddressLine2} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center justify-between">
                Pincode
                {isLoadingPincode && <Loader2 size={10} className="animate-spin text-primary" />}
              </label>
              <input
                name="Pincode"
                value={formData.Pincode}
                readOnly={isViewMode}
                disabled={isViewMode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setFieldValue('Pincode', val);
                }}
                placeholder="6-digit Pincode"
                className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">City</label>
              <input name="City" value={formData.City} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">State</label>
              <input name="State" value={formData.State} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Country</label>
            <input name="Country" value={formData.Country} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">License Number *</label>
              <input name="LicenseNumber" value={formData.LicenseNumber} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">License Type</label>
              <input name="LicenseType" value={formData.LicenseType} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Issue Date</label>
              <input name="LicenseIssueDate" type="date" value={formData.LicenseIssueDate} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Expiry Date *</label>
              <input name="LicenseExpiryDate" type="date" value={formData.LicenseExpiryDate} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Issued By</label>
              <input name="LicenseIssuedBy" value={formData.LicenseIssuedBy} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Experience (Years)</label>
              <input name="ExperienceYears" type="number" value={formData.ExperienceYears} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle Types Allowed</label>
              <input name="VehicleTypeAllowed" value={formData.VehicleTypeAllowed} placeholder="e.g. Car, Truck, Bus" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
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
              <input name="JoinDate" type="date" value={formData.JoinDate} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Salary</label>
              <input name="Salary" type="number" value={formData.Salary} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Payment Type</label>
              <select name="PaymentType" value={formData.PaymentType} disabled={isViewMode} onChange={handleChange} className={cn("input-field appearance-none", isViewMode && "bg-surface-container-low border-transparent cursor-default")}>
                <option value={PaymentType.Cash}>Cash</option>
                <option value={PaymentType.Online}>Online</option>
                <option value={PaymentType.UPI}>UPI</option>
                <option value={PaymentType.BankTransfer}>Bank Transfer</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Aadhaar Number</label>
              <input name="AadhaarNo" value={formData.AadhaarNo} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">PAN Number</label>
              <input name="PanNo" value={formData.PanNo} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
        </div>

        {/* Status & Verification */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <ShieldCheck size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Status & Verification</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="flex items-center gap-3">
              <input
                id="IsVerified"
                name="IsVerified"
                type="checkbox"
                disabled={isViewMode}
                checked={formData.IsVerified}
                onChange={handleChange}
                className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
              />
              <label htmlFor="IsVerified" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Verified Driver</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="IsAvailable"
                name="IsAvailable"
                type="checkbox"
                disabled={isViewMode}
                checked={formData.IsAvailable}
                onChange={handleChange}
                className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
              />
              <label htmlFor="IsAvailable" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Availability Status</label>
            </div>
          </div>
        </div>
      </form>

      <div className="p-6 bg-surface-container-low border-t border-outline/5 flex justify-end gap-4">
        <button type="button" onClick={handleClose} className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
          {isViewMode ? 'Back to List' : 'Cancel'}
        </button>
        {!isViewMode && (
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="btn-primary px-8 py-2.5 min-w-[140px]">
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : isEditMode ? 'Save Changes' : 'Add Driver'}
          </button>
        )}
      </div>
    </div>
  );

  return onClose ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl animate-in zoom-in-95 duration-200">
        {formContent}
      </div>
    </div>
  ) : (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-surface-container-lowest -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
      </div>
      {formContent}
    </div>
  );
}
