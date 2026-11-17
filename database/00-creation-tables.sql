USE trouve_ton_artisan;

CREATE TABLE IF NOT EXISTS categories (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nom (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS specialites (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  categorie_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nom (nom),
  KEY categorie_id (categorie_id),
  CONSTRAINT specialites_ibfk_1
    FOREIGN KEY (categorie_id) REFERENCES categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS artisans (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(150) NOT NULL,
  specialite VARCHAR(100) NOT NULL,
  note DECIMAL(2,1) DEFAULT NULL,
  ville VARCHAR(100) NOT NULL,
  a_propos TEXT,
  email VARCHAR(150) NOT NULL,
  site_web VARCHAR(255) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  top_artisan TINYINT(1) DEFAULT '0',
  categorie_id INT NOT NULL,
  specialite_id INT DEFAULT NULL,
  PRIMARY KEY (id),
  KEY categorie_id (categorie_id),
  KEY fk_artisans_specialites (specialite_id),
  CONSTRAINT artisans_ibfk_1
    FOREIGN KEY (categorie_id) REFERENCES categories (id),
  CONSTRAINT fk_artisans_specialites
    FOREIGN KEY (specialite_id) REFERENCES specialites (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;