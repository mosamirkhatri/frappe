USE `user_schema`;
DROP procedure IF EXISTS `add_product`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `add_product`(IN p_product_id VARCHAR(40), IN p_name VARCHAR(20))
BEGIN
UPDATE 
	product
SET 
	name = p_name
WHERE 
	product_id = p_product_id;
SELECT * FROM product WHERE product_id = p_product_id;
END$$

DELIMITER ;