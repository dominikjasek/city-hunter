ALTER TABLE cities ADD `created_at` timestamp DEFAULT (now()) NOT NULL;
ALTER TABLE questions ADD `created_at` timestamp DEFAULT (now()) NOT NULL;
ALTER TABLE users DROP COLUMN `updated_at`;