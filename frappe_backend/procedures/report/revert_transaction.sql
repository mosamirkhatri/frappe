USE `user_schema`;
DROP procedure IF EXISTS `revert_transaction`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `revert_transaction` (IN p_from_location VARCHAR(40), IN p_to_location VARCHAR(40), IN p_product_id VARCHAR(40) ,IN p_qty INT)
BEGIN

IF p_to_location IS NOT NULL THEN
	UPDATE
		report
	SET
		report.qty = report.qty - p_qty
	WHERE 
		location_id = p_to_location and product_id = p_product_id;
END IF;

IF p_from_location IS NOT NULL THEN
	INSERT INTO report
			(product_id, location_id, qty)
		VALUES
			(p_product_id, p_from_location, p_qty)
	ON DUPLICATE KEY UPDATE
		report.qty = report.qty + p_qty;
END IF;

END$$

DELIMITER ;
