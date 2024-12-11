import './artist.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Users/LogOutBtn';

function Artist_albums() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState({ title: '', artist_name: '', genre: '', releaseDate: '' });

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/albums')
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Error fetching albums:', error));
    }, []);

    const handleAddAlbum = () => {
        if (newAlbum.title && newAlbum.artist_name && newAlbum.genre && newAlbum.releaseDate) {
            fetch('http://127.0.0.1:5000/api/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAlbum),
            })
            .then(response => response.json())
            .then(data => {
                if (data.album_id) {
                    setAlbums([...albums, data]);
                    setNewAlbum({ title: '', artist_name: '', genre: '', releaseDate: '' });
                } else {
                    alert('Error adding album: ' + data.message);
                }
            })
            .catch(error => console.error('Error adding album:', error));
        } else {
            alert('Please fill out all fields to add an album.');
        }
    };

    return (
        <div className="artist-albums-548"
        style = {{

        }}
        >
            <header className="artist-albums-header-548">
                <h1>Welcome to Your Albums Page</h1>
                <p>Here, you can manage and add new albums.</p>
            </header>

            <div className="albums-list-548">
                <h2>Your Albums</h2>
                {albums.length === 0 ? (
                    <p>No albums found. Add your first album below!</p>
                ) : (
                    <ul>
                        {albums.map((album, index) => (
                            <li key={index}>
                                <strong>{album.title}</strong> by {album.artist_name} - {album.genre} ({album.releaseDate})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="add-album-548">
                <h2>Add a New Album</h2>
                <input
                    type="text"
                    placeholder="Album Title"
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={newAlbum.artist_name}
                    onChange={(e) => setNewAlbum({ ...newAlbum, artist_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newAlbum.genre}
                    onChange={(e) => setNewAlbum({ ...newAlbum, genre: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Release Date"
                    value={newAlbum.releaseDate}
                    onChange={(e) => setNewAlbum({ ...newAlbum, releaseDate: e.target.value })}
                />
                <button onClick={handleAddAlbum}>Add Album</button>
            </div>

            <div className="artist-logout-548">
                <LogoutButton />
                <button onClick={() => navigate('/artist')}>Back to Artist Dashboard</button>
            </div>
        </div>
    );
}

export default Artist_albums;