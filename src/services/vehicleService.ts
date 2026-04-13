import api from './api';
import { Vehicle } from '@/types';

// Transform Vehicle object to API payload format
const transformVehicleForAPI = (vehicle: any) => {
  return {
    VehicleNumber: vehicle.VehicleNumber,
    VehicleType: vehicle.VehicleType,
    Brand: vehicle.Brand,
    Model: vehicle.Model,
    Color: vehicle.Color || '',
    ManufacturingYear: Number(vehicle.ManufacturingYear) || new Date().getFullYear(),
    ChassisNumber: vehicle.ChassisNumber || '',
    EngineNumber: vehicle.EngineNumber || '',
    OwnerName: vehicle.OwnerName || '',
    OwnershipType: vehicle.OwnershipType,
    FuelType: vehicle.FuelType,
    FuelCapacity: Number(vehicle.FuelCapacity) || 0,
    Mileage: Number(vehicle.Mileage) || 0,
    SeatingCapacity: Number(vehicle.SeatingCapacity) || 0,
    InsuranceProvider: vehicle.InsuranceProvider || '',
    InsurancePolicyNumber: vehicle.InsurancePolicyNumber || '',
    InsuranceExpiryDate: vehicle.InsuranceExpiryDate,
    FitnessExpiryDate: vehicle.FitnessExpiryDate,
    PermitNumber: vehicle.PermitNumber || '',
    PermitExpiryDate: vehicle.PermitExpiryDate,
    PollutionExpiryDate: vehicle.PollutionExpiryDate,
    CurrentLocation: vehicle.CurrentLocation || '',
    TotalDistanceTravelled: Number(vehicle.TotalDistanceTravelled) || 0,
    IsActive: vehicle.IsActive ?? true,
    IsAvailable: vehicle.IsAvailable ?? true
  };
};

export interface GetVehiclesParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean | null;
  isAvailable?: boolean | null;
}

// Vehicle-related API calls
export const getVehicles = async (params: GetVehiclesParams = {}) => {
  const query: Record<string, any> = {
    pageNumber: params.pageNumber ?? 1,
    pageSize: params.pageSize ?? 10,
  };
  if (params.search) query.search = params.search;
  if (params.isActive !== null && params.isActive !== undefined) query.isActive = params.isActive;
  if (params.isAvailable !== null && params.isAvailable !== undefined) query.isAvailable = params.isAvailable;

  const res = await api.get('/api/Vehicle/GetAllVehicles', { params: query });
  return res.data;
};

export const getVehicle = async (id: number) => {
  // Try the most standard REST endpoint first, as GetVehicleById is returning 404
  const res = await api.get(`/api/Vehicle/${id}`);
  return res.data;
};

export const createVehicle = async (data: any) => {
  const payload = transformVehicleForAPI(data);
  const formData = new FormData();

  Object.keys(payload).forEach(key => {
    formData.append(key, (payload as any)[key] !== null && (payload as any)[key] !== undefined ? String((payload as any)[key]) : '');
  });

  try {
    const res = await api.post('/api/Vehicle/AddVehicle', formData);
    return res.data;
  } catch (error: any) {
    console.error("❌ ERROR ADDING VEHICLE:", error.response?.data);
    throw error;
  }
};

export const updateVehicle = async (id: number, data: any) => {
  const payload = transformVehicleForAPI(data);
  const formData = new FormData();

  Object.keys(payload).forEach(key => {
    formData.append(key, (payload as any)[key] !== null && (payload as any)[key] !== undefined ? String((payload as any)[key]) : '');
  });

  formData.append("Vehicle_Id", id.toString());

  try {
    const res = await api.put('/api/Vehicle/UpdateVehicle', formData);
    return res.data;
  } catch (error: any) {
    console.error("❌ ERROR UPDATING VEHICLE:", error.response?.data);
    throw error;
  }
};

export const deleteVehicle = async (id: number) => {
  const res = await api.delete(`/api/Vehicle/${id}`);
  return res.data;
};

export const getVehicleStatus = async (id: number) => {
  const res = await api.get(`/api/Vehicle/${id}/status`);
  return res.data;
};
