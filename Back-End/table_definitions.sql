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
	`name` VARCHAR(256) NOT NULL,
	
	`desc` TEXT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `politicians`
(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(64) NOT NULL,
	`last_name` VARCHAR(64) NOT NULL,
	
	`chamber` ENUM('house', 'senate') NOT NULL,
	`state` CHAR(2) NOT NULL,
	`party` ENUM('R', 'D', 'I') NOT NULL,
	
	`site` VARCHAR(256),
	`contact_form` VARCHAR(256),
	
	`raw` JSON,
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

