
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from models import User, Artist, Album, Review, db, app
from sqlalchemy.exc import IntegrityError


x = datetime.datetime.now()


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///musicbox.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "*"}})



# Signup route
@app.route('/signup', methods=['POST'])
def create_account():
    data = request.get_json()

    # Validate input
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    if data.get('role') not in ['User', 'Artist']:
        return jsonify({"message": "Invalid role specified"}), 400

    # Check for duplicate email in the User table
    if db.session.query(User).filter_by(email=data['email']).first():
        return jsonify({"message": "Email already exists"}), 409

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    if data['role'] == 'User':
        # Create a new User
        new_user = User(
            username=f"{data['first_name']} {data['last_name']}",
            password=hashed_password,
            email=data['email'],
            name=f"{data['first_name']} {data['last_name']}",
            role='User'
        )
        db.session.add(new_user)

    elif data['role'] == 'Artist':
        # Check for duplicate artist name
        if db.session.query(Artist).filter_by(name=f"{data['first_name']} {data['last_name']}").first():
            return jsonify({"message": "Artist name already exists"}), 409

        # Create a new Artist
        new_artist = Artist(
            name=f"{data['first_name']} {data['last_name']}",
            bio=data.get('bio', '')  # Optional bio field
        )
        db.session.add(new_artist)

    # Commit transaction
    try:
        db.session.commit()
        return jsonify({"message": f"{data['role']} account created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error creating account: {str(e)}"}), 500

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    user = db.session.query(User).filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.user_id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401


@app.route('/api/albums', methods=(['POST', 'GET']))
def getAlbums():
    if request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        artist_name = data.get('artist_name')
        genre = data.get('genre')
        release_date = data.get('releaseDate')  # Using releaseDate from frontend

        if not title or not artist_name:
            return jsonify({"message": "Title and artist_name are required"}), 400

        # Convert release_date to a Date object if provided
        release_date_obj = None
        if release_date:
            try:
                release_date_obj = datetime.strptime(release_date, "%Y-%m-%d").date()
            except ValueError:
                return jsonify({"message": "Invalid date format"}), 400

        artist = Artist.query.filter_by(name=artist_name).first()
        if not artist:
            artist = Artist(name=artist_name)
            db.session.add(artist)
            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                return jsonify({"message": "Error creating artist"}), 500

        new_album = Album(
            title=title,
            album_art=data.get('album_art'),
            release_date=release_date_obj,
            artist_id=artist.artist_id,
            genre=genre
        )

        db.session.add(new_album)
        try:
            db.session.commit()
            return jsonify({
                "album_id": new_album.album_id,
                "title": new_album.title,
                "album_art": new_album.album_art,
                "releaseDate": str(new_album.release_date),
                "artist_name": artist.name,
                "genre": new_album.genre,
            }), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({"message": "Error creating album"}), 500

    elif request.method == 'GET':
        albums = Album.query.all()
        return jsonify([
            {
                "album_id": album.album_id,
                "title": album.title,
                "artist_name": album.artist.name,
                "genre": album.genre,
                "releaseDate": str(album.release_date)
            }
            for album in albums
        ])

    return jsonify({"message": "Method not allowed"}), 405


@app.route('/api/artist', methods=['POST', 'GET', 'DELETE'])
def handle_artist():
    if request.method == 'POST':
        # Create a new artist
        data = request.get_json()
        name = data.get('name')
        bio = data.get('bio', '')

        if not name:
            return jsonify({"message": "Artist name is required"}), 400

        # Check if the artist already exists
        existing_artist = Artist.query.filter_by(name=name).first()
        if existing_artist:
            return jsonify({"message": "Artist already exists"}), 409

        # Create new artist
        new_artist = Artist(name=name, bio=bio)
        db.session.add(new_artist)
        try:
            db.session.commit()
            return jsonify({
                "artist_id": new_artist.artist_id,
                "name": new_artist.name,
                "bio": new_artist.bio
            }), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({"message": "Error creating artist"}), 500

    elif request.method == 'GET':
        # Fetch all artists
        artists = Artist.query.all()
        return jsonify([
            {
                "artist_id": artist.artist_id,
                "name": artist.name,
                "bio": artist.bio
            }
            for artist in artists
        ]), 200

    elif request.method == 'DELETE':
        # Delete an artist by ID or name
        data = request.get_json()
        artist_id = data.get('artist_id')
        name = data.get('name')

        if not artist_id and not name:
            return jsonify({"message": "Either artist_id or name is required"}), 400

        # Find the artist
        if artist_id:
            artist = Artist.query.get(artist_id)
        elif name:
            artist = Artist.query.filter_by(name=name).first()

        if not artist:
            return jsonify({"message": "Artist not found"}), 404

        # Delete the artist
        db.session.delete(artist)
        try:
            db.session.commit()
            return jsonify({"message": "Artist deleted successfully"}), 200
        except IntegrityError:
            db.session.rollback()
            return jsonify({"message": "Error deleting artist"}), 500

    return jsonify({"message": "Invalid method"}), 405




@app.route('/api/reviews')
def getReviews(): 
    
    review = [
        {
            "id": 1,
            "title": "YA I MISS MY CITY",
            "author": "Jet",
            "reviewDescription": "YA I MISS MY CITY, YA I MISS DUVAL!!!!",
            "date": "2024-12-9"
        },
        {
            "id": 2,
            "title": "I would like to listen to more drain gang",
            "author": "Jet",
            "reviewDescription": "My roommates S[redacted]Y wrapped both had bladee as their number one artist so i had ot actualyl checkout drain gang of course!",
            "date": "2024-12-8"
        }
    ]
    return jsonify(review)


# Running app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  #create tables once and then jsut check if they exist each time. 
    app.run(debug=True)