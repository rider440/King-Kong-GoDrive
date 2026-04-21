import api from './api';

export interface GetTripsParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  tripStatus?: string;
}

export interface TripPayload {
  Mode?: 'Add' | 'Update' | 'Delete'; // Required for backend SQL routing
  Trip_Id?: number | null;
  Vehicle_Id: number;
  Driver_Id: number;
  Origin: string;
  Destination: string;
  DepartureDate: string;
  DepartureTime: string;
  ExpectedArrivalDate?: string | null;
  ExpectedArrivalTime?: string | null;
  ActualDepartureTime?: string | null;
  ActualArrivalTime?: string | null;
  DistanceKM?: number | null;
  TripStatus?: string;
  Remarks?: string | null;
}

// Helper to prepare payload for SQL backend
const preparePayload = (data: TripPayload, mode: 'Add' | 'Update' | 'Delete'): TripPayload => {
  return {
    ...data,
    Mode: mode,
    Trip_Id: data.Trip_Id || 0,
    ExpectedArrivalDate: data.ExpectedArrivalDate || null,
    ExpectedArrivalTime: data.ExpectedArrivalTime || null,
    DistanceKM: data.DistanceKM || 0,
    Remarks: data.Remarks || '',
    TripStatus: data.TripStatus || 'Scheduled'
  };
};

// Get all trips with pagination, search, and status filter
export const getTrips = async (params: GetTripsParams = {}) => {
  const query: Record<string, any> = {
    pageNumber: params.pageNumber ?? 1,
    pageSize: params.pageSize ?? 10,
  };
  if (params.search) query.search = params.search;
  if (params.tripStatus) query.tripStatus = params.tripStatus;

  const res = await api.get('/api/Trip/GetAllTrip', { params: query });
  return res.data;
};

// Get single trip by ID
export const getTrip = async (id: number) => {
  const res = await api.get(`/api/Trip/GetTripById/${id}`);
  return res.data;
};

// Add new trip
export const createTrip = async (data: TripPayload) => {
  const payload = preparePayload(data, 'Add');
  console.log('🚀 DISPATCHING TRIP PAYLOAD:', payload);
  
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    const val = (payload as any)[key];
    formData.append(key, val !== null && val !== undefined ? String(val) : '');
  });

  try {
    const res = await api.post('/api/Trip/AddTrip', formData);
    return res.data;
  } catch (error: any) {
    console.error('❌ ERROR ADDING TRIP:', error.response?.data || error.message);
    throw error;
  }
};

// Update existing trip
export const updateTrip = async (data: TripPayload) => {
  const payload = preparePayload(data, 'Update');
  console.log('🔄 UPDATING TRIP PAYLOAD:', payload);

  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    const val = (payload as any)[key];
    formData.append(key, val !== null && val !== undefined ? String(val) : '');
  });

  try {
    const res = await api.put('/api/Trip/UpdateTrip', formData);
    return res.data;
  } catch (error: any) {
    console.error('❌ ERROR UPDATING TRIP:', error.response?.data || error.message);
    throw error;
  }
};

export const cancelTrip = async (id: number, reason: string) => {
  const res = await api.patch(`/api/Trip/${id}/cancel`, { reason });
  return res.data;
};

export const getTripLocation = async (tripId: number) => {
  const res = await api.get(`/api/Trip/${tripId}/location`);
  return res.data;
};
