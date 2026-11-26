# NGO DMS — Requirements

## Functional Requirements

### FR-1 Authentication
- FR-1.1 Users can register with email and password (min 8 chars)
- FR-1.2 Users can log in and receive a JWT token
- FR-1.3 Users can request a password reset link
- FR-1.4 Tokens expire after 24 hours
- FR-1.5 Passwords are stored BCrypt-hashed

### FR-2 Learning Materials
- FR-2.1 Admin/Teacher/Manager can upload PDF, DOC, PPT, XLS, TXT, PNG, JPG, MP4 files (max 50MB)
- FR-2.2 Any authenticated user can browse and download materials
- FR-2.3 Uploaders can edit metadata and delete materials
- FR-2.4 Materials list shows type, size, uploader, and date

### FR-3 Videos
- FR-3.1 Teachers can add video links (YouTube or direct URL)
- FR-3.2 Users can watch videos in an embedded player

### FR-4 Questionnaires
- FR-4.1 Teachers can create questionnaires with 4 question types: TEXT, RATING, BOOLEAN, MULTIPLE_CHOICE
- FR-4.2 Users can fill out questionnaires

### FR-5 Quizzes
- FR-5.1 Teachers can create quizzes with multiple-choice questions
- FR-5.2 Each question must have exactly one correct option (enforced server-side)
- FR-5.3 Users can take quizzes; score is auto-calculated
- FR-5.4 Teachers/Managers can view all results for a quiz

### FR-6 Attendance
- FR-6.1 Users can check in with optional location and notes
- FR-6.2 Users can check out; system computes session duration
- FR-6.3 A user cannot check in twice without checking out first (enforced)
- FR-6.4 Users can view their own attendance history
- FR-6.5 Admin/Manager can view all users' attendance
- FR-6.6 Admin/Manager can generate reports by date range (full days, partial days, average hours)

### FR-7 Users & Roles
- FR-7.1 Admin can create, edit, disable, and delete users
- FR-7.2 Admin cannot delete their own account (enforced)
- FR-7.3 Users can update their own profile
- FR-7.4 Six roles: ADMIN, MANAGER, TEACHER, FIELD_WORKER, REGULAR_USER, FUNDER

### FR-8 Projects & Funding
- FR-8.1 Any user can view the project list
- FR-8.2 Funders can view their own funding history
- FR-8.3 Admin/Manager can view funding for a project

## Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | API responses under 500ms for standard queries |
| NFR-2 | Passwords and JWT secrets never logged |
| NFR-3 | Production config via environment variables only |
| NFR-4 | File uploads restricted to allowed extensions and 50MB |
| NFR-5 | Frontend responsive down to 360px width |
| NFR-6 | All API errors return consistent JSON shape `{success, message, data}` |
| NFR-7 | Role checks enforced server-side (Spring Security `@PreAuthorize`) |
