
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
