-- CREATE SCHEMA
CREATE SCHEMA `prontmed` DEFAULT CHARACTER SET utf8mb4 ;

-- CREATE PATIENT TABLE
CREATE TABLE `prontmed`.`patient` (
  `patient_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `telephone` VARCHAR(11) NOT NULL,
  `birth_date` DATE NOT NULL,
  `gender` VARCHAR(1) NOT NULL COMMENT 'M = MALE OR F = FEMALE',
  `height` DECIMAL NULL,
  `weight` DECIMAL NULL,
  PRIMARY KEY (`patient_id`));

-- CREATE APPOINTMENT SCHEDULE TABLE
CREATE TABLE `prontmed`.`appointment_schedule` (
  `patient_id` BIGINT(20) NOT NULL COMMENT 'Patient ID',
  `date` DATE NOT NULL COMMENT 'Date of Schedule',
  PRIMARY KEY (`patient_id`, `date`),
  CONSTRAINT `fk_schedule_patient_id`
    FOREIGN KEY (`patient_id`)
    REFERENCES `prontmed`.`patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- CREATE APPOINTMENT TABLE
CREATE TABLE `prontmed`.`appointment_note` (
  `note_id` bigint(20) NOT NULL COMMENT 'Note ID',
  `patient_id` bigint(20) NOT NULL COMMENT 'Patient ID',
  `date` date NOT NULL COMMENT 'Date of Medical Appointment',
  `notes` text NOT NULL COMMENT 'Notes of Medical Appointment',
  PRIMARY KEY (`note_id`),
  KEY `fk_note_patient_id_idx` (`patient_id`),
  KEY `fk_note_date_idx` (`date`),
  CONSTRAINT `fk_note_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `appointment_schedule` (`patient_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

