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