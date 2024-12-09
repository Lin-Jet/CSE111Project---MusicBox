from . import db

class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100))
    name = db.Column(db.String(100))
    role = db.Column(db.String(50), nullable=False, default='user')

class Artist(db.Model):
    __tablename__ = 'Artist'
    artist_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text)

class Album(db.Model):
    __tablename__ = 'Album'
    album_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    album_art = db.Column(db.Text)
    release_date = db.Column(db.Date)
    artist_id = db.Column(db.Integer, db.ForeignKey('Artist.artist_id'))

class Review(db.Model):
    __tablename__ = 'Review'
    review_id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    review_text = db.Column(db.Text)
    review_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'))
    album_id = db.Column(db.Integer, db.ForeignKey('Album.album_id'))
