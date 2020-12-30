USE `user_schema`;
DROP procedure IF EXISTS `create_report_table`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `create_report_table`()
BEGIN
CREATE TABLE IF NOT EXISTS `report` (
  `product_id` VARCHAR(10) NOT NULL,
  `location_id` VARCHAR(10) NOT NULL,
  `qty` INT NOT NULL,
  PRIMARY KEY (`product_id`, `location_id`),
  FOREIGN KEY (`location_id`)
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