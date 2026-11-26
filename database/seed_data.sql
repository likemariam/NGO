-- Seed Data for NGO DMS Dev Environment
-- Run after database_design.sql

-- Admin user (password: Admin@1234)
INSERT INTO users (first_name, last_name, email, password, role, enabled, created_at)
VALUES ('System', 'Admin', 'admin@ngodms.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lMm', 'ADMIN', true, NOW());

-- Manager
INSERT INTO users (first_name, last_name, email, password, role, enabled, created_at)
VALUES ('Jane', 'Manager', 'manager@ngodms.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lMm', 'MANAGER', true, NOW());

-- Teacher
INSERT INTO users (first_name, last_name, email, password, role, enabled, created_at)
VALUES ('John', 'Teacher', 'teacher@ngodms.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lMm', 'TEACHER', true, NOW());

-- Field Worker
INSERT INTO users (first_name, last_name, email, password, role, enabled, created_at)
VALUES ('Field', 'Worker', 'fieldworker@ngodms.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lMm', 'FIELD_WORKER', true, NOW());

-- Funder
INSERT INTO users (first_name, last_name, email, password, role, enabled, created_at)
VALUES ('Fund', 'Donor', 'funder@ngodms.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lMm', 'FUNDER', true, NOW());

-- Sample project
INSERT INTO projects (name, description, start_date, end_date, status, created_at)
VALUES ('Community Health Initiative', 'Health awareness in rural areas', '2026-01-01', '2026-12-31', 'ACTIVE', NOW());

-- Sample funding
INSERT INTO fundings (project_id, funder_id, amount, funding_date, notes, created_at)
VALUES (1, 5, 50000.00, '2026-01-15', 'Initial grant', NOW());

-- Note: password hash above = 'Admin@1234' using BCrypt strength 10
