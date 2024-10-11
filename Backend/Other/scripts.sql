-- Table creation
CREATE TABLE `file_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename_UNIQUE` (`name`)
);

CREATE TABLE `filedata` (
  `post_id` int NOT NULL,
  `id` int NOT NULL,
  `filename` varchar(256) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `body` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`post_id`,`id`),
  KEY `filename_idx` (`filename`),
  CONSTRAINT `name` FOREIGN KEY (`filename`) REFERENCES `file_list` (`name`) ON DELETE CASCADE
);

-- Test data
INSERT INTO filenames(filename)
VALUES
('test_1.csv'),
('test_2.csv');

INSERT INTO filedata(post_id, id, filename, name, email, body)
VALUES
(1,1,'test_1.csv','test data 1-1','test11@gmail.com','test test test test'),
(1,2,'test_1.csv','test data 1-2','test12@gmail.com','test test test test'),
(2,1,'test_2.csv','test data 2-1','test21@gmail.com','test test test test'),
(2,2,'test_2.csv','test data 2-2','test22@gmail.com','test test test test');