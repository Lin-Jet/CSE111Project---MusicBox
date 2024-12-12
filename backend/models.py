from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///musicbox.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100))
    username = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(50), nullable=False, default='user')

class Artist(db.Model):
    __tablename__ = 'Artist'
    artist_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text)

class Album(db.Model):
    __tablename__ = 'Album'
    album_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    album_art = db.Column(db.Text)
    release_date = db.Column(db.Date)
    genre = db.Column(db.String(100), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('Artist.artist_id'))
    artist = db.relationship('Artist', backref='albums')
    reviews = db.relationship('Review', back_populates='album')

class Collection(db.Model):
    __tablename__ = 'Collection'
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey('Album.album_id'), primary_key=True)
    added_date = db.Column(db.Date, default=datetime.date.today)

    user = db.relationship('User', backref='collections')
    album = db.relationship('Album', backref='collections')


class Review(db.Model):
    __tablename__ = 'Review'
    review_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    rating = db.Column(db.Integer)
    review_text = db.Column(db.Text)
    review_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'))
    album_id = db.Column(db.Integer, db.ForeignKey('Album.album_id'))
    album = db.relationship('Album', back_populates='reviews')


if __name__ == '__main__':
    db.drop_all()  # Drop existing tables
    db.create_all() # Create new tables
    print("Database tables dropped and recreated.")