import React, { useState } from 'react';
import {
  ArrowLeft,
  Truck,
  Save,
  Info,
  Calendar,
  Fuel,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Activity,
  FileText,
  Tag,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { OwnershipType, FuelType, Vehicle } from '../types';

export default function AddVehicle() {
  const [formData, setFormData] = useState<Partial<Vehicle>>({
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
    IsAvailable: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked :
      type === 'number' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const calculateProgress = () => {
    const requiredFields = ['VehicleNumber', 'VehicleType', 'Brand', 'Model'];
    const filledRequired = requiredFields.filter(f => !!formData[f as keyof Vehicle]).length;
    return Math.round((filledRequired / requiredFields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      <section className="flex items-center gap-4">
        <Link to="/vehicles" className="p-2 hover:bg-surface-container rounded-full transition-colors">
          <ArrowLeft size={24} className="text-primary" />
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Register New Vehicle</h1>
          <p className="text-on-surface-variant font-medium">Add a new high-performance asset to the King Kong GoDrive fleet.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Section: Basic Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Truck size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Basic Specifications</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Vehicle Number *</label>
                  <input
                    name="VehicleNumber"
                    value={formData.VehicleNumber}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Vehicle Type *</label>
                  <input
                    name="VehicleType"
                    value={formData.VehicleType}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Brand *</label>
                  <input
                    name="Brand"
                    value={formData.Brand}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Model *</label>
                  <input
                    name="Model"
                    value={formData.Model}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Color</label>
                  <input
                    name="Color"
                    value={formData.Color}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Manufacturing Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Settings size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Manufacturing & Ownership</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Manufacturing Year</label>
                  <input
                    name="ManufacturingYear"
                    value={formData.ManufacturingYear}
                    onChange={handleChange}
                    className="input-field"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Chassis Number</label>
                  <input
                    name="ChassisNumber"
                    value={formData.ChassisNumber}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Engine Number</label>
                  <input
                    name="EngineNumber"
                    value={formData.EngineNumber}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Owner Name</label>
                  <input
                    name="OwnerName"
                    value={formData.OwnerName}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Ownership Type</label>
                  <select
                    name="OwnershipType"
                    value={formData.OwnershipType}
                    onChange={handleChange}
                    className="input-field appearance-none"
                  >
                    <option value={OwnershipType.Company}>Company</option>
                    <option value={OwnershipType.Rental}>Rental</option>
                    <option value={OwnershipType.Self}>Self</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Fuel & Capacity */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Fuel size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Fuel & Performance</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Fuel Type</label>
                  <select
                    name="FuelType"
                    value={formData.FuelType}
                    onChange={handleChange}
                    className="input-field appearance-none"
                  >
                    <option value={FuelType.Petrol}>Petrol</option>
                    <option value={FuelType.Diesel}>Diesel</option>
                    <option value={FuelType.CNG}>CNG</option>
                    <option value={FuelType.Electric}>Electric</option>
                    <option value={FuelType.Cn}>Cn</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Fuel Capacity (Ltrs)</label>
                  <input
                    name="FuelCapacity"
                    value={formData.FuelCapacity}
                    onChange={handleChange}
                    className="input-field"
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Mileage (km/L)</label>
                  <input
                    name="Mileage"
                    value={formData.Mileage}
                    onChange={handleChange}
                    className="input-field"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Seating Capacity</label>
                  <input
                    name="SeatingCapacity"
                    value={formData.SeatingCapacity}
                    onChange={handleChange}
                    className="input-field"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Insurance & Compliance */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <ShieldCheck size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Insurance & Compliance</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Insurance Provider</label>
                  <input
                    name="InsuranceProvider"
                    value={formData.InsuranceProvider}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Policy Number</label>
                  <input
                    name="InsurancePolicyNumber"
                    value={formData.InsurancePolicyNumber}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Insurance Expiry</label>
                  <input
                    name="InsuranceExpiryDate"
                    value={formData.InsuranceExpiryDate}
                    onChange={handleChange}
                    className="input-field"
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Fitness Expiry</label>
                  <input
                    name="FitnessExpiryDate"
                    value={formData.FitnessExpiryDate}
                    onChange={handleChange}
                    className="input-field"
                    type="date"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Permit Number</label>
                  <input
                    name="PermitNumber"
                    value={formData.PermitNumber}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Permit Expiry</label>
                  <input
                    name="PermitExpiryDate"
                    value={formData.PermitExpiryDate}
                    onChange={handleChange}
                    className="input-field"
                    type="date"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Pollution Expiry</label>
                <input
                  name="PollutionExpiryDate"
                  value={formData.PollutionExpiryDate}
                  onChange={handleChange}
                  className="input-field"
                  type="date"
                />
              </div>
            </div>
          </section>

          {/* Section: Status & Tracking */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Activity size={16} className="text-primary" />
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500">Status & Tracking</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-ambient border border-outline/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Current Location</label>
                  <input
                    name="CurrentLocation"
                    value={formData.CurrentLocation}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant block">Total Distance (KM)</label>
                  <input
                    name="TotalDistanceTravelled"
                    value={formData.TotalDistanceTravelled}
                    onChange={handleChange}
                    className="input-field"
                    type="number"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-3">
                  <input
                    id="IsAvailable"
                    name="IsAvailable"
                    type="checkbox"
                    checked={formData.IsAvailable}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
                  />
                  <label htmlFor="IsAvailable" className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Available for Trip</label>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary text-white p-6 rounded-2xl shadow-xl relative overflow-hidden sticky top-8">
            <ShieldCheck size={80} className="absolute -right-4 -bottom-4 opacity-10" />
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Registration Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black">{progress}%</span>
                <span className="text-[10px] font-bold uppercase opacity-80">
                  {progress === 100 ? 'Ready to Register' : 'Required Fields'}
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
              <li className={`flex items-center gap-2 ${formData.VehicleNumber ? 'text-white' : 'opacity-50'}`}>
                {formData.VehicleNumber ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />}
                <span>Reg Number</span>
              </li>
              <li className={`flex items-center gap-2 ${formData.VehicleType ? 'text-white' : 'opacity-50'}`}>
                {formData.VehicleType ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />}
                <span>Vehicle Type</span>
              </li>
              <li className={`flex items-center gap-2 ${formData.Brand && formData.Model ? 'text-white' : 'opacity-50'}`}>
                {formData.Brand && formData.Model ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />}
                <span>Brand & Model</span>
              </li>
            </ul>

            <div className="mt-12 space-y-3">
              <button
                className={`btn-primary w-full py-4 text-lg ${progress < 100 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={progress < 100}
              >
                <Save size={20} />
                Register Asset
              </button>
              <Link
                to="/vehicles"
                className="w-full py-4 text-white/70 font-bold rounded-xl hover:bg-white/10 transition-colors uppercase text-xs tracking-widest block text-center"
              >
                Discard Entry
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/5 space-y-4">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Compliance Check</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Ensure <strong>Pollution</strong> and <strong>Fitness</strong> expiry dates are correct. The system will alert you 15 days before expiration.
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Registering an asset automatically generates a unique QR code for maintenance tracking and driver assignment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
