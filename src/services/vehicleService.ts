import api from './api';

// Vehicle-related API calls
export const getVehicles = async () => {
  const res = await api.get('/api/Vehicle');
  return res.data;
};

export const getVehicle = async (id: number) => {
  const res = await api.get(`/api/Vehicle/${id}`);
  return res.data;
};

export const createVehicle = async (data: any) => {
  const res = await api.post('/api/Vehicle', data);
  return res.data;
};

export const updateVehicle = async (id: number, data: any) => {
  const res = await api.put(`/api/Vehicle/${id}`, data);
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
