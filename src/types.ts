export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum PaymentType {
  Monthly = 'Monthly',
  Daily = 'Daily',
  Trip = 'Trip'
}

export enum OwnershipType {
  Company = 'Company',
  Rental = 'Rental',
  Self = 'Self'
}

export enum FuelType {
  Petrol = 'Petrol',
  Diesel = 'Diesel',
  CNG = 'CNG',
  Electric = 'Electric',
  Cn = 'Cn'
}

export enum TripStatus {
  Scheduled = 'Scheduled',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Leave = 'Leave',
  HalfDay = 'HalfDay'
}

export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Failed = 'Failed'
}

export interface Driver {
  Driver_Id?: number;
  FirstName: string;
  LastName: string;
  FullName?: string;
  Gender: Gender;
  DateOfBirth: string;
  Age?: number;
  PhoneNo: string;
  AlternatePhoneNo?: string;
  Email?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  State?: string;
  Pincode?: string;
  Country: string;
  LicenseNumber: string;
  LicenseType?: string;
  LicenseIssueDate?: string;
  LicenseExpiryDate: string;
  LicenseIssuedBy?: string;
  ExperienceYears: number;
  VehicleTypeAllowed?: string;
  IsVerified: boolean;
  JoinDate: string;
  Salary?: number;
  PaymentType: PaymentType;
  AadhaarNo?: string;
  PANNo?: string;
  IsAvailable: boolean;
  LastActiveTime?: string;
  CreatedAt?: string;
  CreatedBy?: string;
  UpdatedAt?: string;
  UpdatedBy?: string;
  image?: string;
}

export interface Vehicle {
  Vehicle_Id?: number;
  VehicleNumber: string;
  VehicleType: string;
  Brand?: string;
  Model?: string;
  Color?: string;
  ManufacturingYear?: number;
  ChassisNumber?: string;
  EngineNumber?: string;
  OwnerName?: string;
  OwnershipType?: OwnershipType;
  FuelType?: FuelType;
  FuelCapacity?: number;
  Mileage?: number;
  SeatingCapacity?: number;
  InsuranceProvider?: string;
  InsurancePolicyNumber?: string;
  InsuranceExpiryDate?: string;
  FitnessExpiryDate?: string;
  PermitNumber?: string;
  PermitExpiryDate?: string;
  PollutionExpiryDate?: string;
  CurrentLocation?: string;
  TotalDistanceTravelled: number;
  IsAvailable: boolean;
  CreatedAt?: string;
}

export interface TripDispatch {
  Trip_Id?: number;
  Vehicle_Id: number;
  Driver_Id: number;
  Origin: string;
  Destination: string;
  DepartureDate: string;
  DepartureTime: string;
  ExpectedArrivalDate?: string;
  ExpectedArrivalTime?: string;
  ActualDepartureTime?: string;
  ActualArrivalTime?: string;
  DistanceKM?: number;
  TripStatus: TripStatus;
  Remarks?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface DriverAttendance {
  Attendance_Id?: number;
  Driver_Id: number;
  AttendanceDate: string;
  Status: AttendanceStatus;
  CheckInTime?: string;
  CheckOutTime?: string;
  TotalWorkingHours?: number;
  OvertimeHours?: number;
  CheckInLocation?: string;
  CheckOutLocation?: string;
  Remarks?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface DriverPayroll {
  Payroll_Id?: number;
  Driver_Id: number;
  SalaryMonth: number;
  SalaryYear: number;
  TotalDays?: number;
  PresentDays?: number;
  AbsentDays?: number;
  LeaveDays?: number;
  BasicSalary: number;
  PerDaySalary?: number;
  OvertimeAmount?: number;
  Bonus?: number;
  Allowances?: number;
  Penalty?: number;
  AdvanceDeduction?: number;
  GrossSalary?: number;
  NetSalary?: number;
  PaymentDate?: string;
  PaymentMode?: string;
  PaymentStatus: PaymentStatus;
  Remarks?: string;
  CreatedAt?: string;
}
