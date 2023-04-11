CREATE TABLE `answers` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`location` json NOT NULL,
	`score` int NOT NULL,
	`question_id` int NOT NULL,
	`user_id` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()));

CREATE TABLE `cities` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(50) NOT NULL);

CREATE TABLE `games` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(100) NOT NULL,
	`city_id` int NOT NULL);

CREATE TABLE `questions` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(100) NOT NULL,
	`question_description` text NOT NULL,
	`answer_description` text NOT NULL,
	`image` varchar(100) NOT NULL,
	`city_id` int,
	`start_date` datetime,
	`end_date` datetime,
	`location` json NOT NULL,
	`game_id` int,
	`demo` boolean NOT NULL);
