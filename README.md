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
├── backend/
│   ├── API (ASP.NET Core)
│   ├── Controllers
│   ├── Services
│   ├── Repository Layer
│   └── Database Scripts
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── hooks/
│
└── docs/
    ├── ER Diagram
    ├── API Docs
    └── Architecture
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
