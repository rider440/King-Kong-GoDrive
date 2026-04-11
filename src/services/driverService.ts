import api from './api';

// Transform Driver object to API payload format
// Helper to format date for API (YYYY-MM-DD -> YYYY-MM-DDT00:00:00)
// const formatDateForAPI = (dateStr: any) => {
//   if (!dateStr || dateStr === '') return null;
//   if (dateStr.includes('T')) return dateStr;
//   return `${dateStr}T00:00:00`;
// };
const formatDateForAPI = (dateStr: any) => {
  if (!dateStr || dateStr === '') return null;
  return dateStr.split('T')[0]; // send only YYYY-MM-DD
};

// Transform Driver object to API payload format
const transformDriverForAPI = (driver: any) => {
  return {
    FirstName: driver.FirstName,
    LastName: driver.LastName,
    Gender: driver.Gender,
    DateOfBirth: formatDateForAPI(driver.DateOfBirth),

    PhoneNo: driver.PhoneNo,
    AlternatePhoneNo: driver.AlternatePhoneNo || 'N/A',
    Email: driver.Email || '',

    AddressLine1: driver.AddressLine1 || '',
    AddressLine2: driver.AddressLine2 || '',
    City: driver.City || '', // ⚠️ match backend spelling
    State: driver.State || '',
    Pincode: driver.Pincode || '',
    Country: driver.Country || 'India',

    LicenseNumber: driver.LicenseNumber,
    LicenseType: driver.LicenseType || '', // ⚠️ match backend spelling
    LicenseIssueDate: formatDateForAPI(driver.LicenseIssueDate),
    LicenseExpiryDate: formatDateForAPI(driver.LicenseExpiryDate),
    LicenseIssuedBy: driver.LicenseIssuedBy || '',

    ExperienceYears: driver.ExperienceYears || 0,
    VehicleTypeAllowed: driver.VehicleTypeAllowed || '',

    IsVerified: driver.IsVerified ?? false,
    JoinDate: formatDateForAPI(driver.JoinDate),

    Salary: driver.Salary || 0,
    PaymentType: driver.PaymentType,

    AadhaarNo: driver.AadhaarNo || '',
    PanNo: driver.PanNo || '',

    IsActive: true,
    IsAvailable: driver.IsAvailable ?? true,

    DriverImagePath: driver.image || 'N/A'
  };
};

// Driver-related API calls
export interface GetDriversParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean | null;
  isAvailable?: boolean | null;
}

export const getDrivers = async (params: GetDriversParams = {}) => {
  const query: Record<string, any> = {
    pageNumber: params.pageNumber ?? 1,
    pageSize: params.pageSize ?? 10,
  };
  if (params.search) query.search = params.search;
  if (params.isActive !== null && params.isActive !== undefined) query.isActive = params.isActive;
  if (params.isAvailable !== null && params.isAvailable !== undefined) query.isAvailable = params.isAvailable;

  const res = await api.get('/api/Driver/GetAllDriver', { params: query });
  return res.data;
};

export const getDriver = async (id: number) => {
  const res = await api.get(`/api/Driver/GetDriverById/${id}`);
  return res.data;
};


// export const createDriver = async (data: any) => {
//   const apiPayload = transformDriverForAPI(data);

//   console.log("FINAL PAYLOAD 👉", JSON.stringify(apiPayload, null, 2));

//   try {
//     const res = await api.post('/api/Driver/AddDriver', apiPayload);
//     return res.data;
//   } catch (error: any) {
//     console.error("❌ ERROR RESPONSE:", error.response?.data);
//     throw error;
//   }
// };
export const createDriver = async (data: any, file: File | null) => {
  const payload = transformDriverForAPI(data);
  const formData = new FormData();

  Object.keys(payload).forEach(key => {
    formData.append(key, payload[key] !== null && payload[key] !== undefined ? String(payload[key]) : '');
  });

  if (file) {
    formData.append("DriverImage", file);
  }

  try {
    const res = await api.post('/api/Driver/AddDriver', formData);
    return res.data;
  } catch (error: any) {
    console.error("❌ ERROR:", error.response?.data);
    throw error;
  }
};


// export const updateDriver = async (id: number, data: any) => {
//   const apiPayload = {
//     ...transformDriverForAPI(data),
//     Driver_Id: id
//   };

//   console.log("👉 FINAL UPDATE PAYLOAD:", apiPayload);

//   try {
//     // ❗ REMOVE ID FROM URL
//     const res = await api.put(`/api/Driver/UpdateDriver`, apiPayload);
//     return res.data;
//   } catch (error: any) {
//     console.error("❌ ERROR:", error.response?.data);
//     throw error;
//   }
// };
export const updateDriver = async (id: number, data: any, file: File | null) => {
  const payload = transformDriverForAPI(data);
  const formData = new FormData();

  Object.keys(payload).forEach(key => {
    formData.append(key, payload[key] !== null && payload[key] !== undefined ? String(payload[key]) : '');
  });

  formData.append("Driver_Id", id.toString());

  if (file) {
    formData.append("DriverImage", file);
  }

  try {
    const res = await api.put('/api/Driver/UpdateDriver', formData);
    return res.data;
  } catch (error: any) {
    console.error("❌ ERROR:", error.response?.data);
    throw error;
  }
};

export const deleteDriver = async (id: number) => {
  const res = await api.delete(`/api/Driver/DeleteDriver/${id}`);
  return res.data;
};

export const getDriverAttendance = async (driverId: number) => {
  const res = await api.get(`/api/Driver/${driverId}/attendance`);
  return res.data;
};
