CREATE TABLE users (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  lastname VARCHAR(55) NOT NULL,
  firstname VARCHAR(55) NOT NULL,
  username VARCHAR(20) NOT NULL UNIQUE,
  phone_number VARCHAR(10) NOT NULL,
  location VARCHAR(55) NOT NULL,
  mail VARCHAR(254) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  description TEXT
);

CREATE TABLE home_structure (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  postal_code CHAR(5) NOT NULL,
  capacity INT NOT NULL, 
  is_professional TINYINT NOT NULL,
  cat TINYINT NOT NULL, 
  dog TINYINT NOT NULL, 
  price INT(11) NOT NULL, 
  users_id INT(11) unsigned NOT NULL, 
  FOREIGN KEY (users_id) REFERENCES users(id)
);


CREATE TABLE animal (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(55) NOT NULL, 
  age INT NOT NULL,
  is_sterilized TINYINT NOT NULL,
  species VARCHAR(255) NOT NULL,
  race_id INT(11) unsigned NOT NULL,
  user_id INT(11) unsigned NOT NULL
);

CREATE TABLE race (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  is_cat TINYINT, 
  is_dog TINYINT
);

CREATE TABLE reservation (
  id INT(11) unsigned PRIMARY KEY auto_increment NOT NULL,
  reservation_dates VARCHAR(255) NOT NULL,
  home_structure_id INT NOT NULL,
  animal_id INT(11) unsigned NOT NULL
);