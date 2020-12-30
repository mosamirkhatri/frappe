USE `user_schema`;
DROP procedure IF EXISTS `get_all_product_movements`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `get_all_product_movements`()
BEGIN
SELECT * FROM product_movement ORDER BY timestamp;
END$$

DELIMITER ;
