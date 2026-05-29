

DROP TYPE IF EXISTS varsta_indicata ;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE varsta_indicata AS ENUM( 'copii', 'adolescenti', 'adulti', 'toate varstele');
CREATE TYPE tipuri_produse AS ENUM('comics', 'manga','merch');


CREATE TABLE IF NOT EXISTS benzi_desenate (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   autor VARCHAR(50),
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   volum INT NOT NULL CHECK (volum>=0),   
   tip_produs tipuri_produse DEFAULT 'comics',
   varsta_indicata varsta_indicata DEFAULT 'toate varstele',
   genuri VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   color BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into benzi_desenate 
(nume, autor, descriere, pret, volum, tip_produs, varsta_indicata, genuri, color, imagine) 
VALUES 

('Naruto', 'Masashi Kishimoto', 'Naruto volumul 1', 49.99, 1, 'manga', 'adolescenti', ARRAY['actiune','aventura'], TRUE, 'Naruto.png'),

('One Piece', 'Eiichiro Oda', 'One Piece volumul 27', 59.99, 27, 'manga', 'adolescenti', ARRAY['aventura','comedie'], TRUE, 'One_Piece.png'),

('Spider-Man', 'Stan Lee', 'Spider-Man', 39.99, 1, 'comics', 'toate varstele', ARRAY['supereroi','actiune'], TRUE, 'Spider-Man.png'),

('Superman', 'Jerry Siegel', 'Superman', 44.99, 1, 'comics', 'toate varstele', ARRAY['supereroi','actiune'], TRUE, 'Superman.png'),

('Daredevil', 'Stan Lee', 'Daredevil', 42.99, 1, 'comics', 'adulti', ARRAY['supereroi','drama'], TRUE, 'Daredevil.png'),

('Wolverine', 'Chris Claremont', 'Wolverine', 45.99, 1, 'comics', 'adulti', ARRAY['supereroi','actiune'], TRUE, 'Wolverine.png'),

('Ironman', 'Stan Lee', 'Ironman', 43.99, 1, 'comics', 'toate varstele', ARRAY['supereroi','SF'], TRUE, 'Ironman.png'),

('Bleach', 'Tite Kubo', 'Bleach volumul 1', 52.99, 1, 'manga', 'adolescenti', ARRAY['actiune','fantasy'], FALSE, 'Bleach.png'),

('HunterxHunter', 'Yoshihiro Togashi', 'HunterxHunter vol 1', 54.99, 1, 'manga', 'adolescenti', ARRAY['aventura','fantasy'], TRUE, 'HunterxHunter.png'),

('Thor', 'Stan Lee', 'Thor', 46.99, 1, 'comics', 'toate varstele', ARRAY['supereroi','mitologie'], TRUE, 'Thor.png'),

('Detective Conan', 'Gosho Aoyama', 'Detective Conan', 48.99, 1, 'manga', 'adolescenti', ARRAY['mister','detectiv'], FALSE, 'Detective_Conan.png'),

('Batman', 'Bob Kane', 'Batman', 44.99, 1, 'comics', 'adulti', ARRAY['supereroi','detectiv'], FALSE, 'Batman.png');


