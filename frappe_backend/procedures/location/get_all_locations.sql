USE `user_schema`;
DROP procedure IF EXISTS `get_all_locations`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `get_all_locations` ()
BEGIN
SELECT * FROM location;
END$$

DELIMITER ;
