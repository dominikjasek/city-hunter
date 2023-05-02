ALTER TABLE answers ADD `answered_at` datetime;
ALTER TABLE answers DROP COLUMN `created_at`;
ALTER TABLE answers DROP COLUMN `updated_at`;