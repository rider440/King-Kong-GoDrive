import api from './api';
import { Vehicle } from '@/types';

// Transform Vehicle object to API payload format
const transformVehicleForAPI = (vehicle: any) => {
  return {
    VehicleNumber: vehicle.VehicleNumber,
    VehicleType: vehicle.VehicleType,
    Brand: vehicle.Brand,
    Model: vehicle.Model,
    Color: vehicle.Color,
    ManufacturingYear: vehicle.ManufacturingYear,
    ChassisNumber: vehicle.ChassisNumber,
    EngineNumber: vehicle.EngineNumber,
    OwnerName: vehicle.OwnerName,
    OwnershipType: vehicle.OwnershipType,
    FuelType: vehicle.FuelType,
    FuelCapacity: vehicle.FuelCapacity,
    Mileage: vehicle.Mileage,
    SeatingCapacity: vehicle.SeatingCapacity,
    InsuranceProvider: vehicle.InsuranceProvider,
    InsurancePolicyNumber: vehicle.InsurancePolicyNumber,
    InsuranceExpiryDate: vehicle.InsuranceExpiryDate,
    FitnessExpiryDate: vehicle.FitnessExpiryDate,
    PermitNumber: vehicle.PermitNumber,
    PermitExpiryDate: vehicle.PermitExpiryDate,
    PollutionExpiryDate: vehicle.PollutionExpiryDate,
    CurrentLocation: vehicle.CurrentLocation,
    TotalDistanceTravelled: vehicle.TotalDistanceTravelled,
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
  const res = await api.get(`/api/Vehicle/GetVehicleById/${id}`);
  return res.data;
};

export const createVehicle = async (data: any) => {
  const apiPayload = transformVehicleForAPI(data);
  const res = await api.post('/api/Vehicle/AddVehicle', apiPayload);
  return res.data;
};

export const updateVehicle = async (id: number, data: any) => {
  const apiPayload = {
    ...transformVehicleForAPI(data),
    Vehicle_Id: id
  };
  const res = await api.put('/api/Vehicle/UpdateVehicle', apiPayload);
  return res.data;
};

export const deleteVehicle = async (id: number) => {
  const res = await api.delete(`/api/Vehicle/${id}`);
  return res.data;
};

export const getVehicleStatus = async (id: number) => {
  const res = await api.get(`/api/Vehicle/${id}/status`);
  return res.data;
};
