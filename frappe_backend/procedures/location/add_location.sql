USE `user_schema`;
DROP procedure IF EXISTS `add_location`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `add_location` (IN p_location_id VARCHAR(40), IN p_name VARCHAR(20))
BEGIN
INSERT INTO 
	location
		(location_id, name)
	VALUES
		(p_location_id, p_name);
SELECT * FROM location WHERE location_id = p_location_id;
END$$

DELIMITER ;