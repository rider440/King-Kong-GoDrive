import React from 'react';
import {
  Truck,
  Plus,
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Calendar,
  Fuel,
  Settings,
  Eye,
  Edit,
  X,
  Save
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { OwnershipType, FuelType, Vehicle } from '../types';

const vehicles = [
  {
    Vehicle_Id: 882,
    VehicleNumber: 'ABC-1234',
    VehicleType: 'Heavy Duty Truck',
    Brand: 'Mercedes-Benz',
    Model: 'Actros',
    ManufacturingYear: 2021,
    ChassisNumber: 'MB-ACT-88293',
    EngineNumber: 'V8-DIESEL-992',
    OwnerName: 'FleetLink Logistics',
    OwnershipType: OwnershipType.Company,
    FuelType: FuelType.Diesel,
    FuelCapacity: 400,
    Mileage: 3.5,
    SeatingCapacity: 2,
    InsuranceProvider: 'Allianz Fleet',
    InsurancePolicyNumber: 'POL-88293-X',
    InsuranceExpiryDate: '2024-12-15',
    Color: 'White',
    FitnessExpiryDate: '2025-06-20',
    PermitNumber: 'PER-88293',
    PermitExpiryDate: '2026-01-10',
    PollutionExpiryDate: '2024-10-05',
    CurrentLocation: 'Nagpur, MH',
    TotalDistanceTravelled: 45000.5,
    IsAvailable: true,
    // UI-only fields
    name: 'Mercedes-Benz Actros',
    driver: 'Marcus Thorne',
    fuel: '82%',
    nextService: 'Oct 12, 2023',
  },
  {
    Vehicle_Id: 119,
    VehicleNumber: 'XYZ-5678',
    VehicleType: 'Heavy Duty Truck',
    Brand: 'Volvo',
    Model: 'FH16',
    ManufacturingYear: 2022,
    ChassisNumber: 'VOL-FH-11928',
    EngineNumber: 'D16-VOL-772',
    OwnerName: 'FleetLink Logistics',
    OwnershipType: OwnershipType.Company,
    FuelType: FuelType.Diesel,
    FuelCapacity: 450,
    Mileage: 3.2,
    SeatingCapacity: 2,
    InsuranceProvider: 'AXA Commercial',
    InsurancePolicyNumber: 'POL-11928-Y',
    InsuranceExpiryDate: '2025-01-20',
    Color: 'Blue',
    FitnessExpiryDate: '2025-08-15',
    PermitNumber: 'PER-11928',
    PermitExpiryDate: '2026-03-22',
    PollutionExpiryDate: '2024-11-30',
    CurrentLocation: 'Pune, MH',
    TotalDistanceTravelled: 28000.2,
    IsActive: true,
    IsAvailable: true,
    // UI-only fields
    name: 'Volvo FH16',
    driver: 'Sarah Connor',
    fuel: '45%',
    nextService: 'Nov 05, 2023',
  },
  {
    Vehicle_Id: 445,
    VehicleNumber: 'KEC-445',
    VehicleType: 'Light Commercial',
    Brand: 'Scania',
    Model: 'R-Series',
    ManufacturingYear: 2020,
    ChassisNumber: 'SCA-R-44512',
    EngineNumber: 'SC-R-991',
    OwnerName: 'Rental Fleet Co.',
    OwnershipType: OwnershipType.Rental,
    FuelType: FuelType.Diesel,
    FuelCapacity: 300,
    Mileage: 4.1,
    SeatingCapacity: 3,
    InsuranceProvider: 'Liberty Mutual',
    InsurancePolicyNumber: 'POL-44512-Z',
    InsuranceExpiryDate: '2024-08-10',
    Color: 'Red',
    FitnessExpiryDate: '2024-09-01',
    PermitNumber: 'PER-44512',
    PermitExpiryDate: '2025-02-15',
    PollutionExpiryDate: '2024-05-20',
    CurrentLocation: 'Mumbai, MH',
    TotalDistanceTravelled: 62000.8,
    IsActive: true,
    IsAvailable: false,
    // UI-only fields
    name: 'Scania R-Series',
    driver: 'Unassigned',
    fuel: '12%',
    nextService: 'In Progress',
  }
];

export default function VehicleDirectory() {
  const [selectedVehicle, setSelectedVehicle] = React.useState<any>(null);
  const [modalMode, setModalMode] = React.useState<'view' | 'edit' | 'add' | null>(null);

  const handleAction = (vehicle: any, mode: 'view' | 'edit' | 'add') => {
    if (mode === 'add') {
      setSelectedVehicle({
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
        IsAvailable: true
      });
    } else {
      setSelectedVehicle(vehicle);
    }
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedVehicle(null);
    setModalMode(null);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Vehicle Assets</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Manage and monitor your fleet inventory.</p>
        </div>
        <button
          onClick={() => handleAction(null, 'add')}
          className="btn-primary px-6 py-3"
        >
          <Plus size={18} />
          <span>Register Asset</span>
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Assets', value: '150', icon: Truck, color: 'primary' },
          { label: 'In Operation', value: '112', icon: MapPin, color: 'emerald' },
          { label: 'Maintenance', value: '8', icon: Settings, color: 'error' }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline/5 flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
              <p className={cn("text-3xl font-black mt-1", `text-${stat.color}`)}>{stat.value}</p>
            </div>
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", `bg-${stat.color}/10 text-${stat.color}`)}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm"
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <Filter size={16} className="mr-2" />
              Type
            </button>
            <button className="flex items-center px-4 py-2.5 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Registration</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Assigned Driver</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Next Service</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {vehicles.map((v) => (
                <tr key={v.Vehicle_Id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <Truck size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{v.name}</p>
                        <p className="text-xs text-on-surface-variant">{v.VehicleType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary bg-primary/5 px-2 py-1 rounded">{v.VehicleNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className={cn("text-sm font-medium", v.driver === 'Unassigned' ? "text-slate-400 italic" : "text-on-surface")}>
                      {v.driver}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                      v.IsAvailable ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-amber-50 text-amber-700 ring-amber-600/20"
                    )}>
                      {v.IsAvailable ? 'Active' : 'Idle'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface">{v.nextService}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Fuel size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500">{v.fuel}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleAction(v, 'view')}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleAction(v, 'edit')}
                        className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Action Modal */}
      {modalMode && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-outline/10">
            <div className="p-6 border-b border-outline/5 flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Truck size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-on-surface uppercase italic">
                    {modalMode === 'view' ? 'Vehicle Details' : modalMode === 'add' ? 'Add New Vehicle' : 'Edit Vehicle Asset'}
                  </h2>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    {modalMode === 'add' ? 'New Asset Registration' : `Asset ID: V-${selectedVehicle.Vehicle_Id} • ${selectedVehicle.VehicleNumber}`}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Basic Specs */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                  <Settings size={16} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Specifications</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle Number</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.VehicleNumber}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle Type</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.VehicleType}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Brand</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.Brand}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Model</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.Model}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Color</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.Color}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Year</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.ManufacturingYear}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                  <Truck size={16} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Technical & Ownership</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Chassis Number</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.ChassisNumber}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Engine Number</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.EngineNumber}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner Name</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.OwnerName}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ownership Type</label>
                    <select
                      disabled={modalMode === 'view'}
                      defaultValue={selectedVehicle.OwnershipType}
                      className={cn("input-field appearance-none", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    >
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
                    <select
                      disabled={modalMode === 'view'}
                      defaultValue={selectedVehicle.FuelType}
                      className={cn("input-field appearance-none", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    >
                      <option value={FuelType.Diesel}>Diesel</option>
                      <option value={FuelType.Petrol}>Petrol</option>
                      <option value={FuelType.CNG}>CNG</option>
                      <option value={FuelType.Electric}>Electric</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fuel Capacity (L)</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.FuelCapacity}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="number"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Mileage (km/L)</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.Mileage}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="number"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Seating Capacity</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.SeatingCapacity}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="number"
                    />
                  </div>
                </div>
              </div>

              {/* Insurance & Compliance */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                  <Calendar size={16} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Insurance & Compliance</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Provider</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.InsuranceProvider}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Policy Number</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.InsurancePolicyNumber}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Insurance Expiry</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.InsuranceExpiryDate}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="date"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fitness Expiry</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.FitnessExpiryDate}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="date"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Pollution Expiry</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.PollutionExpiryDate}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="date"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Permit Number</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.PermitNumber}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Permit Expiry</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.PermitExpiryDate}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="date"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Tracking */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-outline/5 pb-2">
                  <Settings size={16} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Status & Tracking</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Current Location</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.CurrentLocation}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Distance (KM)</label>
                    <input
                      readOnly={modalMode === 'view'}
                      defaultValue={selectedVehicle.TotalDistanceTravelled}
                      className={cn("input-field", modalMode === 'view' && "bg-surface-container-low border-transparent cursor-default")}
                      type="number"
                    />
                  </div>
                </div>
                  <div className="flex items-center gap-3">
                    <input
                      disabled={modalMode === 'view'}
                      type="checkbox"
                      defaultChecked={selectedVehicle.IsAvailable}
                      className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
                    />
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Available for Trip</label>
                  </div>
                {modalMode === 'view' && selectedVehicle.CreatedAt && (
                  <div className="pt-4 border-t border-outline/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Created At</p>
                    <p className="text-xs font-medium text-on-surface">{new Date(selectedVehicle.CreatedAt).toLocaleString()}</p>
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
                  {modalMode === 'add' ? 'Add Vehicle' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
