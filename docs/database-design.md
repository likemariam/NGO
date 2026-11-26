# NGO DMS — Database Design

Database: **PostgreSQL**

---

## Tables

### users
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| first_name | VARCHAR(100) NOT NULL | |
| last_name | VARCHAR(100) NOT NULL | |
| email | VARCHAR(255) UNIQUE NOT NULL | Used as username |
| password | VARCHAR(255) NOT NULL | BCrypt hashed |
| role | VARCHAR(50) NOT NULL | Enum: ADMIN/MANAGER/TEACHER/FIELD_WORKER/REGULAR_USER/FUNDER |
| phone | VARCHAR(20) | |
| avatar_url | VARCHAR(500) | |
| enabled | BOOLEAN DEFAULT TRUE | |
| created_at | TIMESTAMP NOT NULL | |
| updated_at | TIMESTAMP | |

### materials
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| title | VARCHAR(255) NOT NULL | |
| description | TEXT | |
| file_path | VARCHAR(500) NOT NULL | Stored filename (UUID-based) |
| file_type | VARCHAR(50) NOT NULL | PDF/VIDEO/DOCUMENT |
| file_size | BIGINT | Bytes |
| uploaded_by | BIGINT FK → users | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### videos
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| title | VARCHAR(255) NOT NULL | |
| description | TEXT | |
| url | VARCHAR(500) NOT NULL | YouTube or direct URL |
| uploaded_by | BIGINT FK → users | |
| created_at | TIMESTAMP | |

### questionnaires
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| title | VARCHAR(255) NOT NULL | |
| description | TEXT | |
| created_by | BIGINT FK → users | |
| created_at | TIMESTAMP | |

### questions
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| questionnaire_id | BIGINT FK → questionnaires CASCADE | |
| question_text | TEXT NOT NULL | |
| type | VARCHAR(30) NOT NULL | TEXT/RATING/BOOLEAN/MULTIPLE_CHOICE |
| options | TEXT | Comma-separated for MULTIPLE_CHOICE |
| question_order | INT NOT NULL | |

### quizzes
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| title | VARCHAR(255) NOT NULL | |
| description | TEXT | |
| created_by | BIGINT FK → users | |
| created_at | TIMESTAMP | |

### quiz_questions
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| quiz_id | BIGINT FK → quizzes CASCADE | |
| question | TEXT NOT NULL | |
| question_order | INT NOT NULL | |

### quiz_options
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| quiz_question_id | BIGINT FK → quiz_questions CASCADE | |
| option_text | TEXT NOT NULL | |
| is_correct | BOOLEAN DEFAULT FALSE | Exactly one TRUE per question |

### quiz_results
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| quiz_id | BIGINT FK → quizzes | |
| user_id | BIGINT FK → users | |
| score | INT NOT NULL | Correct answers count |
| total_questions | INT NOT NULL | |
| submitted_at | TIMESTAMP NOT NULL | |

### attendance
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| user_id | BIGINT FK → users | |
| check_in_time | TIMESTAMP NOT NULL | |
| check_out_time | TIMESTAMP | NULL = still checked in |
| location | VARCHAR(255) | |
| notes | TEXT | |
| created_at | TIMESTAMP | |

### projects
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| name | VARCHAR(255) NOT NULL | |
| description | TEXT | |
| start_date | DATE | |
| end_date | DATE | |
| status | VARCHAR(50) | ACTIVE/COMPLETED/PENDING/CANCELLED |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### fundings
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| project_id | BIGINT FK → projects | |
| funder_id | BIGINT FK → users | |
| amount | NUMERIC(15,2) NOT NULL | |
| funding_date | DATE | |
| notes | TEXT | |
| created_at | TIMESTAMP | |

### activities
| Column | Type | Notes |
|---|---|---|
| id | BIGSERIAL PK | |
| project_id | BIGINT FK → projects | |
| field_worker_id | BIGINT FK → users | |
| title | VARCHAR(255) NOT NULL | |
| description | TEXT | |
| activity_date | DATE | |
| created_at | TIMESTAMP | |

---

## Entity Relationships

```
users ──< materials        (uploaded_by)
users ──< videos           (uploaded_by)
users ──< questionnaires   (created_by)
users ──< quizzes          (created_by)
users ──< quiz_results     (user_id)
users ──< attendance       (user_id)
users ──< fundings         (funder_id)
users ──< activities       (field_worker_id)

questionnaires ──< questions
quizzes ──< quiz_questions ──< quiz_options
quizzes ──< quiz_results

projects ──< fundings
projects ──< activities
```
