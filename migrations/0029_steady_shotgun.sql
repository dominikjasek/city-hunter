ALTER TABLE `answers` ADD `medal` enum('GOLD','SILVER','BRONZE');
CREATE INDEX `round_order_idx` ON `questions` (`round_order`,`tournament_id`);