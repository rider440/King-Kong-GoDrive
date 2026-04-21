import React, { useState, useEffect, useRef } from 'react';
import {
  Truck,
  Save,
  X,
  Loader2,
  Settings,
  Fuel,
  Calendar,
  ShieldCheck,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { OwnershipType, FuelType, Vehicle } from '@/types';
import { useForm } from '@/hooks';
import { getVehicle, updateVehicle, createVehicle, getVehicles } from '@/services/vehicleService';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

interface AddVehicleProps {
  mode?: 'add' | 'edit' | 'view';
  id?: string | number;
  onClose?: (refresh?: boolean) => void;
}

export default function AddVehicle({ mode: propMode, id: propId, onClose }: AddVehicleProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { pathname } = useLocation();
  const { showToast } = useToast();

  // Determine mode and ID from props or URL
  const isViewMode = propMode === 'view' || pathname.includes('/view');
  const isEditMode = propMode === 'edit' || (!!paramId && !pathname.includes('/view'));
  const isAddMode = propMode === 'add' || (!paramId && !propMode);

  const currentMode = propMode || (isViewMode ? 'view' : isEditMode ? 'edit' : 'add');
  const currentId = propId || paramId;

  const initialValues: Partial<Vehicle> = {
    VehicleNumber: '',
    VehicleType: '',
    Brand: '',
    Model: '',
    Color: '',
    ManufacturingYear: new Date().getFullYear(),
    ChassisNumber: '',
    EngineNumber: '',
    OwnerName: '',
    OwnershipType: OwnershipType.Company,
    FuelType: FuelType.Diesel,
    FuelCapacity: 0,
    Mileage: 0,
    SeatingCapacity: 0,
    InsuranceProvider: '',
    InsurancePolicyNumber: '',
    InsuranceExpiryDate: '',
    FitnessExpiryDate: '',
    PermitNumber: '',
    PermitExpiryDate: '',
    PollutionExpiryDate: '',
    CurrentLocation: '',
    TotalDistanceTravelled: 0,
    IsActive: true,
    IsAvailable: true,
  };

  const { values: formData, handleChange, setValues } = useForm(initialValues);

  // Fetch vehicle data for Edit/View modes
  useEffect(() => {
    const loadVehicleData = async () => {
      if (!currentId || currentMode === 'add') return;

      setIsLoadingData(true);
      try {
        let res;
        try {
          res = await getVehicle(Number(currentId));
        } catch (singleFetchError: any) {
          console.warn('Single Vehicle Fetch Failed. Attempting fallback...');
          const listRes = await getVehicles({ pageSize: 1000 });
          
          const findArrayInObject = (obj: any): any[] | null => {
            if (Array.isArray(obj)) return obj;
            if (!obj || typeof obj !== 'object') return null;
            
            // Look for common array keys
            const commonKeys = ['data', 'value', '$values', 'dataList', 'vehicles', 'items'];
            for (const key of commonKeys) {
              if (obj[key] && Array.isArray(obj[key]?.data || obj[key])) {
                return obj[key]?.data || obj[key];
              }
            }
            
            // Recursive scan for ANY array that looks like vehicle data
            for (const key in obj) {
              if (Array.isArray(obj[key])) {
                const first = obj[key][0];
                if (first && (first.VehicleNumber || first.vehicleNumber || first.Vehicle_Id || first.vehicle_Id)) {
                  return obj[key];
                }
              } else if (obj[key] && typeof obj[key] === 'object') {
                const found = findArrayInObject(obj[key]);
                if (found) return found;
              }
            }
            return null;
          };

          const array = findArrayInObject(listRes) || [];
          const searchId = String(currentId);
          res = array.find((v: any) => 
            String(v.Vehicle_Id || v.vehicle_Id || v.VehicleId || v.id) === searchId
          );
          if (!res) throw singleFetchError;
        }

        const findObject = (obj: any): any | null => {
          if (!obj || typeof obj !== 'object') return null;
          if (obj.VehicleNumber || obj.vehicleNumber || obj.Vehicle_Id || obj.vehicle_Id) return obj;
          
          const commonKeys = ['data', 'value', '$values', 'vehicle', 'Vehicle'];
          for (const key of commonKeys) {
            if (obj[key] && typeof obj[key] === 'object') {
              if (Array.isArray(obj[key])) return obj[key][0];
              return obj[key];
            }
          }

          // Scan all object properties for a vehicle-like object
          for (const key in obj) {
            const val = obj[key];
            if (val && typeof val === 'object' && !Array.isArray(val)) {
              if (val.VehicleNumber || val.vehicleNumber || val.Vehicle_Id || val.vehicle_Id) return val;
            }
          }

          return obj;
        };

        const data = findObject(res);
        
        if (!data) throw new Error('Vehicle asset intel could not be decoded');

        const mappedData = {
          ...data,
          Vehicle_Id: data.vehicle_Id || data.Vehicle_Id || currentId,
          VehicleNumber: data.vehicleNumber || data.VehicleNumber || '',
          VehicleType: data.vehicleType || data.VehicleType || '',
          Brand: data.brand || data.Brand || '',
          Model: data.model || data.Model || '',
          Color: data.color || data.Color || '',
          OwnerName: data.ownerName || data.OwnerName || '',
          OwnershipType: data.ownershipType || data.OwnershipType || OwnershipType.Company,
          FuelType: data.fuelType || data.FuelType || FuelType.Diesel,
          FuelCapacity: data.fuelCapacity || data.FuelCapacity || 0,
          Mileage: data.mileage || data.Mileage || 0,
          SeatingCapacity: data.seatingCapacity || data.SeatingCapacity || 0,
          InsuranceProvider: data.insuranceProvider || data.InsuranceProvider || '',
          InsurancePolicyNumber: data.insurancePolicyNumber || data.InsurancePolicyNumber || '',
          PermitNumber: data.permitNumber || data.PermitNumber || '',
          CurrentLocation: data.currentLocation || data.CurrentLocation || '',
          TotalDistanceTravelled: data.totalDistanceTravelled || data.TotalDistanceTravelled || 0,
          ManufacturingYear: Number(data.manufacturingYear || data.ManufacturingYear) || new Date().getFullYear(),
          InsuranceExpiryDate: (data.insuranceExpiryDate || data.InsuranceExpiryDate)?.split('T')[0] || '',
          FitnessExpiryDate: (data.fitnessExpiryDate || data.FitnessExpiryDate)?.split('T')[0] || '',
          PermitExpiryDate: (data.permitExpiryDate || data.PermitExpiryDate)?.split('T')[0] || '',
          PollutionExpiryDate: (data.pollutionExpiryDate || data.PollutionExpiryDate)?.split('T')[0] || '',
          IsActive: data.isActive ?? data.IsActive ?? true,
          IsAvailable: data.isAvailable ?? data.IsAvailable ?? true,
        };

        setValues(mappedData);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        showToast('Warning: Failed to sync full asset data. You can still fill the details manually.', 'error');
        // REASON: We DO NOT close the modal or navigate away anymore. 
        // This ensures the user stays in "Edit Mode" as requested.
      } finally {
        setIsLoadingData(false);
      }
    };

    loadVehicleData();
  }, [currentId, currentMode, setValues, navigate, showToast, onClose]);

  const handleClose = (refresh?: boolean) => {
    const shouldRefresh = refresh === true;
    if (onClose) {
      onClose(shouldRefresh);
    } else {
      navigate('/vehicles');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewMode) return;

    // Validate required fields
    const requiredFields = {
      VehicleNumber: 'Vehicle Number',
      VehicleType: 'Vehicle Type',
      Brand: 'Brand',
      Model: 'Model'
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
      if (isEditMode) {
        await updateVehicle(Number(currentId), formData);
        showToast('Vehicle updated successfully!', 'success');
      } else {
        await createVehicle(formData);
        showToast('Vehicle registered successfully!', 'success');
      }

      setTimeout(() => handleClose(true), 1000);
    } catch (error: any) {
      console.error('Error saving vehicle:', error);
      
      let errorMessage = 'Failed to save vehicle';
      
      if (error.response?.data?.errors) {
        // Handle validation errors from ASP.NET Core
        const validationErrors = error.response.data.errors;
        const firstErrorKey = Object.keys(validationErrors)[0];
        const firstErrorMessage = validationErrors[firstErrorKey][0];
        errorMessage = `${firstErrorKey}: ${firstErrorMessage}`;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    const requiredFields = ['VehicleNumber', 'VehicleType', 'Brand', 'Model'];
    const filledRequired = requiredFields.filter(f => !!formData[f as keyof Vehicle]).length;
    return Math.round((filledRequired / requiredFields.length) * 100);
  };

  const progress = calculateProgress();

  if (isLoadingData) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center gap-4",
        onClose ? "h-[400px]" : "min-h-[60vh]"
      )}>
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Loading vehicle assets...</p>
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
            <Truck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-on-surface">
              {isViewMode ? 'Asset Details' : isEditMode ? 'Edit Vehicle Asset' : 'Register New Asset'}
            </h2>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              {isAddMode ? 'New Fleet Entry' : `Asset ID: ${currentId} • ${formData.VehicleNumber}`}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleClose()}
          className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Basic Specifications */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <Settings size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Specifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle Number *</label>
              <input name="VehicleNumber" value={formData.VehicleNumber} placeholder="e.g. MH 12 AB 1234" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle Type *</label>
              <input name="VehicleType" value={formData.VehicleType} placeholder="e.g. Truck, Van, Tipper" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Brand *</label>
              <input name="Brand" value={formData.Brand} placeholder="e.g. Tata, Mahindra, Ashok Leyland" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Model *</label>
              <input name="Model" value={formData.Model} placeholder="e.g. Signa 4825.TK, Bolero Neo" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Color</label>
              <input name="Color" value={formData.Color} placeholder="e.g. White, Arctic Blue" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Manufacturing Year</label>
              <input name="ManufacturingYear" type="number" value={formData.ManufacturingYear} placeholder="e.g. 2023" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
        </div>

        {/* Technical & Ownership */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <Truck size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Technical & Ownership</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Chassis Number</label>
              <input name="ChassisNumber" value={formData.ChassisNumber} placeholder="e.g. MAT1234567890ABC" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Engine Number</label>
              <input name="EngineNumber" value={formData.EngineNumber} placeholder="e.g. ENG9876543210" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner Name</label>
              <input name="OwnerName" value={formData.OwnerName} placeholder="e.g. Ramesh Transport Corp." readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ownership Type</label>
              <select name="OwnershipType" value={formData.OwnershipType} disabled={isViewMode} onChange={handleChange} className={cn("input-field appearance-none", isViewMode && "bg-surface-container-low border-transparent cursor-default")}>
                <option value={OwnershipType.Company}>Company</option>
                <option value={OwnershipType.Rental}>Rental</option>
                <option value={OwnershipType.Self}>Self</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fuel & Performance */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <Fuel size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Fuel & Performance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fuel Type</label>
              <select name="FuelType" value={formData.FuelType} disabled={isViewMode} onChange={handleChange} className={cn("input-field appearance-none", isViewMode && "bg-surface-container-low border-transparent cursor-default")}>
                <option value={FuelType.Diesel}>Diesel</option>
                <option value={FuelType.Petrol}>Petrol</option>
                <option value={FuelType.CNG}>CNG</option>
                <option value={FuelType.Electric}>Electric</option>
                <option value={FuelType.Cn}>Cn</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fuel Capacity (L)</label>
              <input name="FuelCapacity" type="number" value={formData.FuelCapacity} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Mileage (km/L)</label>
              <input name="Mileage" type="number" step="0.1" value={formData.Mileage} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Seating Capacity</label>
              <input name="SeatingCapacity" type="number" value={formData.SeatingCapacity} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
        </div>

        {/* Insurance & Compliance */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <ShieldCheck size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Insurance & Compliance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Insurance Provider</label>
              <input name="InsuranceProvider" value={formData.InsuranceProvider} placeholder="e.g. ICICI Lombard" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Policy Number</label>
              <input name="InsurancePolicyNumber" value={formData.InsurancePolicyNumber} placeholder="e.g. POL/1234/5678/09" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Insurance Expiry</label>
              <input name="InsuranceExpiryDate" type="date" value={formData.InsuranceExpiryDate} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fitness Expiry</label>
              <input name="FitnessExpiryDate" type="date" value={formData.FitnessExpiryDate} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Permit Number</label>
              <input name="PermitNumber" value={formData.PermitNumber} placeholder="e.g. P-12345/MH/2023" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Permit Expiry</label>
              <input name="PermitExpiryDate" type="date" value={formData.PermitExpiryDate} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Pollution Expiry</label>
              <input name="PollutionExpiryDate" type="date" value={formData.PollutionExpiryDate} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
        </div>

        {/* Status & Tracking */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
            <Activity size={16} className="text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Status & Tracking</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Current Location</label>
              <input name="CurrentLocation" value={formData.CurrentLocation} placeholder="e.g. Navi Mumbai, Maharashtra" readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Distance (KM)</label>
              <input name="TotalDistanceTravelled" type="number" step="0.01" value={formData.TotalDistanceTravelled} readOnly={isViewMode} disabled={isViewMode} onChange={handleChange} className={cn("input-field", isViewMode && "bg-surface-container-low border-transparent cursor-default")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="flex items-center gap-3">
              <input
                id="IsActive"
                name="IsActive"
                type="checkbox"
                disabled={isViewMode}
                checked={formData.IsActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
              />
              <label htmlFor="IsActive" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Active Asset</label>
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
              <label htmlFor="IsAvailable" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Available for Trip</label>
            </div>
          </div>
        </div>
      </form>

      <div className="p-6 bg-surface-container-low border-t border-outline/5 flex justify-end gap-4">
        <button type="button" onClick={() => handleClose()} className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
          {isViewMode ? 'Close' : 'Cancel'}
        </button>
        {!isViewMode && (
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="btn-primary px-8 py-2.5 min-w-[140px]">
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Registering...') : isEditMode ? 'Save Changes' : 'Register Asset'}
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
