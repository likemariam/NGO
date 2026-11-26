# NGO Document Management System (NGO_DMS)

A full-stack web application for managing NGO documents, learning materials, attendance, and projects.

## Stack

| Layer    | Technology               |
|----------|--------------------------|
| Frontend | React 18 + Vite          |
| Backend  | Spring Boot 3 (Java 17)  |
| Database | PostgreSQL               |
| Auth     | JWT                      |

## Project Structure

- `frontend/` — React SPA
- `backend/`  — Spring Boot REST API
- `database/` — SQL scripts and ERD
- `docs/`     — Project documentation

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

## Roles

- Admin, Manager, Teacher, Field Worker, Regular User, Funder
