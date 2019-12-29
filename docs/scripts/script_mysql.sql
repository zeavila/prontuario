-- CREATE SCHEMA
CREATE SCHEMA `prontmed2` DEFAULT CHARACTER SET utf8mb4;

-- USE SCHEMA
USE `prontmed2`;

-- CREATE PATIENT TABLE
CREATE TABLE `patient` (
  `patient_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` varchar(1) NOT NULL COMMENT 'M = MALE OR F = FEMALE',
  `height` decimal(10,0) DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- CREATE PATIENT SCHEDULE TABLE
CREATE TABLE `patient_schedule` (
  `patient_id` bigint(20) NOT NULL COMMENT 'Patient ID',
  `schedule_date` date NOT NULL COMMENT 'Date of Schedule',
  PRIMARY KEY (`patient_id`,`schedule_date`),
  CONSTRAINT `fk_schedule_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- CREATE NOTE TABLE
CREATE TABLE `note` (
  `patient_id` bigint(20) NOT NULL COMMENT 'Patient ID',
  `schedule_date` date NOT NULL COMMENT 'Date of Medical Appointment',
  `notes` text NOT NULL COMMENT 'Notes of Medical Appointment',
  PRIMARY KEY (`schedule_date`,`patient_id`),
  KEY `fk_note_patient_id_idx` (`patient_id`),
  KEY `fk_note_date_idx` (`schedule_date`),
  CONSTRAINT `fk_note_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient_schedule` (`patient_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TRIGGER BEFORE DELETE OF PATIENT
DELIMITER $$
DROP TRIGGER IF EXISTS prontmed2.patient_bd$$
CREATE DEFINER=`root`@`localhost` TRIGGER `patient_bd` BEFORE DELETE ON `patient` FOR EACH ROW
BEGIN
	DELETE FROM note WHERE patient_id = OLD.patient_id;
    DELETE FROM patient_schedule WHERE patient_id = OLD.patient_id;
END;$$
DELIMITER ;