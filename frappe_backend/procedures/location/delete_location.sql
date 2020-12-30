USE `user_schema`;
DROP procedure IF EXISTS `delete_location`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `delete_locaton` (IN p_location_id VARCHAR(40))
BEGIN
DELETE FROM
	location
WHERE
	location_id = p_location_id;
END$$

DELIMITER ;
