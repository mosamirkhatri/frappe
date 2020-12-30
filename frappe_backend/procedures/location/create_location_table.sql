USE `user_schema`;
DROP procedure IF EXISTS `create_location_table`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `create_location_table`()
BEGIN
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` VARCHAR(10),
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
);
END$$

DELIMITER ;