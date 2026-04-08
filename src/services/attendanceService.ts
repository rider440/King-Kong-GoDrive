import api from './api';

// Attendance-related API calls
export const getAttendance = async (filter?: any) => {
  const res = await api.get('/api/Attendance', { params: filter });
  return res.data;
};

export const getDriverAttendance = async (driverId: number) => {
  const res = await api.get(`/api/Attendance/driver/${driverId}`);
  return res.data;
};

export const recordAttendance = async (data: any) => {
  const res = await api.post('/api/Attendance', data);
  return res.data;
};

export const bulkUpdateAttendance = async (data: any[]) => {
  const res = await api.post('/api/Attendance/bulk', data);
  return res.data;
};

export const updateAttendance = async (id: number, data: any) => {
  const res = await api.put(`/api/Attendance/${id}`, data);
  return res.data;
};

export const getAttendanceStats = async (month?: number, year?: number) => {
  const res = await api.get('/api/Attendance/stats', { params: { month, year } });
  return res.data;
};
