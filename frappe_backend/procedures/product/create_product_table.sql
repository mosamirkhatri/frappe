USE `user_schema`;
DROP procedure IF EXISTS `create_product_table`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `create_product_table`()
BEGIN
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` VARCHAR(10),
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
);
END$$

DELIMITER ;