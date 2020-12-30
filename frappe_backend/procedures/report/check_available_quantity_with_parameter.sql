USE `user_schema`;
DROP procedure IF EXISTS `check_available_quantity_with_parameter`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `check_available_quantity_with_parameter` (IN p_product_id VARCHAR(40), IN p_location_id VARCHAR(40), OUT p_qty INT)
BEGIN
SELECT 
	qty
INTO
	p_qty
FROM
	report 
WHERE
	product_id = p_product_id AND location_id = p_location_id;
END$$

DELIMITER ;