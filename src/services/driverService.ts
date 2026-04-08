import api from './api';

// Transform Driver object to API payload format
// Helper to format date for API (YYYY-MM-DD -> YYYY-MM-DDT00:00:00)
const formatDateForAPI = (dateStr: any) => {
  if (!dateStr || dateStr === '') return null;
  if (dateStr.includes('T')) return dateStr;
  return `${dateStr}T00:00:00`;
};

// Transform Driver object to API payload format
const transformDriverForAPI = (driver: any) => {
  return {
    FirstName: driver.FirstName,
    LastName: driver.LastName,
    Gender: driver.Gender,
    DateOfBirth: formatDateForAPI(driver.DateOfBirth),

    PhoneNo: driver.PhoneNo,
    AlternatePhoneNo: driver.AlternatePhoneNo || '',
    Email: driver.Email || '',

    AddressLine1: driver.AddressLine1 || '',
    AddressLine2: driver.AddressLine2 || '',
    City: driver.City || '',
    State: driver.State || '',
    Pincode: driver.Pincode || '',
    Country: driver.Country,

    LicenseNumber: driver.LicenseNumber,
    LicenseType: driver.LicenseType || '',
    LicenseIssueDate: formatDateForAPI(driver.LicenseIssueDate),
    LicenseExpiryDate: formatDateForAPI(driver.LicenseExpiryDate),
    LicenseIssuedBy: driver.LicenseIssuedBy || '',

    ExperienceYears: driver.ExperienceYears,
    VehicleTypeAllowed: driver.VehicleTypeAllowed || '',

    IsVerified: driver.IsVerified,
    JoinDate: formatDateForAPI(driver.JoinDate),

    Salary: driver.Salary || 0,
    PaymentType: driver.PaymentType,

    AadhaarNo: driver.AadhaarNo || '',
    PanNo: driver.PanNo || '',

    IsActive: true,
    IsAvailable: driver.IsAvailable,

    DriverImagePath: driver.image || ''
  };
};

// Driver-related API calls
export const getDrivers = async () => {
  const res = await api.get('/api/Driver/GetAllDriver');
  return res.data;
};

export const getDriver = async (id: number) => {
  const res = await api.get(`/api/Driver/GetDriver/${id}`);
  return res.data;
};

export const createDriver = async (data: any) => {
  const apiPayload = transformDriverForAPI(data);
  const res = await api.post('/api/Driver/AddDriver', apiPayload);
  return res.data;
};

export const updateDriver = async (id: number, data: any) => {
  const apiPayload = transformDriverForAPI(data);
  const res = await api.put(`/api/Driver/UpdateDriver/${id}`, apiPayload);
  return res.data;
};

export const deleteDriver = async (id: number) => {
  const res = await api.delete(`/api/Driver/DeleteDriver/${id}`);
  return res.data;
};

export const getDriverAttendance = async (driverId: number) => {
  const res = await api.get(`/api/Driver/${driverId}/attendance`);
  return res.data;
};
