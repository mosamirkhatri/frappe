USE `user_schema`;
DROP procedure IF EXISTS `update_product_movement`;

DELIMITER $$
USE `user_schema`$$
CREATE DEFINER=`root`@`%` PROCEDURE `update_product_movement`(
															IN p_movement_id VARCHAR(10),
															IN p_old_from_location VARCHAR(10), 
															IN p_old_to_location VARCHAR(10), 
                                                            IN p_old_product_id VARCHAR(10),
                                                            IN p_old_qty INT,
                                                            IN p_new_from_location VARCHAR(10),
                                                            IN p_new_to_location VARCHAR(10),
                                                            IN p_new_product_id VARCHAR(10),
                                                            IN p_new_qty INT)
BEGIN

CALL check_available_quantity_with_parameter(p_old_product_id, p_old_to_location, @old_check_qty);

IF @old_check_qty IS NULL OR @old_check_qty < p_old_qty THEN
	SIGNAL SQLSTATE '22003' SET MESSAGE_TEXT = 'INSUFFICIENT QUANTITY TO REVERT TRANSACTION';
END IF;

CALL revert_transaction(p_old_from_location, p_old_to_location, p_old_product_id, p_old_qty);

CALL check_available_quantity_with_parameter(p_new_product_id, p_new_from_location, @new_check_qty);
IF @new_check_qty IS NULL OR @new_check_qty < p_new_qty THEN
	SIGNAL SQLSTATE '22003' SET MESSAGE_TEXT = 'INSUFFICIENT QUANTITY AT NEW FROM LOCATION';
END IF;

UPDATE 
		product_movement
	SET
		from_location = p_new_from_location,
        to_location = p_new_to_location,
        product_id = p_new_product_id,
        qty = p_new_qty
	WHERE
		movement_id = p_movement_id;

IF p_new_from_location IS NOT NULL THEN
	UPDATE
		report
	SET
		report.qty = report.qty - p_new_qty
	WHERE 
		location_id = p_new_from_location and product_id = p_new_product_id;
END IF;

IF p_new_to_location IS NOT NULL THEN
	INSERT INTO report
			(product_id, location_id, qty)
		VALUES
			(p_new_product_id, p_new_to_location, p_new_qty)
	ON DUPLICATE KEY UPDATE
		report.qty = report.qty + p_new_qty;
END IF;

SELECT * FROM product_movement WHERE movement_id = p_movement_id;
END$$

DELIMITER ;