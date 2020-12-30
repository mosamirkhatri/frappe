USE `user_schema`;
DROP procedure IF EXISTS `get_one_product`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `get_one_product` (IN p_product_id VARCHAR(40))
BEGIN
SELECT * 
FROM product
WHERE
	product_id = p_product_id;
END$$

DELIMITER ;
