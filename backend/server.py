
from flask import Flask, request, jsonify

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from models import User, Artist, Album, Review, db, app

x = datetime.datetime.now()




# Signup route
@app.route('/accounts', methods=['POST'])
def create_account():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    if db.session.query(User).filter_by(email=data['email']).first():
        return jsonify({"message": "Email already exists"}), 409

    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        username=f"{data['first_name']} {data['last_name']}",
        password=hashed_password,
        email=data['email'],
        name=f"{data['first_name']} {data['last_name']}",
        role=data.get('role', 'User')
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account created successfully"}), 201


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


@app.route('/api/albums')
def getAlbums():
    albums = [
        {
            "id": 1,
            "title": "Brennan Jones 1",
            "artist": "Brennan Jones",
            "genre": "Hip-Hop",
            "release_date": "2024-9-12"
        },
        {
            "id": 2,
            "title": "Icedancer",
            "artist": "Bladee",
            "genre": "Hip-Hop",
            "release_date": "2018-29-12"
        }
    ]
    return jsonify(albums)

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
    app.run(debug=True)