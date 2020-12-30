
USE `user_schema`;
DROP procedure IF EXISTS `user_schema`.`check_quantity_available`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `check_available_quantity`(IN p_product_id VARCHAR(40), IN p_location_id VARCHAR(40))
BEGIN
SELECT 
	qty 
FROM
	report 
WHERE
	product_id = p_product_id AND location_id = p_location_id;
END$$

DELIMITER ;
;
