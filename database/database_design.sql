-- NGO DMS Database Schema
-- PostgreSQL

CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(50)  NOT NULL,
    phone       VARCHAR(20),
    avatar_url  VARCHAR(500),
    enabled     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP
);

CREATE TABLE materials (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    file_path   VARCHAR(500) NOT NULL,
    file_type   VARCHAR(50)  NOT NULL,
    file_size   BIGINT,
    uploaded_by BIGINT REFERENCES users(id),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP
);

CREATE TABLE videos (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    url         VARCHAR(500) NOT NULL,
    uploaded_by BIGINT REFERENCES users(id),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE questionnaires (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    created_by  BIGINT REFERENCES users(id),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE questions (
    id                BIGSERIAL PRIMARY KEY,
    questionnaire_id  BIGINT REFERENCES questionnaires(id) ON DELETE CASCADE,
    question_text     TEXT NOT NULL,
    question_order    INT  NOT NULL
);

CREATE TABLE quizzes (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    created_by  BIGINT REFERENCES users(id),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE quiz_questions (
    id          BIGSERIAL PRIMARY KEY,
    quiz_id     BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
    question    TEXT NOT NULL,
    q_order     INT  NOT NULL
);

CREATE TABLE quiz_options (
    id              BIGSERIAL PRIMARY KEY,
    quiz_question_id BIGINT REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text     TEXT NOT NULL,
    is_correct      BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE quiz_results (
    id          BIGSERIAL PRIMARY KEY,
    quiz_id     BIGINT REFERENCES quizzes(id),
    user_id     BIGINT REFERENCES users(id),
    score       INT,
    submitted_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE attendance (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id),
    check_in_time   TIMESTAMP NOT NULL,
    check_out_time  TIMESTAMP,
    location        VARCHAR(255),
    notes           TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE projects (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    start_date  DATE,
    end_date    DATE,
    status      VARCHAR(50),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP
);

CREATE TABLE fundings (
    id           BIGSERIAL PRIMARY KEY,
    project_id   BIGINT REFERENCES projects(id),
    funder_id    BIGINT REFERENCES users(id),
    amount       NUMERIC(15, 2) NOT NULL,
    funding_date DATE,
    notes        TEXT,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE activities (
    id              BIGSERIAL PRIMARY KEY,
    project_id      BIGINT REFERENCES projects(id),
    field_worker_id BIGINT REFERENCES users(id),
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    activity_date   DATE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
