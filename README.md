# World Bank Group — Loan Management System

A full-stack loan management web application built with **Laravel 11** (backend API) and **React + Tailwind CSS** (frontend).

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Laravel 11, Sanctum (JWT), SQLite   |
| Frontend | React 18, Vite, Tailwind CSS v4     |
| Charts   | Recharts                            |
| HTTP     | Axios                               |

---

## Features

### User
- Register / Login with phone number
- Browse loan plans
- Apply for loans with document upload
- Track loan application status
- Submit repayments (bKash, Nagad, Bank)
- Notifications center
- Profile management

### Admin
- Dashboard with stats & charts
- Approve / Reject / Disburse loans
- Manage users (activate, ban, delete)
- Manage loan plans (CRUD)
- Confirm repayments

---

## Getting Started

### Backend (Laravel)

```bash
cd backend
cp .env.example .env       # already configured with SQLite
php artisan key:generate
php artisan migrate --seed  # creates admin + loan plans
php artisan serve           # runs on http://localhost:8000
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev                 # runs on http://localhost:5173
```

---

## Default Admin Login

| Field    | Value                        |
|----------|------------------------------|
| Phone    | 01700000000                  |
| Password | admin123                     |

---

## Project Structure

```
World Bank Group/
├── backend/               # Laravel 11 API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   ├── LoanPlanController.php
│   │   │   ├── LoanApplicationController.php
│   │   │   ├── RepaymentController.php
│   │   │   ├── NotificationController.php
│   │   │   └── Admin/
│   │   │       ├── DashboardController.php
│   │   │       ├── LoanManageController.php
│   │   │       └── UserController.php
│   │   └── Models/
│   └── routes/api.php
│
└── frontend/              # React + Vite + Tailwind
    └── src/
        ├── api/axios.js
        ├── context/AuthContext.jsx
        ├── layouts/
        │   ├── DashboardLayout.jsx
        │   └── AdminLayout.jsx
        └── pages/
            ├── Home.jsx
            ├── LoanPlans.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── dashboard/
            │   ├── Overview.jsx
            │   ├── ApplyLoan.jsx
            │   ├── MyLoans.jsx
            │   ├── Repayments.jsx
            │   ├── Notifications.jsx
            │   └── Profile.jsx
            └── admin/
                ├── AdminDashboard.jsx
                ├── AdminApplications.jsx
                ├── AdminUsers.jsx
                ├── AdminRepayments.jsx
                └── AdminLoanPlans.jsx
```
