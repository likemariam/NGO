# NGO DMS — API Design

Base URL: `http://localhost:8080/api`

All responses follow this envelope:
```json
{ "success": true, "message": "...", "data": { ... } }
```

Errors:
```json
{ "status": 400, "error": "Bad Request", "message": "...", "timestamp": "...", "details": [] }
```

---

## Auth

### POST /auth/login
**Body**
```json
{ "email": "admin@ngodms.com", "password": "Admin@1234" }
```
**Response**
```json
{
  "token": "eyJ...",
  "type": "Bearer",
  "userId": 1,
  "email": "admin@ngodms.com",
  "firstName": "System",
  "lastName": "Admin",
  "role": "ADMIN"
}
```

### POST /auth/register
**Body**
```json
{
  "firstName": "John", "lastName": "Doe",
  "email": "john@example.com", "password": "Secret@123",
  "role": "REGULAR_USER", "phone": "0911000000"
}
```

---

## Users

| Method | Path | Role |
|---|---|---|
| GET | `/users` | ADMIN |
| GET | `/users/{id}` | ADMIN, MANAGER |
| POST | `/users` | ADMIN |
| PUT | `/users/{id}` | ADMIN |
| PATCH | `/users/{id}/status?enabled=false` | ADMIN |
| DELETE | `/users/{id}` | ADMIN |
| GET | `/profile` | Any |
| PUT | `/profile` | Any |
| GET | `/roles` | ADMIN |

---

## Materials

| Method | Path | Role |
|---|---|---|
| GET | `/materials` | Any |
| GET | `/materials?type=PDF` | Any |
| GET | `/materials/{id}` | Any |
| GET | `/materials/{id}/download` | Any |
| POST | `/materials` (multipart) | ADMIN/TEACHER/MANAGER |
| PUT | `/materials/{id}` | ADMIN/TEACHER/MANAGER |
| DELETE | `/materials/{id}` | ADMIN/TEACHER/MANAGER |

**Upload form-data fields:** `meta` (JSON blob), `file` (binary)

---

## Videos

| Method | Path | Role |
|---|---|---|
| GET | `/videos` | Any |
| GET | `/videos/{id}` | Any |
| POST | `/videos` | ADMIN/TEACHER/MANAGER |
| DELETE | `/videos/{id}` | ADMIN/TEACHER/MANAGER |

---

## Questionnaires

| Method | Path | Role |
|---|---|---|
| GET | `/questionnaires` | Any |
| GET | `/questionnaires/{id}` | Any |
| POST | `/questionnaires` | ADMIN/TEACHER/MANAGER |
| DELETE | `/questionnaires/{id}` | ADMIN/TEACHER/MANAGER |

---

## Quizzes

| Method | Path | Role |
|---|---|---|
| GET | `/quizzes` | Any |
| GET | `/quizzes/{id}` | Any |
| POST | `/quizzes` | ADMIN/TEACHER |
| POST | `/quizzes/{id}/submit` | Any |
| GET | `/quizzes/{id}/results` | ADMIN/TEACHER/MANAGER |
| DELETE | `/quizzes/{id}` | ADMIN/TEACHER |

**Submit body:**
```json
{ "userId": 3, "answers": { "1": 4, "2": 7 } }
```
(Map of quizQuestionId → quizOptionId)

---

## Attendance

| Method | Path | Role |
|---|---|---|
| POST | `/attendance/check-in` | Any |
| POST | `/attendance/check-out` | Any |
| GET | `/attendance/my-history` | Any |
| GET | `/attendance` | ADMIN/MANAGER |
| GET | `/attendance/user/{userId}` | ADMIN/MANAGER |
| GET | `/attendance/reports?from=2026-01-01&to=2026-01-31` | ADMIN/MANAGER |

---

## Projects

| Method | Path | Role |
|---|---|---|
| GET | `/projects` | Any |
| GET | `/projects/{id}` | Any |
| GET | `/projects/{id}/fundings` | ADMIN/MANAGER/FUNDER |
| GET | `/projects/my-fundings` | FUNDER |
