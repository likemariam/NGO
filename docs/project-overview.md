# NGO Document Management System — Project Overview

## 1. Purpose

The NGO Document Management System (NGO DMS) is a centralized web platform for non-governmental organizations to manage learning materials, staff attendance, projects, and funding in one place.

## 2. Problem Statement

NGOs typically manage training content, field worker activity, and donor funding through disconnected spreadsheets and paper records. This leads to lost materials, unverified attendance, and poor reporting to funders.

## 3. Solution

A role-based web application providing:

- **Learning Management System (LMS)** — upload and consume PDFs, videos, questionnaires, and quizzes
- **Attendance tracking** — field worker check-in/check-out with location
- **Project & funding management** — track projects, activities, and donor contributions
- **User & role management** — six clearly defined roles with permission control

## 4. Users & Roles

| Role | Capabilities |
|---|---|
| ADMIN | Full system access, user management, role assignment |
| MANAGER | View all attendance, generate reports, manage materials |
| TEACHER | Upload materials, create quizzes & questionnaires |
| FIELD_WORKER | Check in/out, view assigned activities and materials |
| REGULAR_USER | Access learning materials, take quizzes |
| FUNDER | View funded projects and funding history |

## 5. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Spring Boot 3 (Java 17), Spring Security, JPA |
| Database | PostgreSQL |
| Auth | JWT (stateless) |
| CI | GitHub Actions |

## 6. Repository Layout

```
NGO_DMS/
├── docs/        # This documentation
├── frontend/    # React SPA
├── backend/     # Spring Boot API
└── database/    # SQL schema, seed data, ERD
```

## 7. Core Modules

1. **Auth** — register, login, JWT token issue/refresh
2. **LMS** — materials, videos, questionnaires, quizzes, results
3. **Attendance** — check-in, check-out, history, reports
4. **Project** — projects, activities, fundings
5. **User** — CRUD, profile, roles, enable/disable
