CREATE TABLE users (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  lastname VARCHAR(55) NOT NULL,
  firstname VARCHAR(55) NOT NULL,
  username VARCHAR(20) NOT NULL UNIQUE,
  phone_number VARCHAR(10) NOT NULL,
  location TEXT NOT NULL,
  mail VARCHAR(254) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  description TEXT
);

CREATE TABLE home_structure (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(55) NOT NULL,
  lastname VARCHAR(55) NOT NULL,
  firstname VARCHAR(55) NOT NULL,
  phone_number  VARCHAR(10) NOT NULL,
  location TEXT NOT NULL,
  postal_code INT(6) NOT NULL,
  mail VARCHAR(254) NOT NULL UNIQUE,
  password TEXT NOT NULL, 
  capacity INT(5) NOT NULL,
  is_professional TINYINT NOT NULL,
  cat TINYINT NOT NULL, 
  dog TINYINT NOT NULL, 
  price INT(11) NOT NULL, 
  description TEXT
);

CREATE TABLE animals (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(55) NOT NULL, 
  age INT NOT NULL,
  is_sterilized TINYINT NOT NULL,
  breed VARCHAR(255) NOT NULL,
  species ENUM('chien', 'chat') NOT NULL,
  user_id INT(11) unsigned NOT NULL
);

-- CREATE TABLE race (
--   id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
--   is_cat TINYINT, 
--   is_dog TINYINT
-- );