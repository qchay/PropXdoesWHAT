CREATE TABLE `affected_groups`
(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(256) NOT NULL,
	`desc` TEXT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `action_groups`
(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(256) NOT NULL,
	
	`desc` TEXT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `laws`
(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	
	`bill_id` VARCHAR(32) NOT NULL,		-- hr5515-115
	`name` VARCHAR(32) NOT NULL,		-- H.R.5515
	`title` VARCHAR(256) NOT NULL,		-- propub short_title
	`subject` VARCHAR(256) NOT NULL,	-- propub primary_subject
	
	`sponsor_id` INT UNSIGNED NOT NULL,
	`sponsor_bio_id` VARCHAR(16) NOT NULL,	-- T000238
	`cdotgov_url` VARCHAR(256),			-- https://www.congress.gov/bill/115th-congress/house-bill/5515
	`govtrack_url` VARCHAR(256),		-- https://www.govtrack.us/congress/bills/115/hr5515
	
	`introduced` DATE,					-- YYYY-MM-DD
	`last_vote` DATE,					-- YYYY-MM-DD
	`house_pass` DATE,					-- YYYY-MM-DD
	`senate_pass` DATE,					-- YYYY-MM-DD
	`enacted` DATE,						-- YYYY-MM-DD
	`vetoed` DATE,						-- YYYY-MM-DD
	
	`desc` TEXT,						-- propub summary
	
	`raw` TEXT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `politicians`
(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(64) NOT NULL,
	`last_name` VARCHAR(64) NOT NULL,
	`dob` DATE NOT NULL,
	
	`bio_id` VARCHAR(16) NOT NULL,
	
	`chamber` ENUM('house', 'senate') NOT NULL,
	`state` CHAR(2) NOT NULL,
	`party` ENUM('R', 'D', 'I') NOT NULL,
	
	`site` VARCHAR(256),
	`contact_form` VARCHAR(256),
	`phone` VARCHAR(32),
	
	`raw` TEXT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `laws__affected_groups`
(
	`law` INT UNSIGNED NOT NULL,
	`affected_group` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`law`, `affected_group`)
);

CREATE TABLE `affected_groups__action_groups`
(
	`affected_group` INT UNSIGNED NOT NULL,
	`action_group` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`affected_group`, `action_group`)
);

