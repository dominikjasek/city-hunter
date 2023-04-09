ALTER TABLE users MODIFY COLUMN `id` varchar(100) NOT NULL;
ALTER TABLE users ADD `nick_name` varchar(40) NOT NULL;
ALTER TABLE users ADD `created_at` timestamp DEFAULT (now()) NOT NULL;
ALTER TABLE users ADD `updated_at` timestamp DEFAULT (now()) NOT NULL;