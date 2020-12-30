USE `user_schema`;
DROP procedure IF EXISTS `get_one_location`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `get_one_location` (IN p_location_id VARCHAR(40))
BEGIN
SELECT * 
FROM location
WHERE
	location_id = p_location_id;
END$$

DELIMITER ;
