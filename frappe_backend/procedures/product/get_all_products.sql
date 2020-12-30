USE `user_schema`;
DROP procedure IF EXISTS `get_all_products`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `get_all_products` ()
BEGIN
SELECT * FROM product;
END$$

DELIMITER ;