

--Team
-- Alex Sanchez, Jet Lin

--Table of Contents:
-- 1. Schema
-- 2. add example data
-- 3. 20 sql statments 

--1. Schema


DROP TABLE IF EXISTS Appears_in;
DROP TABLE IF EXISTS User_Collections;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Song;
DROP TABLE IF EXISTS Collection;
DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS Artist;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
                      user_id INTEGER PRIMARY KEY,
                      username VARCHAR(50) NOT NULL,
                      password VARCHAR(50) NOT NULL,
                      email VARCHAR(100),
                      name VARCHAR(100)
);

CREATE TABLE Artist (
                        artist_id INTEGER PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        bio TEXT
);

CREATE TABLE Album (
                       album_id INTEGER PRIMARY KEY,
                       title VARCHAR(100) NOT NULL,
                       album_art TEXT,
                       release_date DATE,
                       artist_id INTEGER,
                       FOREIGN KEY (artist_id) REFERENCES Artist(artist_id)
);

CREATE TABLE Song (
                      song_id INTEGER PRIMARY KEY,
                      title VARCHAR(100) NOT NULL,
                      length TIME,
                      composer VARCHAR(100),
                      album_id INTEGER,
                      FOREIGN KEY (album_id) REFERENCES Album(album_id)
);

CREATE TABLE Collection (
                            collection_id INTEGER PRIMARY KEY,
                            name VARCHAR(100) NOT NULL,
                            date_created DATE,
                            user_id INTEGER,
                            FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Appears_in (
                            album_id INTEGER,
                            collection_id INTEGER,
                            PRIMARY KEY (album_id, collection_id),
                            FOREIGN KEY (album_id) REFERENCES Album(album_id),
                            FOREIGN KEY (collection_id) REFERENCES Collection(collection_id)
);

CREATE TABLE User_Collections (
                                  user_id INTEGER,
                                  collection_id INTEGER,
                                  PRIMARY KEY (user_id, collection_id),
                                  FOREIGN KEY (user_id) REFERENCES User(user_id),
                                  FOREIGN KEY (collection_id) REFERENCES Collection(collection_id)
);

CREATE TABLE Review (
                        review_id INTEGER PRIMARY KEY,
                        rating INTEGER,
                        review_text TEXT,
                        review_date DATE,
                        user_id INTEGER,
                        album_id INTEGER,
                        FOREIGN KEY (user_id) REFERENCES User(user_id),
                        FOREIGN KEY (album_id) REFERENCES Album(album_id)
);



-- 2. add example data
INSERT INTO Artist (artist_id, name, bio) VALUES (2, 'HIM', 'Finnish Goth Rock band and one of the most successful Finnish music acts.');

INSERT INTO Album (album_id, title, album_art, release_date, artist_id) 
VALUES (2, 'Razorblade Romance', 'razorblade_romance_cover.jpg', '2000-01-24', 2);

INSERT INTO Song (song_id, title, length, composer, album_id) VALUES 
(2, 'I Love You (Prelude to Tragedy)', '00:03:09', 'Ville Valo', 2),
(3, 'Poison Girl', '00:03:51', 'Ville Valo', 2),
(4, 'Join Me in Death', '00:03:36', 'Ville Valo', 2),
(5, 'Right Here in My Arms', '00:04:03', 'Ville Valo', 2),
(6, 'Gone with the Sin', '00:04:22', 'Ville Valo', 2),
(7, 'Razorblade Kiss', '00:04:18', 'Ville Valo', 2),
(8, 'Bury Me Deep Inside Your Heart', '00:04:16', 'Ville Valo', 2),
(9, 'Heaven Tonight', '00:03:18', 'Ville Valo', 2),
(10, 'Death Is in Love with Us', '00:02:58', 'Ville Valo', 2),
(11, 'Resurrection', '00:03:39', 'Ville Valo', 2),
(12, 'One Last Time', '00:05:10', 'Ville Valo', 2);

INSERT INTO User (user_id, username, password, email, name) 
VALUES (2, 'jatlan', '123456789', 'jetlin101@gmail.com', 'Jet Lin');

INSERT INTO Collection (collection_id, name, date_created, user_id) 
VALUES (2, 'HIM Collection', '2024-11-11', 2);

INSERT INTO Appears_in (album_id, collection_id) VALUES (2, 2);

INSERT INTO User_Collections (user_id, collection_id) VALUES (2, 2);

INSERT INTO Review (review_id, rating, review_text, review_date, user_id, album_id) 
VALUES (2, 5, 'Super good album', '2024-11-11', 2, 2);



-- 2. 20 sql statments 


-- User Auth (login, signup, logout) and Update profile
INSERT INTO User (username, password, email, name) VALUES ('john_doe', 'password123', 'john@example.com', 'John Doe');
UPDATE User SET email = 'new_john@example.com' WHERE username = 'john_doe';
DELETE FROM User WHERE username = 'john_doe';

-- Artist Auth (login, signup, logout) and Update profile
INSERT INTO Artist (name, bio) VALUES ('Faye Webster', 'An indie artist known for her soulful, introspective music.');
UPDATE Artist SET bio = 'Indie artist with a unique, introspective style.' WHERE name = 'Faye Webster';
DELETE FROM Artist WHERE name = 'Faye Webster';

-- Add Album
INSERT INTO Album (title, album_art, release_date, artist_id) VALUES ('Underdressed at the Symphony', 'symphony_cover.jpg', '2024-11-11', 1);
UPDATE Album SET title = 'Underdressed at the Symphony Deluxe' WHERE title = 'Underdressed at the Symphony';
DELETE FROM Album WHERE title = 'Underdressed at the Symphony Deluxe';

-- Add Songs
INSERT INTO Song (title, length, composer, album_id) VALUES ('But Not Kiss', '00:03:42', 'Faye Webster', 1);
UPDATE Song SET length = '00:03:45' WHERE title = 'But Not Kiss';
DELETE FROM Song WHERE title = 'But Not Kiss';

-- add to collection and Edit Collectoin
INSERT INTO Collection (name, date_created, user_id) VALUES ('Favorites', '2024-11-11', 1);
UPDATE Collection SET name = 'Top Hits' WHERE name = 'Favorites';
DELETE FROM Collection WHERE name = 'Top Hits';

-- Adding Albums and Songs to Collections
INSERT INTO Appears_in (album_id, collection_id) VALUES (1, 1);
INSERT INTO User_Collections (user_id, collection_id) VALUES (1, 1);

-- Write Review and Rate Album
INSERT INTO Review (rating, review_text, review_date, user_id, album_id) VALUES (5, 'Amazing album!', '2024-11-11', 1, 1);
UPDATE Review SET rating = 4 WHERE review_id = 1;
DELETE FROM Review WHERE review_id = 1;

-- view collections of all users
SELECT u.username AS user_name, c.name AS collection_name, c.date_created 
FROM User u
JOIN Collection c ON u.user_id = c.user_id
ORDER BY u.username;
