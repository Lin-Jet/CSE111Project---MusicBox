from server import db, User, Artist, Album, Review

# Add seed data
def seed_data():
    db.create_all()
    
    # Add users
    user = User(username="john_doe", password="password123", email="john@example.com", name="John Doe")
    db.session.add(user)

    # Add artists
    artist = Artist(name="Faye Webster", bio="An indie artist known for her soulful, introspective music.")
    db.session.add(artist)

    # Add albums
    album = Album(title="Underdressed at the Symphony", album_art="symphony_cover.jpg", release_date=datetime.date(2024, 11, 11), artist_id=1)
    db.session.add(album)

    # Add reviews
    review = Review(rating=5, review_text="Amazing album!", review_date=datetime.date(2024, 11, 11), user_id=1, album_id=1)
    db.session.add(review)

    db.session.commit()

if __name__ == "__main__":
    seed_data()
    print("Database seeded!")
