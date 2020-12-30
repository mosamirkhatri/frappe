USE `user_schema`;
DROP procedure IF EXISTS `delete_product`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `delete_product` (IN p_product_id VARCHAR(40))
BEGIN
DELETE FROM
	product
WHERE
	product_id = p_product_id;
END$$

DELIMITER ;