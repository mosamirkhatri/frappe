USE `user_schema`;
DROP procedure IF EXISTS `create_product_movement_table`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `create_product_movement_table`()
BEGIN
CREATE TABLE IF NOT EXISTS `product_movement` (
  `movement_id` VARCHAR(10),
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `from_location` VARCHAR(10) DEFAULT NULL,
  `to_location` VARCHAR(10) DEFAULT NULL,
  `product_id` VARCHAR(10) NOT NULL,
  `qty` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`movement_id`),
  FOREIGN KEY (`from_location`) 
	REFERENCES location(`location_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (`to_location`)
	REFERENCES location(`location_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (`product_id`)
	REFERENCES product(`product_id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
END$$

DELIMITER ;