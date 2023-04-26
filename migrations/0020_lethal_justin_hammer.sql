ALTER TABLE questions MODIFY COLUMN `question_image_url` varchar(250) NOT NULL;
ALTER TABLE questions MODIFY COLUMN `answer_image_url` varchar(250) NOT NULL;
ALTER TABLE questions DROP COLUMN `image`;