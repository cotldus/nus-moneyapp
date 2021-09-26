/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ b13_grp3_moneyapp /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE b13_grp3_moneyapp;

DROP TABLE IF EXISTS Accounts;
CREATE TABLE `Accounts` (
  `user_id` int(11) DEFAULT NULL,
  `account_type` varchar(50) DEFAULT NULL,
  `income` decimal(10,2) DEFAULT NULL,
  `expense` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `account_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`account_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS Transactions;
CREATE TABLE `Transactions` (
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `transaction_type` varchar(50) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `transaction_title` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `transaction_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`transaction_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `Transactions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `Accounts` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS Users;
CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `ic_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Accounts(user_id,account_type,income,expense,created_at,account_id) VALUES(112233,'Current',10000.00,3000.00,'2021-09-26 16:12:23',88776655),(112233,'Savings',4000.00,2500.00,'2021-09-26 16:09:28',99887766);

INSERT INTO Transactions(created_at,transaction_type,account_id,transaction_title,amount,transaction_id) VALUES('2021-09-26 16:16:05','debit',88776655,'Cold storage',169.45,13579),('2021-09-26 16:17:15','credit',88776655,'June Salary',5000.12,24680),('2021-09-26 16:23:52','credit',99887766,'2021 yearly bonus',8888.88,123412),('2021-09-26 16:24:42','debit',99887766,'Housing rent Jun21',1500.99,123413),('2021-09-26 16:23:49','debit',88776655,'Spotify Premium',14.00,132435);
INSERT INTO Users(user_id,username,password,email,mobile,ic_number) VALUES(112233,'manfred_do','dododo','mylife@gmail.com',81112222,9000123);