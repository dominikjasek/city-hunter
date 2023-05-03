ALTER TABLE `answers` MODIFY COLUMN `answered_at` timestamp NOT NULL;
ALTER TABLE `questions` MODIFY COLUMN `start_date` timestamp;
ALTER TABLE `questions` MODIFY COLUMN `end_date` timestamp;