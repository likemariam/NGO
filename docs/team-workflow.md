# NGO DMS — Team Workflow

## Branching Strategy (Git Flow)

```
main          ← production-ready code only
develop       ← integration branch
feature/xxx   ← individual features
bugfix/xxx    ← bug fixes
hotfix/xxx    ← urgent production fixes
```

### Rules
- Never commit directly to `main` or `develop`
- Create a PR for every feature or fix
- At least one reviewer must approve before merging
- Delete feature branches after merge

---

## Naming Conventions

### Branches
```
feature/lms-quiz-creator
feature/attendance-reports
bugfix/jwt-expiry-not-refreshing
hotfix/material-upload-500
```

### Commits (Conventional Commits)
```
feat(lms): add quiz creation endpoint
fix(auth): handle expired token gracefully
refactor(attendance): extract report logic to service
docs(api): update quiz endpoint docs
test(user): add UserServiceTest for create
```

---

## Pull Request Checklist

Before opening a PR:
- [ ] All existing tests pass (`./mvnw test` or `npm run build`)
- [ ] New feature has at least one unit test
- [ ] No secrets or `.env` files committed
- [ ] API changes reflected in `docs/api-design.md`
- [ ] DB schema changes reflected in `database/database_design.sql`

PR title format: `[Module] Short description` — max 70 chars  
Example: `[LMS] Add quiz submission scoring`

---

## Local Development Setup

### Backend
```bash
# 1. Create PostgreSQL database
createdb ngo_dms_dev

# 2. Set credentials in application-dev.properties
# 3. Run
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev    # Vite dev server: http://localhost:5173
```

Both must run simultaneously. Vite proxies `/api/*` → `http://localhost:8080`.

---

## CI/CD Pipeline (GitHub Actions)

File: `.github/workflows/ci.yml`

Triggers on push and PR to `main` and `develop`:

1. **Frontend job** — `npm ci && npm run build`
2. **Backend job** — `./mvnw -B package` (includes tests)

Both jobs must pass before a PR can be merged.

---

## Code Style

### Java (Backend)
- Lombok for all DTOs and entities
- Service methods are `@Transactional` where they write to DB
- Controllers return `ResponseEntity<ApiResponse<T>>`
- Security enforced via `@PreAuthorize` — not in business logic

### JavaScript (Frontend)
- Functional components only
- Custom hooks for all API calls
- `apiClient.js` is the single Axios instance
- Never call `localStorage` directly outside `AuthContext`
