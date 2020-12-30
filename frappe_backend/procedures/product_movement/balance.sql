USE `user_schema`;
DROP procedure IF EXISTS `balance`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `balance`(IN p_product_id VARCHAR(10), IN p_location_id VARCHAR(10))
BEGIN
SELECT (
    SELECT
      IFNULL(SUM(qty), 0) as val1
    from
      product_movement
	WHERE
		to_location = p_location_id and product_id = p_product_id
  ) - (
    SELECT
      IFNULL(SUM(qty), 0) as val1
    from
      product_movement
	WHERE
		from_location = p_location_id and product_id = p_product_id
  ) 
AS total_qty;
END$$

DELIMITER ;
