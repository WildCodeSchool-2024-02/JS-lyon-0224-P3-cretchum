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
  species ENUM('chat', 'chien') NOT NULL,
  is_tattooed_chipped TINYINT NOT NULL,
  breed VARCHAR(55),
  users_id INT(11) unsigned NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE reservation (
  id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  reservation_date DATE NOT NULL,
  home_structure_id INT(11) unsigned NOT NULL, 
  animal_id INT(11) unsigned NOT NULL, 
  FOREIGN KEY (animal_id) REFERENCES animal(id),
  FOREIGN KEY (home_structure_id) REFERENCES home_structure(id)
);
