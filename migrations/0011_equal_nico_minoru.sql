CREATE TABLE `tournaments` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(100) NOT NULL,
	`city_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()));
