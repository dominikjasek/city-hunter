ALTER TABLE `questions` MODIFY COLUMN `tournament_id` varchar(100);
ALTER TABLE `tournaments` MODIFY COLUMN `id` varchar(100) NOT NULL;