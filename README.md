# 🦍 King Kong GoDrive

**King Kong GoDrive** is a powerful fleet management and driver tracking system designed to manage vehicles, drivers, trips, and operations efficiently.

It provides real-time monitoring, driver attendance, trip tracking, and analytics to help organizations optimize transportation and logistics.

---

## 🚀 Features

### 👨‍✈️ Driver Management

* Add, update, and manage driver profiles
* License tracking & expiry alerts
* Driver attendance system
* Driver performance monitoring

### 🚗 Vehicle Management

* Vehicle registration & details
* Maintenance tracking
* Fuel tracking (optional)
* Vehicle availability status

### 🧭 Trip Management

* Trip creation & dispatch system
* Origin → Destination tracking
* Departure & arrival time logging
* Distance & travel time calculation

### 📍 Live Tracking (Future Scope)

* Real-time vehicle location tracking
* Route history & playback
* Geo-fencing alerts

### 💰 Payroll & Salary

* Driver salary management
* Attendance-based salary calculation
* Bonus & deduction handling

### 📊 Dashboard & Reports

* Total trips, distance, and time analytics
* Driver performance reports
* Vehicle usage insights

---

## 🏗️ Tech Stack

### Backend

* ASP.NET Core Web API
* ADO.NET / SQL Server
* RESTful Architecture

### Frontend

* React.js (Vite)
* TypeScript
* Tailwind CSS / Bootstrap

### Database

* SQL Server (Relational DB Design)

---

## 🗄️ Database Modules

* Users & Authentication
* Drivers
* Vehicles
* Trip Dispatch
* Driver Attendance
* Salary / Payroll
* Reports & Logs

---

## 📂 Project Structure

```
king-kong-godrive/
│
├── public/                          # Static assets
├── src/                             # Frontend application source
│
│   ├── api/                         # API configuration
│   │   └── axios.ts                 # Axios instance with interceptors
│
│   ├── services/                    # Feature-based API service layer
│   │   ├── api.ts                   # Base API config
│   │   ├── authService.ts           # Authentication API calls
│   │   ├── driverService.ts         # Driver CRUD & operations
│   │   ├── vehicleService.ts        # Vehicle CRUD & operations
│   │   ├── tripService.ts           # Trip/Dispatch operations
│   │   ├── attendanceService.ts     # Attendance tracking
│   │   └── salaryService.ts         # Payroll operations
│
│   ├── pages/                       # Feature-organized page components
│   │   ├── Auth/
│   │   │   └── Login.tsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── Driver/
│   │   │   ├── DriverList.tsx       # Driver directory/listing
│   │   │   ├── DriverProfile.tsx    # Single driver details
│   │   │   └── AddDriver.tsx        # Add/edit driver form
│   │   ├── Vehicle/
│   │   │   ├── VehicleList.tsx      # Vehicle directory
│   │   │   └── AddVehicle.tsx       # Add/edit vehicle
│   │   ├── Trip/
│   │   │   ├── TripDispatch.tsx     # Dispatch & trip management
│   │   │   └── LiveTracking.tsx     # Live vehicle tracking map
│   │   ├── Attendance/
│   │   │   ├── AttendanceLog.tsx    # Attendance view
│   │   │   └── BulkAttendanceUpdate.tsx  # Bulk update tool
│   │   ├── Salary/
│   │   │   └── SalaryPayout.tsx     # Payroll & salary processing
│   │   └── Reports/
│   │       └── Reports.tsx          # Analytics & reports
│
│   ├── components/                  # Reusable UI components
│   │   ├── layout/
│   │   │   └── Layout.tsx           # App shell, nav, sidebar
│   │   ├── Toast.tsx                # Toast notifications
│   │   └── ...other reusable components
│
│   ├── routes/
│   │   └── AppRoutes.tsx            # Route definitions
│
│   ├── hooks/                       # Custom React hooks
│   │   ├── useForm.ts               # Form state management
│   │   ├── useLogin.ts              # Login logic
│   │   ├── useTable.ts              # Table sorting/filtering
│   │   ├── usePagination.ts         # Pagination logic
│   │   ├── useImageUpload.ts        # File upload handling
│   │   ├── useSearch.ts             # Search functionality
│   │   └── index.ts                 # Barrel export
│
│   ├── context/                     # React context providers
│   │   └── ToastContext.tsx         # Toast notification context
│
│   ├── lib/                         # Utility functions
│   │   └── utils.ts                 # Helper functions (cn, validation)
│
│   ├── auth/                        # Auth-related helpers
│   │   └── ProtectedRoute.tsx       # Route protection HOC
│
│   ├── types.ts                     # Shared TypeScript types/enums
│   ├── App.tsx                      # App entry component
│   └── main.tsx                     # React DOM bootstrap
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔐 Authentication & Security

* JWT-based authentication
* Role-based access control (Admin, Manager, Driver)
* Secure password hashing

---

## 📦 Installation

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Future Enhancements

* Mobile app (React Native / Flutter)
* GPS integration
* AI-based route optimization
* Automated alerts & notifications

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by Ankur Yadav
