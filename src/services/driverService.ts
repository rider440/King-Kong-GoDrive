import api from './api';

// Driver-related API calls
export const getDrivers = async () => {
  const res = await api.get('/api/Driver');
  return res.data;
};

export const getDriver = async (id: number) => {
  const res = await api.get(`/api/Driver/${id}`);
  return res.data;
};

export const createDriver = async (data: any) => {
  const res = await api.post('/api/Driver', data);
  return res.data;
};

export const updateDriver = async (id: number, data: any) => {
  const res = await api.put(`/api/Driver/${id}`, data);
  return res.data;
};

export const deleteDriver = async (id: number) => {
  const res = await api.delete(`/api/Driver/${id}`);
  return res.data;
};

export const getDriverAttendance = async (driverId: number) => {
  const res = await api.get(`/api/Driver/${driverId}/attendance`);
  return res.data;
};
