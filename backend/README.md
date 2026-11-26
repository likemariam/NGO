# NGO DMS — Backend

Spring Boot 3 REST API with JWT authentication.

## Stack

| Tool | Purpose |
|---|---|
| Spring Boot 3.3 | Framework |
| Spring Security | Auth & authorization |
| Spring Data JPA | ORM |
| PostgreSQL | Database |
| jjwt 0.12 | JWT tokens |
| Lombok | Boilerplate reduction |
| Maven | Build tool |

## Package Structure

```
com.ngodms/
├── NgoDmsApplication.java
├── config/           # Security, CORS, Web, JWT, FileStorage
├── common/
│   ├── exception/    # GlobalExceptionHandler, ResourceNotFoundException, BadRequestException
│   ├── response/     # ApiResponse<T>, ErrorResponse
│   └── util/         # DateUtils
├── auth/             # AuthController, AuthService, JwtService, JwtFilter, UserDetailsServiceImpl
├── user/             # UserController, UserService, UserRepository, User, Role, Permission
├── lms/              # Material, Video, Quiz, Questionnaire controllers/services/repos
├── attendance/       # AttendanceController, AttendanceService, AttendanceRepository
└── project/          # ProjectController, ProjectService, repos for Project/Funding/Activity
```

## Getting Started

### Prerequisites

- Java 17+
- Maven 3.9+
- PostgreSQL 14+

### Setup

1. Create the database:
   ```sql
   CREATE DATABASE ngo_dms_dev;
   ```

2. Update credentials in `src/main/resources/application-dev.properties`:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   ```

3. Run:
   ```bash
   ./mvnw spring-boot:run
   ```

The API will be available at `http://localhost:8080`.

## API Endpoints

| Method | Path | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Login | Public |
| POST | `/api/auth/register` | Register | Public |
| GET | `/api/users` | List users | ADMIN |
| POST | `/api/users` | Create user | ADMIN |
| GET | `/api/profile` | My profile | Any |
| PUT | `/api/profile` | Update profile | Any |
| GET | `/api/materials` | List materials | Any |
| POST | `/api/materials` | Upload material | ADMIN/TEACHER/MANAGER |
| GET | `/api/quizzes` | List quizzes | Any |
| POST | `/api/quizzes` | Create quiz | ADMIN/TEACHER |
| POST | `/api/quizzes/{id}/submit` | Submit quiz | Any |
| GET | `/api/attendance/my-history` | My attendance | Any |
| POST | `/api/attendance/check-in` | Check in | Any |
| POST | `/api/attendance/check-out` | Check out | Any |
| GET | `/api/attendance` | All attendance | ADMIN/MANAGER |
| GET | `/api/attendance/reports` | Reports | ADMIN/MANAGER |
| GET | `/api/projects` | List projects | Any |

## Running Tests

```bash
./mvnw test
```
