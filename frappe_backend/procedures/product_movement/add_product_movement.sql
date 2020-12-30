USE `user_schema`;
DROP procedure IF EXISTS `add_product_movement`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `add_product_movement`(
										IN p_movement_id VARCHAR(10), 
										IN p_timestamp TIMESTAMP, 
										IN p_from_location VARCHAR(10), 
										IN p_to_location VARCHAR(10), 
										IN p_product_id VARCHAR(10), 
										IN p_qty INT)
BEGIN

INSERT INTO product_movement
		(movement_id, timestamp, from_location, to_location, product_id, qty)
	VALUES
		(p_movement_id, p_timestamp, p_from_location, p_to_location, p_product_id, p_qty);

IF p_from_location IS NOT NULL THEN
	UPDATE
		report
	SET
		report.qty = report.qty - p_qty
	WHERE 
		location_id = p_from_location and product_id = p_product_id;
END IF;

IF p_to_location IS NOT NULL THEN
	INSERT INTO report
			(product_id, location_id, qty)
		VALUES
			(p_product_id, p_to_location, p_qty)
	ON DUPLICATE KEY UPDATE
		report.qty = report.qty + p_qty;
END IF;

SELECT * FROM product_movement WHERE movement_id = p_movement_id;

END$$

DELIMITER ;
