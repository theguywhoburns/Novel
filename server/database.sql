SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

CREATE TABLE `cards` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `personalId` VARCHAR(255) NOT NULL,
  `number` VARCHAR(16) NOT NULL,
  `expiry_date` DATE NOT NULL,
  `cvv` CHAR(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `cities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `city_name` VARCHAR(255) NOT NULL,
  `coords` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `matches` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_one` INT(11) NOT NULL,
  `user_two` INT(11) NOT NULL,
  FOREIGN KEY (`user_one`) REFERENCES `users`(`id`),
  FOREIGN KEY (`user_two`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `dialog_id` INT(11) NOT NULL,
  `text` TEXT NOT NULL,
  `sender_id` INT(11) NOT NULL,
  `receiver_id` INT(11) NOT NULL,
  `reply_msg_id` INT(11),
  `send_time` DATETIME NOT NULL,
  `is_media` BOOLEAN DEFAULT FALSE,
  `is_read` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `places` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT(11) NOT NULL,
  `city_id` INT(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `image` TEXT,
  `address` VARCHAR(255),
  `link` VARCHAR(255),
  FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `transactions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `from_user_id` INT(11) NOT NULL,
  `to_user_id` INT(11) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `item` VARCHAR(255),
  `transaction_date` DATETIME NOT NULL,
  FOREIGN KEY (`from_user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`to_user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `credentials` (
  `credential_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  'verification_code' VARCHAR(6),
  `last_login` TIMESTAMP NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `bDate` DATE NOT NULL,
  `gender` VARCHAR(20) NOT NULL,
  `about` TEXT NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255),
  `education` VARCHAR(255),
  `growth` TEXT,
  `interests` TEXT,
  `job` VARCHAR(255),
  `languages` VARCHAR(255),
  `mediaLinks` TEXT,
  `familyPlans` TEXT,
  `relationshipGoals` TEXT,
  `sports` TEXT,
  `alcohol` TEXT,
  `smoke` TEXT,
  `personalityType` TEXT,
  `socialMediaLinks` TEXT,
  `status` VARCHAR(50),
  `subscriptionType` VARCHAR(50),
  `zodiacSign` VARCHAR(50),
  `playlist` TEXT,
  `location` TEXT,
  `talkStyle` TEXT,
  `loveLang` TEXT,
  `pets` TEXT,
  `food` TEXT,
  `isOnline` BOOLEAN NOT NULL DEFAULT FALSE,
  `balance` DECIMAL(10, 2) DEFAULT 0.00
);

COMMIT;