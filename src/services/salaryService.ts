import api from './api';

// Salary/Payroll-related API calls
export const getSalaryRecords = async (filter?: any) => {
  const res = await api.get('/api/Salary', { params: filter });
  return res.data;
};

export const getDriverSalary = async (driverId: number, month?: number, year?: number) => {
  const res = await api.get(`/api/Salary/driver/${driverId}`, { params: { month, year } });
  return res.data;
};

export const calculateSalary = async (driverId: number, data: any) => {
  const res = await api.post(`/api/Salary/calculate`, { driverId, ...data });
  return res.data;
};

export const processSalary = async (data: any[]) => {
  const res = await api.post('/api/Salary/process', data);
  return res.data;
};

export const processBulkPayment = async (salaryIds: number[]) => {
  const res = await api.patch('/api/Salary/payment', { ids: salaryIds });
  return res.data;
};

export const generatePayslip = async (salaryId: number) => {
  const res = await api.get(`/api/Salary/${salaryId}/payslip`);
  return res.data;
};
