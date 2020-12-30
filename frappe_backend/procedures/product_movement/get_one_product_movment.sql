USE `user_schema`;
DROP procedure IF EXISTS `get_one_product_movement`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `get_one_product_movement` (IN p_movement_id VARCHAR(40))
BEGIN
SELECT * 
FROM product_movement
WHERE
	movement_id = p_movement_id;
END$$

DELIMITER ;

