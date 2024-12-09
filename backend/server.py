
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///musicbox.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/api/test') #just a test one
def get_time():
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }

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