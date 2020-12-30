USE `user_schema`;
DROP procedure IF EXISTS `add_product`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `add_product`(IN p_product_id VARCHAR(40), IN p_name VARCHAR(20))
BEGIN
INSERT INTO 
	product
		(product_id, name)
	VALUES
		(p_product_id, p_name);
SELECT * FROM product WHERE product_id = p_product_id;
END$$

DELIMITER ;