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
(10001,10001,'test_1.csv','test data 10001','test10001@gmail.com','test test test test'),
(10002,10002,'test_1.csv','test data 10002','test10002@gmail.com','test test test test'),
(10003,10003,'test_1.csv','test data 10003','test10003@gmail.com','test test test test'),
(20001,20001,'test_2.csv','test data 20001','test20001@gmail.com','test test test test'),
(20002,20002,'test_2.csv','test data 20002','test20002@gmail.com','test test test test'),
(20003,20003,'test_2.csv','test data 20003','test20003@gmail.com','test test test test');