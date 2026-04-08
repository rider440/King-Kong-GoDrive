import api from './api';

// Trip/Dispatch-related API calls
export const getTrips = async () => {
  const res = await api.get('/api/Trip');
  return res.data;
};

export const getTrip = async (id: number) => {
  const res = await api.get(`/api/Trip/${id}`);
  return res.data;
};

export const createTrip = async (data: any) => {
  const res = await api.post('/api/Trip', data);
  return res.data;
};

export const updateTrip = async (id: number, data: any) => {
  const res = await api.put(`/api/Trip/${id}`, data);
  return res.data;
};

export const cancelTrip = async (id: number, reason: string) => {
  const res = await api.patch(`/api/Trip/${id}/cancel`, { reason });
  return res.data;
};

export const getTripLocation = async (tripId: number) => {
  const res = await api.get(`/api/Trip/${tripId}/location`);
  return res.data;
};
