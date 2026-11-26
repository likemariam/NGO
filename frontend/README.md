# NGO DMS — Frontend

React 18 + Vite single-page application.

## Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Vite | Build tool & dev server |
| react-toastify | Toast notifications |
| react-pdf | PDF viewer |
| react-player | Video player |

## Project Structure

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Routes
├── App.css           # App-level styles
├── index.css         # Global CSS imports
├── assets/           # Images and icons
├── components/
│   ├── common/       # Button, InputField, Table, Modal, Card ...
│   ├── layout/       # Navbar, Sidebar, Footer, ProtectedRoute
│   └── lms/          # MaterialCard, VideoPlayer, PdfViewer, QuizForm
├── context/          # AuthContext, UserContext
├── hooks/            # useAuth, useFetch, useAttendance
├── pages/
│   ├── Auth/         # Login, Register, ForgotPassword
│   ├── Dashboard/    # 6 role-based dashboards
│   ├── LMS/          # 11 LMS pages
│   ├── Attendance/   # 4 attendance pages
│   └── Profile/      # 8 profile/user-management pages
├── services/         # apiClient, authService, lmsService ...
├── styles/           # global.css, layout.css, lms.css ...
└── utils/            # constants, permissions, formatDate, validators
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Environment

The dev server proxies `/api/*` to `http://localhost:8080` via `vite.config.js`.  
No `.env` file is needed for local development.

## Roles & Routing

| Role | Dashboard |
|---|---|
| ADMIN | `/dashboard/admin` |
| MANAGER | `/dashboard/manager` |
| TEACHER | `/dashboard/teacher` |
| FIELD_WORKER | `/dashboard/field-worker` |
| REGULAR_USER | `/dashboard/user` |
| FUNDER | `/dashboard/funder` |
