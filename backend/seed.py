from datetime import date
from flask import Flask
from models import db, User, Artist, Album, Review

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///musicbox.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create app context
with app.app_context():
    # Create all database tables
    db.create_all()

    # Populate the User table
    user1 = User(password="password123", email="user1@example.com", name="John Doe", role="user")
    user2 = User(password="securepass", email="user2@example.com", name="Jane Smith", role="artist")

    # Populate the Artist table
    artist1 = Artist(name="The Rolling Stones", bio="Iconic rock band formed in 1962.")
    artist2 = Artist(name="Adele", bio="Award-winning singer and songwriter from the UK.")

    # Populate the Album table
    album1 = Album(title="Let It Bleed", album_art="URL_to_album_art_1", release_date=date(1969, 12, 5), genre="rock", artist_id=1)
    album2 = Album(title="25", album_art="URL_to_album_art_2", release_date=date(2015, 11, 20), genre="rock", artist_id=2)

    # Populate the Review table
    review1 = Review(rating=5, review_text="Amazing album!", review_date=date(2024, 12, 11), user_id=1, album_id=1)
    review2 = Review(rating=4, review_text="Great sound and vocals.", review_date=date(2024, 12, 11), user_id=2, album_id=2)

    # Add all entries to the session
    db.session.add_all([user1, user2, artist1, artist2, album1, album2, review1, review2])

    # Commit the session
    try:
        db.session.commit()
        print("Data inserted successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"An error occurred: {e}")
