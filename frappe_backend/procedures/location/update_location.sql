USE `user_schema`;
DROP procedure IF EXISTS `update_location`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `update_location` (IN p_location_id VARCHAR(40), IN p_name VARCHAR(20))
BEGIN
UPDATE 
	location
SET 
	name = p_name
WHERE 
	location_id = p_location_id;
SELECT * FROM location WHERE location_id = p_location_id;
END$$

DELIMITER ;