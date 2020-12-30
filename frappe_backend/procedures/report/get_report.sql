USE `user_schema`;
DROP procedure IF EXISTS `get_report`;

DELIMITER $$
USE `user_schema`$$
CREATE PROCEDURE `get_report` ()
BEGIN
SELECT * FROM report WHERE qty > 0;
END$$

DELIMITER ;
