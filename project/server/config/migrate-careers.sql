-- Run once on an existing smart_pharmacy database (skip lines that already exist)

USE smart_pharmacy;

ALTER TABLE pharmacists ADD COLUMN email VARCHAR(150) NULL AFTER phone;
ALTER TABLE pharmacists ADD COLUMN hired_from_application_id INT NULL AFTER email;
ALTER TABLE job_applications ADD COLUMN pharmacist_id INT NULL AFTER status;
